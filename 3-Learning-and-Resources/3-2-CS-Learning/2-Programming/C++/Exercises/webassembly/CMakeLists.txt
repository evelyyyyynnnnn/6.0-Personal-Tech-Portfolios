cmake_minimum_required(VERSION 3.10)
project(WebAssembly)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 设置 Emscripten 特定选项
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s WASM=1 -s EXPORTED_FUNCTIONS='[\"_add\", \"_subtract\", \"_multiply\", \"_divide\", \"_power\", \"_sqrt\", \"_reverseString\", \"_toUpperCase\", \"_toLowerCase\", \"_countWords\", \"_createImage\", \"_setPixel\", \"_getPixel\", \"_invertImage\", \"_thresholdImage\", \"_getImageWidth\", \"_getImageHeight\"]' -s EXPORTED_RUNTIME_METHODS='[\"ccall\", \"cwrap\"]'")

# 添加源文件
set(SOURCES src/main.cpp)

# 创建可执行文件
add_executable(webassembly_module ${SOURCES})

# 设置输出名称
set_target_properties(webassembly_module PROPERTIES OUTPUT_NAME "webassembly_module")

# 设置 Emscripten 链接选项
target_link_options(webassembly_module PRIVATE
    -s WASM=1
    -s EXPORTED_FUNCTIONS='["_add", "_subtract", "_multiply", "_divide", "_power", "_sqrt", "_reverseString", "_toUpperCase", "_toLowerCase", "_countWords", "_createImage", "_setPixel", "_getPixel", "_invertImage", "_thresholdImage", "_getImageWidth", "_getImageHeight"]'
    -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
    -s ALLOW_MEMORY_GROWTH=1
    -s MODULARIZE=1
    -s EXPORT_NAME='WebAssemblyModule'
) 