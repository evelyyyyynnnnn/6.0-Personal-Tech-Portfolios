#include <emscripten.h>
#include <emscripten/bind.h>
#include <vector>
#include <string>
#include <memory>
#include <functional>

using namespace std;

// 数学计算类
class MathCalculator {
private:
    vector<double> history;
    
public:
    double add(double a, double b) {
        double result = a + b;
        history.push_back(result);
        return result;
    }
    
    double subtract(double a, double b) {
        double result = a - b;
        history.push_back(result);
        return result;
    }
    
    double multiply(double a, double b) {
        double result = a * b;
        history.push_back(result);
        return result;
    }
    
    double divide(double a, double b) {
        if (b == 0) {
            return 0; // 错误处理
        }
        double result = a / b;
        history.push_back(result);
        return result;
    }
    
    double power(double base, double exponent) {
        double result = pow(base, exponent);
        history.push_back(result);
        return result;
    }
    
    double sqrt(double value) {
        if (value < 0) {
            return 0; // 错误处理
        }
        double result = sqrt(value);
        history.push_back(result);
        return result;
    }
    
    vector<double> getHistory() const {
        return history;
    }
    
    void clearHistory() {
        history.clear();
    }
    
    int getHistorySize() const {
        return history.size();
    }
};

// 字符串处理类
class StringProcessor {
public:
    string reverse(const string& input) {
        string result = input;
        reverse(result.begin(), result.end());
        return result;
    }
    
    string toUpperCase(const string& input) {
        string result = input;
        transform(result.begin(), result.end(), result.begin(), ::toupper);
        return result;
    }
    
    string toLowerCase(const string& input) {
        string result = input;
        transform(result.begin(), result.end(), result.begin(), ::tolower);
        return result;
    }
    
    int countWords(const string& input) {
        if (input.empty()) return 0;
        
        int count = 0;
        bool inWord = false;
        
        for (char c : input) {
            if (isalpha(c)) {
                if (!inWord) {
                    count++;
                    inWord = true;
                }
            } else {
                inWord = false;
            }
        }
        
        return count;
    }
    
    vector<string> split(const string& input, const string& delimiter) {
        vector<string> result;
        size_t start = 0;
        size_t end = input.find(delimiter);
        
        while (end != string::npos) {
            result.push_back(input.substr(start, end - start));
            start = end + delimiter.length();
            end = input.find(delimiter, start);
        }
        
        result.push_back(input.substr(start));
        return result;
    }
};

// 数组处理类
class ArrayProcessor {
public:
    vector<int> sort(const vector<int>& input) {
        vector<int> result = input;
        sort(result.begin(), result.end());
        return result;
    }
    
    vector<int> reverse(const vector<int>& input) {
        vector<int> result = input;
        reverse(result.begin(), result.end());
        return result;
    }
    
    int sum(const vector<int>& input) {
        int total = 0;
        for (int value : input) {
            total += value;
        }
        return total;
    }
    
    double average(const vector<int>& input) {
        if (input.empty()) return 0.0;
        
        int total = sum(input);
        return static_cast<double>(total) / input.size();
    }
    
    int max(const vector<int>& input) {
        if (input.empty()) return 0;
        return *max_element(input.begin(), input.end());
    }
    
    int min(const vector<int>& input) {
        if (input.empty()) return 0;
        return *min_element(input.begin(), input.end());
    }
    
    vector<int> filter(const vector<int>& input, int threshold) {
        vector<int> result;
        for (int value : input) {
            if (value > threshold) {
                result.push_back(value);
            }
        }
        return result;
    }
};

// 图像处理类（模拟）
class ImageProcessor {
private:
    vector<vector<int>> image;
    int width, height;
    
public:
    ImageProcessor(int w, int h) : width(w), height(h) {
        image.resize(height, vector<int>(width, 0));
    }
    
    void setPixel(int x, int y, int value) {
        if (x >= 0 && x < width && y >= 0 && y < height) {
            image[y][x] = value;
        }
    }
    
    int getPixel(int x, int y) const {
        if (x >= 0 && x < width && y >= 0 && y < height) {
            return image[y][x];
        }
        return 0;
    }
    
    vector<int> getImageData() const {
        vector<int> data;
        for (const auto& row : image) {
            data.insert(data.end(), row.begin(), row.end());
        }
        return data;
    }
    
    void setImageData(const vector<int>& data) {
        if (data.size() == width * height) {
            for (int y = 0; y < height; y++) {
                for (int x = 0; x < width; x++) {
                    image[y][x] = data[y * width + x];
                }
            }
        }
    }
    
    int getWidth() const { return width; }
    int getHeight() const { return height; }
    
    // 简单的图像处理操作
    void invert() {
        for (auto& row : image) {
            for (int& pixel : row) {
                pixel = 255 - pixel;
            }
        }
    }
    
    void threshold(int value) {
        for (auto& row : image) {
            for (int& pixel : row) {
                pixel = (pixel > value) ? 255 : 0;
            }
        }
    }
};

// 全局实例
static MathCalculator calculator;
static StringProcessor stringProcessor;
static ArrayProcessor arrayProcessor;
static unique_ptr<ImageProcessor> imageProcessor;

// 导出函数
extern "C" {
    // 数学计算函数
    EMSCRIPTEN_KEEPALIVE
    double add(double a, double b) {
        return calculator.add(a, b);
    }
    
    EMSCRIPTEN_KEEPALIVE
    double subtract(double a, double b) {
        return calculator.subtract(a, b);
    }
    
    EMSCRIPTEN_KEEPALIVE
    double multiply(double a, double b) {
        return calculator.multiply(a, b);
    }
    
    EMSCRIPTEN_KEEPALIVE
    double divide(double a, double b) {
        return calculator.divide(a, b);
    }
    
    EMSCRIPTEN_KEEPALIVE
    double power(double base, double exponent) {
        return calculator.power(base, exponent);
    }
    
    EMSCRIPTEN_KEEPALIVE
    double sqrt(double value) {
        return calculator.sqrt(value);
    }
    
    // 字符串处理函数
    EMSCRIPTEN_KEEPALIVE
    const char* reverseString(const char* input) {
        string result = stringProcessor.reverse(input);
        char* output = new char[result.length() + 1];
        strcpy(output, result.c_str());
        return output;
    }
    
    EMSCRIPTEN_KEEPALIVE
    const char* toUpperCase(const char* input) {
        string result = stringProcessor.toUpperCase(input);
        char* output = new char[result.length() + 1];
        strcpy(output, result.c_str());
        return output;
    }
    
    EMSCRIPTEN_KEEPALIVE
    const char* toLowerCase(const char* input) {
        string result = stringProcessor.toLowerCase(input);
        char* output = new char[result.length() + 1];
        strcpy(output, result.c_str());
        return output;
    }
    
    EMSCRIPTEN_KEEPALIVE
    int countWords(const char* input) {
        return stringProcessor.countWords(input);
    }
    
    // 图像处理函数
    EMSCRIPTEN_KEEPALIVE
    void createImage(int width, int height) {
        imageProcessor = make_unique<ImageProcessor>(width, height);
    }
    
    EMSCRIPTEN_KEEPALIVE
    void setPixel(int x, int y, int value) {
        if (imageProcessor) {
            imageProcessor->setPixel(x, y, value);
        }
    }
    
    EMSCRIPTEN_KEEPALIVE
    int getPixel(int x, int y) {
        if (imageProcessor) {
            return imageProcessor->getPixel(x, y);
        }
        return 0;
    }
    
    EMSCRIPTEN_KEEPALIVE
    void invertImage() {
        if (imageProcessor) {
            imageProcessor->invert();
        }
    }
    
    EMSCRIPTEN_KEEPALIVE
    void thresholdImage(int value) {
        if (imageProcessor) {
            imageProcessor->threshold(value);
        }
    }
    
    EMSCRIPTEN_KEEPALIVE
    int getImageWidth() {
        if (imageProcessor) {
            return imageProcessor->getWidth();
        }
        return 0;
    }
    
    EMSCRIPTEN_KEEPALIVE
    int getImageHeight() {
        if (imageProcessor) {
            return imageProcessor->getHeight();
        }
        return 0;
    }
}

// 使用 emscripten::bind 进行更高级的绑定
EMSCRIPTEN_BINDINGS(webassembly_module) {
    emscripten::class_<MathCalculator>("MathCalculator")
        .constructor<>()
        .function("add", &MathCalculator::add)
        .function("subtract", &MathCalculator::subtract)
        .function("multiply", &MathCalculator::multiply)
        .function("divide", &MathCalculator::divide)
        .function("power", &MathCalculator::power)
        .function("sqrt", &MathCalculator::sqrt)
        .function("getHistory", &MathCalculator::getHistory)
        .function("clearHistory", &MathCalculator::clearHistory)
        .function("getHistorySize", &MathCalculator::getHistorySize);
    
    emscripten::class_<StringProcessor>("StringProcessor")
        .constructor<>()
        .function("reverse", &StringProcessor::reverse)
        .function("toUpperCase", &StringProcessor::toUpperCase)
        .function("toLowerCase", &StringProcessor::toLowerCase)
        .function("countWords", &StringProcessor::countWords)
        .function("split", &StringProcessor::split);
    
    emscripten::class_<ArrayProcessor>("ArrayProcessor")
        .constructor<>()
        .function("sort", &ArrayProcessor::sort)
        .function("reverse", &ArrayProcessor::reverse)
        .function("sum", &ArrayProcessor::sum)
        .function("average", &ArrayProcessor::average)
        .function("max", &ArrayProcessor::max)
        .function("min", &ArrayProcessor::min)
        .function("filter", &ArrayProcessor::filter);
    
    emscripten::class_<ImageProcessor>("ImageProcessor")
        .constructor<int, int>()
        .function("setPixel", &ImageProcessor::setPixel)
        .function("getPixel", &ImageProcessor::getPixel)
        .function("getImageData", &ImageProcessor::getImageData)
        .function("setImageData", &ImageProcessor::setImageData)
        .function("invert", &ImageProcessor::invert)
        .function("threshold", &ImageProcessor::threshold)
        .function("getWidth", &ImageProcessor::getWidth)
        .function("getHeight", &ImageProcessor::getHeight);
    
    emscripten::register_vector<int>("vector<int>");
    emscripten::register_vector<string>("vector<string>");
    emscripten::register_vector<double>("vector<double>");
} 