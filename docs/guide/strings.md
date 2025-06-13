# 字符串

字符串是编程中最常用的数据类型之一，用于存储和处理文本数据。在前端开发中，我们经常使用 JavaScript 的字符串来处理 DOM 内容、API 响应等，而 Python 的字符串在数据处理、文件操作等方面同样强大。

## 创建

在 JavaScript 中，我们可以使用单引号、双引号或反引号来创建字符串：

```javascript runner
// JavaScript 字符串创建
let message1 = 'Hello World';
let message2 = "Hello World";
let message3 = `Hello World`;

console.log(message1);
console.log(message2);
console.log(message3);
```

Python 的字符串创建方式类似，但更加灵活：

```python runner
# Python 字符串创建
message1 = 'Hello World'
message2 = "Hello World"

print(message1)
print(message2)
```

### 引号的灵活使用

Python 允许我们巧妙地混合使用单引号和双引号：

```python runner
# 在字符串中包含引号
text1 = "It's alright"
text2 = "He is called 'Johnny'"
text3 = 'He is called "Johnny"'

print(text1)
print(text2)
print(text3)
```

### 多行字符串

JavaScript 使用模板字面量（反引号）来创建多行字符串，而 Python 提供了三重引号的优雅方式：

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

## 赋值

```python runner
name = "Python"
print(name)
```

## 字符串序列特性

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

## 遍历

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

## 长度

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

## 检查子字符串

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

## 切片

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
print(text[-5:-2])  # 倒数第 5 到倒数第 2 个字符: rld
print(text[:-2])    # 除了最后 2 个字符的所有字符
```

## 字符串修改

虽然 JavaScript 和 Python 的字符串都是不可变的，但 Python 提供了丰富的字符串方法：

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

JavaScript 的字符串替换：

```javascript runner
let text = "Hello World";

let newText = text.replace("World", "Python");
console.log(newText);
console.log(text); // 原字符串不变
```

Python 的字符串替换方式相同：

```python runner
text = "Hello World"

new_text = text.replace("World", "Python")
print(new_text)
print(text)  # 原字符串不变
```

## 字符串拼接

JavaScript 中我们使用`+`操作符或模板字面量进行拼接：

```javascript runner
// JavaScript 字符串拼接
let firstName = "John";
let lastName = "Doe";

let fullName1 = firstName + " " + lastName;
let fullName2 = `${firstName} ${lastName}`;

console.log(fullName1);
console.log(fullName2);
```

Python 也支持多种拼接方式：

### 使用 + 操作符

```python runner
first_name = "John"
last_name = "Doe"

full_name = first_name + " " + last_name
print(full_name)
```

### 使用 += 操作符

JavaScript 中同样支持：

```javascript runner
let message = "Hello";
message += " ";
message += "World";
console.log(message);
```

Python 的用法相同：

```python runner
message = "Hello"
message += " "
message += "World"
print(message)
```

## 字符串格式化

### 基本语法对比

JavaScript ES6 引入了模板字面量（反引号语法）来处理字符串格式化：

```javascript runner
// JavaScript 模板字符串
let name = "Alice";
let age = 25;
let price = 19.99;

let message = `Hello, ${name}! You are ${age} years old.`;
console.log(message);

// 格式化数字
let formattedPrice = `Price: $${price.toFixed(2)}`;
console.log(formattedPrice);
```

Python 的 f-string 语法与 JavaScript 的模板字符串非常相似，但格式化选项更丰富：

```python runner
name = "Alice"
age = 25
price = 19.99

# f-string 语法（Python 3.6+）
message = f"Hello, {name}! You are {age} years old."
print(message)

# 格式化数字 - 注意 Python 的格式化语法更丰富
formatted_price = f"Price: ${price:.2f}"
print(formatted_price)
```

### 高级用法

两种语法都支持在格式化字符串中进行表达式计算、函数调用等高级操作，但 Python 的 f-string 在格式化控制方面更强大：

```javascript runner
// JavaScript 高级用法
let price = 59;
let tax = 0.25;
let fruit = "apples";

// 表达式计算
let total = `Total: $${(price + price * tax).toFixed(2)}`;
console.log(total);

// 条件表达式
let priceLevel = `It is ${price > 50 ? 'Expensive' : 'Cheap'}`;
console.log(priceLevel);

// 调用方法
let message = `I love ${fruit.toUpperCase()}`;
console.log(message);

// 调用自定义函数
function feetToMeters(feet) {
    return feet * 0.3048;
}
let altitude = `Flying at ${feetToMeters(30000).toFixed(2)} meters`;
console.log(altitude);
```

```python runner
price = 59
tax = 0.25
fruit = "apples"

# 表达式计算 - 内置格式化更简洁
total = f"Total: ${price + (price * tax):.2f}"
print(total)

# 条件表达式
price_level = f"It is {'Expensive' if price > 50 else 'Cheap'}"
print(price_level)

# 调用方法
message = f"I love {fruit.upper()}"
print(message)

# 调用自定义函数 - 格式化语法更直观
def feet_to_meters(feet):
    return feet * 0.3048

altitude = f"Flying at {feet_to_meters(30000):.2f} meters"
print(altitude)

# Python f-string 的格式化优势
pi = 3.14159
print(f"圆周率: {pi:.3f}")        # 保留 3 位小数
print(f"百分比: {0.85:.1%}")       # 百分比格式
print(f"科学计数法: {1234567:.2e}") # 科学计数法
```

Python f-string 的主要优势在于内置了丰富的格式化选项（如 `:.2f`、`:.1%`、`:.2e`），而 JavaScript 需要调用相应的方法（如 `toFixed()`、百分比需要手动计算）来实现类似效果。

## 字符串方法

Python 提供了丰富的字符串方法，比 JavaScript 更加全面：

### 查找和检查

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

### 分割和连接

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

Python 的分割和连接语法相似：

```python runner
text = "apple,banana,orange"

fruits = text.split(",")
print(fruits)

result = " | ".join(fruits)
print(result)
```

### 字符类型检查

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
print("Hello World".istitle())   # 是否为标题格式
```

## 转义字符

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

## 字符串重复

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

Python 字符串系统提供了强大而优雅的文本处理能力：

1. **创建方式灵活**：单引号、双引号、三重引号各有用途，三重引号支持多行文本
2. **不可变序列特性**：字符串一旦创建不可修改，所有操作返回新字符串对象
3. **索引和切片**：支持正负索引访问，`[start:end:step]`切片语法功能强大
4. **成员检查直观**：`in`和`not in`关键字提供简洁的子字符串检查方式
5. **方法体系完整**：内置丰富的字符串方法，涵盖大小写转换、空白处理、查找分割等常见需求
6. **格式化功能先进**：f-string 提供现代化的字符串格式化方案，支持表达式和精确格式控制
7. **操作符简洁**：`+`拼接、`*`重复，语法直观易读

**核心方法分类**：
- **变换类**：`upper()`、`lower()`、`capitalize()`、`title()`、`strip()`
- **查找类**：`find()`、`index()`、`startswith()`、`endswith()`、`count()`
- **分割类**：`split()`、`rsplit()`、`partition()`
- **连接类**：`join()`方法和`+`操作符
- **检查类**：`isdigit()`、`isalpha()`、`isalnum()`、`istitle()`等

**最佳实践建议**：
- 优先使用 f-string 进行字符串格式化
- 使用`strip()`方法处理用户输入
- 合理使用`join()`方法拼接大量字符串
- 利用字符串的不可变特性避免意外修改

掌握这些字符串操作技能，为后续学习文件处理、数据解析、Web 开发等高级主题奠定了坚实基础。 