# 变量

JavaScript 中使用`let`、`const`、`var`进行明确的变量声明，Python 则追求简洁性，直接赋值即可创建变量。两者都支持动态类型，但在类型安全和命名规范上有不同的设计哲学。

## 声明

在 JavaScript 中，我们已经习惯了明确的变量声明语法。现代 JavaScript 通过`let`、`const`和`var`来声明变量，每个关键字都有特定的作用域和行为：

```javascript runner
var globalVar = "全局变量（不推荐）";
let mutableVar = "可变变量";
const immutableVar = "不可变变量";

console.log(globalVar, mutableVar, immutableVar);

// 展示变量可变性
mutableVar = "重新赋值";
console.log("修改后:", mutableVar);

// const 变量不能重新赋值
// immutableVar = "这会报错"; // TypeError
```

JavaScript 的这种设计让我们能清楚地表达变量的可变性意图，特别是`const`关键字能防止意外的重新赋值。在前端开发中，这种明确的声明方式有助于避免变量作用域相关的 bug。

Python 采用了截然不同的哲学：**简洁胜过冗余**。在 Python 中，你无需任何声明关键字，直接赋值即可创建变量。这种设计让代码更加简洁直观：

```python runner
# Python 中直接赋值即可创建变量
global_var = "全局变量"
mutable_var = "可变变量"
immutable_var = "约定不变的变量"

print(global_var, mutable_var, immutable_var)

# Python 中的变量默认都是可变的
mutable_var = "重新赋值"
immutable_var = "技术上也可以重新赋值"
print("修改后:", mutable_var, immutable_var)
```

**Python 中的"常量"约定**

虽然 Python 没有`const`关键字，但社区有明确的约定：使用全大写的变量名来表示常量。这是一种编程约定而非语言强制：

```python runner
# Python 常量的约定写法
MAX_CONNECTIONS = 100
PI = 3.14159
API_BASE_URL = "https://api.example.com"

print(f"最大连接数: {MAX_CONNECTIONS}")
print(f"圆周率: {PI}")

# 技术上仍然可以修改，但违反了约定
# MAX_CONNECTIONS = 200  # 不推荐这样做
```

这种约定虽然不如 JavaScript 的`const`严格，但在实际开发中同样有效。Python 开发者普遍遵循这个约定，代码审查时也会检查这类问题。

## 动态类型

JavaScript 和 Python 都是动态类型语言，变量可以在运行时改变类型。但两者在类型处理上有细微差异：

```javascript runner
let dynamicVar = 42;
console.log("初始类型:", typeof dynamicVar);

dynamicVar = "现在是字符串";
console.log("新类型:", typeof dynamicVar);

dynamicVar = true;
console.log("布尔类型:", typeof dynamicVar);

dynamicVar = [1, 2, 3];
console.log("数组类型:", typeof dynamicVar); // 注意 JavaScript 中数组也是 object
```

Python 的动态类型系统更加直观，`type()`函数返回的信息更加准确：

```python runner
dynamic_var = 42
print("初始类型:", type(dynamic_var))

dynamic_var = "现在是字符串"
print("新类型:", type(dynamic_var))

dynamic_var = True
print("布尔类型:", type(dynamic_var))

dynamic_var = [1, 2, 3]
print("列表类型:", type(dynamic_var))
```

Python 的类型检查更加严格，在某些类型转换场景下会抛出错误，而 JavaScript 会进行隐式类型转换：

```python runner
# Python 在类型不匹配时会报错，避免了隐式转换的陷阱
try:
    result = "5" + 3  # Python 不会自动转换
except TypeError as e:
    print(f"类型错误: {e}")
    
# 需要显式转换
result = "5" + str(3)  # 字符串拼接
print("字符串拼接:", result)

result = int("5") + 3  # 数值计算
print("数值计算:", result)
```

对比 JavaScript 的隐式转换：

```javascript runner
// JavaScript 的隐式类型转换
console.log("5" + 3);  // "53" 字符串拼接
console.log("5" - 3);  // 2 数值计算
console.log("5" * 3);  // 15 数值计算
console.log(true + 1); // 2 布尔值转数字
```

Python 的这种严格性虽然需要更多的显式转换，但能避免很多 JavaScript 中常见的类型相关 bug。


## 多重赋值

JavaScript 支持解构赋值，这是 ES6 引入的强大特性：

```javascript runner
// JavaScript 的解构赋值
const [a, b, c] = [1, 2, 3];
console.log("数组解构:", a, b, c);

const {name, age} = {name: "张三", age: 25};
console.log("对象解构:", name, age);

// 变量交换
let x = 10, y = 20;
[x, y] = [y, x];
console.log("交换后:", x, y);

// 函数返回多个值
function getCoordinates() {
    return [100, 200];
}
const [posX, posY] = getCoordinates();
console.log("坐标:", posX, posY);
```

Python 的多重赋值功能类似但语法更加简洁，这个特性甚至比 JavaScript 的解构赋值出现得更早：

```python runner
# Python 的多重赋值
a, b, c = 1, 2, 3
print("多重赋值:", a, b, c)

# 基础解包
values = [10, 20, 30]
x, y, z = values
print("基础解包:", x, y, z)

# 变量交换（Python 的经典优雅写法）
x, y = 20, 10
x, y = y, x
print("交换后:", x, y)

# 函数返回多个值
def get_coordinates():
    return 100, 200  # 实际返回一个元组

pos_x, pos_y = get_coordinates()
print("坐标:", pos_x, pos_y)
```

这些基础的多重赋值操作是 Python 中最常用的，更高级的解包用法我们将在后续章节中详细学习。

## 变量的内存管理

作为前端开发者，你可能很少需要考虑 JavaScript 的内存管理，因为现代 JavaScript 引擎有很好的垃圾回收机制：

```javascript runner
// JavaScript 的内存管理通常是透明的
let obj1 = {name: "张三", data: [1, 2, 3]};
let obj2 = obj1;  // 引用同一个对象

console.log("对象引用:", obj1 === obj2);  // true

obj1 = null;  // 解除引用
console.log("obj1:", obj1);
console.log("obj2 仍然存在:", obj2);
```

Python 的内存管理也是自动的，但提供了更多的内省能力。Python 内置的`id()`函数可以返回对象的唯一标识符，通常表示内存地址，这让我们能够观察对象的引用关系。理解 Python 的对象模型有助于编写更高效的代码：

```python runner
# Python 的对象引用和内存管理
obj1 = {"name": "张三", "data": [1, 2, 3]}
obj2 = obj1  # 引用同一个对象

print("对象引用:", obj1 is obj2)  # True
print("对象 ID:", id(obj1), id(obj2))  # id() 显示内存地址，相同说明是同一对象

# Python 的整数对象优化机制
a = 100
b = 100
print("小整数缓存:", a is b)  # True，-5 到 256 的整数会被缓存
print("小整数 ID:", id(a), id(b))  # 相同

# Python 对整数字面量的编译时优化
c = 1000
d = 1000  
print("整数字面量:", c is d)  # True，编译时优化
print("大整数 ID:", id(c), id(d))  # 相同

# 只有运行时动态创建的整数才可能不同
e = int('1000')  # 运行时创建
f = int('1000')  # 再次运行时创建
print("动态创建整数:", e is f)  # False
print("动态创建 ID:", id(e), id(f))  # 不同
```

## 可变与不可变对象

Python 有一个重要概念：可变（mutable）和不可变（immutable）对象。这影响变量赋值的行为：

```python runner
# 不可变对象：数字、字符串、元组
x = 42
y = x
x = 100  # 创建新对象，不影响 y
print("不可变对象:", x, y)

# 可变对象：列表、字典、集合
list1 = [1, 2, 3]
list2 = list1
list1.append(4)  # 修改原对象，影响 list2
print("可变对象:", list1, list2)

# 避免这种问题的方法
list3 = [1, 2, 3]
list4 = list3.copy()  # 或 list4 = list3[:]
list3.append(4)
print("复制后:", list3, list4)
```

这种设计让 Python 在处理数据时更加明确，避免了 JavaScript 中一些隐式的行为。

## 小结

Python 变量管理体现了"简洁胜过复杂"的设计哲学：

1. **简洁的声明方式**：直接赋值即可创建变量，无需声明关键字
2. **动态类型特性**：变量可以随时改变类型，提供编程灵活性
3. **命名规范统一**：使用 snake_case 蛇形式命名，提高代码可读性
4. **常量约定**：使用全大写表示常量，虽非语言强制但社区广泛遵循
5. **多重赋值优雅**：支持基础解包、变量交换等简洁语法特性
6. **内存管理透明**：自动垃圾回收，提供 id() 函数查看对象内存地址
7. **可变性区分**：明确区分可变对象（list、dict）和不可变对象（str、tuple、int）

掌握 Python 的变量特性，特别是可变性概念，对避免程序中的潜在 bug 非常重要。这些基础概念为后续学习 Python 的高级特性打下了坚实基础。

## 练习

完成以下变量定义与操作任务，练习本章所学的变量知识点：

```python runner
# 1. 定义基本变量
# 按要求创建以下变量（注意使用蛇形命名法）：
# - 产品名称: "Python 教程"
# - 价格: 99.9
# - 是否有库存: True


# 2. 定义常量（使用命名约定）
# 为以下内容定义常量（注意使用全大写+下划线）：
# - 最大学生数: 50
# - 课程版本: "1.0"


# 3. 使用多重赋值同时创建三个变量
# 分别表示：作者="张三", 出版社="科技出版社", 年份=2024


# 4. 演示动态类型
# 创建一个变量表示"状态"，先赋值为数字 100，然后改为字符串 "已完成"


# 5. 使用 type() 函数检查变量类型
# 输出上面定义的价格和库存状态变量的数据类型


# 6. 使用 id() 函数查看内存地址
# 创建两个相同值为 10 的数字变量
# 输出它们的内存地址，观察是否相同


# 7. 变量重新赋值
# 修改价格变量为 89.9，然后输出修改前后的对比信息


# 8. 输出所有变量信息
# 使用 print() 输出所有创建的变量


```

::: details 点击查看参考答案
```python runner
# 1. 定义基本变量
product_name = "Python 教程"
price = 99.9
in_stock = True

# 2. 定义常量（使用命名约定）
MAX_STUDENTS = 50
COURSE_VERSION = "1.0"

# 3. 使用多重赋值同时创建三个变量
author, publisher, year = "张三", "科技出版社", 2024

# 4. 演示动态类型
dynamic_var = 100
print("dynamic_var 初始值:", dynamic_var, "类型:", type(dynamic_var))
dynamic_var = "已完成"
print("dynamic_var 修改后:", dynamic_var, "类型:", type(dynamic_var))

# 5. 使用 type() 函数检查变量类型
print("price 的类型:", type(price))
print("in_stock 的类型:", type(in_stock))

# 6. 使用 id() 函数查看内存地址
num1 = 10
num2 = 10
print("num1 的内存地址:", id(num1))
print("num2 的内存地址:", id(num2))
print("两个变量是否指向同一对象:", num1 is num2)

# 7. 变量重新赋值
print("price 修改前:", price)
price = 89.9
print("price 修改后:", price)

# 8. 输出所有变量信息
print("\n=== 所有变量信息 ===")
print("产品名称:", product_name)
print("价格:", price)
print("是否有库存:", in_stock)
print("最大学生数:", MAX_STUDENTS)
print("课程版本:", COURSE_VERSION)
print("作者:", author)
print("出版社:", publisher)
print("年份:", year)
print("动态变量当前值:", dynamic_var)
```
:::

