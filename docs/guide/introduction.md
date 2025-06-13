# Python简介

Python是一种流行的编程语言，由荷兰人Guido van Rossum创造，并于1991年首次发布。它以简洁、可读性强的语法而闻名，被广泛用于Web开发、数据科学、人工智能等领域。

```python runner
print("Hello, World!")
```

## Python的基本特性

### 解释型语言
Python是解释型语言，与JavaScript类似，代码无需编译即可运行。你可以立即执行代码并看到结果，这使得开发和测试变得非常快速。

### 简洁的语法
Python使用缩进来表示代码层次，语法接近自然语言：

```python runner
age = 25
if age >= 18:
    print("你已经成年了")
else:
    print("你还未成年")
```

### 动态类型
Python是动态类型语言，变量的类型在运行时确定，不需要事先声明：

```python runner
# 变量类型由赋值内容决定
name = "Python"      # 字符串
version = 3.12       # 整数  
is_awesome = True    # 布尔值

print(f"{name} {version} is awesome: {is_awesome}")

# 变量可以重新赋值为不同类型
name = 100
print(f"现在name是: {type(name)}")
```

### 跨平台兼容
Python可以在Windows、Mac、Linux等不同平台上运行，代码具有很强的可移植性。


## Python的应用领域

- **Web开发（后端）**：Django、Flask、FastAPI等框架
- **数据科学**：数据分析、可视化、统计计算
- **人工智能**：机器学习、深度学习、大模型应用
- **自动化脚本**：系统管理、文件处理、网络爬虫
- **桌面应用**：GUI程序开发
- **科学计算**：数值计算、工程计算

## AI与机器学习

Python已成为AI开发的首选语言，拥有丰富的生态系统：

### 主要AI库
- **OpenAI**：调用GPT等大模型
- **LangChain**：构建AI应用框架
- **Transformers**：Hugging Face预训练模型
- **TensorFlow/PyTorch**：深度学习框架

### 简单示例
```python
# OpenAI API调用（需要安装openai库）
import openai

client = openai.OpenAI(api_key="your-key")
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "解释机器学习"}]
)
print(response.choices[0].message.content)
```

Python在AI领域的优势：
- 简洁的API设计
- 强大的数据处理能力
- 活跃的开源社区
- 完整的开发工具链

对于前端开发者来说，学习Python能够帮助你构建全栈AI应用，从前端交互到后端AI服务。

## 对比JavaScript

作为前端开发者，了解核心差异能帮你快速上手：

**语法结构**：
```javascript runner
// JavaScript使用大括号
if (age >= 18) {
    console.log("成年人");
}
```

```python runner
# Python使用缩进
age = 25
if age >= 18:
    print("成年人")
```

**命名规范**：
- JavaScript：`userName`（驼峰命名）
- Python：`user_name`（下划线命名）

**布尔值**：
- JavaScript：`true/false`
- Python：`True/False`（首字母大写）

**运行环境**：
- JavaScript：浏览器/Node.js
- Python：系统解释器，更适合后端和数据处理


