import streamlit as st
import pandas as pd
import numpy as np

# 写入纯文本
st.write("Hello, Streamlit!")

# 写入 Markdown
st.write("# 一级标题", "这是段文字")

# 写入数字
st.write(3.14159)

# 写入 DataFrame
df = pd.DataFrame({
    "A": [1, 2, 3],
    "B": [10, 20, 30]
})
st.write(df)

# 写入多个内容（自动排版）
st.write("这是一个数字：", 42, "和一个表格：", df)

# 写入 Matplotlib 图像
import matplotlib.pyplot as plt
fig, ax = plt.subplots()
ax.plot([1, 2, 3], [4, 5, 6])
st.write(fig)