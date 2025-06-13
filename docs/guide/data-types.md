# 数据类型

在JavaScript中，我们有基本类型（`number`、`string`、`boolean`、`undefined`、`null`、`symbol`）和引用类型（`object`，包括数组、函数等）。Python也有数据类型的概念，但分类方式和JavaScript不同，更加细致和清晰。

## 对比JavaScript

Python和JavaScript在类型系统设计上有重要差异：

**JavaScript的类型系统**：
- 分为**基础类型**（number, string, boolean, null, undefined）和**引用类型**（object, array, function）
- 基础类型按值传递，引用类型按引用传递
- 有很多隐式类型转换，有时会产生意外结果

**Python的类型系统**：
- **所有数据都是对象**，没有基础类型和引用类型的区别
- 更重要的是 **可变（mutable）** 和 **不可变（immutable）** 的区别
- 很少有隐式转换，大多需要显式转换，更加安全可预测

## 可变性：Python的核心概念

Python中，数据类型按可变性分为两大类：

**不可变类型（Immutable）**：
- 一旦创建，内容不能修改
- 包括：`int`、`float`、`str`、`bool`、`tuple`、`frozenset`
- 类似于JavaScript中的字符串，修改时会创建新对象

**可变类型（Mutable）**：
- 创建后可修改内容
- 包括：`list`、`dict`、`set`
- 类似于JavaScript中的数组和对象

```python runner
# 不可变类型示例
name = "Alice"
original_name = name
name = name + " Smith"  # 创建了新字符串对象
print(f"原始值: {original_name}")  # Alice
print(f"修改后: {name}")           # Alice Smith

# 可变类型示例  
friends = ["Bob", "Charlie"]
original_friends = friends
friends.append("Dave")  # 修改原对象
print(f"原始引用: {original_friends}")  # ['Bob', 'Charlie', 'Dave']
print(f"当前值: {friends}")            # ['Bob', 'Charlie', 'Dave']
```

## 内置数据类型

Python默认包含以下几类数据类型：

| 类型分类 | 数据类型 | 可变性 |
|----------|----------|--------|
| 文本类型 | `str` | 不可变 |
| 数值类型 | `int`, `float`, `complex` | 不可变 |
| 序列类型 | `list`, `tuple`, `range` | list可变，其他不可变 |
| 映射类型 | `dict` | 可变 |
| 集合类型 | `set`, `frozenset` | set可变，frozenset不可变 |
| 布尔类型 | `bool` | 不可变 |
| 二进制类型 | `bytes`, `bytearray`, `memoryview` | bytes不可变，其他可变 |
| 空值类型 | `NoneType` | 不可变 |

## 获取数据类型

就像JavaScript中使用`typeof`一样，Python使用`type()`函数来查看数据类型：

```python runner
# 获取变量的数据类型
x = 5
print(type(x))           # <class 'int'>

y = "Hello World"
print(type(y))           # <class 'str'>

z = [1, 2, 3]
print(type(z))           # <class 'list'>
```

## 数据类型的自动识别

在JavaScript中，变量的类型是在赋值时确定的，Python也是如此：

```python runner
# Python会根据赋值自动确定数据类型
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

print(f"str构造: {x} ({type(x).__name__})")
print(f"int构造: {y} ({type(y).__name__})")
print(f"float构造: {z} ({type(z).__name__})")
print(f"bool构造: {g} ({type(g).__name__})")
```

## 类型检查

在实际编程中，我们经常需要检查变量的类型。Python提供了两种主要方式：`type()`和`isinstance()`。推荐使用`isinstance()`函数，因为它能正确处理继承关系，更加安全可靠。

`isinstance()`可以检查单一类型，也可以同时检查多种类型，非常灵活：

```python runner
# isinstance() - 推荐的类型检查方式
number = 42
text = "hello"
items = [1, 2, 3]

# 检查单一类型
print(f"number是整数吗? {isinstance(number, int)}")
print(f"text是字符串吗? {isinstance(text, str)}")

# 检查多种类型
print(f"number是数值类型吗? {isinstance(number, (int, float))}")
```

检查`None`值有特殊的语法。JavaScript中我们用`=== null`，Python中应该使用`is None`：

```python runner
# 检查None值 - 使用is而不是==
empty_value = None
number = 42

print(f"empty_value是None吗? {empty_value is None}")      # 推荐写法
print(f"number不是None吗? {number is not None}")          # 推荐写法
print(f"用==检查None: {empty_value == None}")              # 不推荐，但能工作

# 为什么要用is？因为None是单例对象
print(f"None的id: {id(None)}")
print(f"另一个None的id: {id(None)}")  # 总是相同的id
```

`isinstance()`相比`type()`的优势在于能正确处理继承关系：

```python runner
# isinstance vs type的区别
class MyList(list):
    pass

my_list = MyList([1, 2, 3])
print(f"type(my_list) == list: {type(my_list) == list}")        # False
print(f"isinstance(my_list, list): {isinstance(my_list, list)}")  # True (推荐)
```

## 类型转换

与JavaScript的隐式转换不同，Python主要依赖显式转换，这让代码更加安全和可预测。JavaScript中经常出现的`"5" + 3 = "53"`这样的意外结果，在Python中需要明确指定转换方式：

```javascript runner
// JavaScript的隐式转换（有时令人困惑）
console.log("5" + 3);    // "53" 字符串拼接
console.log("5" - 3);    // 2   数值运算
console.log(5 + true);   // 6   true转为1
```

```python runner
# Python的显式转换（更清晰）
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

Python的数据类型体系与JavaScript有显著差异，主要体现在：

1. **类型系统差异**：Python中所有数据都是对象，更关注可变性而非基础类型vs引用类型
2. **可变性概念**：不可变类型（int、str、tuple等）创建后不可修改，可变类型（list、dict、set等）可以修改内容
3. **类型识别**：`type()`函数查看类型，`isinstance()`函数进行类型检查（推荐）
4. **显式转换**：Python避免隐式转换，通过构造函数进行明确的类型转换
5. **更细致的分类**：数值类型分为int、float、complex，序列类型包含list、tuple、range等
6. **内置集合支持**：set和frozenset提供高效的集合操作
7. **类型安全**：较少的隐式转换规则让代码行为更可预测

理解这些概念，特别是可变性和类型检查，是掌握Python编程的重要基础。在后续章节中，我们将深入学习每种具体类型的用法和特性。 