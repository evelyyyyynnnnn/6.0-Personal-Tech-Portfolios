#include <iostream>
#include <fstream>
#include <string>
#include <map>
#include <vector>
#include <algorithm>
#include <sstream>
#include <cctype>

using namespace std;

class WordCounter {
private:
    map<string, int> wordCount;
    
    // 清理单词，移除标点符号并转换为小写
    string cleanWord(const string& word) {
        string cleaned;
        for (char c : word) {
            if (isalpha(c)) {
                cleaned += tolower(c);
            }
        }
        return cleaned;
    }
    
    // 检查是否为停用词
    bool isStopWord(const string& word) {
        vector<string> stopWords = {
            "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
            "of", "with", "by", "is", "are", "was", "were", "be", "been", "being",
            "have", "has", "had", "do", "does", "did", "will", "would", "could",
            "should", "may", "might", "can", "this", "that", "these", "those",
            "i", "you", "he", "she", "it", "we", "they", "me", "him", "her",
            "us", "them", "my", "your", "his", "her", "its", "our", "their"
        };
        
        return find(stopWords.begin(), stopWords.end(), word) != stopWords.end();
    }
    
public:
    void processFile(const string& filename) {
        ifstream file(filename);
        if (!file.is_open()) {
            cerr << "错误: 无法打开文件 " << filename << endl;
            return;
        }
        
        string line;
        while (getline(file, line)) {
            stringstream ss(line);
            string word;
            
            while (ss >> word) {
                string cleaned = cleanWord(word);
                if (!cleaned.empty() && !isStopWord(cleaned)) {
                    wordCount[cleaned]++;
                }
            }
        }
        
        file.close();
        cout << "文件 " << filename << " 处理完成!" << endl;
    }
    
    void processText(const string& text) {
        stringstream ss(text);
        string word;
        
        while (ss >> word) {
            string cleaned = cleanWord(word);
            if (!cleaned.empty() && !isStopWord(cleaned)) {
                wordCount[cleaned]++;
            }
        }
    }
    
    void displayResults(int limit = 20) {
        if (wordCount.empty()) {
            cout << "没有找到任何单词!" << endl;
            return;
        }
        
        // 转换为vector以便排序
        vector<pair<string, int>> sortedWords;
        for (const auto& pair : wordCount) {
            sortedWords.push_back(pair);
        }
        
        // 按频率降序排序
        sort(sortedWords.begin(), sortedWords.end(),
             [](const pair<string, int>& a, const pair<string, int>& b) {
                 return a.second > b.second;
             });
        
        cout << "\n=== 词频统计结果 ===" << endl;
        cout << "总单词数: " << wordCount.size() << endl;
        cout << "显示前 " << min(limit, (int)sortedWords.size()) << " 个最常用单词:" << endl;
        cout << "----------------------------------------" << endl;
        cout << "排名\t单词\t\t出现次数" << endl;
        cout << "----------------------------------------" << endl;
        
        for (int i = 0; i < min(limit, (int)sortedWords.size()); i++) {
            cout << (i + 1) << "\t" << sortedWords[i].first << "\t\t" 
                 << sortedWords[i].second << endl;
        }
    }
    
    void saveResults(const string& filename) {
        ofstream file(filename);
        if (!file.is_open()) {
            cerr << "错误: 无法创建文件 " << filename << endl;
            return;
        }
        
        vector<pair<string, int>> sortedWords;
        for (const auto& pair : wordCount) {
            sortedWords.push_back(pair);
        }
        
        sort(sortedWords.begin(), sortedWords.end(),
             [](const pair<string, int>& a, const pair<string, int>& b) {
                 return a.second > b.second;
             });
        
        file << "词频统计结果" << endl;
        file << "总单词数: " << wordCount.size() << endl;
        file << "单词\t出现次数" << endl;
        
        for (const auto& pair : sortedWords) {
            file << pair.first << "\t" << pair.second << endl;
        }
        
        file.close();
        cout << "结果已保存到 " << filename << endl;
    }
    
    void clear() {
        wordCount.clear();
    }
};

int main() {
    WordCounter counter;
    string input;
    
    cout << "=== 词频统计工具 ===" << endl;
    cout << "命令:" << endl;
    cout << "  file <文件名> : 处理文件" << endl;
    cout << "  text <文本> : 处理文本" << endl;
    cout << "  show [数量] : 显示结果" << endl;
    cout << "  save <文件名> : 保存结果" << endl;
    cout << "  clear : 清空统计" << endl;
    cout << "  quit : 退出" << endl;
    cout << "==================" << endl;
    
    while (true) {
        cout << "\n请输入命令: ";
        getline(cin, input);
        
        if (input == "quit" || input == "exit") {
            cout << "再见!" << endl;
            break;
        }
        
        if (input == "clear") {
            counter.clear();
            cout << "统计已清空!" << endl;
            continue;
        }
        
        if (input.substr(0, 4) == "file") {
            if (input.length() > 5) {
                string filename = input.substr(5);
                counter.processFile(filename);
            } else {
                cout << "请指定文件名!" << endl;
            }
            continue;
        }
        
        if (input.substr(0, 4) == "text") {
            if (input.length() > 5) {
                string text = input.substr(5);
                counter.processText(text);
                cout << "文本处理完成!" << endl;
            } else {
                cout << "请指定文本!" << endl;
            }
            continue;
        }
        
        if (input.substr(0, 4) == "show") {
            int limit = 20;
            if (input.length() > 5) {
                try {
                    limit = stoi(input.substr(5));
                } catch (...) {
                    cout << "无效的数量参数!" << endl;
                    continue;
                }
            }
            counter.displayResults(limit);
            continue;
        }
        
        if (input.substr(0, 4) == "save") {
            if (input.length() > 5) {
                string filename = input.substr(5);
                counter.saveResults(filename);
            } else {
                cout << "请指定文件名!" << endl;
            }
            continue;
        }
        
        cout << "未知命令! 输入 'help' 查看帮助" << endl;
    }
    
    return 0;
} 