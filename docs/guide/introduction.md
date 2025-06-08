# Python简介

Python是一种高级编程语言，由荷兰人Guido van Rossum于1989年发明。对于前端开发者来说，Python是学习后端开发的理想选择。

## 🤔 为什么选择Python？

### 1. 简洁易读
Python的语法接近自然语言，非常适合初学者：

::: code-group
```javascript [JavaScript]
// JavaScript 函数定义
function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}
```

```python [Python]
# Python 函数定义
def calculate_total(items):
    total = 0
    for item in items:
        total += item['price']
    return total
```
:::

### 2. 动态类型
和JavaScript一样，Python也是动态类型语言：

```python
# 无需声明变量类型
name = "Python"          # 字符串
version = 3.12           # 整数
is_awesome = True        # 布尔值
frameworks = ["Django", "Flask", "FastAPI"]  # 列表
```

### 3. 丰富的生态系统
Python拥有庞大的第三方库生态：

| 领域 | 流行库 | 用途 |
|------|--------|------|
| Web开发 | Django, Flask, FastAPI | 构建Web应用和API |
| 数据科学 | Pandas, NumPy, Matplotlib | 数据分析和可视化 |
| 机器学习 | TensorFlow, PyTorch, Scikit-learn | AI和机器学习 |
| 自动化 | Selenium, Requests, BeautifulSoup | 网络爬虫和自动化 |

## 🚀 Python的应用场景

### Web开发
```python
# 使用FastAPI创建REST API
from fastapi import FastAPI

app = FastAPI()

@app.get("/api/users/{user_id}")
def get_user(user_id: int):
    return {"user_id": user_id, "name": "张三"}
```

### 数据处理
```python
# 使用Pandas处理CSV数据
import pandas as pd

# 读取CSV文件
df = pd.read_csv('sales_data.csv')

# 数据分析
monthly_sales = df.groupby('month')['sales'].sum()
print(monthly_sales)
```

### 自动化脚本
```python
# 自动化文件操作
import os
import shutil

def organize_downloads():
    download_path = "~/Downloads"
    
    for filename in os.listdir(download_path):
        if filename.endswith('.pdf'):
            shutil.move(
                os.path.join(download_path, filename),
                "~/Documents/PDFs/"
            )
```

## 🎯 学习路径

作为前端开发者，建议按以下顺序学习：

1. **基础语法** - 变量、函数、控制流
2. **数据结构** - 列表、字典、集合
3. **面向对象** - 类、继承、封装
4. **模块化** - 导入、包管理
5. **Web开发** - Flask/Django入门
6. **数据库操作** - SQLite、PostgreSQL
7. **部署上线** - Docker、云服务

## 🔄 与JavaScript的对比

| 特性 | JavaScript | Python |
|------|------------|--------|
| 语法风格 | C风格，大括号 | 缩进风格，简洁 |
| 类型系统 | 动态弱类型 | 动态强类型 |
| 运行环境 | 浏览器、Node.js | 解释器、服务器 |
| 包管理 | npm/yarn | pip/conda |
| 主要用途 | 前端、全栈 | 后端、数据科学、AI |

## 💡 学习建议

::: tip 充分利用前端知识
- 把Python的字典想象成JavaScript的对象
- Python的列表类似JavaScript的数组
- 函数、闭包等概念在两种语言中很相似
- 异步编程在Python中也很重要（async/await）
:::

::: warning 注意差异
- Python使用缩进而不是大括号来表示代码块
- Python的索引从0开始，但切片操作略有不同
- Python有更严格的作用域规则
:::

准备好开始Python之旅了吗？下一步：[环境安装](/guide/installation) 