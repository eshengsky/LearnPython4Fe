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

**为什么 Python 选择蛇形式？**

Python 选择蛇形式命名的原因与其设计哲学相关：

1. **可读性**：`user_name`比`userName`在视觉上更容易分辨单词边界
2. **一致性**：Python 标准库大量使用蛇形式，保持一致
3. **科学计算传统**：Python 在科学计算领域广泛使用，该领域习惯下划线命名

```python runner
# Python 中的各种命名约定
regular_variable = "普通变量，使用蛇形式"
CONSTANT_VALUE = "常量，使用全大写加下划线"
_private_var = "私有变量，前缀下划线（约定）"
__internal_var = "内部变量，双下划线前缀"

class MyClass:  # 类名使用帕斯卡命名法
    pass

def my_function():  # 函数名使用蛇形式
    pass

print("命名约定展示完成")
```

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

# 列表解包
values = [10, 20, 30]
x, y, z = values
print("列表解包:", x, y, z)

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

**Python 多重赋值的高级用法**

Python 的多重赋值还支持一些 JavaScript 解构赋值没有的特性：

```python runner
# 忽略某些值
a, _, c = 1, 2, 3  # 使用_忽略不需要的值
print("忽略中间值:", a, c)

# 扩展解包（Python 3.0+）
first, *middle, last = [1, 2, 3, 4, 5]
print(f"首尾分离: 第一个={first}, 中间={middle}, 最后={last}")

# 嵌套解包
nested = [(1, 2), (3, 4)]
(a, b), (c, d) = nested
print("嵌套解包:", a, b, c, d)

# 字典项解包
items = {"name": "张三", "age": 25}.items()
for key, value in items:
    print(f"{key}: {value}")
```

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

# Python 的数字缓存机制
a = 100
b = 100
print("小整数缓存:", a is b)  # True
print("ID 对比:", id(a), id(b))  # 小整数会被缓存，ID 相同

c = 1000
d = 1000
print("大整数:", c is d)  # 可能是 False
print("大整数 ID:", id(c), id(d))  # 大整数每次创建新对象，ID 不同
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
5. **多重赋值优雅**：支持元组解包、变量交换等高级语法特性
6. **内存管理透明**：自动垃圾回收，提供 id() 函数查看对象内存地址
7. **可变性区分**：明确区分可变对象（list、dict）和不可变对象（str、tuple、int）

掌握 Python 的变量特性，特别是可变性概念，对避免程序中的潜在 bug 非常重要。这些基础概念为后续学习 Python 的高级特性打下了坚实基础。

## 练习

完成以下变量操作任务，输出个人资料信息：

```
=== 个人资料 ===
姓名: 李华  
年龄: 28 岁
邮箱: li.hua@example.com
是否VIP: 是
爱好: 游泳, 阅读
=== 变量演示 ===
年龄类型: <class 'int'>
内存地址: 140xxx
年龄+10: 38 岁
```

```python runner
# 给定数据：姓名="李华", 年龄=28, 邮箱="li.hua@example.com"

# 1. 使用多重赋值同时创建姓名、年龄、邮箱三个变量


# 2. 创建 VIP 状态变量（布尔值 True）


# 3. 创建爱好列表 ["游泳", "阅读"] 


# 4. 使用 type() 检查年龄的数据类型


# 5. 使用 id() 获取姓名变量的内存地址


# 6. 计算年龄+10的结果


# 7. 按格式输出所有信息


```

::: details 点击查看参考答案
```python runner
# 1. 使用多重赋值同时创建姓名、年龄、邮箱三个变量
user_name, user_age, user_email = "李华", 28, "li.hua@example.com"

# 2. 创建 VIP 状态变量（布尔值 True）
is_vip = True

# 3. 创建爱好列表
hobbies = ["游泳", "阅读"]

# 4. 使用 type() 检查年龄的数据类型
age_type = type(user_age)

# 5. 使用 id() 获取姓名变量的内存地址
name_id = id(user_name)

# 6. 计算年龄+10的结果
age_plus_10 = user_age + 10

# 7. 按格式输出所有信息
print("=== 个人资料 ===")
print(f"姓名: {user_name}")
print(f"年龄: {user_age} 岁")
print(f"邮箱: {user_email}")
print(f"是否VIP: {'是' if is_vip else '否'}")
print(f"爱好: {', '.join(hobbies)}")
print("=== 变量演示 ===")
print(f"年龄类型: {age_type}")
print(f"内存地址: {name_id}")
print(f"年龄+10: {age_plus_10} 岁")
```
:::

