#pragma once

#include <memory>
#include <vector>
#include <string>
#include <functional>
#include <chrono>
#include <unordered_map>

namespace GameEngine {

// 前向声明
class GameObject;
class Component;
class Scene;
class Renderer;
class InputManager;
class AudioManager;
class PhysicsEngine;

// 基础组件类
class Component {
protected:
    GameObject* owner;
    bool enabled;

public:
    Component() : owner(nullptr), enabled(true) {}
    virtual ~Component() = default;
    
    virtual void Start() {}
    virtual void Update(float deltaTime) {}
    virtual void FixedUpdate(float fixedDeltaTime) {}
    virtual void OnDestroy() {}
    
    void SetOwner(GameObject* obj) { owner = obj; }
    GameObject* GetOwner() const { return owner; }
    
    void SetEnabled(bool state) { enabled = state; }
    bool IsEnabled() const { return enabled; }
};

// 游戏对象类
class GameObject {
private:
    std::string name;
    std::vector<std::unique_ptr<Component>> components;
    GameObject* parent;
    std::vector<std::unique_ptr<GameObject>> children;
    bool active;

public:
    GameObject(const std::string& name = "GameObject");
    ~GameObject();
    
    void Start();
    void Update(float deltaTime);
    void FixedUpdate(float fixedDeltaTime);
    void OnDestroy();
    
    template<typename T, typename... Args>
    T* AddComponent(Args&&... args) {
        auto component = std::make_unique<T>(std::forward<Args>(args)...);
        T* ptr = component.get();
        component->SetOwner(this);
        components.push_back(std::move(component));
        return ptr;
    }
    
    template<typename T>
    T* GetComponent() {
        for (auto& component : components) {
            if (auto ptr = dynamic_cast<T*>(component.get())) {
                return ptr;
            }
        }
        return nullptr;
    }
    
    void SetActive(bool state) { active = state; }
    bool IsActive() const { return active; }
    
    void SetName(const std::string& name) { this->name = name; }
    const std::string& GetName() const { return name; }
    
    void SetParent(GameObject* parent);
    GameObject* GetParent() const { return parent; }
    
    void AddChild(std::unique_ptr<GameObject> child);
    const std::vector<std::unique_ptr<GameObject>>& GetChildren() const { return children; }
};

// 场景类
class Scene {
private:
    std::string name;
    std::vector<std::unique_ptr<GameObject>> rootObjects;
    bool active;

public:
    Scene(const std::string& name = "Scene");
    ~Scene();
    
    void Start();
    void Update(float deltaTime);
    void FixedUpdate(float fixedDeltaTime);
    void OnDestroy();
    
    GameObject* CreateGameObject(const std::string& name = "GameObject");
    void DestroyGameObject(GameObject* obj);
    
    void SetActive(bool state) { active = state; }
    bool IsActive() const { return active; }
    
    const std::string& GetName() const { return name; }
    const std::vector<std::unique_ptr<GameObject>>& GetRootObjects() const { return rootObjects; }
};

// 渲染器接口
class Renderer {
public:
    virtual ~Renderer() = default;
    virtual void Initialize() = 0;
    virtual void Shutdown() = 0;
    virtual void BeginFrame() = 0;
    virtual void EndFrame() = 0;
    virtual void Render(const Scene& scene) = 0;
    virtual void Clear() = 0;
};

// 输入管理器
class InputManager {
private:
    std::unordered_map<int, bool> keyStates;
    std::unordered_map<int, bool> previousKeyStates;
    double mouseX, mouseY;
    double previousMouseX, previousMouseY;

public:
    InputManager();
    ~InputManager();
    
    void Initialize();
    void Shutdown();
    void Update();
    
    bool IsKeyPressed(int keyCode) const;
    bool IsKeyDown(int keyCode) const;
    bool IsKeyReleased(int keyCode) const;
    
    double GetMouseX() const { return mouseX; }
    double GetMouseY() const { return mouseY; }
    double GetMouseDeltaX() const { return mouseX - previousMouseX; }
    double GetMouseDeltaY() const { return mouseY - previousMouseY; }
    
    void SetKeyState(int keyCode, bool pressed);
    void SetMousePosition(double x, double y);
};

// 音频管理器
class AudioManager {
public:
    virtual ~AudioManager() = default;
    virtual void Initialize() = 0;
    virtual void Shutdown() = 0;
    virtual void PlaySound(const std::string& soundFile) = 0;
    virtual void PlayMusic(const std::string& musicFile) = 0;
    virtual void StopMusic() = 0;
    virtual void SetVolume(float volume) = 0;
};

// 物理引擎
class PhysicsEngine {
public:
    virtual ~PhysicsEngine() = default;
    virtual void Initialize() = 0;
    virtual void Shutdown() = 0;
    virtual void Update(float deltaTime) = 0;
    virtual void AddRigidBody(GameObject* obj) = 0;
    virtual void RemoveRigidBody(GameObject* obj) = 0;
};

// 游戏引擎主类
class GameEngine {
private:
    std::unique_ptr<Renderer> renderer;
    std::unique_ptr<InputManager> inputManager;
    std::unique_ptr<AudioManager> audioManager;
    std::unique_ptr<PhysicsEngine> physicsEngine;
    
    std::vector<std::unique_ptr<Scene>> scenes;
    Scene* activeScene;
    
    std::chrono::high_resolution_clock::time_point lastFrameTime;
    float deltaTime;
    float fixedDeltaTime;
    bool running;
    
    int targetFPS;
    float targetFrameTime;

public:
    GameEngine();
    ~GameEngine();
    
    void Initialize();
    void Shutdown();
    
    void Run();
    void Stop() { running = false; }
    
    void SetRenderer(std::unique_ptr<Renderer> renderer);
    void SetAudioManager(std::unique_ptr<AudioManager> audioManager);
    void SetPhysicsEngine(std::unique_ptr<PhysicsEngine> physicsEngine);
    
    Scene* CreateScene(const std::string& name);
    void SetActiveScene(Scene* scene);
    Scene* GetActiveScene() const { return activeScene; }
    
    InputManager* GetInputManager() const { return inputManager.get(); }
    AudioManager* GetAudioManager() const { return audioManager.get(); }
    PhysicsEngine* GetPhysicsEngine() const { return physicsEngine.get(); }
    
    void SetTargetFPS(int fps);
    float GetDeltaTime() const { return deltaTime; }
    float GetFixedDeltaTime() const { return fixedDeltaTime; }
    
private:
    void UpdateDeltaTime();
    void ProcessInput();
    void Update();
    void FixedUpdate();
    void Render();
};

} // namespace GameEngine 