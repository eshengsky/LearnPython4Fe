# 基础概念

Python 的设计哲学遵循"优雅胜过丑陋"的理念，在语法、概念和使用方式上与 JavaScript 采用了不同的设计思路。

## 输出函数

在开始学习 Python 语法之前，我们先来了解最常用的输出函数。在 JavaScript 中，我们使用`console.log()`等方法来输出信息到控制台：

```javascript runner
console.log("Hello, World!");
console.log(123, true, null);
console.info("格式化输出:", {name: "张三", age: 25});
```

Python 使用`print()`函数作为标准输出方式，它的作用类似于 JavaScript 的`console.log()`，但语法更加简洁。`print()`是 Python 的内置函数，无需导入任何模块即可使用：

```python runner
print("Hello, World!")
print(123, True, None)
print("格式化输出:", {"name": "张三", "age": 25})
```

`print()`函数会自动在输出末尾添加换行符，如果不想换行，可以使用`end`参数：

```python runner
print("第一部分", end="")
print("第二部分")  # 会紧接着第一部分输出
print("第三部分", end=" ")
print("第四部分")  # 用空格连接
```

## 代码块

在 JavaScript 中，我们使用花括号`{}`来定义代码块，缩进只是为了美观，即使不缩进代码也能正常运行。这种设计给了开发者很大的自由度，但也可能导致代码风格不统一。

```javascript runner
if (5 > 2) {
    console.log("Five is greater than two!");
    console.log("这行也在 if 代码块内");
}
```

甚至可以写成这样（虽然很难阅读）：

```javascript runner
if (5 > 2) { console.log("Five is greater than two!"); console.log("这行也在 if 代码块内"); }
```

Python 则采用了完全不同的哲学。Python 最独特的特性之一就是**使用缩进来表示代码块**，完全没有花括号。这个设计强制所有 Python 代码都必须保持良好的缩进格式，从而确保了代码的可读性。

```python runner
if 5 > 2:
    print("Five is greater than two!")
    print("这行也在 if 代码块内")
```

在 Python 中，如果缺少缩进或缩进不一致，解释器会直接报错。这看起来可能有些严格，但长期来看能让代码保持整洁统一：

```python runner
# 这样会报 IndentationError 错误
try:
    if 5 > 2:
        print("正确缩进")
    # print("错误：缺少缩进")  # 这行如果取消注释会报错
except IndentationError as e:
    print(f"缩进错误: {e}")
```

这种设计背后的理念是"优雅胜过丑陋"（Beautiful is better than ugly），这是 Python 禅宗中的重要原则。强制缩进虽然在初学时可能感觉束缚，但能培养良好的编程习惯。

**建议的缩进标准**：Python 社区推荐使用 4 个空格进行缩进（PEP 8 标准），这比 JavaScript 常用的 2 个空格稍多一些，但能让代码层级更加清晰。

## 变量声明

JavaScript 开发者已经习惯了明确的变量声明语法。现代 JavaScript 使用`let`和`const`来声明变量，这样可以明确表达变量的可变性意图：

```javascript runner
var x = 5;              // 函数作用域，已不推荐
let y = "Hello, World!"; // 块作用域，可重新赋值
const name = "张三";      // 块作用域，不可重新赋值

console.log(x, y, name);
```

JavaScript 的这种设计让我们能清楚地知道哪些变量是可以改变的，哪些是常量。解构赋值更是让变量声明变得非常灵活：

```javascript runner
const [a, b, c] = [1, 2, 3];
console.log("解构赋值:", a, b, c);

let [x, y] = [10, 20];
[x, y] = [y, x];
console.log("交换后:", x, y);
```

Python 的变量声明哲学完全不同：**简洁胜过复杂**。在 Python 中，你无需任何声明关键字，直接赋值即可创建变量。这种设计让代码更加简洁直观：

```python runner
x = 5
y = "Hello, World!"
name = "张三"
is_active = True

print(x, y, name, is_active)
```

Python 的变量类型也是动态的，可以随时改变，这点和 JavaScript 类似：

```python runner
x = "现在 x 是字符串了"
print(x, type(x))
```

Python 同样支持多重赋值和类似解构的操作，语法甚至更加优雅。特别是变量交换，Python 提供了非常直观的写法：

```python runner
a, b, c = 1, 2, 3
x = y = z = "相同的值"
print("多重赋值:", a, b, c)
print("同时赋值:", x, y, z)

# Python 的优雅交换写法
a, b = b, a
print("交换后:", a, b)
```

**关于常量的约定**：虽然 Python 没有`const`关键字，但社区约定使用全大写的变量名来表示常量，比如`MAX_SIZE = 100`、`PI = 3.14159`。这是一个约定俗成的规则，虽然这些"常量"在技术上仍然可以被修改。

## 命名规范

JavaScript 社区广泛采用驼峰式命名（camelCase）作为变量命名规范，这已经成为前端开发的标准：

```javascript runner
// JavaScript 的驼峰式命名
let userName = "张三";
let userAge = 25;
let isLoggedIn = true;
let maxRetryCount = 3;

console.log(userName, userAge, isLoggedIn, maxRetryCount);

// 对象属性也使用驼峰式
const userInfo = {
    firstName: "三",
    lastName: "张",
    emailAddress: "zhangsan@example.com"
};

console.log(userInfo);
```

Python 社区则偏好蛇形式命名（snake_case），这被写入了 PEP 8 官方编码规范中：

```python runner
# Python 的蛇形式命名
user_name = "张三"
user_age = 25
is_logged_in = True
max_retry_count = 3

print(user_name, user_age, is_logged_in, max_retry_count)

# 字典键也通常使用蛇形式
user_info = {
    "first_name": "三",
    "last_name": "张", 
    "email_address": "zhangsan@example.com"
}

print(user_info)
```

**Python 命名规范的细节**

需要注意的是，Python 的命名规范并不是完全统一的蛇形式。实际上存在几个不同的层次：

```python runner
# 1. 用户自定义的变量和函数：snake_case
my_variable = "用户定义变量"
def my_function():
    return "用户定义函数"

# 2. 类名：PascalCase
class MyClass:
    pass

# 3. 常量：UPPER_CASE
MAX_CONNECTIONS = 100

# 4. 内置方法：很多使用驼峰命名（历史原因）
text = "Hello World"
print("字符串内置方法示例:")
print("isdigit():", "123".isdigit())  # 驼峰命名
print("isalpha():", "abc".isalpha())  # 驼峰命名  
print("startswith():", text.startswith("Hello"))  # 驼峰命名
print("endswith():", text.endswith("World"))  # 驼峰命名

# 5. 特殊方法：双下划线包围
class Example:
    def __init__(self):  # 特殊方法
        pass
    
    def __str__(self):  # 特殊方法
        return "示例对象"

print("类示例:", Example())
```

**为什么 Python 的内置方法使用驼峰命名？**

这是历史原因造成的。Python 早期受到了其他语言的影响，很多内置方法沿用了驼峰命名。随着语言的发展，PEP 8 规范确立了蛇形式命名的偏好，但为了向后兼容，内置方法的命名没有改变。现在的规则是：

- **新的用户代码**：遵循 PEP 8，使用蛇形式
- **内置方法**：保持现有的驼峰命名以确保兼容性
- **第三方库**：大多数遵循 PEP 8，但也有例外

```python runner
# 对比展示
def check_user_input(text):  # 用户函数：蛇形式
    return text.isdigit()    # 内置方法：驼峰式

user_input = "12345"
is_number = check_user_input(user_input)
print(f"输入 '{user_input}' 是数字: {is_number}")

# 这种混合使用在 Python 中是正常的
```

## 注释

JavaScript 开发者熟悉两种主要的注释方式：单行的`//`和多行的`/* */`。JSDoc 风格的注释更是前端开发中不可或缺的文档化工具：

```javascript runner
// 单行注释
console.log("Hello, World!"); // 行末注释

/*
多行注释
可以跨越多行
很灵活
*/
console.log("注释演示完成");
```

```javascript
/**
 * JSDoc 风格的文档注释
 * @param {string} name - 用户名
 * @returns {string} 问候语
 */
function greet(name) {
    return `Hello, ${name}!`;
}
```

Python 的注释系统相对简单，主要使用`#`号。对于单行注释，Python 和 JavaScript 的`//`作用相同。当需要多行注释时，Python 开发者通常使用多个`#`号：

```python runner
# 这是单行注释
print("Hello, World!")  # 行末注释

# 多行注释通常使用多个#
# 第一行注释
# 第二行注释
# 第三行注释
print("注释演示完成")
```

**Python 的独特优势：文档字符串（docstring）**

Python 有一个非常特殊且强大的功能：文档字符串（docstring）。与 JavaScript 的 JSDoc 不同，Python 的 docstring 不仅仅是注释，它们是语言的内置特性，可以在运行时被程序访问。

docstring 使用三重引号（`"""`）包围，通常放在模块、类或函数的开头。这些文档字符串不仅能帮助开发者理解代码，还能被 Python 的内置帮助系统和各种文档生成工具直接使用：

```python runner
"""
这是模块级别的文档字符串
描述了这个文件的作用和用法
"""

def my_function():
    """
    这是函数的文档字符串
    
    这个函数演示了 docstring 的用法
    类似于 JSDoc，但是语言内置支持
    可以通过内置函数访问
    
    Returns:
        str: 返回执行结果的字符串
    """
    return "函数执行完成"

# 运行时访问文档
result = my_function()
print(result)
print("函数文档:", my_function.__doc__)
```

这种设计让 Python 的文档化程度通常比 JavaScript 更高。你可以使用`help()`函数查看任何对象的文档，这在交互式开发中特别有用。许多 Python 库都有详细的 docstring，这让学习和使用这些库变得更加容易。

## 语句结束

在 JavaScript 中，分号的使用一直是个有争议的话题。虽然现代 JavaScript 可以依赖自动分号插入（ASI）机制，但很多团队仍然选择显式使用分号来避免潜在的问题：

```javascript runner
// 传统写法 - 使用分号
let name = "张三";
console.log(name);

// 现代写法 - 不使用分号（依赖 ASI）
let age = 25
console.log(age)
```

有些特殊情况下，不使用分号可能会导致意外的行为，需要特别注意。你可以尝试删除这里的分号后运行：

```javascript runner
// 这种情况必须用分号避免问题
let a = 1
;[1, 2, 3].forEach(x => console.log(x))
```

Python 在这方面要简单得多：**换行即表示语句结束**，完全不需要分号。这种设计符合 Python"简洁胜过复杂"的哲学，让代码更加清晰易读：

```python runner
name = "张三"
print(name)
age = 25
print(age)
```

当然，如果你真的需要在一行中写多个语句，Python 也支持使用分号分隔，但这通常不被推荐：

```python runner
x = 1; y = 2; print(x + y)  # 可以但不推荐
```

对于比较长的语句，Python 提供了反斜杠续行的功能：

```python runner
long_string = "这是一个很长很长很长的字符串，" + \
              "需要分行书写"
print(long_string)
```

不过，Python 更推荐使用括号来进行隐式的行连接，这样更加优雅：

```python runner
long_string = ("这是一个很长的字符串，"
               "使用括号进行隐式连接，"
               "这样更加优雅")
print(long_string)
```

**最佳实践建议**：Python 强烈鼓励一行写一个语句的风格，这让代码逻辑更清晰，也更容易调试。这种约束看起来可能限制了灵活性，但实际上能让代码质量显著提升。



## 小结

Python 基础语法概念体现了"优雅胜过丑陋，明了胜过晦涩"的核心理念：

1. **缩进定义代码块**：使用 4 个空格缩进，强制保持代码整洁，提高可读性
2. **变量赋值简洁**：无需声明关键字，直接赋值创建变量，支持多重赋值和元组解包
3. **命名规范统一**：采用 snake_case 蛇形式命名，不同类型标识符有不同约定，与内置方法的历史驼峰命名共存
4. **注释系统丰富**：`#`号单行注释，docstring 文档字符串提供运行时可访问的文档
5. **语句结束清晰**：换行即表示语句结束，必要时可用反斜杠或括号进行续行
6. **文档字符串特色**：三重引号 docstring 是语言内置特性，支持运行时访问和工具生成文档

Python 的设计哲学强制开发者编写整洁、可读的代码，这种"约束"实际上提高了代码质量和团队协作效率。掌握这些基础语法概念，是编写优秀 Python 代码的第一步。

