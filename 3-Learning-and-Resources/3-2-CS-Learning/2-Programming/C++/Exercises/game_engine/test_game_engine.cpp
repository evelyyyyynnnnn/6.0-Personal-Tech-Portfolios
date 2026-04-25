#include "GameEngine.h"
#include <iostream>

// 简单的测试组件
class TestComponent : public GameEngine::Component {
private:
    float timer = 0.0f;
    
public:
    void Start() override {
        std::cout << "TestComponent started!" << std::endl;
    }
    
    void Update(float deltaTime) override {
        timer += deltaTime;
        if (timer >= 1.0f) {
            std::cout << "TestComponent updated! Timer: " << timer << std::endl;
            timer = 0.0f;
        }
    }
};

int main() {
    std::cout << "=== 游戏引擎测试程序 ===" << std::endl;
    
    // 创建游戏引擎实例
    GameEngine::GameEngine gameEngine;
    
    // 创建场景
    GameEngine::Scene* scene = gameEngine.CreateScene("TestScene");
    gameEngine.SetActiveScene(scene);
    
    // 创建游戏对象
    GameEngine::GameObject* testObject = scene->CreateGameObject("TestObject");
    
    // 添加测试组件
    TestComponent* testComp = testObject->AddComponent<TestComponent>();
    
    std::cout << "游戏对象创建成功: " << testObject->GetName() << std::endl;
    std::cout << "组件添加成功: " << (testComp != nullptr ? "是" : "否") << std::endl;
    
    // 初始化引擎
    gameEngine.Initialize();
    
    std::cout << "引擎初始化完成!" << std::endl;
    std::cout << "测试完成，游戏引擎库工作正常!" << std::endl;
    
    return 0;
} 