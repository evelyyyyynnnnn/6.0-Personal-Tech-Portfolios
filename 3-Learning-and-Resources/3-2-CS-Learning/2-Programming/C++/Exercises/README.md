# C++ 项目练习集

这是一个包含从初级到高级的C++项目集合，涵盖了不同难度和技术领域的项目。

## 项目结构

### 初级项目 (Beginner)

#### 1. 贪吃蛇游戏 (snake_game)
- **技术关键词**: 控制台应用、文件读写
- **功能**: 经典的贪吃蛇游戏，支持键盘控制
- **构建**: `cd snake_game && mkdir build && cd build && cmake .. && make `

#### 2. 命令行计算器 (calculator)
- **技术关键词**: 控制台应用、文件读写
- **功能**: 支持基本数学运算的命令行计算器
- **构建**: `cd calculator && mkdir build && cd build && cmake .. && make && ls -la && ./calculator`

#### 3. 词频统计工具 (word_counter)
- **技术关键词**: 控制台应用、文件读写
- **功能**: 分析文本文件中的词频统计
- **构建**: `cd word_counter && mkdir build && cd build && cmake .. && make`

### 中级项目 (Intermediate)

#### 4. 简单数据库 (simple_database)
- **技术关键词**: 多线程、文件读写
- **功能**: 简单的CSV格式数据库管理系统
- **构建**: `cd simple_database && mkdir build && cd build && cmake .. && make`

#### 5. 聊天室 (chat_room)
- **技术关键词**: Socket、多线程、GUI
- **功能**: 基于Socket的多人聊天室，包含服务器和客户端
- **构建**: `cd chat_room && mkdir build && cd build && cmake .. && make && ls -la && ./simple_chat`
- **介绍**： 
    - 实时时间戳：每条消息都有时间戳
    - 用户管理：支持自定义用户名
    - 消息历史：保持最近50条消息
    - 实时更新：每秒刷新显示
    - 优雅退出：输入 'quit' 或 'exit' 退出

### 高级项目 (Advanced)

#### 6. 游戏引擎模块 (game_engine)
- **技术关键词**: 跨平台、库设计
- **功能**: 模块化的游戏引擎框架
- **构建**: `cd game_engine && mkdir build && cd build && cmake .. && make`

#### 7. WebAssembly 项目 (webassembly)
- **技术关键词**: 跨平台、构建系统
- **功能**: 可编译为WebAssembly的C++模块
- **构建**: 需要安装Emscripten SDK

#### 8. CMake 构建库 (cmake_library)
- **技术关键词**: 构建系统、库设计
- **功能**: 完整的C++工具库，包含CMake构建系统
- **构建**: `cd cmake_library && mkdir build && cd build && cmake .. && make`

## 构建要求

### 基本要求
- C++17 兼容的编译器 (GCC 7+, Clang 5+, MSVC 2017+)
- CMake 3.10 或更高版本
- Make 或 Ninja 构建工具

### 平台特定要求

#### Windows
- Visual Studio 2017 或更高版本
- 或 MinGW-w64
- Windows SDK (用于聊天室项目)

#### Linux
- GCC 或 Clang
- 开发工具包: `sudo apt-get install build-essential`

#### macOS
- Xcode Command Line Tools
- 或 Homebrew: `brew install cmake`

### 特殊依赖

#### WebAssembly 项目
需要安装 Emscripten SDK:
```bash
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
```

## 构建说明

### 构建所有项目
```bash
# 克隆项目
git clone <repository-url>
cd Exercise

# 构建所有项目
for dir in */; do
    if [ -f "$dir/CMakeLists.txt" ]; then
        echo "Building $dir"
        cd "$dir"
        mkdir -p build
        cd build
        cmake ..
        make -j$(nproc)
        cd ../..
    fi
done
```

### 构建单个项目
```bash
# 例如构建贪吃蛇游戏
cd snake_game
mkdir build
cd build
cmake ..
make
```

## 运行说明

### 贪吃蛇游戏
```bash
cd snake_game/build
./snake_game
```
控制: W/A/S/D 移动，Q 退出

### 计算器
```bash
cd calculator/build
./calculator
```
支持: +, -, *, /, ^, % 运算

### 词频统计工具
```bash
cd word_counter/build
./word_counter
```
命令: `file <文件名>`, `text <文本>`, `show [数量]`, `save <文件名>`

### 简单数据库
```bash
cd simple_database/build
./simple_database
```
命令: `add <姓名> <邮箱> <年龄>`, `list`, `find <ID>`, `delete <ID>`

### 聊天室
```bash
# 启动服务器
cd chat_room/build
./chat_server

# 启动客户端 (新终端)
./chat_client
```

### 游戏引擎
```bash
cd game_engine/build
cmake ..
make   
g++ -std=c++17 -Iinclude -Lbuild -lgame_engine test_game_engine.cpp -o test_game_engine
./test_game_engine
# 清理产物： rm -rf build test_game_engine
```

### WebAssembly
```bash
cd webassembly
mkdir build
cd build
emcmake cmake ..
emmake make
```

### CMake 构建库
```bash
cd cmake_library
mkdir build
cd build
cmake ..
make
make install  # 安装库
```

## 项目特点

### 初级项目特点
- 控制台应用程序
- 基本的文件I/O操作
- 简单的数据结构和算法
- 适合C++初学者

### 中级项目特点
- 多线程编程
- 网络编程 (Socket)
- 简单的数据库操作
- 面向对象设计

### 高级项目特点
- 跨平台开发
- 库设计和API设计
- 现代C++特性
- 构建系统配置
- 模块化架构

## 学习建议

1. **循序渐进**: 从初级项目开始，逐步提升到高级项目
2. **理解原理**: 不仅要会使用，更要理解背后的原理
3. **实践改进**: 尝试对项目进行改进和扩展
4. **代码审查**: 学习良好的代码组织和设计模式
5. **文档阅读**: 阅读相关技术文档和标准

## 贡献指南

欢迎提交改进建议和bug报告！

## 许可证

本项目采用 MIT 许可证。 