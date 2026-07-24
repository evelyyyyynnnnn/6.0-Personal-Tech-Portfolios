#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <string>
#include <thread>

#pragma comment(lib, "ws2_32.lib")

using namespace std;

class ChatClient {
private:
    SOCKET clientSocket;
    string serverIP;
    int serverPort;
    string username;
    bool connected;
    
public:
    ChatClient(const string& ip = "127.0.0.1", int port = 8888) 
        : serverIP(ip), serverPort(port), connected(false) {
        
        // 初始化 Winsock
        WSADATA wsaData;
        if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
            cerr << "WSAStartup 失败" << endl;
            return;
        }
        
        // 创建客户端套接字
        clientSocket = socket(AF_INET, SOCK_STREAM, 0);
        if (clientSocket == INVALID_SOCKET) {
            cerr << "创建套接字失败" << endl;
            WSACleanup();
            return;
        }
    }
    
    ~ChatClient() {
        disconnect();
        WSACleanup();
    }
    
    bool connect() {
        sockaddr_in serverAddr;
        serverAddr.sin_family = AF_INET;
        serverAddr.sin_port = htons(serverPort);
        
        if (inet_pton(AF_INET, serverIP.c_str(), &serverAddr.sin_addr) <= 0) {
            cerr << "无效的服务器地址" << endl;
            return false;
        }
        
        if (::connect(clientSocket, (sockaddr*)&serverAddr, sizeof(serverAddr)) == SOCKET_ERROR) {
            cerr << "连接服务器失败" << endl;
            return false;
        }
        
        connected = true;
        cout << "成功连接到服务器 " << serverIP << ":" << serverPort << endl;
        return true;
    }
    
    void disconnect() {
        if (connected) {
            closesocket(clientSocket);
            connected = false;
            cout << "已断开连接" << endl;
        }
    }
    
    void setUsername(const string& name) {
        username = name;
    }
    
    void start() {
        if (!connected) {
            cout << "请先连接到服务器" << endl;
            return;
        }
        
        // 发送用户名到服务器
        send(clientSocket, username.c_str(), username.length(), 0);
        
        // 启动接收消息的线程
        thread receiveThread(&ChatClient::receiveMessages, this);
        
        cout << "=== 聊天室客户端 ===" << endl;
        cout << "用户名: " << username << endl;
        cout << "输入消息开始聊天，输入 '/quit' 退出" << endl;
        cout << "==================" << endl;
        
        // 主线程处理用户输入
        string message;
        while (connected) {
            getline(cin, message);
            
            if (message == "/quit") {
                break;
            }
            
            if (!message.empty()) {
                send(clientSocket, message.c_str(), message.length(), 0);
            }
        }
        
        receiveThread.join();
    }
    
    void receiveMessages() {
        char buffer[1024];
        
        while (connected) {
            int bytesReceived = recv(clientSocket, buffer, sizeof(buffer) - 1, 0);
            if (bytesReceived <= 0) {
                cout << "服务器连接已断开" << endl;
                connected = false;
                break;
            }
            
            buffer[bytesReceived] = '\0';
            string receivedMessage = string(buffer);
            
            // 检查是否被踢出
            if (receivedMessage.find("你被管理员踢出聊天室") != string::npos) {
                cout << "\n[系统] " << receivedMessage << endl;
                connected = false;
                break;
            }
            
            cout << "\n" << receivedMessage << endl;
            cout << "> "; // 重新显示提示符
        }
    }
    
    void showHelp() {
        cout << "=== 客户端命令 ===" << endl;
        cout << "/quit : 退出聊天室" << endl;
        cout << "=================" << endl;
    }
};

int main() {
    string serverIP, username;
    int port;
    
    cout << "=== 聊天室客户端 ===" << endl;
    
    cout << "请输入服务器IP (默认: 127.0.0.1): ";
    getline(cin, serverIP);
    if (serverIP.empty()) {
        serverIP = "127.0.0.1";
    }
    
    cout << "请输入服务器端口 (默认: 8888): ";
    string portStr;
    getline(cin, portStr);
    if (portStr.empty()) {
        port = 8888;
    } else {
        port = stoi(portStr);
    }
    
    cout << "请输入用户名: ";
    getline(cin, username);
    if (username.empty()) {
        username = "Anonymous";
    }
    
    ChatClient client(serverIP, port);
    client.setUsername(username);
    
    if (client.connect()) {
        client.start();
    } else {
        cout << "连接失败，程序退出" << endl;
    }
    
    return 0;
} 