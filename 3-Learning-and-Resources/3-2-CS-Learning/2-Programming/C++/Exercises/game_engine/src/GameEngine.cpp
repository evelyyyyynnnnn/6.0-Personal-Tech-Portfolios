#include "GameEngine.h"
#include <iostream>
#include <algorithm>
#include <thread>

namespace GameEngine {

// GameObject 实现
GameObject::GameObject(const std::string& name) 
    : name(name), parent(nullptr), active(true) {
}

GameObject::~GameObject() {
    OnDestroy();
}

void GameObject::Start() {
    if (!active) return;
    
    for (auto& component : components) {
        if (component->IsEnabled()) {
            component->Start();
        }
    }
    
    for (auto& child : children) {
        child->Start();
    }
}

void GameObject::Update(float deltaTime) {
    if (!active) return;
    
    for (auto& component : components) {
        if (component->IsEnabled()) {
            component->Update(deltaTime);
        }
    }
    
    for (auto& child : children) {
        child->Update(deltaTime);
    }
}

void GameObject::FixedUpdate(float fixedDeltaTime) {
    if (!active) return;
    
    for (auto& component : components) {
        if (component->IsEnabled()) {
            component->FixedUpdate(fixedDeltaTime);
        }
    }
    
    for (auto& child : children) {
        child->FixedUpdate(fixedDeltaTime);
    }
}

void GameObject::OnDestroy() {
    for (auto& component : components) {
        component->OnDestroy();
    }
    
    for (auto& child : children) {
        child->OnDestroy();
    }
}

void GameObject::SetParent(GameObject* newParent) {
    if (parent) {
        auto& parentChildren = parent->children;
        auto it = std::find_if(parentChildren.begin(), parentChildren.end(),
                              [this](const std::unique_ptr<GameObject>& child) {
                                  return child.get() == this;
                              });
        if (it != parentChildren.end()) {
            parentChildren.erase(it);
        }
    }
    
    parent = newParent;
    
    if (parent) {
        // 注意：这里需要从当前场景中移除，然后添加到新父对象
        // 简化实现，实际需要更复杂的处理
    }
}

void GameObject::AddChild(std::unique_ptr<GameObject> child) {
    child->SetParent(this);
    children.push_back(std::move(child));
}

// Scene 实现
Scene::Scene(const std::string& name) : name(name), active(true) {
}

Scene::~Scene() {
    OnDestroy();
}

void Scene::Start() {
    if (!active) return;
    
    for (auto& obj : rootObjects) {
        obj->Start();
    }
}

void Scene::Update(float deltaTime) {
    if (!active) return;
    
    for (auto& obj : rootObjects) {
        obj->Update(deltaTime);
    }
}

void Scene::FixedUpdate(float fixedDeltaTime) {
    if (!active) return;
    
    for (auto& obj : rootObjects) {
        obj->FixedUpdate(fixedDeltaTime);
    }
}

void Scene::OnDestroy() {
    for (auto& obj : rootObjects) {
        obj->OnDestroy();
    }
}

GameObject* Scene::CreateGameObject(const std::string& name) {
    auto gameObject = std::make_unique<GameObject>(name);
    GameObject* ptr = gameObject.get();
    rootObjects.push_back(std::move(gameObject));
    return ptr;
}

void Scene::DestroyGameObject(GameObject* obj) {
    auto it = std::find_if(rootObjects.begin(), rootObjects.end(),
                          [obj](const std::unique_ptr<GameObject>& gameObj) {
                              return gameObj.get() == obj;
                          });
    if (it != rootObjects.end()) {
        (*it)->OnDestroy();
        rootObjects.erase(it);
    }
}

// InputManager 实现
InputManager::InputManager() : mouseX(0), mouseY(0), previousMouseX(0), previousMouseY(0) {
}

InputManager::~InputManager() {
    Shutdown();
}

void InputManager::Initialize() {
    // 初始化输入系统
    std::cout << "输入管理器初始化完成" << std::endl;
}

void InputManager::Shutdown() {
    keyStates.clear();
    previousKeyStates.clear();
}

void InputManager::Update() {
    // 更新按键状态
    previousKeyStates = keyStates;
    previousMouseX = mouseX;
    previousMouseY = mouseY;
}

bool InputManager::IsKeyPressed(int keyCode) const {
    auto it = keyStates.find(keyCode);
    auto prevIt = previousKeyStates.find(keyCode);
    
    return (it != keyStates.end() && it->second) && 
           (prevIt == previousKeyStates.end() || !prevIt->second);
}

bool InputManager::IsKeyDown(int keyCode) const {
    auto it = keyStates.find(keyCode);
    return it != keyStates.end() && it->second;
}

bool InputManager::IsKeyReleased(int keyCode) const {
    auto it = keyStates.find(keyCode);
    auto prevIt = previousKeyStates.find(keyCode);
    
    return (it == keyStates.end() || !it->second) && 
           (prevIt != previousKeyStates.end() && prevIt->second);
}

void InputManager::SetKeyState(int keyCode, bool pressed) {
    keyStates[keyCode] = pressed;
}

void InputManager::SetMousePosition(double x, double y) {
    mouseX = x;
    mouseY = y;
}

// GameEngine 实现
GameEngine::GameEngine() 
    : activeScene(nullptr), deltaTime(0.0f), fixedDeltaTime(1.0f/60.0f), 
      running(false), targetFPS(60), targetFrameTime(1.0f/60.0f) {
    
    inputManager = std::make_unique<InputManager>();
}

GameEngine::~GameEngine() {
    Shutdown();
}

void GameEngine::Initialize() {
    std::cout << "游戏引擎初始化..." << std::endl;
    
    if (inputManager) {
        inputManager->Initialize();
    }
    
    if (renderer) {
        renderer->Initialize();
    }
    
    if (audioManager) {
        audioManager->Initialize();
    }
    
    if (physicsEngine) {
        physicsEngine->Initialize();
    }
    
    lastFrameTime = std::chrono::high_resolution_clock::now();
    running = true;
    
    std::cout << "游戏引擎初始化完成" << std::endl;
}

void GameEngine::Shutdown() {
    std::cout << "游戏引擎关闭..." << std::endl;
    
    running = false;
    
    if (activeScene) {
        activeScene->OnDestroy();
    }
    
    if (physicsEngine) {
        physicsEngine->Shutdown();
    }
    
    if (audioManager) {
        audioManager->Shutdown();
    }
    
    if (renderer) {
        renderer->Shutdown();
    }
    
    if (inputManager) {
        inputManager->Shutdown();
    }
    
    std::cout << "游戏引擎已关闭" << std::endl;
}

void GameEngine::Run() {
    if (!running) return;
    
    if (activeScene) {
        activeScene->Start();
    }
    
    while (running) {
        UpdateDeltaTime();
        
        ProcessInput();
        Update();
        FixedUpdate();
        Render();
        
        // 帧率控制
        auto currentTime = std::chrono::high_resolution_clock::now();
        auto frameTime = std::chrono::duration<float>(currentTime - lastFrameTime).count();
        
        if (frameTime < targetFrameTime) {
            std::this_thread::sleep_for(std::chrono::milliseconds(
                static_cast<int>((targetFrameTime - frameTime) * 1000)));
        }
    }
}

void GameEngine::SetRenderer(std::unique_ptr<Renderer> renderer) {
    this->renderer = std::move(renderer);
}

void GameEngine::SetAudioManager(std::unique_ptr<AudioManager> audioManager) {
    this->audioManager = std::move(audioManager);
}

void GameEngine::SetPhysicsEngine(std::unique_ptr<PhysicsEngine> physicsEngine) {
    this->physicsEngine = std::move(physicsEngine);
}

Scene* GameEngine::CreateScene(const std::string& name) {
    auto scene = std::make_unique<Scene>(name);
    Scene* ptr = scene.get();
    scenes.push_back(std::move(scene));
    return ptr;
}

void GameEngine::SetActiveScene(Scene* scene) {
    if (activeScene) {
        activeScene->OnDestroy();
    }
    
    activeScene = scene;
    
    if (activeScene) {
        activeScene->Start();
    }
}

void GameEngine::SetTargetFPS(int fps) {
    targetFPS = fps;
    targetFrameTime = 1.0f / fps;
}

void GameEngine::UpdateDeltaTime() {
    auto currentTime = std::chrono::high_resolution_clock::now();
    deltaTime = std::chrono::duration<float>(currentTime - lastFrameTime).count();
    lastFrameTime = currentTime;
}

void GameEngine::ProcessInput() {
    if (inputManager) {
        inputManager->Update();
    }
}

void GameEngine::Update() {
    if (activeScene) {
        activeScene->Update(deltaTime);
    }
}

void GameEngine::FixedUpdate() {
    if (physicsEngine) {
        physicsEngine->Update(fixedDeltaTime);
    }
    
    if (activeScene) {
        activeScene->FixedUpdate(fixedDeltaTime);
    }
}

void GameEngine::Render() {
    if (renderer && activeScene) {
        renderer->BeginFrame();
        renderer->Render(*activeScene);
        renderer->EndFrame();
    }
}

} // namespace GameEngine 