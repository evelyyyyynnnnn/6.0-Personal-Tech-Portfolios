#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <map>
#include <sstream>
#include <algorithm>
#include <memory>

using namespace std;

// 记录结构
struct Record {
    int id;
    string name;
    string email;
    int age;
    
    Record(int id = 0, const string& name = "", const string& email = "", int age = 0)
        : id(id), name(name), email(email), age(age) {}
    
    string toString() const {
        return to_string(id) + "," + name + "," + email + "," + to_string(age);
    }
    
    static Record fromString(const string& line) {
        stringstream ss(line);
        string token;
        vector<string> tokens;
        
        while (getline(ss, token, ',')) {
            tokens.push_back(token);
        }
        
        if (tokens.size() >= 4) {
            return Record(stoi(tokens[0]), tokens[1], tokens[2], stoi(tokens[3]));
        }
        return Record();
    }
};

class SimpleDatabase {
private:
    vector<Record> records;
    string filename;
    int nextId;
    
public:
    SimpleDatabase(const string& dbFile = "database.csv") : filename(dbFile), nextId(1) {
        loadFromFile();
    }
    
    ~SimpleDatabase() {
        saveToFile();
    }
    
    void loadFromFile() {
        ifstream file(filename);
        if (!file.is_open()) {
            cout << "数据库文件不存在，将创建新数据库" << endl;
            return;
        }
        
        string line;
        // 跳过标题行
        getline(file, line);
        
        while (getline(file, line)) {
            if (!line.empty()) {
                Record record = Record::fromString(line);
                records.push_back(record);
                nextId = max(nextId, record.id + 1);
            }
        }
        
        file.close();
        cout << "已加载 " << records.size() << " 条记录" << endl;
    }
    
    void saveToFile() {
        ofstream file(filename);
        if (!file.is_open()) {
            cerr << "错误: 无法创建数据库文件" << endl;
            return;
        }
        
        // 写入标题行
        file << "ID,Name,Email,Age" << endl;
        
        // 写入记录
        for (const auto& record : records) {
            file << record.toString() << endl;
        }
        
        file.close();
        cout << "数据库已保存到 " << filename << endl;
    }
    
    void addRecord(const string& name, const string& email, int age) {
        Record record(nextId++, name, email, age);
        records.push_back(record);
        cout << "记录已添加，ID: " << record.id << endl;
    }
    
    void deleteRecord(int id) {
        auto it = find_if(records.begin(), records.end(),
                         [id](const Record& r) { return r.id == id; });
        
        if (it != records.end()) {
            records.erase(it);
            cout << "记录 ID " << id << " 已删除" << endl;
        } else {
            cout << "未找到 ID " << id << " 的记录" << endl;
        }
    }
    
    void updateRecord(int id, const string& name, const string& email, int age) {
        auto it = find_if(records.begin(), records.end(),
                         [id](const Record& r) { return r.id == id; });
        
        if (it != records.end()) {
            it->name = name;
            it->email = email;
            it->age = age;
            cout << "记录 ID " << id << " 已更新" << endl;
        } else {
            cout << "未找到 ID " << id << " 的记录" << endl;
        }
    }
    
    void findRecord(int id) {
        auto it = find_if(records.begin(), records.end(),
                         [id](const Record& r) { return r.id == id; });
        
        if (it != records.end()) {
            cout << "找到记录:" << endl;
            cout << "ID: " << it->id << endl;
            cout << "姓名: " << it->name << endl;
            cout << "邮箱: " << it->email << endl;
            cout << "年龄: " << it->age << endl;
        } else {
            cout << "未找到 ID " << id << " 的记录" << endl;
        }
    }
    
    void searchByName(const string& name) {
        vector<Record> results;
        for (const auto& record : records) {
            if (record.name.find(name) != string::npos) {
                results.push_back(record);
            }
        }
        
        if (results.empty()) {
            cout << "未找到包含 '" << name << "' 的记录" << endl;
        } else {
            cout << "找到 " << results.size() << " 条匹配记录:" << endl;
            displayRecords(results);
        }
    }
    
    void listAllRecords() {
        if (records.empty()) {
            cout << "数据库为空" << endl;
            return;
        }
        
        cout << "数据库中的所有记录 (" << records.size() << " 条):" << endl;
        displayRecords(records);
    }
    
    void displayRecords(const vector<Record>& recs) {
        cout << "----------------------------------------" << endl;
        cout << "ID\t姓名\t\t邮箱\t\t\t年龄" << endl;
        cout << "----------------------------------------" << endl;
        
        for (const auto& record : recs) {
            cout << record.id << "\t" << record.name << "\t\t" 
                 << record.email << "\t\t" << record.age << endl;
        }
        cout << "----------------------------------------" << endl;
    }
    
    void showStatistics() {
        if (records.empty()) {
            cout << "数据库为空，无法显示统计信息" << endl;
            return;
        }
        
        int totalAge = 0;
        int minAge = records[0].age;
        int maxAge = records[0].age;
        
        for (const auto& record : records) {
            totalAge += record.age;
            minAge = min(minAge, record.age);
            maxAge = max(maxAge, record.age);
        }
        
        double avgAge = (double)totalAge / records.size();
        
        cout << "=== 数据库统计信息 ===" << endl;
        cout << "总记录数: " << records.size() << endl;
        cout << "平均年龄: " << avgAge << endl;
        cout << "最小年龄: " << minAge << endl;
        cout << "最大年龄: " << maxAge << endl;
        cout << "=====================" << endl;
    }
    
    void showHelp() {
        cout << "=== 简单数据库管理系统 ===" << endl;
        cout << "命令:" << endl;
        cout << "  add <姓名> <邮箱> <年龄> : 添加记录" << endl;
        cout << "  delete <ID> : 删除记录" << endl;
        cout << "  update <ID> <姓名> <邮箱> <年龄> : 更新记录" << endl;
        cout << "  find <ID> : 查找记录" << endl;
        cout << "  search <姓名> : 按姓名搜索" << endl;
        cout << "  list : 列出所有记录" << endl;
        cout << "  stats : 显示统计信息" << endl;
        cout << "  save : 保存数据库" << endl;
        cout << "  help : 显示帮助" << endl;
        cout << "  quit : 退出" << endl;
        cout << "=========================" << endl;
    }
    
    void run() {
        showHelp();
        
        string input;
        while (true) {
            cout << "\n请输入命令: ";
            getline(cin, input);
            
            if (input == "quit" || input == "exit") {
                saveToFile();
                cout << "再见!" << endl;
                break;
            }
            
            if (input == "help") {
                showHelp();
                continue;
            }
            
            if (input == "list") {
                listAllRecords();
                continue;
            }
            
            if (input == "stats") {
                showStatistics();
                continue;
            }
            
            if (input == "save") {
                saveToFile();
                continue;
            }
            
            // 解析命令
            stringstream ss(input);
            string command;
            ss >> command;
            
            if (command == "add") {
                string name, email;
                int age;
                if (ss >> name >> email >> age) {
                    addRecord(name, email, age);
                } else {
                    cout << "格式错误! 使用: add <姓名> <邮箱> <年龄>" << endl;
                }
            } else if (command == "delete") {
                int id;
                if (ss >> id) {
                    deleteRecord(id);
                } else {
                    cout << "格式错误! 使用: delete <ID>" << endl;
                }
            } else if (command == "find") {
                int id;
                if (ss >> id) {
                    findRecord(id);
                } else {
                    cout << "格式错误! 使用: find <ID>" << endl;
                }
            } else if (command == "search") {
                string name;
                if (ss >> name) {
                    searchByName(name);
                } else {
                    cout << "格式错误! 使用: search <姓名>" << endl;
                }
            } else if (command == "update") {
                int id, age;
                string name, email;
                if (ss >> id >> name >> email >> age) {
                    updateRecord(id, name, email, age);
                } else {
                    cout << "格式错误! 使用: update <ID> <姓名> <邮箱> <年龄>" << endl;
                }
            } else {
                cout << "未知命令! 输入 'help' 查看帮助" << endl;
            }
        }
    }
};

int main() {
    SimpleDatabase db;
    db.run();
    return 0;
} 