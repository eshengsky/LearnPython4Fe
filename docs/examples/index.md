# 实例代码

这里提供了丰富的Python代码示例，帮助你更好地理解和应用所学知识。

## 🎯 代码分类

### 基础示例
学习Python基本语法和概念的简单示例：

```python
# 变量和数据类型
name = "前端开发者"
age = 25
skills = ["JavaScript", "Vue", "React"]
profile = {"name": name, "age": age, "skills": skills}

print(f"你好，{name}！欢迎学习Python")
```

### 实用工具
日常开发中常用的Python工具函数：

```python
# 文件操作工具
def read_json_file(filename):
    import json
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

# HTTP请求工具
import requests

def fetch_data(url):
    response = requests.get(url)
    return response.json()
```

### 项目实战
完整的Python项目示例，包含Web API、数据处理等：

```python
# 简单的Web API
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/users')
def get_users():
    users = [
        {"id": 1, "name": "张三", "role": "frontend"},
        {"id": 2, "name": "李四", "role": "backend"}
    ]
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True)
```

## 📁 示例分类

| 分类 | 描述 | 适合阶段 |
|------|------|----------|
| [基础示例](/examples/basic) | 语法、数据类型、控制流 | 初学者 |
| [实用工具](/examples/utilities) | 常用函数、模块使用 | 进阶 |
| [项目实战](/examples/projects) | 完整项目、最佳实践 | 实战 |

## 🔧 如何使用这些示例

1. **阅读代码** - 理解每行代码的作用和原理
2. **动手实践** - 在本地环境中运行代码
3. **修改实验** - 尝试修改参数和逻辑
4. **扩展功能** - 在示例基础上添加新功能

## 💡 学习建议

::: tip 最佳实践
- 从简单示例开始，逐步增加复杂度
- 理解每个示例解决的具体问题
- 尝试用不同方法实现相同功能
- 关注代码的可读性和Python风格
:::

::: warning 注意事项
- 某些示例需要安装额外的包（如`requests`、`flask`等）
- 在生产环境中使用前，请仔细审查代码安全性
- 建议在虚拟环境中运行示例代码
:::

开始探索代码示例，从[基础示例](/examples/basic)开始吧！ 