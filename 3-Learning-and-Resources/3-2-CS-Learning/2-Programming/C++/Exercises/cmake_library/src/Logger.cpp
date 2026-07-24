#include "UtilityLibrary.h"
#include <fstream>
#include <iostream>
#include <sstream>
#include <iomanip>
#include <chrono>

namespace UtilityLibrary {

Logger::Logger(const std::string& filename) 
    : logFile(filename), minLevel(LogLevel::INFO), consoleOutput(true), fileOutput(true) {
}

Logger::~Logger() {
}

void Logger::SetLogLevel(LogLevel level) {
    minLevel = level;
}

void Logger::SetConsoleOutput(bool enable) {
    consoleOutput = enable;
}

void Logger::SetFileOutput(bool enable) {
    fileOutput = enable;
}

void Logger::Log(LogLevel level, const std::string& message) {
    if (level < minLevel) return;
    
    std::string timestamp = GetTimestamp();
    std::string levelStr = GetLevelString(level);
    std::string logMessage = timestamp + " [" + levelStr + "] " + message;
    
    if (consoleOutput) {
        std::cout << logMessage << std::endl;
    }
    
    if (fileOutput) {
        std::ofstream file(logFile, std::ios::app);
        if (file.is_open()) {
            file << logMessage << std::endl;
            file.close();
        }
    }
}

void Logger::Debug(const std::string& message) {
    Log(LogLevel::DEBUG, message);
}

void Logger::Info(const std::string& message) {
    Log(LogLevel::INFO, message);
}

void Logger::Warning(const std::string& message) {
    Log(LogLevel::WARNING, message);
}

void Logger::Error(const std::string& message) {
    Log(LogLevel::ERROR, message);
}

void Logger::Fatal(const std::string& message) {
    Log(LogLevel::FATAL, message);
}

std::string Logger::GetLevelString(LogLevel level) {
    switch (level) {
        case LogLevel::DEBUG:   return "DEBUG";
        case LogLevel::INFO:    return "INFO";
        case LogLevel::WARNING: return "WARNING";
        case LogLevel::ERROR:   return "ERROR";
        case LogLevel::FATAL:   return "FATAL";
        default:                return "UNKNOWN";
    }
}

std::string Logger::GetTimestamp() {
    auto now = std::chrono::system_clock::now();
    auto time_t = std::chrono::system_clock::to_time_t(now);
    auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(
        now.time_since_epoch()) % 1000;
    
    std::stringstream ss;
    ss << std::put_time(std::localtime(&time_t), "%Y-%m-%d %H:%M:%S");
    ss << '.' << std::setfill('0') << std::setw(3) << ms.count();
    
    return ss.str();
}

} // namespace UtilityLibrary 