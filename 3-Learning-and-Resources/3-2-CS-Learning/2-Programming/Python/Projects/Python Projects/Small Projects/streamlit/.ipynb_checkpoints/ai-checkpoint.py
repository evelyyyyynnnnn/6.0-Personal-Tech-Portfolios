import streamlit as st
import openai
import pandas as pd
import matplotlib.pyplot as plt
import plotly.express as px
import numpy as np
import os
from io import StringIO

# 设置 OpenAI API Key（建议你在 st.secrets 中管理）
client = openai.OpenAI(api_key="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")
MODEL_NAME = "gpt-3.5-turbo-0125"

st.set_page_config(page_title="多功能网页助手", layout="wide")


# === 缓存模型调用 ===
@st.cache_data(show_spinner=False)
def ask_chatgpt(prompt):
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": "你是一个聪明又温柔的旅行规划助手，请提供详细又有创意的三天旅行计划。"},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
    )
    return response.choices[0].message.content

# === 侧边栏导航 ===
page = st.sidebar.radio("请选择模块：", ["🏖️ 旅行小助手", "📈 股票预测仪表盘", "🗺️ 地图展示", "📁 上传CSV分析", "💬 聊天记录示例","📈 数据可视化","📈 股票图表页"])

# === 聊天记录容器 ===
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

# === 模块：旅行小助手 ===
if page == "🏖️ 旅行小助手":
    st.title("🌍 旅行小助手 - GPT x Streamlit")
    city = st.text_input("请输入你想去的城市名：")
    if st.button("生成旅行计划") and city:
        with st.spinner("正在思考中，请稍候..."):
            prompt = f"请为我设计一个关于 {city} 的 3 天旅行行程，包含景点、美食推荐和每日安排。"
            result = ask_chatgpt(prompt)
            st.session_state.chat_history.append((city, result))
            st.markdown("### ✈️ AI 为你生成的旅行计划")
            st.markdown(result)
            # ✅ 保存到聊天记录中
            st.session_state.chat_history.append((city, result))

            # 下载按钮
            md_buffer = StringIO()
            md_buffer.write(f"# {city} 旅行计划\n\n{result}")
            st.download_button("📥 下载 Markdown 文件", md_buffer.getvalue(), file_name=f"{city}_trip.md")

# === 模块：上传 CSV 分析 ===
elif page == "📁 上传CSV分析":
    st.title("📊 上传CSV文件进行数据分析")
    uploaded_file = st.file_uploader("请上传一个CSV文件：", type=["csv"])
    if uploaded_file:
        df = pd.read_csv(uploaded_file)
        st.dataframe(df)
        st.write("📈 简单统计描述：")
        st.write(df.describe())

# === 模块：地图展示 ===
elif page == "🗺️ 地图展示":
    st.title("🗺️ 地理坐标可视化")
    df_map = pd.DataFrame({"lat": [39.9042, 31.2304], "lon": [116.4074, 121.4737]})
    st.map(df_map)

# === 模块：股票预测仪表盘（模拟） ===
elif page == "📈 股票预测仪表盘":
    st.title("📈 股票预测仪表盘（示例）")
    x = np.arange(30)
    y = np.cumsum(np.random.randn(30))
    fig = px.line(x=x, y=y, labels={"x": "天数", "y": "预测股价"}, title="模拟股价趋势")
    st.plotly_chart(fig)

# === 模块：聊天记录示例 ===
elif page == "💬 聊天记录示例":
    st.title("💬 聊天记录历史")
    for city, reply in st.session_state.chat_history:
        st.markdown(f"**你问：** {city}")
        st.markdown(f"**AI 回复：** {reply}")


# 页面名：📈 股票图表页
elif page == "📈 股票图表页":
    st.title("📈 股票趋势图表 - 支持多支股票联动")

    import yfinance as yf
    import plotly.express as px

    symbols = st.multiselect(
        "选择股票代码（如：AAPL、GOOG、TSLA）",
        ["AAPL", "GOOG", "TSLA", "MSFT", "META"],
        default=["AAPL", "GOOG"]
    )

    # 自定义时间区间
    col1, col2 = st.columns(2)
    with col1:
        start_date = st.date_input("📅 起始日期", value=pd.to_datetime("2023-01-01"))
    with col2:
        end_date = st.date_input("📅 结束日期", value=pd.to_datetime("today"))

    if symbols and start_date < end_date:
        with st.spinner("正在加载股票数据..."):
            # 下载股票数据
            df_all = yf.download(symbols, start=start_date, end=end_date)["Close"]

            # 转换为绘图需要的格式
            df_all = df_all.reset_index().melt(id_vars=["Date"], var_name="Symbol", value_name="Price")

            # 绘图
            fig = px.line(df_all, x="Date", y="Price", color="Symbol", title="📈 股票价格趋势")
            st.plotly_chart(fig, use_container_width=True)
    elif start_date >= end_date:
        st.warning("⚠️ 起始日期应早于结束日期。")


# === 模块：📈 数据可视化 ===
elif page == "📈 数据可视化":
    st.title("📊 数据图表可视化工具")

    uploaded_file = st.file_uploader("上传你的 CSV 文件", type=["csv"])
    if uploaded_file:
        df = pd.read_csv(uploaded_file)
        st.success("数据加载成功！")
        st.dataframe(df)

        chart_type = st.selectbox("请选择你想展示的图表类型：", [
            "条形图（Bar Chart）",
            "柱状图（Column Chart）",
            "饼图（Pie Chart）",
            "折线图（Line Chart）",
            "Plotly 交互图（Plotly）"
        ])

        x_col = st.selectbox("选择 X 轴列名", df.columns)
        y_col = st.selectbox("选择 Y 轴列名", df.columns)

        if chart_type == "条形图（Bar Chart）":
            st.bar_chart(df[[x_col, y_col]].set_index(x_col))

        elif chart_type == "柱状图（Column Chart）":
            st.columns(1)  # Streamlit 不区分 bar 和 column，保持 bar_chart

        elif chart_type == "饼图（Pie Chart）":
            import matplotlib.pyplot as plt
            fig, ax = plt.subplots()
            ax.pie(df[y_col], labels=df[x_col], autopct='%1.1f%%', startangle=90)
            ax.axis("equal")
            st.pyplot(fig)

        elif chart_type == "折线图（Line Chart）":
            st.line_chart(df[[x_col, y_col]].set_index(x_col))

        elif chart_type == "Plotly 交互图（Plotly）":
            import plotly.express as px
            fig = px.line(df, x=x_col, y=y_col, markers=True)
            st.plotly_chart(fig, use_container_width=True)