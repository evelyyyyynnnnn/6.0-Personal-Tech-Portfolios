cmake_minimum_required(VERSION 3.10)
project(UtilityLibrary VERSION 1.0.0 LANGUAGES CXX)

# 设置C++标准
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 设置输出目录
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)

# 设置编译选项
if(MSVC)
    add_compile_options(/W4)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# 定义库的导出宏
add_definitions(-DUTILITYLIBRARY_EXPORTS)

# 收集源文件
file(GLOB_RECURSE SOURCES "src/*.cpp")
file(GLOB_RECURSE HEADERS "include/*.h")

# 创建库目标
add_library(utility_library SHARED ${SOURCES} ${HEADERS})

# 设置包含目录
target_include_directories(utility_library
    PUBLIC
        $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
        $<INSTALL_INTERFACE:include>
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/src
)

# 设置库的属性
set_target_properties(utility_library PROPERTIES
    VERSION ${PROJECT_VERSION}
    SOVERSION ${PROJECT_VERSION_MAJOR}
    PUBLIC_HEADER "${HEADERS}"
    DEFINE_SYMBOL UTILITYLIBRARY_EXPORTS
)

# 设置库的输出名称
set_target_properties(utility_library PROPERTIES
    OUTPUT_NAME "utility_library"
    PREFIX ""
)

# 创建静态库版本
add_library(utility_library_static STATIC ${SOURCES})
target_include_directories(utility_library_static
    PUBLIC
        $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
        $<INSTALL_INTERFACE:include>
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/src
)

set_target_properties(utility_library_static PROPERTIES
    VERSION ${PROJECT_VERSION}
    OUTPUT_NAME "utility_library"
    PREFIX ""
)

# 创建示例程序
add_executable(example examples/example.cpp)
target_link_libraries(example utility_library)

# 创建测试程序
enable_testing()
add_executable(unit_tests tests/unit_tests.cpp)
target_link_libraries(unit_tests utility_library)

# 添加测试
add_test(NAME UnitTests COMMAND unit_tests)

# 安装规则
include(GNUInstallDirs)

install(TARGETS utility_library utility_library_static
    EXPORT UtilityLibraryTargets
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
    ARCHIVE DESTINATION ${CMAKE_INSTALL_LIBDIR}
    RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
    PUBLIC_HEADER DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}/utility_library
)

# 安装头文件
install(DIRECTORY include/
    DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}/utility_library
    FILES_MATCHING PATTERN "*.h"
)

# 导出目标
install(EXPORT UtilityLibraryTargets
    FILE UtilityLibraryTargets.cmake
    NAMESPACE UtilityLibrary::
    DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/UtilityLibrary
)

# 创建配置文件
include(CMakePackageConfigHelpers)
write_basic_package_version_file(
    "${CMAKE_CURRENT_BINARY_DIR}/UtilityLibraryConfigVersion.cmake"
    VERSION ${PROJECT_VERSION}
    COMPATIBILITY AnyNewerVersion
)

configure_package_config_file(
    "${CMAKE_CURRENT_SOURCE_DIR}/cmake/UtilityLibraryConfig.cmake.in"
    "${CMAKE_CURRENT_BINARY_DIR}/UtilityLibraryConfig.cmake"
    INSTALL_DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/UtilityLibrary
)

install(FILES
    "${CMAKE_CURRENT_BINARY_DIR}/UtilityLibraryConfig.cmake"
    "${CMAKE_CURRENT_BINARY_DIR}/UtilityLibraryConfigVersion.cmake"
    DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/UtilityLibrary
)

# 创建pkg-config文件
configure_file(
    "${CMAKE_CURRENT_SOURCE_DIR}/utility_library.pc.in"
    "${CMAKE_CURRENT_BINARY_DIR}/utility_library.pc"
    @ONLY
)

install(FILES
    "${CMAKE_CURRENT_BINARY_DIR}/utility_library.pc"
    DESTINATION ${CMAKE_INSTALL_LIBDIR}/pkgconfig
)

# 设置包信息
set(CPACK_PACKAGE_NAME "UtilityLibrary")
set(CPACK_PACKAGE_VERSION ${PROJECT_VERSION})
set(CPACK_PACKAGE_DESCRIPTION_SUMMARY "A comprehensive C++ utility library")
set(CPACK_PACKAGE_VENDOR "Your Organization")
set(CPACK_PACKAGE_CONTACT "your.email@example.com")

if(WIN32)
    set(CPACK_GENERATOR "NSIS;ZIP")
else()
    set(CPACK_GENERATOR "DEB;RPM;TGZ")
endif()

include(CPack) 