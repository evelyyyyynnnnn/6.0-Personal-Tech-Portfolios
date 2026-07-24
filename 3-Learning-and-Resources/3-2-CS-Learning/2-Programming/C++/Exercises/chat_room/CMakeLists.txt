cmake_minimum_required(VERSION 3.10)
project(ChatRoom)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 简化版聊天室程序
add_executable(simple_chat simple_chat.cpp)

# 如果需要线程支持
find_package(Threads REQUIRED)
target_link_libraries(simple_chat Threads::Threads) 