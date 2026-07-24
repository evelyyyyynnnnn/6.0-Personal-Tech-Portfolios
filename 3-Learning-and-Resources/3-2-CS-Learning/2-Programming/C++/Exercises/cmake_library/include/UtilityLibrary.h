#pragma once

#include <string>
#include <vector>
#include <memory>
#include <functional>
#include <chrono>

#ifdef _WIN32
    #ifdef UTILITYLIBRARY_EXPORTS
        #define UTILITYLIBRARY_API __declspec(dllexport)
    #else
        #define UTILITYLIBRARY_API __declspec(dllimport)
    #endif
#else
    #define UTILITYLIBRARY_API __attribute__((visibility("default")))
#endif

namespace UtilityLibrary {

// 日志级别枚举
enum class LogLevel {
    DEBUG,
    INFO,
    WARNING,
    ERROR,
    FATAL
};

// 日志管理器
class UTILITYLIBRARY_API Logger {
private:
    std::string logFile;
    LogLevel minLevel;
    bool consoleOutput;
    bool fileOutput;

public:
    Logger(const std::string& filename = "app.log");
    ~Logger();
    
    void SetLogLevel(LogLevel level);
    void SetConsoleOutput(bool enable);
    void SetFileOutput(bool enable);
    
    void Log(LogLevel level, const std::string& message);
    void Debug(const std::string& message);
    void Info(const std::string& message);
    void Warning(const std::string& message);
    void Error(const std::string& message);
    void Fatal(const std::string& message);
    
private:
    std::string GetLevelString(LogLevel level);
    std::string GetTimestamp();
};

// 配置管理器
class UTILITYLIBRARY_API ConfigManager {
private:
    std::string configFile;
    std::unordered_map<std::string, std::string> settings;

public:
    ConfigManager(const std::string& filename = "config.ini");
    ~ConfigManager();
    
    bool LoadConfig();
    bool SaveConfig();
    
    void SetValue(const std::string& key, const std::string& value);
    std::string GetValue(const std::string& key, const std::string& defaultValue = "");
    
    template<typename T>
    T GetValue(const std::string& key, const T& defaultValue = T()) {
        std::string value = GetValue(key);
        if (value.empty()) return defaultValue;
        
        if constexpr (std::is_same_v<T, int>) {
            return std::stoi(value);
        } else if constexpr (std::is_same_v<T, double>) {
            return std::stod(value);
        } else if constexpr (std::is_same_v<T, bool>) {
            return (value == "true" || value == "1");
        } else {
            return static_cast<T>(value);
        }
    }
    
    bool HasKey(const std::string& key) const;
    void RemoveKey(const std::string& key);
    void Clear();
    
    std::vector<std::string> GetKeys() const;
};

// 文件工具类
class UTILITYLIBRARY_API FileUtils {
public:
    static bool Exists(const std::string& path);
    static bool IsDirectory(const std::string& path);
    static bool IsFile(const std::string& path);
    
    static std::string GetExtension(const std::string& path);
    static std::string GetFileName(const std::string& path);
    static std::string GetDirectory(const std::string& path);
    
    static bool CreateDirectory(const std::string& path);
    static bool DeleteFile(const std::string& path);
    static bool CopyFile(const std::string& source, const std::string& destination);
    
    static std::vector<std::string> ListFiles(const std::string& directory, const std::string& pattern = "*");
    static std::vector<std::string> ListDirectories(const std::string& directory);
    
    static size_t GetFileSize(const std::string& path);
    static std::string ReadTextFile(const std::string& path);
    static bool WriteTextFile(const std::string& path, const std::string& content);
    
    static std::vector<uint8_t> ReadBinaryFile(const std::string& path);
    static bool WriteBinaryFile(const std::string& path, const std::vector<uint8_t>& data);
};

// 字符串工具类
class UTILITYLIBRARY_API StringUtils {
public:
    static std::vector<std::string> Split(const std::string& str, const std::string& delimiter);
    static std::string Join(const std::vector<std::string>& strings, const std::string& delimiter);
    
    static std::string Trim(const std::string& str);
    static std::string TrimLeft(const std::string& str);
    static std::string TrimRight(const std::string& str);
    
    static std::string ToUpper(const std::string& str);
    static std::string ToLower(const std::string& str);
    
    static bool StartsWith(const std::string& str, const std::string& prefix);
    static bool EndsWith(const std::string& str, const std::string& suffix);
    
    static std::string Replace(const std::string& str, const std::string& from, const std::string& to);
    static std::string ReplaceAll(const std::string& str, const std::string& from, const std::string& to);
    
    static bool IsNumeric(const std::string& str);
    static bool IsAlpha(const std::string& str);
    static bool IsAlphaNumeric(const std::string& str);
    
    static std::string Format(const std::string& format, ...);
    static std::string FormatV(const std::string& format, va_list args);
};

// 时间工具类
class UTILITYLIBRARY_API TimeUtils {
public:
    static std::string GetCurrentTime();
    static std::string GetCurrentDate();
    static std::string GetCurrentDateTime();
    
    static std::chrono::system_clock::time_point Now();
    static double GetTimestamp();
    
    static std::string FormatTime(const std::chrono::system_clock::time_point& time, const std::string& format = "%Y-%m-%d %H:%M:%S");
    static std::chrono::system_clock::time_point ParseTime(const std::string& timeStr, const std::string& format = "%Y-%m-%d %H:%M:%S");
    
    static void Sleep(int milliseconds);
    static void SleepSeconds(double seconds);
};

// 数学工具类
class UTILITYLIBRARY_API MathUtils {
public:
    static constexpr double PI = 3.14159265358979323846;
    static constexpr double E = 2.71828182845904523536;
    
    static double Abs(double value);
    static double Sqrt(double value);
    static double Pow(double base, double exponent);
    static double Exp(double value);
    static double Log(double value);
    static double Log10(double value);
    
    static double Sin(double angle);
    static double Cos(double angle);
    static double Tan(double angle);
    static double Asin(double value);
    static double Acos(double value);
    static double Atan(double value);
    static double Atan2(double y, double x);
    
    static double Min(double a, double b);
    static double Max(double a, double b);
    static double Clamp(double value, double min, double max);
    static double Lerp(double a, double b, double t);
    
    static bool IsNaN(double value);
    static bool IsInf(double value);
    static bool IsFinite(double value);
    
    static int Random(int min, int max);
    static double Random(double min, double max);
    static void SetRandomSeed(unsigned int seed);
};

// 加密工具类
class UTILITYLIBRARY_API CryptoUtils {
public:
    static std::string MD5(const std::string& input);
    static std::string SHA1(const std::string& input);
    static std::string SHA256(const std::string& input);
    
    static std::string Base64Encode(const std::string& input);
    static std::string Base64Decode(const std::string& input);
    
    static std::string Encrypt(const std::string& input, const std::string& key);
    static std::string Decrypt(const std::string& input, const std::string& key);
    
    static std::string GenerateRandomString(int length);
    static std::string GenerateUUID();
};

// 网络工具类
class UTILITYLIBRARY_API NetworkUtils {
public:
    static bool IsValidIP(const std::string& ip);
    static bool IsValidPort(int port);
    
    static std::string GetLocalIP();
    static std::string GetHostname();
    
    static bool Ping(const std::string& host, int timeout = 5000);
    static bool IsPortOpen(const std::string& host, int port, int timeout = 5000);
    
    static std::string DownloadFile(const std::string& url, const std::string& destination);
    static std::string DownloadText(const std::string& url);
    
    static bool UploadFile(const std::string& url, const std::string& filePath);
    static std::string PostData(const std::string& url, const std::string& data);
};

// 线程池
class UTILITYLIBRARY_API ThreadPool {
private:
    std::vector<std::thread> workers;
    std::queue<std::function<void()>> tasks;
    std::mutex queueMutex;
    std::condition_variable condition;
    bool stop;

public:
    ThreadPool(size_t threads);
    ~ThreadPool();
    
    template<class F, class... Args>
    auto Enqueue(F&& f, Args&&... args) -> std::future<typename std::result_of<F(Args...)>::type> {
        using return_type = typename std::result_of<F(Args...)>::type;
        
        auto task = std::make_shared<std::packaged_task<return_type()>>(
            std::bind(std::forward<F>(f), std::forward<Args>(args)...)
        );
        
        std::future<return_type> res = task->get_future();
        {
            std::unique_lock<std::mutex> lock(queueMutex);
            if (stop) {
                throw std::runtime_error("enqueue on stopped ThreadPool");
            }
            tasks.emplace([task](){ (*task)(); });
        }
        condition.notify_one();
        return res;
    }
    
    void Stop();
    size_t GetThreadCount() const;
    size_t GetQueueSize() const;
};

// 单例基类
template<typename T>
class Singleton {
protected:
    Singleton() = default;
    virtual ~Singleton() = default;
    
public:
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
    
    static T& GetInstance() {
        static T instance;
        return instance;
    }
};

} // namespace UtilityLibrary 