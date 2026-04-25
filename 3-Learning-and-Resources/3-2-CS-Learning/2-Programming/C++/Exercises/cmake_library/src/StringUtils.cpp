#include "UtilityLibrary.h"
#include <algorithm>
#include <cctype>
#include <sstream>
#include <cstdarg>

namespace UtilityLibrary {

std::vector<std::string> StringUtils::Split(const std::string& str, const std::string& delimiter) {
    std::vector<std::string> result;
    size_t start = 0;
    size_t end = str.find(delimiter);
    
    while (end != std::string::npos) {
        result.push_back(str.substr(start, end - start));
        start = end + delimiter.length();
        end = str.find(delimiter, start);
    }
    
    result.push_back(str.substr(start));
    return result;
}

std::string StringUtils::Join(const std::vector<std::string>& strings, const std::string& delimiter) {
    if (strings.empty()) return "";
    
    std::string result = strings[0];
    for (size_t i = 1; i < strings.size(); ++i) {
        result += delimiter + strings[i];
    }
    
    return result;
}

std::string StringUtils::Trim(const std::string& str) {
    return TrimLeft(TrimRight(str));
}

std::string StringUtils::TrimLeft(const std::string& str) {
    size_t start = str.find_first_not_of(" \t\n\r");
    return (start == std::string::npos) ? "" : str.substr(start);
}

std::string StringUtils::TrimRight(const std::string& str) {
    size_t end = str.find_last_not_of(" \t\n\r");
    return (end == std::string::npos) ? "" : str.substr(0, end + 1);
}

std::string StringUtils::ToUpper(const std::string& str) {
    std::string result = str;
    std::transform(result.begin(), result.end(), result.begin(), ::toupper);
    return result;
}

std::string StringUtils::ToLower(const std::string& str) {
    std::string result = str;
    std::transform(result.begin(), result.end(), result.begin(), ::tolower);
    return result;
}

bool StringUtils::StartsWith(const std::string& str, const std::string& prefix) {
    if (prefix.length() > str.length()) return false;
    return str.compare(0, prefix.length(), prefix) == 0;
}

bool StringUtils::EndsWith(const std::string& str, const std::string& suffix) {
    if (suffix.length() > str.length()) return false;
    return str.compare(str.length() - suffix.length(), suffix.length(), suffix) == 0;
}

std::string StringUtils::Replace(const std::string& str, const std::string& from, const std::string& to) {
    std::string result = str;
    size_t pos = result.find(from);
    if (pos != std::string::npos) {
        result.replace(pos, from.length(), to);
    }
    return result;
}

std::string StringUtils::ReplaceAll(const std::string& str, const std::string& from, const std::string& to) {
    std::string result = str;
    size_t pos = 0;
    while ((pos = result.find(from, pos)) != std::string::npos) {
        result.replace(pos, from.length(), to);
        pos += to.length();
    }
    return result;
}

bool StringUtils::IsNumeric(const std::string& str) {
    if (str.empty()) return false;
    
    bool hasDigit = false;
    bool hasDot = false;
    
    for (char c : str) {
        if (std::isdigit(c)) {
            hasDigit = true;
        } else if (c == '.' && !hasDot) {
            hasDot = true;
        } else if (c == '-' || c == '+') {
            // 允许在开头有符号
        } else {
            return false;
        }
    }
    
    return hasDigit;
}

bool StringUtils::IsAlpha(const std::string& str) {
    if (str.empty()) return false;
    
    for (char c : str) {
        if (!std::isalpha(c)) {
            return false;
        }
    }
    
    return true;
}

bool StringUtils::IsAlphaNumeric(const std::string& str) {
    if (str.empty()) return false;
    
    for (char c : str) {
        if (!std::isalnum(c)) {
            return false;
        }
    }
    
    return true;
}

std::string StringUtils::Format(const std::string& format, ...) {
    va_list args;
    va_start(args, format);
    std::string result = FormatV(format, args);
    va_end(args);
    return result;
}

std::string StringUtils::FormatV(const std::string& format, va_list args) {
    // 简单的格式化实现，支持 %s, %d, %f
    std::string result;
    std::string currentFormat;
    bool inFormat = false;
    
    for (char c : format) {
        if (c == '%' && !inFormat) {
            inFormat = true;
            currentFormat = "%";
        } else if (inFormat) {
            currentFormat += c;
            
            if (c == 's') {
                const char* str = va_arg(args, const char*);
                result += str;
                inFormat = false;
            } else if (c == 'd') {
                int value = va_arg(args, int);
                result += std::to_string(value);
                inFormat = false;
            } else if (c == 'f') {
                double value = va_arg(args, double);
                result += std::to_string(value);
                inFormat = false;
            } else if (c == '%') {
                result += '%';
                inFormat = false;
            }
        } else {
            if (inFormat) {
                result += currentFormat;
                inFormat = false;
            }
            result += c;
        }
    }
    
    if (inFormat) {
        result += currentFormat;
    }
    
    return result;
}

} // namespace UtilityLibrary 