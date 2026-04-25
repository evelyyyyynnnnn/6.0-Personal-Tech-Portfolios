cmake_minimum_required(VERSION 3.10)
project(SnakeGame)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(snake_game main.cpp)

# Windows特定设置
if(WIN32)
    target_link_libraries(snake_game)
endif() 