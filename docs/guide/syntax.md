# 基础语法

Python的语法设计遵循"优雅胜过丑陋"的哲学，在很多方面与JavaScript采用了不同的设计理念。

## 输出函数

在开始学习Python语法之前，我们先来了解最常用的输出函数。在JavaScript中，我们使用`console.log()`等方法来输出信息到控制台：

```javascript runner
console.log("Hello, World!");
console.log(123, true, null);
console.info("格式化输出:", {name: "张三", age: 25});
```

Python使用`print()`函数作为标准输出方式，它的作用类似于JavaScript的`console.log()`，但语法更加简洁。`print()`是Python的内置函数，无需导入任何模块即可使用：

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

在JavaScript中，我们使用花括号`{}`来定义代码块，缩进只是为了美观，即使不缩进代码也能正常运行。这种设计给了开发者很大的自由度，但也可能导致代码风格不统一。

```javascript runner
if (5 > 2) {
    console.log("Five is greater than two!");
    console.log("这行也在if代码块内");
}
```

甚至可以写成这样（虽然很难阅读）：

```javascript runner
if (5 > 2) { console.log("Five is greater than two!"); console.log("这行也在if代码块内"); }
```

Python则采用了完全不同的哲学。Python最独特的特性之一就是**使用缩进来表示代码块**，完全没有花括号。这个设计强制所有Python代码都必须保持良好的缩进格式，从而确保了代码的可读性。

```python runner
if 5 > 2:
    print("Five is greater than two!")
    print("这行也在if代码块内")
```

在Python中，如果缺少缩进或缩进不一致，解释器会直接报错。这看起来可能有些严格，但长期来看能让代码保持整洁统一：

```python runner
# 这样会报IndentationError错误
try:
    if 5 > 2:
        print("正确缩进")
    # print("错误：缺少缩进")  # 这行如果取消注释会报错
except IndentationError as e:
    print(f"缩进错误: {e}")
```

这种设计背后的理念是"优雅胜过丑陋"（Beautiful is better than ugly），这是Python禅宗中的重要原则。强制缩进虽然在初学时可能感觉束缚，但能培养良好的编程习惯。

**建议的缩进标准**：Python社区推荐使用4个空格进行缩进（PEP 8标准），这比JavaScript常用的2个空格稍多一些，但能让代码层级更加清晰。

## 变量声明

JavaScript开发者已经习惯了明确的变量声明语法。现代JavaScript使用`let`和`const`来声明变量，这样可以明确表达变量的可变性意图：

```javascript runner
var x = 5;              // 函数作用域，已不推荐
let y = "Hello, World!"; // 块作用域，可重新赋值
const name = "张三";      // 块作用域，不可重新赋值

console.log(x, y, name);
```

JavaScript的这种设计让我们能清楚地知道哪些变量是可以改变的，哪些是常量。解构赋值更是让变量声明变得非常灵活：

```javascript runner
const [a, b, c] = [1, 2, 3];
console.log("解构赋值:", a, b, c);

let [x, y] = [10, 20];
[x, y] = [y, x];
console.log("交换后:", x, y);
```

Python的变量声明哲学完全不同：**简洁胜过复杂**。在Python中，你无需任何声明关键字，直接赋值即可创建变量。这种设计让代码更加简洁直观：

```python runner
x = 5
y = "Hello, World!"
name = "张三"
is_active = True

print(x, y, name, is_active)
```

Python的变量类型也是动态的，可以随时改变，这点和JavaScript类似：

```python runner
x = "现在x是字符串了"
print(x, type(x))
```

Python同样支持多重赋值和类似解构的操作，语法甚至更加优雅。特别是变量交换，Python提供了非常直观的写法：

```python runner
a, b, c = 1, 2, 3
x = y = z = "相同的值"
print("多重赋值:", a, b, c)
print("同时赋值:", x, y, z)

# Python的优雅交换写法
a, b = b, a
print("交换后:", a, b)
```

**关于常量的约定**：虽然Python没有`const`关键字，但社区约定使用全大写的变量名来表示常量，比如`MAX_SIZE = 100`、`PI = 3.14159`。这是一个约定俗成的规则，虽然这些"常量"在技术上仍然可以被修改。

## 注释

JavaScript开发者熟悉两种主要的注释方式：单行的`//`和多行的`/* */`。JSDoc风格的注释更是前端开发中不可或缺的文档化工具：

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
 * JSDoc风格的文档注释
 * @param {string} name - 用户名
 * @returns {string} 问候语
 */
function greet(name) {
    return `Hello, ${name}!`;
}
```

Python的注释系统相对简单，主要使用`#`号。对于单行注释，Python和JavaScript的`//`作用相同。当需要多行注释时，Python开发者通常使用多个`#`号：

```python runner
# 这是单行注释
print("Hello, World!")  # 行末注释

# 多行注释通常使用多个#
# 第一行注释
# 第二行注释
# 第三行注释
print("注释演示完成")
```

**Python的独特优势：文档字符串（docstring）**

Python有一个非常特殊且强大的功能：文档字符串（docstring）。与JavaScript的JSDoc不同，Python的docstring不仅仅是注释，它们是语言的内置特性，可以在运行时被程序访问。

docstring使用三重引号（`"""`）包围，通常放在模块、类或函数的开头。这些文档字符串不仅能帮助开发者理解代码，还能被Python的内置帮助系统和各种文档生成工具直接使用：

```python runner
"""
这是模块级别的文档字符串
描述了这个文件的作用和用法
"""

def my_function():
    """
    这是函数的文档字符串
    
    这个函数演示了docstring的用法
    类似于JSDoc，但是语言内置支持
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

这种设计让Python的文档化程度通常比JavaScript更高。你可以使用`help()`函数查看任何对象的文档，这在交互式开发中特别有用。许多Python库都有详细的docstring，这让学习和使用这些库变得更加容易。

## 语句结束

在JavaScript中，分号的使用一直是个有争议的话题。虽然现代JavaScript可以依赖自动分号插入（ASI）机制，但很多团队仍然选择显式使用分号来避免潜在的问题：

```javascript runner
// 传统写法 - 使用分号
let name = "张三";
console.log(name);

// 现代写法 - 不使用分号（依赖ASI）
let age = 25
console.log(age)
```

有些特殊情况下，不使用分号可能会导致意外的行为，需要特别注意。你可以尝试删除这里的分号后运行：

```javascript runner
// 这种情况必须用分号避免问题
let a = 1
;[1, 2, 3].forEach(x => console.log(x))
```

Python在这方面要简单得多：**换行即表示语句结束**，完全不需要分号。这种设计符合Python"简洁胜过复杂"的哲学，让代码更加清晰易读：

```python runner
name = "张三"
print(name)
age = 25
print(age)
```

当然，如果你真的需要在一行中写多个语句，Python也支持使用分号分隔，但这通常不被推荐：

```python runner
x = 1; y = 2; print(x + y)  # 可以但不推荐
```

对于比较长的语句，Python提供了反斜杠续行的功能：

```python runner
long_string = "这是一个很长很长很长的字符串，" + \
              "需要分行书写"
print(long_string)
```

不过，Python更推荐使用括号来进行隐式的行连接，这样更加优雅：

```python runner
long_string = ("这是一个很长的字符串，"
               "使用括号进行隐式连接，"
               "这样更加优雅")
print(long_string)
```

**最佳实践建议**：Python强烈鼓励一行写一个语句的风格，这让代码逻辑更清晰，也更容易调试。这种约束看起来可能限制了灵活性，但实际上能让代码质量显著提升。

## 代码执行方式

JavaScript开发者熟悉多种代码执行环境：浏览器控制台、网页script标签、Node.js脚本文件。Python的执行方式更加统一简洁。

**JavaScript的执行环境**

```javascript runner
// 浏览器控制台或Node.js
console.log("Hello, World!");
```

```html
<!-- 网页中的script标签 -->
<script>
    console.log("Hello, World!");
</script>
```

**Python的执行方式**

Python主要有两种执行方式，都使用统一的Python解释器：

1. **交互式解释器（REPL）**：类似浏览器控制台，在终端输入`python`进入交互模式

```python runner
print("Hello, World!")
# 在REPL中可以逐行输入和执行
```

2. **脚本文件执行**：创建`.py`文件，然后在终端运行`python filename.py`

```python runner
# 保存为 hello.py，然后运行：python hello.py
print("Hello, World!")
```

**Python执行环境的优势**

相比JavaScript需要不同的运行环境，Python的优势在于：

- **环境统一**：同样的代码在不同平台行为一致
- **工具丰富**：Python解释器自带大量标准库
- **学习简单**：不需要考虑浏览器兼容性等复杂问题

## 小结

Python基础语法设计体现了"优雅胜过丑陋，明了胜过晦涩"的核心理念：

1. **缩进定义代码块**：使用4个空格缩进，强制保持代码整洁，提高可读性
2. **变量赋值简洁**：无需声明关键字，直接赋值创建变量，支持多重赋值和元组解包
3. **注释系统丰富**：`#`号单行注释，docstring文档字符串提供运行时可访问的文档
4. **语句结束清晰**：换行即表示语句结束，必要时可用反斜杠或括号进行续行
5. **执行方式统一**：交互式REPL和脚本文件执行，环境一致性好
6. **文档字符串特色**：三重引号docstring是语言内置特性，支持运行时访问和工具生成文档

Python的语法设计强制开发者编写整洁、可读的代码，这种"约束"实际上提高了代码质量和团队协作效率。掌握这些基础语法规则，是编写优秀Python代码的第一步。

