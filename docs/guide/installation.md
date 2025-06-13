# 环境搭建

Python 的环境搭建相比 Node.js 来说稍显复杂，但也有相似的地方。作为前端开发者，你已经熟悉了 Node.js 的安装和包管理，Python 的环境配置过程会有很多相似的概念。

## 在线环境（推荐）

考虑到环境搭建的复杂性，本教程提供了在线可执行的代码环境，你可以直接在浏览器中运行 Python 代码，无需本地安装，就像在浏览器控制台中写 JavaScript 一样方便。

```python runner
# 这就是一个在线 Python 环境
print("Hello, Python!")
print("你可以直接修改这段代码并运行")

# 试试修改下面的变量
name = "前端开发者"
print(f"欢迎 {name} 学习 Python！")
```

::: tip 在线环境优势
- 无需安装配置，开箱即用
- 跨平台，任何设备都能学习
- 所有代码都可以直接运行和修改
- 专注于语言学习，而不是环境问题
:::

## Python 安装

### 版本选择

JavaScript 开发中，我们通常使用最新的 LTS 版本的 Node.js。Python 也有类似的策略，目前推荐使用 Python 3.9+版本，最新稳定版本是 Python 3.12。

::: tip 版本说明
- Python 2.x 已经停止维护，不要使用
- Python 3.6 以下版本缺少现代特性，不推荐
- Python 3.9+是目前的主流选择，兼容性和功能都比较完善
:::

### Windows 安装

1. 访问 [Python 官网](https://www.python.org/downloads/)
2. 下载 Windows 版本的 Python 安装包
3. 运行安装程序时，**务必勾选"Add Python to PATH"**
4. 选择"Customize installation"进行自定义安装
5. 在可选功能中，确保勾选 pip、IDLE 等组件

### macOS 安装

#### 方法一：官方安装包

从 [Python 官网](https://www.python.org/downloads/) 下载 macOS 版本，直接安装即可。

#### 方法二：Homebrew（推荐）

如果你熟悉前端开发，应该已经在使用 [Homebrew](https://brew.sh/) 了，就像 npm 一样方便：

```bash
# 安装 Python
brew install python

# 安装完成后验证
python3 --version
pip3 --version
```

#### 方法三：pyenv（类似 nvm）

就像 Node.js 有 [nvm](https://github.com/nvm-sh/nvm) 来管理多版本，Python 也有 [pyenv](https://github.com/pyenv/pyenv)：

```bash
# 安装 pyenv
brew install pyenv

# 安装特定 Python 版本
pyenv install 3.12.0

# 设置全局 Python 版本
pyenv global 3.12.0

# 设置项目级 Python 版本
pyenv local 3.11.0
```

## 验证安装

安装完成后，打开终端（Command Prompt、PowerShell 或 Terminal）验证：

```python runner
import sys
print(f"Python 版本: {sys.version}")
print(f"Python 路径: {sys.executable}")
```

在命令行中也可以验证：

```bash
python --version
# 或者
python3 --version

pip --version
# 或者
pip3 --version
```

::: warning 注意
在某些系统中，`python`命令可能指向 Python 2.x，而`python3`才是 Python 3.x。建议使用`python3`命令，或者配置别名。
:::

## 包管理器

### pip vs npm

JavaScript 有 npm/yarn/pnpm，Python 有 pip 作为默认包管理器。但在依赖管理机制上有重要差异：

| 功能 | JavaScript | Python |
|------|------------|--------|
| 项目依赖安装 | `npm install package` | `pip install package`（需在虚拟环境中） |
| 安装指定版本 | `npm install package@2.28.0` | `pip install package==2.28.0` |
| 更新包 | `npm update package` | `pip install package --upgrade` |
| 全局安装 | `npm install -g package` | `pip install package`（系统级安装） |
| 卸载包 | `npm uninstall package` | `pip uninstall package` |
| 查看已安装包 | `npm list` | `pip list` |
| 查看包信息 | `npm info package` | `pip show package` |
| 依赖文件 | `package.json` | `requirements.txt` |
| 导出依赖 | 自动生成 | `pip freeze > requirements.txt` |
| 安装依赖 | `npm install` | `pip install -r requirements.txt` |
| 锁定文件 | `package-lock.json` | [pip-tools](https://pip-tools.readthedocs.io/) 生成 |
| 开发依赖 | `npm install -D package` | `pip install package`（需手动区分） |

### 重要差异：依赖管理机制

这是 Python 和 JavaScript 最大的区别之一：

**JavaScript（npm）**：
- 每个项目自动拥有独立的`node_modules`目录
- 依赖默认安装在项目级别，自然隔离
- 全局安装需要`-g`参数

**Python（pip）**：
- pip 默认安装到系统级 Python 环境
- 需要手动创建虚拟环境来实现项目级依赖隔离
- 虚拟环境激活后，pip 行为类似 npm 的项目级安装

## 虚拟环境详解

### 为什么需要虚拟环境

在 Node.js 开发中，每个项目都有自己的`node_modules`目录，包依赖是项目级别的，天然隔离。Python 默认是全局安装包，这可能导致版本冲突问题。

**举个例子**：
- 项目 A 需要 Django 3.2
- 项目 B 需要 Django 4.0
- 如果全局安装，只能保留一个版本

虚拟环境就是 Python 解决这个问题的方案，它为每个项目创建独立的 Python 环境，类似于给每个项目一个独立的"node_modules"。

### venv（推荐）

Python 3.3+内置了 venv 模块：

```bash
# 创建虚拟环境
python -m venv myproject

# 激活虚拟环境
# Windows
myproject\Scripts\activate
# macOS/Linux
source myproject/bin/activate

# 停用虚拟环境
deactivate
```

### virtualenv

[virtualenv](https://virtualenv.pypa.io/) 是第三方工具，功能更丰富：

```bash
# 安装 virtualenv
pip install virtualenv

# 创建虚拟环境
virtualenv myproject

# 激活方式同 venv
```

### conda

[Anaconda](https://www.anaconda.com/)/[Miniconda](https://docs.conda.io/en/latest/miniconda.html) 提供的环境管理工具，特别适合数据科学：

```bash
# 创建环境
conda create -n myproject python=3.12

# 激活环境
conda activate myproject

# 停用环境
conda deactivate
```

## 开发环境选择

### IDE/编辑器

作为前端开发者，你应该已经在使用 [VS Code](https://code.visualstudio.com/) 了，它对 Python 也有很好的支持：

#### VS Code（推荐）

1. 安装 [Python 扩展包](https://marketplace.visualstudio.com/items?itemName=ms-python.python)（Microsoft 官方）
2. 安装 [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance)（更好的语言支持）
3. 可选安装 [Black](https://black.readthedocs.io/)（代码格式化）、[Flake8](https://flake8.pycqa.org/)（代码检查）

VS Code 的 Python 开发体验和 JavaScript 开发类似，有智能提示、调试、集成终端等功能。

#### [PyCharm](https://www.jetbrains.com/pycharm/)

JetBrains 出品的专业 Python IDE，功能强大但相对重量级，适合大型项目。

#### [Jupyter Notebook](https://jupyter.org/)

Jupyter Notebook 特别适合数据分析和学习，类似于在线的交互式环境。

```bash
# 安装 Jupyter
pip install jupyter

# 启动 Jupyter Notebook
jupyter notebook
```

### 代码格式化和检查

JavaScript 项目中我们使用 [Prettier](https://prettier.io/)、[ESLint](https://eslint.org/)，Python 也有对应的工具：

**代码格式化：[Black](https://black.readthedocs.io/)**  
Black 是 Python 的代码格式化工具，类似于 Prettier。它的特点是"零配置"，强制统一的代码风格，被称为"不妥协的代码格式化工具"。

**代码检查：[Flake8](https://flake8.pycqa.org/)**  
Flake8 是 Python 的代码检查工具，类似于 ESLint。它检查代码风格、语法错误和复杂度问题，帮助保持代码质量。

**静态类型检查：[mypy](https://mypy.readthedocs.io/)**  
mypy 是 Python 的静态类型检查器，类似于 TypeScript 的类型检查功能。虽然 Python 是动态类型语言，但通过类型注解可以享受静态类型检查的好处。

```bash
# 安装代码格式化工具
pip install black

# 安装代码检查工具
pip install flake8

# 安装类型检查工具
pip install mypy
```

在 VS Code 中配置自动格式化（类似配置 Prettier 和 ESLint）：

**方法一：全局配置**

1. 按`Ctrl+Shift+P`（macOS: `Cmd+Shift+P`）打开命令面板
2. 输入"Preferences: Open Settings (JSON)"
3. 在`settings.json`文件中添加以下配置：

```json
{
    "python.formatting.provider": "black",
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "editor.formatOnSave": true
}
```

**方法二：项目级配置**

在项目根目录创建`.vscode/settings.json`文件，添加相同配置（推荐，类似`.eslintrc.js`的项目级配置）。

## 项目结构详解

Python 项目的典型结构和 Node.js 项目有相似之处，但也有一些 Python 特有的文件：

```
my-python-project/
├── src/                    # 源代码目录
│   ├── __init__.py        # 包标识文件（Python 特有）
│   ├── main.py            # 主程序入口
│   └── utils/             # 工具模块
│       ├── __init__.py
│       └── helpers.py
├── tests/                  # 测试文件目录
│   ├── __init__.py
│   └── test_main.py
├── requirements.txt        # 项目依赖列表
├── setup.py               # 包发布配置（可选）
├── pyproject.toml         # 现代 Python 项目配置（推荐）
├── README.md              # 项目说明
├── .gitignore             # Git 忽略文件
├── .env                   # 环境变量文件
└── venv/                  # 虚拟环境目录（通常加入.gitignore）
```

### 文件作用详解

#### `__init__.py` - 包标识文件（Python 特有）

JavaScript 中，任何包含文件的目录都可以被导入。Python 需要`__init__.py`文件来标识目录为包：

```python
# src/__init__.py - 可以为空，或者包含包级别的初始化代码
__version__ = "1.0.0"
__author__ = "Your Name"

# 导出主要接口（类似于 index.js 的作用）
from .main import main_function
from .utils.helpers import helper_function
```

这相当于 Node.js 中的`index.js`文件，用于定义包的对外接口。

#### `requirements.txt` - 依赖管理

相当于 JavaScript 的`package.json`中的 dependencies 部分：

```txt
# requirements.txt
requests>=2.28.0
flask==2.0.1
pytest>=7.0.0
```

对比 JavaScript 的依赖声明：
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "axios": ">=0.27.0"
  }
}
```

#### `setup.py` - 包发布配置

类似于`package.json`的元数据和发布配置部分，用于将 Python 项目打包发布到 [PyPI](https://pypi.org/)（Python 的 npm registry）：

```python
# setup.py
from setuptools import setup, find_packages

setup(
    name="my-python-project",           # 包名（类似 package.json 的 name）
    version="1.0.0",                    # 版本号
    author="Your Name",                 # 作者
    author_email="your.email@example.com",
    description="A sample Python package",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/username/my-python-project",
    packages=find_packages(),           # 自动发现包
    classifiers=[                       # 包分类信息
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.9",            # Python 版本要求
    install_requires=[                  # 运行时依赖
        "requests>=2.28.0",
        "flask>=2.0.0",
    ],
    extras_require={                    # 可选依赖（类似 peerDependencies）
        "dev": ["pytest>=7.0.0", "black", "flake8"],
    },
    entry_points={                      # 命令行入口（类似 package.json 的 bin）
        "console_scripts": [
            "my-tool=src.main:main",
        ],
    },
)
```

#### `pyproject.toml` - 现代项目配置（推荐）

新的 Python 项目标准，相当于更现代的`package.json`：

```toml
[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "my-python-project"
version = "1.0.0"
authors = [
    {name = "Your Name", email = "your.email@example.com"},
]
description = "A sample Python package"
readme = "README.md"
requires-python = ">=3.9"
classifiers = [
    "Programming Language :: Python :: 3",
    "License :: OSI Approved :: MIT License",
    "Operating System :: OS Independent",
]
dependencies = [
    "requests>=2.28.0",
    "flask>=2.0.0",
]

[project.optional-dependencies]
dev = ["pytest>=7.0.0", "black", "flake8"]

[project.scripts]
my-tool = "src.main:main"
```

### 项目类型对比

#### 简单脚本项目
```
script-project/
├── main.py
├── requirements.txt
└── README.md
```

#### 可安装包项目
```
package-project/
├── src/
│   └── mypackage/
│       ├── __init__.py
│       └── main.py
├── tests/
├── setup.py 或 pyproject.toml
├── requirements.txt
└── README.md
```

#### Web 应用项目
```
web-app/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── models/
│   ├── views/
│   └── templates/
├── static/
├── requirements.txt
├── .env
└── README.md
```

### 开发工作流对比

| 阶段 | JavaScript | Python |
|------|------------|--------|
| 初始化项目 | `npm init` | `mkdir project && cd project` |
| 创建虚拟环境 | 自动（node_modules） | `python -m venv venv` |
| 激活环境 | 无需操作 | `source venv/bin/activate` |
| 安装依赖 | `npm install` | `pip install -r requirements.txt` |
| 添加依赖 | `npm install package` | `pip install package && pip freeze > requirements.txt` |
| 运行项目 | `npm start` | `python main.py` |
| 发布包 | `npm publish` | `python setup.py sdist bdist_wheel && twine upload dist/*` |

::: tip 相关链接
- [setuptools 文档](https://setuptools.pypa.io/) - Python 包构建工具
- [twine](https://twine.readthedocs.io/) - 用于上传 Python 包到 PyPI
- [pip-tools](https://pip-tools.readthedocs.io/) - 用于生成锁定文件
- [mypy](https://mypy.readthedocs.io/) - Python 静态类型检查器
:::

## 小结

Python 的环境搭建相比 Node.js 稍显复杂，但概念很相似。主要差异包括：

- **版本管理**：Python 有 pyenv（类似 nvm），用于管理多个 Python 版本
- **包管理**：pip 是默认选择（类似 npm），但没有内置的锁定文件机制
- **虚拟环境**：Python 需要手动创建项目级依赖隔离（Node.js 的 node_modules 是自动的）
- **开发工具**：VS Code 对 Python 支持很好，配置方式和 JavaScript 项目类似

对于学习阶段，推荐使用本教程提供的在线环境，可以跳过复杂的配置过程，专注于 Python 语言本身的学习。当你需要开发实际项目时，再根据项目需求搭建本地开发环境。

## 快速参考链接

### 官方资源
- [Python 官网](https://www.python.org/) - Python 官方网站
- [Python 文档](https://docs.python.org/3/) - 官方文档
- [PyPI](https://pypi.org/) - Python 包索引（类似 npm registry）
- [PEP 8](https://pep8.org/) - Python 代码风格指南

### 开发工具
- [VS Code](https://code.visualstudio.com/) - 微软开源编辑器
  - [Python 扩展](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
  - [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance)
- [PyCharm](https://www.jetbrains.com/pycharm/) - JetBrains 专业 IDE
- [Jupyter](https://jupyter.org/) - 交互式开发环境

### 包管理和环境
- [pip 文档](https://pip.pypa.io/) - Python 包管理器
- [virtualenv](https://virtualenv.pypa.io/) - 虚拟环境工具
- [pyenv](https://github.com/pyenv/pyenv) - Python 版本管理
- [Anaconda](https://www.anaconda.com/) - 数据科学 Python 发行版

### 代码质量工具
- [Black](https://black.readthedocs.io/) - 代码格式化
- [Flake8](https://flake8.pycqa.org/) - 代码检查
- [mypy](https://mypy.readthedocs.io/) - 静态类型检查
- [pytest](https://pytest.org/) - 测试框架 