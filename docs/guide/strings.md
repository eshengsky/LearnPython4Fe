# 字符串

字符串是编程中最常用的数据类型之一，用于存储和处理文本数据。在前端开发中，我们经常使用 JavaScript 的字符串来处理 DOM 内容、API 响应等，而 Python 的字符串在数据处理、文件操作等方面同样强大。

## 创建

在 JavaScript 中，我们可以使用单引号或双引号来创建字符串：

```javascript runner
// JavaScript 字符串创建
let message1 = 'Hello World';
let message2 = "Hello World";

console.log(message1);
console.log(message2);
```

Python 的字符串创建方式类似：

```python runner
# Python 字符串创建
message1 = 'Hello World'
message2 = "Hello World"

print(message1)
print(message2)
```

### 多行字符串

JavaScript 使用模板字面量（反引号）来创建多行字符串：

```javascript runner
// JavaScript 多行字符串 - 使用模板字面量
let text1 = `这是一个
多行字符串
可以包含换行符`;

let text2 = `另一个
多行字符串
的例子`;

console.log(text1);
console.log("---");
console.log(text2);
```

而 Python 提供了三重引号的优雅方式：

```python runner
# Python 多行字符串 - 使用三重双引号
text1 = """这是一个
多行字符串
可以包含换行符"""

# 使用三重单引号
text2 = '''另一个
多行字符串
的例子'''

print(text1)
print("---")
print(text2)
```

这种三重引号的方式比 JavaScript 的反引号更清晰，特别适合编写文档字符串或 SQL 查询。

## 格式化操作

JavaScript ES6 引入了模板字面量来处理字符串格式化：

```javascript runner
// JavaScript 模板字符串
let name = "Alice";
let age = 25;
let price = 19.99;

let message = `Hello, ${name}! You are ${age} years old.`;
console.log(message);

// 格式化数字需要调用方法
let formattedPrice = `Price: $${price.toFixed(2)}`;
console.log(formattedPrice);
```

Python 提供了两种主要的字符串格式化方法：`format()` 方法和 f-string。

### format() 方法

`format()` 方法是传统的 Python 字符串格式化方式，功能强大：

```python runner
name = "Alice"
age = 25
price = 19.99

# 基本用法 - 按位置填充
message = "Hello, {}! You are {} years old.".format(name, age)
print(message)

# 指定位置索引
message = "Hello, {0}! You are {1} years old.".format(name, age)
print(message)

# 使用关键字参数
message = "Hello, {name}! You are {age} years old.".format(name=name, age=age)
print(message)
```

### 格式化语法详解

Python 的格式化语法使用冒号 `:` 后跟格式说明符，语法为 `{变量:格式说明符}`：

```python runner
price = 19.99
percentage = 0.156
large_num = 1234567

# 数字格式化
print("=== 数字格式化 ===")
print("{:.2f}".format(price))           # 保留2位小数: 19.99
print("{:.1f}".format(price))           # 保留1位小数: 20.0
print("{:.0f}".format(price))           # 整数显示: 20

# 百分比格式化
print("{:.1%}".format(percentage))      # 百分比1位小数: 15.6%
print("{:.2%}".format(percentage))      # 百分比2位小数: 15.60%

# 科学计数法
print("{:.2e}".format(large_num))       # 科学计数法: 1.23e+06
print("{:.3E}".format(large_num))       # 大写E: 1.235E+06

# 整数格式化
print("{:d}".format(42))                # 十进制整数: 42
print("{:,}".format(large_num))         # 千位分隔符: 1,234,567
print("{:08d}".format(42))              # 补零到8位: 00000042
```

### f-string 语法（推荐）

f-string 是 Python 3.6+ 引入的现代字符串格式化方式，语法更简洁直观：

```python runner
name = "Alice"
age = 25
price = 19.99

# 基本用法 - 与 JavaScript 模板字符串相似
message = f"Hello, {name}! You are {age} years old."
print(message)

# f-string 支持相同的格式化语法
formatted_price = f"Price: ${price:.2f}"
print(formatted_price)
```

### 格式化选项对比表

| 格式说明符 | 英文含义（帮助理解记忆） | 中文说明 | 示例输入 | 输出结果 |
|-----------|----------|----------|----------|----------|
| `:.2f` | **f** = **f**loat 浮点数 | 保留2位小数 | `19.996` | `20.00` |
| `:.1%` | **%** = **p**ercent 百分比 | 保留1位小数的百分比 | `0.156` | `15.6%` |
| `:.2e` | **e** = **e**xponential 指数 | 科学计数法2位小数 | `1234.56` | `1.23e+03` |
| `:d` | **d** = **d**ecimal 十进制 | 整数格式 | `42` | `42` |
| `:,` | **,** = **c**omma 逗号 | 千位分隔符 | `1234567` | `1,234,567` |
| `:08d` | **0** = zero **p**adding 补零 | 补零到8位 | `42` | `00000042` |
| `:>10` | **>** = **r**ight 右箭头 | 右对齐到10位 | `"hello"` | `"     hello"` |
| `:<10` | **<** = **l**eft 左箭头 | 左对齐到10位 | `"hello"` | `"hello     "` |
| `:^10` | **^** = **c**enter 居中 | 居中对齐到10位 | `"hello"` | `"  hello   "` |

### f-string 高级用法

f-string 可以包含表达式、函数调用和复杂的格式化选项：

```python runner
price = 59
tax = 0.25
fruit = "apples"

# 表达式计算结合格式化
total = f"Total: ${price + (price * tax):.2f}"
print(total)

# 条件表达式
price_level = f"It is {'Expensive' if price > 50 else 'Cheap'}"
print(price_level)

# 调用方法
message = f"I love {fruit.upper()}"
print(message)

# 调用自定义函数
def feet_to_meters(feet):
    return feet * 0.3048

altitude = f"Flying at {feet_to_meters(30000):.2f} meters"
print(altitude)

# 格式化日期时间
from datetime import datetime
now = datetime.now()
print(f"当前时间: {now:%Y-%m-%d %H:%M:%S}")

# 复杂表达式和格式化
numbers = [1, 2, 3, 4, 5]
print(f"列表长度: {len(numbers)}, 平均值: {sum(numbers)/len(numbers):.1f}")
```

### format() vs f-string 对比

```python runner
name = "张三"
score = 95.6789

# format() 方法
format_result = "学生 {} 的成绩是 {:.2f} 分".format(name, score)
print("format():", format_result)

# f-string 方法（推荐）
fstring_result = f"学生 {name} 的成绩是 {score:.2f} 分"
print("f-string:", fstring_result)

# 性能：f-string 通常更快
# 可读性：f-string 更直观
# 灵活性：两者都很强大，f-string 稍占优势
```

**选择建议**：
- **优先使用 f-string**：语法简洁，性能更好，可读性强
- **使用 format() 的场景**：需要重复使用模板字符串，或在旧版本 Python 中工作

**与 JavaScript 对比**：
- **JavaScript**：需要调用 `toFixed()`、手动计算百分比等
- **Python**：内置丰富的格式化选项 `:.2f`、`:.1%`、`:.2e` 等

## 序列特性

这是 Python 字符串的一个重要特性：字符串是字符序列，类似于数组。JavaScript 中字符串也可以像数组一样访问：

```javascript runner
// JavaScript 字符串索引访问
let text = "Hello, World!";
console.log(text[1]); // 输出: e
```

Python 的字符串访问方式完全相同：

```python runner
# Python 字符串索引访问
text = "Hello, World!"
print(text[1])  # 输出: e
print(text[0])  # 输出: H
```

需要注意的是，Python 没有单独的字符数据类型，单个字符实际上就是长度为 1 的字符串。

## 长度获取

在 JavaScript 中，我们使用`.length`属性来获取字符串长度：

```javascript runner
// JavaScript 获取字符串长度
let text = "Hello, World!";
console.log(text.length);  // 输出: 13
```

Python 则使用`len()`函数来获取字符串长度：

```python runner
# Python 获取字符串长度
text = "Hello, World!"
length = len(text)
print(f"字符串长度: {length}")
```

Python 的函数式方法保持了一致性，因为同样的`len()`函数也适用于列表、元组等其他数据类型，这体现了 Python 设计的统一性。

## 索引与切片

JavaScript 中使用`.slice()`方法进行切片：

```javascript runner
let text = "Hello, World!";

console.log(text.slice(2, 5));  // 输出: llo
console.log(text.slice(0, 5));  // 从开头到索引 5
console.log(text.slice(2));     // 从索引 2 到结尾
```

Python 的切片语法更简洁：

```python runner
text = "Hello, World!"

print(text[2:5])    # 输出: llo
print(text[:5])     # 从开头到索引 5
print(text[2:])     # 从索引 2 到结尾
print(text[:])      # 完整字符串副本
```

### 负索引切片

JavaScript 需要通过计算来实现：

```javascript runner
let text = "Hello, World!";

console.log(text[text.length - 1]);           // 最后一个字符
console.log(text.slice(-5, -2));              // 倒数第 5 到倒数第 2 个字符
console.log(text.slice(0, -2));               // 除了最后 2 个字符
```

Python 的负索引更直观：

```python runner
text = "Hello, World!"

print(text[-1])     # 最后一个字符: !
print(text[-5:-2])  # 倒数第 5 到倒数第 2 个字符
print(text[:-2])    # 除了最后 2 个字符的所有字符
```

## 遍历操作

JavaScript 中使用 for 循环遍历：

```javascript runner
let text = "banana";
for (let char of text) {
    console.log(char);
}
```

Python 的语法更简洁：

```python runner
for char in "banana":
    print(char)
```

## 子字符串检查

JavaScript 中我们使用`.includes()`方法检查子字符串：

```javascript runner
// JavaScript 检查子字符串
let text = "The best things in life are free!";

console.log(text.includes("free"));      // 输出: true
console.log(text.includes("expensive")); // 输出: false
```

Python 使用更直观的`in`关键字：

```python runner
text = "The best things in life are free!"

print("free" in text)      # 输出: True
print("expensive" in text) # 输出: False
```

### 在条件语句中使用

JavaScript 中的条件检查：

```javascript runner
let text = "The best things in life are free!";

if (text.includes("free")) {
    console.log("Yes, 'free' is present.");
}

if (!text.includes("expensive")) {
    console.log("No, 'expensive' is NOT present.");
}
```

Python 的条件检查更简洁：

```python runner
text = "The best things in life are free!"

if "free" in text:
    print("Yes, 'free' is present.")

if "expensive" not in text:
    print("No, 'expensive' is NOT present.")
```

`in`和`not in`关键字让代码读起来更像自然语言，这是 Python 的一大优势。

## 修改操作

### 大小写转换

JavaScript 的大小写转换：

```javascript runner
let text = "Hello World";

console.log(text.toUpperCase());  // 全部大写
console.log(text.toLowerCase());  // 全部小写
```

Python 提供了更丰富的大小写转换选项：

```python runner
text = "Hello World"

print(text.upper())      # 全部大写
print(text.lower())      # 全部小写
print(text.capitalize()) # 首字母大写
print(text.title())      # 每个单词首字母大写
```

### 去除空白

JavaScript 的空白处理：

```javascript runner
let text = "  Hello World  ";

console.log(`原字符串: '${text}'`);
console.log(`去除两端空白: '${text.trim()}'`);
console.log(`去除左端空白: '${text.trimStart()}'`);
console.log(`去除右端空白: '${text.trimEnd()}'`);
```

Python 提供了类似功能：

```python runner
text = "  Hello World  "

print(f"原字符串: '{text}'")
print(f"去除两端空白: '{text.strip()}'")
print(f"去除左端空白: '{text.lstrip()}'")
print(f"去除右端空白: '{text.rstrip()}'")
```

### 字符串替换

JavaScript 中，`replace()` 默认只替换第一个匹配项，需要使用 `replaceAll()` 或正则表达式替换全部：

```javascript runner
let text = "Hello World, Hello Universe";

console.log("=== JavaScript 替换 ===");
console.log("replace():", text.replace("Hello", "Hi"));        // 只替换第一个
console.log("replaceAll():", text.replaceAll("Hello", "Hi"));  // 替换全部

// 使用正则表达式全局替换
console.log("正则全局:", text.replace(/Hello/g, "Hi"));
```

Python 的 `replace()` 方法默认就会替换所有匹配项，更符合直觉：

```python runner
text = "Hello World, Hello Universe"

print("=== Python 替换 ===")
print("默认替换全部:", text.replace("Hello", "Hi"))

# 可以限制替换次数
print("只替换一次:", text.replace("Hello", "Hi", 1))
print("替换两次:", text.replace("Hello", "Hi", 2))

print("原字符串不变:", text)
```

## 拼接操作

JavaScript 中使用`+`操作符、`+=`操作符或模板字面量进行拼接：

```javascript runner
let firstName = "John";
let lastName = "Doe";
let age = 25;

// + 操作符拼接
let fullName1 = firstName + " " + lastName;

// += 操作符拼接
let message = "Hello";
message += " ";
message += "World";

// 模板字面量（推荐）
let intro = `Hi, I'm ${firstName} ${lastName}, ${age} years old.`;

console.log(fullName1);
console.log(message);
console.log(intro);
```

Python 支持相似的拼接方式，另外还有三引号多行拼接：

```python runner
first_name = "John"
last_name = "Doe"
age = 25

# + 操作符拼接
full_name1 = first_name + " " + last_name

# += 操作符拼接
message = "Hello"
message += " "
message += "World"

# f-string 格式化（推荐）
intro = f"Hi, I'm {first_name} {last_name}, {age} years old."

print(full_name1)
print(message)
print(intro)
```

## 查找与检查

JavaScript 的查找方法：

```javascript runner
let text = "Hello World Programming";

console.log(text.indexOf("World"));       // 返回索引，找不到返回-1
console.log(text.startsWith("Hello"));    // 检查开头
console.log(text.endsWith("ing"));        // 检查结尾
```

Python 提供了更多选项：

```python runner
text = "Hello World Programming"

print(text.find("World"))        # 返回索引，找不到返回-1
print(text.index("World"))       # 返回索引，找不到抛出异常
print(text.startswith("Hello"))  # 检查开头
print(text.endswith("ing"))      # 检查结尾
```

## 分割与连接

JavaScript 的分割和连接：

```javascript runner
let text = "apple,banana,orange";

// 分割字符串
let fruits = text.split(",");
console.log(fruits);

// 连接字符串数组
let result = fruits.join(" | ");
console.log(result);
```

Python 的分割和连接语法相似，但注意 `join()` 方法的调用方式相反：

```python runner
text = "apple,banana,orange"

fruits = text.split(",")
print(fruits)

# 注意：Python 是字符串调用 join() 方法，JavaScript 是数组调用
result = " | ".join(fruits)
print(result)
```

## 字符类型判断

JavaScript 需要使用正则表达式：

```javascript runner
console.log(/^\d+$/.test("123"));         // 是否全为数字
console.log(/^[a-zA-Z]+$/.test("abc"));   // 是否全为字母
console.log(/^[a-zA-Z0-9]+$/.test("abc123")); // 是否为字母和数字
```

Python 提供了便捷的内置方法：

```python runner
print("123".isdigit())           # 是否全为数字
print("abc".isalpha())           # 是否全为字母
print("abc123".isalnum())        # 是否全为字母和数字
print("Hello World".istitle())   # 是否为标题格式（每个单词首字母大写）
```

## 转义字符

转义字符是用反斜杠 `\` 开头的特殊字符序列，用来表示一些无法直接输入或有特殊含义的字符，比如换行符、制表符、引号等。

JavaScript 的转义字符：

```javascript runner
let text1 = "He said, \"Hello!\"";
let text2 = 'It\'s a beautiful day';
let text3 = "First line\nSecond line";
let text4 = "Column1\tColumn2";
let text5 = "Path: C:\\Users\\Documents";

console.log(text1);
console.log(text2);
console.log(text3);
console.log(text4);
console.log(text5);
```

Python 的转义字符用法相同：

```python runner
text1 = "He said, \"Hello!\""
text2 = 'It\'s a beautiful day'
text3 = "First line\nSecond line"
text4 = "Column1\tColumn2"
text5 = "Path: C:\\Users\\Documents"

print(text1)
print(text2)
print(text3)
print(text4)
print(text5)
```

## 重复操作

JavaScript 使用`.repeat()`方法：

```javascript runner
let separator = "-".repeat(20);
console.log(separator);

let greeting = "Hello! ".repeat(3);
console.log(greeting);
```

Python 使用`*`操作符更简洁：

```python runner
separator = "-" * 20
print(separator)

greeting = "Hello! " * 3
print(greeting)

title = "Python Tutorial"
border = "=" * len(title)
print(border)
print(title)
print(border)
```

## 小结

Python 字符串提供了强大而直观的文本处理能力：

**核心特性**：
- **不可变性**：字符串创建后不可修改，所有操作返回新字符串
- **序列操作**：支持索引访问 `text[0]` 和切片 `text[1:5]`，负索引更方便
- **格式化**：f-string 语法简洁，功能强大，是首选方案

**易与 JavaScript 混淆的点**：
- `len(text)` 获取长度，而非 `.length` 属性
- `"substring" in text` 检查子字符串，比 `.includes()` 更直观
- `replace()` 默认全局替换，无需 `replaceAll()`
- `" | ".join(list)` 连接方式与 `array.join()` 相反

**常用方法速查表**：

| 方法 | 描述 | 示例 |
|------|------|------|
| `len(text)` | 获取字符串长度（函数调用） | `len("hello")` → `5` |
| `text[index]` | 索引访问字符（支持负索引） | `"hello"[1]` → `'e'` |
| `text[start:end]` | 切片操作（左闭右开） | `"hello"[1:4]` → `'ell'` |
| `"sub" in text` | 检查子字符串 | `"ll" in "hello"` → `True` |
| `text.upper()` | 转为大写 | `"hello".upper()` → `'HELLO'` |
| `text.lower()` | 转为小写 | `"HELLO".lower()` → `'hello'` |
| `text.title()` | 标题格式（每个单词首字母大写） | `"hello world".title()` → `'Hello World'` |
| `text.strip()` | 去除两端空白 | `" hello ".strip()` → `'hello'` |
| `text.replace(old, new)` | 字符串替换（默认全局） | `"hi hi".replace("hi", "bye")` → `'bye bye'` |
| `text.split(sep)` | 分割字符串为列表 | `"a,b,c".split(",")` → `['a', 'b', 'c']` |
| `sep.join(list)` | 连接列表为字符串（字符串调用） | `",".join(['a', 'b'])` → `'a,b'` |
| `text.find(sub)` | 查找子字符串位置（未找到返回 -1） | `"hello".find("ll")` → `2` |
| `text.startswith(prefix)` | 检查开头 | `"hello".startswith("he")` → `True` |
| `text.endswith(suffix)` | 检查结尾 | `"hello".endswith("lo")` → `True` |
| `text.isdigit()` | 是否全为数字 | `"123".isdigit()` → `True` |
| `text.isalpha()` | 是否全为字母 | `"abc".isalpha()` → `True` |
| `text * n` | 重复字符串 | `"hi" * 3` → `'hihihi'` |
| `f"text {var}"` | f-string 格式化（推荐） | `f"Hello {name}"` |

## 练习

处理用户输入数据，输出用户卡片：

```
=========================
    👤 用户信息卡片
=========================
姓名: Zhang Wei
昵称: ZW
邮箱: zhang.wei@gmail.com
手机: 138 0013 8000
=========================
```

```python runner
# 用户输入数据
raw_name = "  zhang wei  "
raw_email = "ZHANG.WEI@gmail.com  "
raw_phone = "138-0013-8000"

# 处理数据并输出用户卡片

```

::: details 点击查看参考答案
```python runner
# 用户输入数据（模拟表单提交）
raw_name = "  zhang wei  "
raw_email = "ZHANG.WEI@gmail.com  "
raw_phone = "138-0013-8000"

# 清理和格式化数据
clean_name = raw_name.strip().title()
clean_email = raw_email.strip().lower()

# 处理手机号
phone_digits = raw_phone.replace("-", "")
formatted_phone = f"{phone_digits[:3]} {phone_digits[3:7]} {phone_digits[7:]}"

# 生成昵称
name_parts = clean_name.split()
display_name = name_parts[0][0] + name_parts[1][0].upper()

# 生成用户卡片
border = "=" * 25
print(f"""{border}
    👤 用户信息卡片
{border}
姓名: {clean_name}
昵称: {display_name}
邮箱: {clean_email}
手机: {formatted_phone}
{border}""")
```
:::
