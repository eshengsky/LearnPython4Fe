# 数据类型

在 JavaScript 中，我们有基本类型（`number`、`string`、`boolean`、`undefined`、`null`、`symbol`）和引用类型（`object`，包括数组、函数等）。Python 也有数据类型的概念，但分类方式和 JavaScript 不同，更加细致和清晰。

## 对比 JavaScript

Python 和 JavaScript 在类型系统设计上有重要差异：

**JavaScript 的类型系统**：
- 分为**基础类型**（number, string, boolean, null, undefined）和**引用类型**（object, array, function）
- 基础类型按值传递，引用类型按引用传递
- 有很多隐式类型转换，有时会产生意外结果

**Python 的类型系统**：
- **所有数据都是对象**，没有基础类型和引用类型的区别
- 更重要的是 **可变（mutable）** 和 **不可变（immutable）** 的区别
- 很少有隐式转换，大多需要显式转换，更加安全可预测

## 可变性：Python 的核心概念

Python 中，数据类型按可变性分为两大类。理解这个概念的关键是：**变量只是指向对象的标签，可变性说的是对象本身能否被修改**。

**不可变类型（Immutable）**：
- 对象一旦创建，**对象内容**不能修改
- 包括：`int`、`float`、`str`、`bool`、`tuple`、`frozenset`
- 变量可以指向新对象，但原对象不变

**可变类型（Mutable）**：
- 对象创建后，**对象内容**可以修改
- 包括：`list`、`dict`、`set`
- 可以直接修改对象内部的数据

让我们用具体例子来理解这个概念：

```python runner
# 不可变类型：整数
print("=== 不可变类型：整数 ===")
age = 10
print(f"age 指向的对象 id: {id(age)}")
age = 20  # 这不是修改原对象，而是让 age 指向新对象
print(f"age 指向的对象 id: {id(age)}")  # 不同的 id，说明是新对象
print("整数 10 和 20 是不同的对象，10 没有被修改")

# 不可变类型：字符串
print("\n=== 不可变类型：字符串 ===")
name = "Alice"
original_id = id(name)
name = name + " Smith"  # 创建新字符串对象
print(f"原字符串对象还存在，id 改变了: {id(name) != original_id}")

# 可变类型：列表
print("\n=== 可变类型：列表 ===")  
friends = ["Bob", "Charlie"]
original_id = id(friends)
friends.append("Dave")  # 修改原对象内容
print(f"列表对象本身没变，id 相同: {id(friends) == original_id}")
print(f"但内容被修改了: {friends}")
```

再看一个更清楚的对比：

```python runner
# 演示变量赋值 vs 对象修改的区别
print("=== 变量赋值（创建新对象）===")
x = [1, 2, 3]
y = x          # y 和 x 指向同一个列表对象
x = [4, 5, 6]  # x 指向新对象，y 还指向原对象
print(f"x: {x}")  # [4, 5, 6]
print(f"y: {y}")  # [1, 2, 3] - 原对象没变

print("\n=== 对象修改（修改对象内容）===")
a = [1, 2, 3]
b = a          # b 和 a 指向同一个列表对象  
a.append(4)    # 修改对象内容，不是创建新对象
print(f"a: {a}")  # [1, 2, 3, 4]
print(f"b: {b}")  # [1, 2, 3, 4] - 同一个对象被修改了
```

这就像 JavaScript 中的基本类型 vs 引用类型：

```javascript runner
// JavaScript 中的类似概念
// 基本类型 - 类似 Python 的不可变类型
let num1 = 10;
let num2 = num1;
num1 = 20;
console.log('num1:', num1); // 20
console.log('num2:', num2); // 10 - 原值不变

// 引用类型 - 类似 Python 的可变类型
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr1.push(4);
console.log('arr1:', arr1); // [1, 2, 3, 4]
console.log('arr2:', arr2); // [1, 2, 3, 4] - 同一个对象
```

## 内置数据类型

Python 默认包含以下几类数据类型：

| 类型分类 | 数据类型 | 可变性 |
|----------|----------|--------|
| 文本类型 | `str` | 不可变 |
| 数值类型 | `int`, `float`, `complex` | 不可变 |
| 序列类型 | `list`, `tuple`, `range` | list 可变，其他不可变 |
| 映射类型 | `dict` | 可变 |
| 集合类型 | `set`, `frozenset` | set 可变，frozenset 不可变 |
| 布尔类型 | `bool` | 不可变 |
| 二进制类型 | `bytes`, `bytearray`, `memoryview` | bytes 不可变，其他可变 |
| 空值类型 | `NoneType` | 不可变 |

## 获取数据类型

就像 JavaScript 中使用`typeof`一样，Python 使用`type()`函数来查看数据类型：

```python runner
# 获取变量的数据类型
x = 5
print(type(x))           # <class 'int'>

y = "Hello World"
print(type(y))           # <class 'str'>

z = [1, 2, 3]
print(type(z))           # <class 'list'>
```

`type()` 返回的是类对象，形如 `<class 'int'>`，这种格式不够直观，也无法直接进行字符串比较。如果需要获取类型名称的字符串形式，可以使用 `type().__name__`：

```python runner
# 使用 type().__name__ 获取类型名称字符串
x = 5
y = "Hello World"
z = [1, 2, 3]

print(f"x 的类型: {type(x).__name__}")      # int
print(f"y 的类型: {type(y).__name__}")      # str  
print(f"z 的类型: {type(z).__name__}")      # list

# 这样就可以进行字符串比较了
if type(x).__name__ == 'int':
    print("x 是整数类型")

# 但更推荐使用 isinstance() 进行类型检查
if isinstance(x, int):
    print("推荐的方式：x 是整数类型")
```

## 数据类型的自动识别

在 JavaScript 中，变量的类型是在赋值时确定的，Python 也是如此：

```python runner
# Python 会根据赋值自动确定数据类型
x = "Hello World"        # str
y = 20                   # int  
z = 20.5                 # float
a = 1j                   # complex
b = ["apple", "banana"]  # list
c = ("apple", "banana")  # tuple
d = range(6)             # range
e = {"name": "John"}     # dict
f = {"apple", "banana"}  # set
g = True                 # bool
h = b"Hello"             # bytes
i = None                 # NoneType

# 查看各种类型
variables = [x, y, z, a, b, c, d, e, f, g, h, i]
for var in variables:
    print(f"{repr(var):>20} -> {type(var).__name__}")
```

## 显式指定数据类型

有时我们想要明确指定变量的数据类型，可以使用构造函数：

```python runner
# 使用构造函数显式创建特定类型
x = str("Hello World")       # 强制转为字符串
y = int(20)                  # 强制转为整数
z = float(20.5)              # 强制转为浮点数
a = complex(1j)              # 创建复数
b = list(("apple", "banana")) # 创建列表
c = tuple(("apple", "banana")) # 创建元组
d = range(6)                 # 创建范围对象
e = dict(name="John", age=36) # 创建字典
f = set(("apple", "banana"))  # 创建集合
g = bool(5)                  # 转为布尔值
h = bytes(5)                 # 创建字节对象

print(f"str 构造: {x} ({type(x).__name__})")
print(f"int 构造: {y} ({type(y).__name__})")
print(f"float 构造: {z} ({type(z).__name__})")
print(f"bool 构造: {g} ({type(g).__name__})")
```

## 类型检查

在实际编程中，我们经常需要检查变量的类型。Python 提供了两种主要方式：`type()`和`isinstance()`。推荐使用`isinstance()`函数，因为它能正确处理继承关系，更加安全可靠。

`isinstance()`可以检查单一类型，也可以同时检查多种类型，非常灵活：

```python runner
# isinstance() - 推荐的类型检查方式
number = 42
text = "hello"
items = [1, 2, 3]

# 检查单一类型
print(f"number 是整数吗? {isinstance(number, int)}")
print(f"text 是字符串吗? {isinstance(text, str)}")

# 检查多种类型
print(f"number 是数值类型吗? {isinstance(number, (int, float))}")
```

检查`None`值有特殊的语法。JavaScript 中我们用`=== null`，Python 中应该使用`is None`：

```python runner
# 检查 None 值 - 使用 is 而不是==
empty_value = None
number = 42

print(f"empty_value 是 None 吗? {empty_value is None}")      # 推荐写法
print(f"number 不是 None 吗? {number is not None}")          # 推荐写法
print(f"用==检查 None: {empty_value == None}")              # 不推荐，但能工作

# 为什么要用 is？因为 None 是单例对象
print(f"None 的 id: {id(None)}")
print(f"另一个 None 的 id: {id(None)}")  # 总是相同的 id
```

`isinstance()`相比`type()`的优势在于能正确处理继承关系：

```python runner
# isinstance vs type 的区别
class MyList(list):
    pass

my_list = MyList([1, 2, 3])
print(f"type(my_list) == list: {type(my_list) == list}")        # False
print(f"isinstance(my_list, list): {isinstance(my_list, list)}")  # True (推荐)
```

## 类型转换

与 JavaScript 的隐式转换不同，Python 主要依赖显式转换，这让代码更加安全和可预测。JavaScript 中经常出现的`"5" + 3 = "53"`这样的意外结果，在 Python 中需要明确指定转换方式：

```javascript runner
// JavaScript 的隐式转换（有时令人困惑）
console.log("5" + 3);    // "53" 字符串拼接
console.log("5" - 3);    // 2   数值运算
console.log(5 + true);   // 6   true 转为 1
```

```python runner
# Python 的显式转换（更清晰）
# 字符串转数字
num_str = "123"
num = int(num_str)
print(f"'{num_str}' -> {num} ({type(num).__name__})")

# 数字转字符串
number = 456
text = str(number)
print(f"{number} -> '{text}' ({type(text).__name__})")

# 列表转元组
my_list = [1, 2, 3]
my_tuple = tuple(my_list)
print(f"{my_list} -> {my_tuple} ({type(my_tuple).__name__})")

# 布尔转换
print(f"bool(1): {bool(1)}")      # True
print(f"bool(0): {bool(0)}")      # False  
print(f"bool(''): {bool('')}")    # False (空字符串)
print(f"bool([]): {bool([])}")    # False (空列表)
```

## 小结

Python 的数据类型体系与 JavaScript 有显著差异，主要体现在：

1. **类型系统差异**：Python 中所有数据都是对象，更关注可变性而非基础类型 vs 引用类型
2. **可变性概念**：不可变类型（int、str、tuple 等）创建后不可修改，可变类型（list、dict、set 等）可以修改内容
3. **类型识别**：`type()`函数查看类型，`isinstance()`函数进行类型检查（推荐）
4. **显式转换**：Python 避免隐式转换，通过构造函数进行明确的类型转换
5. **更细致的分类**：数值类型分为 int、float、complex，序列类型包含 list、tuple、range 等
6. **内置集合支持**：set 和 frozenset 提供高效的集合操作
7. **类型安全**：较少的隐式转换规则让代码行为更可预测

理解这些概念，特别是可变性和类型检查，是掌握 Python 编程的重要基础。在后续章节中，我们将深入学习每种具体类型的用法和特性。

## 练习

创建不同类型的变量，练习类型检查和转换：

```python runner
# 1. 创建各种类型的变量
number = 42
price = 99.99
name = "Python"
skills = ["JavaScript", "Python"]
empty_value = None

# 2. 输出每个变量的类型名称（使用 type().__name__）
# 期望输出：number 的类型: int


# 3. 检查 number 是否为数值类型，name 是否为字符串类型
# 期望输出：number 是数值类型: True


# 4. 创建两个变量指向同一个列表，修改其中一个，观察另一个的变化
# 期望看到：两个变量都发生了变化


# 5. 将字符串 "123" 转为整数，将 price 转为字符串并输出
# 期望输出："123" -> 123 (int)


# 6. 检查 empty_value 是否为 None，number 是否不为 None
# 期望输出：empty_value 是 None: True


```

::: details 点击查看参考答案
```python runner
# 1. 创建各种类型的变量
number = 42
price = 99.99
name = "Python"
skills = ["JavaScript", "Python"]
empty_value = None

# 2. 使用 type() 和 type().__name__ 查看类型
print("=== 类型查看 ===")
print(f"number 的类型: {type(number).__name__}")
print(f"price 的类型: {type(price).__name__}")
print(f"name 的类型: {type(name).__name__}")
print(f"skills 的类型: {type(skills).__name__}")

# 3. 使用 isinstance() 进行类型检查
print("\n=== 类型检查 ===")
print(f"number 是数值类型: {isinstance(number, (int, float))}")
print(f"name 是字符串: {isinstance(name, str)}")
print(f"skills 是列表: {isinstance(skills, list)}")

# 4. 演示可变性差异
print("\n=== 可变性演示 ===")
list1 = [1, 2, 3]
list2 = list1  # 指向同一个对象
list1.append(4)
print(f"list1: {list1}")  # [1, 2, 3, 4]
print(f"list2: {list2}")  # [1, 2, 3, 4] - 同一个对象被修改

# 5. 进行类型转换
print("\n=== 类型转换 ===")
str_number = "123"
converted_int = int(str_number)
print(f'"{str_number}" -> {converted_int} ({type(converted_int).__name__})')

converted_str = str(price)
print(f'{price} -> "{converted_str}" ({type(converted_str).__name__})')

# 6. 检查 None 值
print("\n=== None 值检查 ===")
print(f"empty_value 是 None: {empty_value is None}")
print(f"number 不是 None: {number is not None}")
```
:::
