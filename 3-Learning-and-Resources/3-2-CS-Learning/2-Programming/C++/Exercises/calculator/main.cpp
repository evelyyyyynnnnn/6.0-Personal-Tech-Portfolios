#include <iostream>
#include <string>
#include <sstream>
#include <cmath>
#include <map>
#include <functional>

using namespace std;

class Calculator {
private:
    map<string, function<double(double, double)>> operations;
    
public:
    Calculator() {
        // 初始化基本运算
        operations["+"] = [](double a, double b) { return a + b; };
        operations["-"] = [](double a, double b) { return a - b; };
        operations["*"] = [](double a, double b) { return a * b; };
        operations["/"] = [](double a, double b) { 
            if (b == 0) throw runtime_error("除数不能为零");
            return a / b; 
        };
        operations["^"] = [](double a, double b) { return pow(a, b); };
        operations["%"] = [](double a, double b) { 
            if (b == 0) throw runtime_error("除数不能为零");
            return fmod(a, b); 
        };
    }
    
    double calculate(double a, const string& op, double b) {
        auto it = operations.find(op);
        if (it == operations.end()) {
            throw runtime_error("不支持的运算符: " + op);
        }
        return it->second(a, b);
    }
    
    void showHelp() {
        cout << "=== 命令行计算器 ===" << endl;
        cout << "支持的运算:" << endl;
        cout << "  + : 加法" << endl;
        cout << "  - : 减法" << endl;
        cout << "  * : 乘法" << endl;
        cout << "  / : 除法" << endl;
        cout << "  ^ : 幂运算" << endl;
        cout << "  % : 取余" << endl;
        cout << "命令:" << endl;
        cout << "  help : 显示帮助" << endl;
        cout << "  quit : 退出程序" << endl;
        cout << "  clear : 清屏" << endl;
        cout << "格式: 数字 运算符 数字" << endl;
        cout << "示例: 5 + 3" << endl;
        cout << "==================" << endl;
    }
    
    void run() {
        showHelp();
        
        string input;
        while (true) {
            cout << "\n请输入计算表达式 (或输入 'quit' 退出): ";
            getline(cin, input);
            
            if (input == "quit" || input == "exit") {
                cout << "再见!" << endl;
                break;
            }
            
            if (input == "help") {
                showHelp();
                continue;
            }
            
            if (input == "clear") {
                system("cls");
                showHelp();
                continue;
            }
            
            try {
                stringstream ss(input);
                double a, b;
                string op;
                
                if (ss >> a >> op >> b) {
                    double result = calculate(a, op, b);
                    cout << "结果: " << a << " " << op << " " << b << " = " << result << endl;
                } else {
                    cout << "输入格式错误! 请使用格式: 数字 运算符 数字" << endl;
                }
            } catch (const exception& e) {
                cout << "错误: " << e.what() << endl;
            }
        }
    }
};

int main() {
    Calculator calc;
    calc.run();
    return 0;
} 