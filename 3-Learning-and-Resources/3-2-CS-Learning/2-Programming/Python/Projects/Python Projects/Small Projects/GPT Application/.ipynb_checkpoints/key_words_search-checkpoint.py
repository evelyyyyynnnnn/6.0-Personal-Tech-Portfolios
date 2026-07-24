import requests
import json
import os
from bs4 import BeautifulSoup

# 指定保存路径
save_path = ""
os.makedirs(save_path, exist_ok=True)

# Google Custom Search API 配置
OPENAI_API_KEY = "Your Key"
GOOGLE_API_KEY = "Your Key"
GOOGLE_CSE_ID = "Your Key"
SEARCH_ENGINE_URL = "https://www.googleapis.com/customsearch/v1"
SERPAPI_KEY = "c23a6f9445cdeec3d4ba15e305e98328bcb3fffc8eec68faf07eb8c65783bf5e"
MODEL_NAME = "gpt-3.5-turbo-1106"

# ChatGPT API 调用
def ask_chatgpt(prompt):
    """
    发送请求给 OpenAI 以生成摘要
    """
    headers = {"Authorization": f"Bearer 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"}
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "你是一个专业的学术摘要助手。"},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7
    }
    
    response = requests.post("https://api.openai.com/v1/chat/completions", json=payload, headers=headers)
    
    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"].strip()
    else:
        return f"ChatGPT 请求失败，状态码: {response.status_code}"

# 爬取网页内容
def fetch_full_content(url):
    """
    访问网页并提取正文内容
    """
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "html.parser")
            paragraphs = [p.get_text() for p in soup.find_all("p") if len(p.get_text()) > 50]

            if paragraphs:
                return "\n".join(paragraphs[:5])  # 取前 5 段作为正文摘要
            else:
                return "无法提取网页正文内容"
        else:
            return f"请求失败，状态码: {response.status_code}"
    except Exception as e:
        return f"请求错误: {e}"

# 生成摘要
def summarize_content(content):
    """
    使用 ChatGPT 生成更详细的摘要（300~500 字）
    """
    prompt = f"请阅读以下文本并总结为 300~500 字的摘要：\n\n{content}"
    return ask_chatgpt(prompt)

# 调用 Google API 进行搜索
def search_google(query, num_results=10):
    """
    通过 Google Custom Search API 获取搜索结果
    """
    params = {
        "key": GOOGLE_API_KEY,
        "cx": GOOGLE_CSE_ID,
        "q": query,
        "num": num_results
    }
    
    response = requests.get(SEARCH_ENGINE_URL, params=params)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Google API 请求失败，状态码: {response.status_code}")
        return None

# 保存结果到本地
def save_results(query, results):
    """
    保存搜索结果为 JSON 文件和 TXT 文件
    """
    safe_query = "".join(c if c.isalnum() or c in " _-" else "_" for c in query)
    json_file = os.path.join(save_path, f"{safe_query}.json")
    txt_file = os.path.join(save_path, f"{safe_query}.txt")

    # 保存 JSON 数据
    with open(json_file, "w", encoding="utf-8") as json_f:
        json.dump(results, json_f, indent=4, ensure_ascii=False)

    # 提取标题、链接、正文摘要
    with open(txt_file, "w", encoding="utf-8") as txt_f:
        txt_f.write(f"搜索关键词: {query}\n\n")
        for i, item in enumerate(results.get("items", []), 1):
            title = item.get("title", "无标题")
            link = item.get("link", "无链接")
            snippet = item.get("snippet", "无摘要")  # Google API 提供的简短摘要

            # 爬取网页正文
            full_content = fetch_full_content(link)

            # 让 ChatGPT 生成更长的摘要
            detailed_summary = summarize_content(full_content) if full_content else snippet

            txt_f.write(f"{i}. {title}\n{link}\n摘要:\n{detailed_summary}\n\n{'='*80}\n\n")

    print(f"搜索结果已保存为: {json_file} 和 {txt_file}")

# 执行搜索
def main():
    query = input("请输入搜索关键词: ")
    
    # 调用搜索 API
    search_results = search_google(query)

    if search_results:
        save_results(query, search_results)

if __name__ == "__main__":
    main()