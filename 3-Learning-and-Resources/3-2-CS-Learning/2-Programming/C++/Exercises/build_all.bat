@echo off
REM C++ 项目构建脚本 (Windows)
REM 构建所有项目

echo === C++ 项目构建脚本 ===
echo 开始构建所有项目...

REM 检查CMake是否安装
where cmake >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到 cmake，请先安装 CMake
    pause
    exit /b 1
)

REM 检查make是否安装
where make >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到 make，请先安装 Make
    pause
    exit /b 1
)

REM 获取CPU核心数
for /f "tokens=*" %%i in ('wmic cpu get NumberOfCores /value ^| find "="') do set %%i
set CPU_CORES=%NumberOfCores%

if "%CPU_CORES%"=="" set CPU_CORES=4

echo 使用 %CPU_CORES% 个CPU核心进行编译

REM 构建函数
:build_project
set project_dir=%~1
set project_name=%~2

if exist "%project_dir%\CMakeLists.txt" (
    echo 构建项目: %project_name%
    cd /d "%project_dir%"
    
    REM 创建build目录
    if not exist "build" mkdir build
    cd build
    
    REM 运行CMake
    echo   - 运行 CMake...
    cmake .. -DCMAKE_BUILD_TYPE=Release
    
    REM 编译
    echo   - 编译项目...
    make -j%CPU_CORES%
    
    echo   ✓ %project_name% 构建完成
    cd ..\..
) else (
    echo 跳过 %project_name% (未找到 CMakeLists.txt)
)
goto :eof

echo.
echo 构建初级项目...

call :build_project "snake_game" "贪吃蛇游戏"
call :build_project "calculator" "命令行计算器"
call :build_project "word_counter" "词频统计工具"

echo.
echo 构建中级项目...

call :build_project "simple_database" "简单数据库"
call :build_project "chat_room" "聊天室"

echo.
echo 构建高级项目...

call :build_project "game_engine" "游戏引擎模块"
call :build_project "cmake_library" "CMake构建库"

echo.
echo === 构建完成 ===
echo.
echo 注意: WebAssembly 项目需要安装 Emscripten SDK
echo 安装命令:
echo   git clone https://github.com/emscripten-core/emsdk.git
echo   cd emsdk
echo   emsdk install latest
echo   emsdk activate latest
echo   emsdk_env.bat
echo.
echo 所有项目构建完成！
pause 