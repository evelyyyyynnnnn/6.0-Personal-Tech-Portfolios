#!/bin/bash

# C++ 项目构建脚本
# 构建所有项目

set -e  # 遇到错误时退出

echo "=== C++ 项目构建脚本 ==="
echo "开始构建所有项目..."

# 检查CMake是否安装
if ! command -v cmake &> /dev/null; then
    echo "错误: 未找到 cmake，请先安装 CMake"
    exit 1
fi

# 检查make是否安装
if ! command -v make &> /dev/null; then
    echo "错误: 未找到 make，请先安装 Make"
    exit 1
fi

# 获取CPU核心数
CPU_CORES=$(nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo 4)

# 构建函数
build_project() {
    local project_dir=$1
    local project_name=$2
    
    if [ -f "$project_dir/CMakeLists.txt" ]; then
        echo "构建项目: $project_name"
        cd "$project_dir"
        
        # 创建build目录
        mkdir -p build
        cd build
        
        # 运行CMake
        echo "  - 运行 CMake..."
        cmake .. -DCMAKE_BUILD_TYPE=Release
        
        # 编译
        echo "  - 编译项目..."
        make -j$CPU_CORES
        
        echo "  ✓ $project_name 构建完成"
        cd ../..
    else
        echo "跳过 $project_name (未找到 CMakeLists.txt)"
    fi
}

# 构建所有项目
echo ""
echo "构建初级项目..."

build_project "snake_game" "贪吃蛇游戏"
build_project "calculator" "命令行计算器"
build_project "word_counter" "词频统计工具"

echo ""
echo "构建中级项目..."

build_project "simple_database" "简单数据库"
build_project "chat_room" "聊天室"

echo ""
echo "构建高级项目..."

build_project "game_engine" "游戏引擎模块"
build_project "cmake_library" "CMake构建库"

echo ""
echo "=== 构建完成 ==="
echo ""
echo "注意: WebAssembly 项目需要安装 Emscripten SDK"
echo "安装命令:"
echo "  git clone https://github.com/emscripten-core/emsdk.git"
echo "  cd emsdk"
echo "  ./emsdk install latest"
echo "  ./emsdk activate latest"
echo "  source ./emsdk_env.sh"
echo ""
echo "所有项目构建完成！" 