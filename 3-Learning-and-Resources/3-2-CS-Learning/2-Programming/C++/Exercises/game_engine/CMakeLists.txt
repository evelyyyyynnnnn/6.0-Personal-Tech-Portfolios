cmake_minimum_required(VERSION 3.10)
project(GameEngine)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 设置包含目录
include_directories(include)

# 收集源文件
file(GLOB_RECURSE SOURCES "src/*.cpp")

# 创建库
add_library(game_engine STATIC ${SOURCES})

# 设置库的属性
set_target_properties(game_engine PROPERTIES
    VERSION 1.0.0
    SOVERSION 1
)

# 安装规则
install(TARGETS game_engine
    LIBRARY DESTINATION lib
    ARCHIVE DESTINATION lib
    RUNTIME DESTINATION bin
)

install(DIRECTORY include/ DESTINATION include) 