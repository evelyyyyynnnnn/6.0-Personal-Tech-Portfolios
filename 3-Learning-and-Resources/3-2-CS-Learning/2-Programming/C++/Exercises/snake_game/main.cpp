#include <iostream>
#include <vector>
#include <ctime>
#include <cstdlib>
#include <chrono>
#include <thread>
#include <termios.h>
#include <unistd.h>
#include <fcntl.h>

using namespace std;

// 游戏区域大小
const int WIDTH = 40;
const int HEIGHT = 20;

// 方向枚举
enum Direction {
    UP, DOWN, LEFT, RIGHT
};

// 坐标结构
struct Position {
    int x, y;
    Position(int x = 0, int y = 0) : x(x), y(y) {}
    bool operator==(const Position& other) const {
        return x == other.x && y == other.y;
    }
};

class SnakeGame {
private:
    vector<Position> snake;
    Position food;
    Direction direction;
    bool gameOver;
    int score;
    
    // 跨平台键盘输入函数
    char getKeyPress() {
        char ch = 0;
        struct termios oldt, newt;
        
        // 获取当前终端设置
        tcgetattr(STDIN_FILENO, &oldt);
        newt = oldt;
        
        // 设置终端为非规范模式
        newt.c_lflag &= ~(ICANON | ECHO);
        tcsetattr(STDIN_FILENO, TCSANOW, &newt);
        
        // 设置非阻塞模式
        int flags = fcntl(STDIN_FILENO, F_GETFL, 0);
        fcntl(STDIN_FILENO, F_SETFL, flags | O_NONBLOCK);
        
        // 读取字符
        if (read(STDIN_FILENO, &ch, 1) > 0) {
            // 读取成功
        }
        
        // 恢复终端设置
        tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
        fcntl(STDIN_FILENO, F_SETFL, flags);
        
        return ch;
    }
    
    // 清屏函数
    void clearScreen() {
        cout << "\033[2J\033[H"; // ANSI 转义序列清屏
    }
    
public:
    SnakeGame() {
        // 初始化蛇的位置
        snake.push_back(Position(WIDTH/2, HEIGHT/2));
        snake.push_back(Position(WIDTH/2-1, HEIGHT/2));
        snake.push_back(Position(WIDTH/2-2, HEIGHT/2));
        
        direction = RIGHT;
        gameOver = false;
        score = 0;
        
        // 生成第一个食物
        generateFood();
        
        // 设置随机种子
        srand(time(0));
    }
    
    void generateFood() {
        do {
            food.x = rand() % WIDTH;
            food.y = rand() % HEIGHT;
        } while (isSnakeBody(food));
    }
    
    bool isSnakeBody(const Position& pos) {
        for (const auto& segment : snake) {
            if (segment == pos) return true;
        }
        return false;
    }
    
    void handleInput() {
        char key = getKeyPress();
        switch (key) {
            case 'w': case 'W': if (direction != DOWN) direction = UP; break;
            case 's': case 'S': if (direction != UP) direction = DOWN; break;
            case 'a': case 'A': if (direction != RIGHT) direction = LEFT; break;
            case 'd': case 'D': if (direction != LEFT) direction = RIGHT; break;
            case 'q': case 'Q': gameOver = true; break;
        }
    }
    
    void update() {
        if (gameOver) return;
        
        Position newHead = snake[0];
        
        // 根据方向移动蛇头
        switch (direction) {
            case UP: newHead.y--; break;
            case DOWN: newHead.y++; break;
            case LEFT: newHead.x--; break;
            case RIGHT: newHead.x++; break;
        }
        
        // 检查边界碰撞
        if (newHead.x < 0 || newHead.x >= WIDTH || 
            newHead.y < 0 || newHead.y >= HEIGHT) {
            gameOver = true;
            return;
        }
        
        // 检查自身碰撞
        if (isSnakeBody(newHead)) {
            gameOver = true;
            return;
        }
        
        // 移动蛇
        snake.insert(snake.begin(), newHead);
        
        // 检查是否吃到食物
        if (newHead == food) {
            score += 10;
            generateFood();
        } else {
            snake.pop_back();
        }
    }
    
    void draw() {
        clearScreen();
        
        // 绘制上边界
        for (int i = 0; i < WIDTH + 2; i++) cout << "#";
        cout << endl;
        
        // 绘制游戏区域
        for (int y = 0; y < HEIGHT; y++) {
            cout << "#";
            for (int x = 0; x < WIDTH; x++) {
                Position pos(x, y);
                bool isSnake = false;
                
                for (size_t i = 0; i < snake.size(); i++) {
                    if (snake[i] == pos) {
                        if (i == 0) cout << "O"; // 蛇头
                        else cout << "o"; // 蛇身
                        isSnake = true;
                        break;
                    }
                }
                
                if (!isSnake) {
                    if (pos == food) cout << "*"; // 食物
                    else cout << " ";
                }
            }
            cout << "#" << endl;
        }
        
        // 绘制下边界
        for (int i = 0; i < WIDTH + 2; i++) cout << "#";
        cout << endl;
        
        // 显示分数
        cout << "Score: " << score << endl;
        cout << "Controls: W/A/S/D to move, Q to quit" << endl;
    }
    
    void run() {
        cout << "=== Snake Game ===" << endl;
        cout << "Press any key to start..." << endl;
        getchar(); // 等待用户按任意键
        
        while (!gameOver) {
            handleInput();
            update();
            draw();
            this_thread::sleep_for(chrono::milliseconds(100)); // 控制游戏速度
        }
        
        cout << "\nGame Over! Final Score: " << score << endl;
    }
    
    bool isGameOver() const { return gameOver; }
    int getScore() const { return score; }
};

int main() {
    SnakeGame game;
    game.run();
    
    return 0;
} 