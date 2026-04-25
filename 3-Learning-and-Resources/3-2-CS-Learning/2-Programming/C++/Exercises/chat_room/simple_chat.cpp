#include <iostream>
#include <string>
#include <vector>
#include <thread>
#include <mutex>
#include <chrono>
#include <cstdlib>

using namespace std;

class SimpleChat {
private:
    vector<string> messages;
    mutex messagesMutex;
    bool running;
    
public:
    SimpleChat() : running(true) {
        cout << "=== 简单聊天室 ===" << endl;
        cout << "这是一个模拟的聊天室程序" << endl;
        cout << "输入消息进行聊天，输入 'quit' 退出" << endl;
        cout << "==================" << endl;
    }
    
    void addMessage(const string& sender, const string& message) {
        lock_guard<mutex> lock(messagesMutex);
        string timestamp = getCurrentTime();
        messages.push_back(timestamp + " [" + sender + "]: " + message);
        
        // 保持最多50条消息
        if (messages.size() > 50) {
            messages.erase(messages.begin());
        }
    }
    
    void displayMessages() {
        lock_guard<mutex> lock(messagesMutex);
        cout << "\033[2J\033[H"; // 清屏
        
        cout << "=== 聊天记录 ===" << endl;
        for (const auto& msg : messages) {
            cout << msg << endl;
        }
        cout << "================" << endl;
    }
    
    string getCurrentTime() {
        auto now = chrono::system_clock::now();
        auto time_t = chrono::system_clock::to_time_t(now);
        auto tm = *localtime(&time_t);
        
        char buffer[20];
        strftime(buffer, sizeof(buffer), "%H:%M:%S", &tm);
        return string(buffer);
    }
    
    void run() {
        string username;
        cout << "请输入您的用户名: ";
        getline(cin, username);
        
        if (username.empty()) {
            username = "Anonymous";
        }
        
        addMessage("系统", username + " 加入了聊天室");
        
        // 启动消息显示线程
        thread displayThread([this]() {
            while (running) {
                displayMessages();
                this_thread::sleep_for(chrono::milliseconds(1000));
            }
        });
        
        // 主线程处理用户输入
        string input;
        while (running) {
            cout << "> ";
            getline(cin, input);
            
            if (input == "quit" || input == "exit") {
                running = false;
                addMessage("系统", username + " 离开了聊天室");
                break;
            }
            
            if (!input.empty()) {
                addMessage(username, input);
            }
        }
        
        displayThread.join();
        cout << "聊天室已关闭" << endl;
    }
};

int main() {
    SimpleChat chat;
    chat.run();
    return 0;
} 