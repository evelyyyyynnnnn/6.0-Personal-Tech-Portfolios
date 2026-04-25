#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <vector>
#include <string>
#include <thread>
#include <mutex>
#include <map>

#pragma comment(lib, "ws2_32.lib")

using namespace std;

class ChatServer {
private:
    SOCKET serverSocket;
    vector<SOCKET> clientSockets;
    map<SOCKET, string> clientNames;
    mutex clientsMutex;
    bool running;
    int port;
    
public:
    ChatServer(int port = 8888) : port(port), running(false) {
        // 初始化 Winsock
        WSADATA wsaData;
        if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
            cerr << "WSAStartup 失败" << endl;
            return;
        }
        
        // 创建服务器套接字
        serverSocket = socket(AF_INET, SOCK_STREAM, 0);
        if (serverSocket == INVALID_SOCKET) {
            cerr << "创建套接字失败" << endl;
            WSACleanup();
            return;
        }
        
        // 设置套接字选项
        int opt = 1;
        setsockopt(serverSocket, SOL_SOCKET, SO_REUSEADDR, (char*)&opt, sizeof(opt));
        
        // 绑定地址
        sockaddr_in serverAddr;
        serverAddr.sin_family = AF_INET;
        serverAddr.sin_addr.s_addr = INADDR_ANY;
        serverAddr.sin_port = htons(port);
        
        if (bind(serverSocket, (sockaddr*)&serverAddr, sizeof(serverAddr)) == SOCKET_ERROR) {
            cerr << "绑定失败" << endl;
            closesocket(serverSocket);
            WSACleanup();
            return;
        }
        
        // 开始监听
        if (listen(serverSocket, SOMAXCONN) == SOCKET_ERROR) {
            cerr << "监听失败" << endl;
            closesocket(serverSocket);
            WSACleanup();
            return;
        }
        
        cout << "聊天服务器启动成功，监听端口: " << port << endl;
        cout << "等待客户端连接..." << endl;
    }
    
    ~ChatServer() {
        stop();
        WSACleanup();
    }
    
    void start() {
        running = true;
        
        // 接受客户端连接的线程
        thread acceptThread(&ChatServer::acceptClients, this);
        
        // 主线程处理用户输入
        string input;
        while (running) {
            getline(cin, input);
            if (input == "quit" || input == "exit") {
                running = false;
                break;
            } else if (input == "list") {
                listClients();
            } else if (input == "help") {
                showHelp();
            } else if (input.substr(0, 4) == "kick") {
                string name = input.substr(5);
                kickClient(name);
            }
        }
        
        acceptThread.join();
    }
    
    void acceptClients() {
        while (running) {
            sockaddr_in clientAddr;
            int clientAddrLen = sizeof(clientAddr);
            
            SOCKET clientSocket = accept(serverSocket, (sockaddr*)&clientAddr, &clientAddrLen);
            if (clientSocket == INVALID_SOCKET) {
                if (running) {
                    cerr << "接受连接失败" << endl;
                }
                continue;
            }
            
            // 获取客户端IP
            char clientIP[INET_ADDRSTRLEN];
            inet_ntop(AF_INET, &clientAddr.sin_addr, clientIP, INET_ADDRSTRLEN);
            
            cout << "新客户端连接: " << clientIP << ":" << ntohs(clientAddr.sin_port) << endl;
            
            // 添加到客户端列表
            {
                lock_guard<mutex> lock(clientsMutex);
                clientSockets.push_back(clientSocket);
            }
            
            // 启动客户端处理线程
            thread clientThread(&ChatServer::handleClient, this, clientSocket);
            clientThread.detach();
        }
    }
    
    void handleClient(SOCKET clientSocket) {
        char buffer[1024];
        string clientName = "Anonymous";
        
        // 等待客户端发送用户名
        int bytesReceived = recv(clientSocket, buffer, sizeof(buffer) - 1, 0);
        if (bytesReceived > 0) {
            buffer[bytesReceived] = '\0';
            clientName = string(buffer);
            
            {
                lock_guard<mutex> lock(clientsMutex);
                clientNames[clientSocket] = clientName;
            }
            
            cout << "用户 " << clientName << " 加入聊天室" << endl;
            broadcastMessage("系统", clientName + " 加入了聊天室");
        }
        
        // 处理客户端消息
        while (running) {
            bytesReceived = recv(clientSocket, buffer, sizeof(buffer) - 1, 0);
            if (bytesReceived <= 0) {
                break;
            }
            
            buffer[bytesReceived] = '\0';
            string message = string(buffer);
            
            if (message == "/quit") {
                break;
            }
            
            cout << clientName << ": " << message << endl;
            broadcastMessage(clientName, message);
        }
        
        // 客户端断开连接
        {
            lock_guard<mutex> lock(clientsMutex);
            auto it = find(clientSockets.begin(), clientSockets.end(), clientSocket);
            if (it != clientSockets.end()) {
                clientSockets.erase(it);
            }
            clientNames.erase(clientSocket);
        }
        
        cout << "用户 " << clientName << " 离开聊天室" << endl;
        broadcastMessage("系统", clientName + " 离开了聊天室");
        closesocket(clientSocket);
    }
    
    void broadcastMessage(const string& sender, const string& message) {
        string fullMessage = sender + ": " + message;
        
        lock_guard<mutex> lock(clientsMutex);
        for (SOCKET clientSocket : clientSockets) {
            send(clientSocket, fullMessage.c_str(), fullMessage.length(), 0);
        }
    }
    
    void listClients() {
        lock_guard<mutex> lock(clientsMutex);
        cout << "当前在线用户 (" << clientSockets.size() << " 人):" << endl;
        for (const auto& pair : clientNames) {
            cout << "- " << pair.second << endl;
        }
    }
    
    void kickClient(const string& name) {
        lock_guard<mutex> lock(clientsMutex);
        for (auto it = clientNames.begin(); it != clientNames.end(); ++it) {
            if (it->second == name) {
                SOCKET clientSocket = it->first;
                send(clientSocket, "你被管理员踢出聊天室", 20, 0);
                closesocket(clientSocket);
                
                auto socketIt = find(clientSockets.begin(), clientSockets.end(), clientSocket);
                if (socketIt != clientSockets.end()) {
                    clientSockets.erase(socketIt);
                }
                clientNames.erase(it);
                
                cout << "用户 " << name << " 已被踢出" << endl;
                broadcastMessage("系统", name + " 被管理员踢出聊天室");
                return;
            }
        }
        cout << "未找到用户 " << name << endl;
    }
    
    void showHelp() {
        cout << "=== 服务器命令 ===" << endl;
        cout << "list : 显示在线用户" << endl;
        cout << "kick <用户名> : 踢出用户" << endl;
        cout << "help : 显示帮助" << endl;
        cout << "quit : 退出服务器" << endl;
        cout << "=================" << endl;
    }
    
    void stop() {
        running = false;
        
        // 关闭所有客户端连接
        {
            lock_guard<mutex> lock(clientsMutex);
            for (SOCKET clientSocket : clientSockets) {
                closesocket(clientSocket);
            }
            clientSockets.clear();
            clientNames.clear();
        }
        
        // 关闭服务器套接字
        if (serverSocket != INVALID_SOCKET) {
            closesocket(serverSocket);
        }
        
        cout << "服务器已关闭" << endl;
    }
};

int main() {
    cout << "=== 聊天室服务器 ===" << endl;
    cout << "输入 'help' 查看命令" << endl;
    
    ChatServer server(8888);
    server.start();
    
    return 0;
} 