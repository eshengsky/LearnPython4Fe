# 元组

在 JavaScript 中，我们通常使用数组来存储有序的数据集合，这些数组是可变的，可以随时添加、删除或修改元素。Python 除了提供类似的列表外，还有一种特殊的数据结构叫做元组 (Tuple)，它类似于不可变的数组。

## 什么是元组

元组是一种有序的、不可变的数据集合。一旦创建，你就不能修改其中的元素，这为数据提供了额外的安全性和性能优化。

```python runner
# 创建一个简单的元组
coordinates = (3, 5)
print(f"坐标: {coordinates}")
print(f"类型: {type(coordinates)}")

# 元组可以包含不同类型的数据
person = ("张三", 25, "工程师", True)
print(f"个人信息: {person}")
```

## 创建元组

JavaScript 中没有直接对应的数据结构，最接近的是使用`Object.freeze()`冻结数组：

```javascript runner
// JavaScript 创建不可变数组（模拟元组）
const frozenArray = Object.freeze([1, 2, 3]);
console.log(frozenArray);

// 但这种方式在语法上不够简洁
const coordinates = Object.freeze([3, 5]);
console.log(coordinates);
```

Python 的元组创建非常简洁，使用圆括号：

```python runner
# 使用圆括号创建元组
empty_tuple = ()
single_tuple = (42,)  # 注意：单元素元组需要逗号
colors = ("red", "green", "blue")
mixed = ("hello", 42, True, 3.14)

print(f"空元组: {empty_tuple}")
print(f"单元素元组: {single_tuple}")
print(f"颜色元组: {colors}")
print(f"混合元组: {mixed}")

# 不使用括号也可以创建元组（但不推荐）
point = 10, 20
print(f"坐标点: {point} ({type(point)})")
```

### 单元素元组的陷阱

创建单元素元组时必须包含逗号，否则 Python 会认为括号只是运算符：

```python runner
# 单元素元组的正确与错误写法
correct_tuple = (42,)
wrong_tuple = (42)

print(f"正确的单元素元组: {correct_tuple} ({type(correct_tuple)})")
print(f"错误的写法: {wrong_tuple} ({type(wrong_tuple)})")

# 更清晰的示例
text_tuple = ("hello",)
text_string = ("hello")

print(f"文本元组: {text_tuple} - 类型: {type(text_tuple)}")
print(f"文本字符串: {text_string} - 类型: {type(text_string)}")
```

### 使用构造函数创建

```python runner
# 使用 tuple() 构造函数
empty_tuple = tuple()
list_to_tuple = tuple([1, 2, 3, 4])
string_to_tuple = tuple("hello")
range_to_tuple = tuple(range(5))

print(f"空元组: {empty_tuple}")
print(f"从列表创建: {list_to_tuple}")
print(f"从字符串创建: {string_to_tuple}")
print(f"从范围创建: {range_to_tuple}")
```

## 访问元素

元组的访问方式与 JavaScript 数组和 Python 列表完全相同：

```javascript runner
// JavaScript 数组访问
const fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]);  // apple
console.log(fruits[1]);  // banana
```

```python runner
fruits = ("apple", "banana", "cherry")

print(f"第一个元素: {fruits[0]}")
print(f"第二个元素: {fruits[1]}")
print(f"最后一个元素: {fruits[-1]}")  # 负索引
print(f"倒数第二个: {fruits[-2]}")
```

## 元组的不可变性

这是元组与列表最重要的区别：

```python runner
# 列表是可变的
my_list = [1, 2, 3]
my_list[0] = 100  # 可以修改
print(f"修改后的列表: {my_list}")

# 元组是不可变的
my_tuple = (1, 2, 3)
try:
    my_tuple[0] = 100  # 这会报错
except TypeError as e:
    print(f"错误信息: {e}")
    print("元组不支持修改操作")
```

但是，如果元组包含可变对象，那些对象本身仍然可以被修改：

```python runner
# 元组包含可变对象的情况
person = ("张三", [90, 85, 92])  # 元组包含一个列表
print(f"原始数据: {person}")

# 不能修改元组本身
# person[0] = "李四"  # 这会报错

# 但可以修改列表内容
person[1].append(88)
print(f"修改成绩后: {person}")

# 元组的引用没变，但内容发生了变化
print(f"ID 保持不变: {id(person)}")
```

## 切片操作

元组支持与列表相同的切片操作：

```python runner
numbers = (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)

print(f"原元组: {numbers}")
print(f"前 5 个: {numbers[:5]}")
print(f"后 5 个: {numbers[-5:]}")
print(f"中间部分: {numbers[3:7]}")
print(f"每隔一个: {numbers[::2]}")
print(f"反转: {numbers[::-1]}")

# 切片的结果仍然是元组
slice_result = numbers[2:5]
print(f"切片结果类型: {type(slice_result)}")
```

## 元组解包

元组的一个强大特性是解包 (unpacking)，这让多重赋值变得非常简洁：

```javascript runner
// JavaScript 中的数组解构
const coordinates = [3, 5];
const [x, y] = coordinates;
console.log(`x: ${x}, y: ${y}`);

// 交换变量需要临时变量或数组解构
let a = 10, b = 20;
[a, b] = [b, a];
console.log(`交换后: a=${a}, b=${b}`);
```

```python runner
# Python 元组解包更加自然
coordinates = (3, 5)
x, y = coordinates  # 元组解包
print(f"x: {x}, y: {y}")

# 交换变量非常简洁
a, b = 10, 20
print(f"交换前: a={a}, b={b}")
a, b = b, a  # 使用元组交换
print(f"交换后: a={a}, b={b}")

# 多值解包
person = ("张三", 25, "工程师")
name, age, job = person
print(f"姓名: {name}, 年龄: {age}, 职业: {job}")
```

### 部分解包和星号操作符

```python runner
# 使用星号收集剩余元素
numbers = (1, 2, 3, 4, 5)

# 取第一个和最后一个，中间的放入列表
first, *middle, last = numbers
print(f"第一个: {first}")
print(f"中间: {middle}")  # 注意这是列表
print(f"最后一个: {last}")

# 取前两个，剩余的收集起来
a, b, *rest = numbers
print(f"前两个: {a}, {b}")
print(f"剩余: {rest}")

# 忽略不需要的值
person = ("张三", 25, "工程师", "北京", "单身")
name, age, *_, status = person  # 使用 _ 忽略中间的值
print(f"姓名: {name}, 年龄: {age}, 状态: {status}")
```

## 常用操作

### 长度和成员检查

```python runner
fruits = ("apple", "banana", "cherry", "date")

# 获取长度
print(f"元组长度: {len(fruits)}")

# 检查成员
print(f"是否包含 apple: {'apple' in fruits}")
print(f"是否包含 orange: {'orange' in fruits}")
print(f"不包含 orange: {'orange' not in fruits}")
```

### 计数和查找

```python runner
numbers = (1, 2, 3, 2, 4, 2, 5)

# 计算某个值出现的次数
count_2 = numbers.count(2)
print(f"数字 2 出现次数: {count_2}")

# 查找某个值的第一个索引
index_3 = numbers.index(3)
print(f"数字 3 的索引: {index_3}")

# 查找不存在的值会报错
try:
    index_9 = numbers.index(9)
except ValueError as e:
    print(f"查找不存在的值: {e}")
```

### 元组连接

虽然元组不可变，但可以通过连接创建新元组：

```python runner
tuple1 = (1, 2, 3)
tuple2 = (4, 5, 6)

# 连接元组
combined = tuple1 + tuple2
print(f"连接结果: {combined}")

# 重复元组
repeated = tuple1 * 3
print(f"重复 3 次: {repeated}")

# 原元组保持不变
print(f"原 tuple1: {tuple1}")
print(f"原 tuple2: {tuple2}")
```

## 元组作为字典键

由于元组是不可变的，它们可以作为字典的键，这是列表无法做到的：

```python runner
# 元组作为字典键 - 表示坐标点的值
coordinates_value = {
    (0, 0): "原点",
    (1, 0): "X 轴上的点",
    (0, 1): "Y 轴上的点",
    (1, 1): "对角点"
}

print("坐标字典:")
for coord, description in coordinates_value.items():
    print(f"  {coord}: {description}")

# 访问特定坐标的值
point = (1, 1)
print(f"坐标 {point} 的描述: {coordinates_value[point]}")

# 列表不能作为字典键
try:
    invalid_dict = {[1, 2]: "这会报错"}
except TypeError as e:
    print(f"列表作为键的错误: {e}")
```

## 实际应用场景

### 函数返回多个值

```python runner
def get_user_info():
    """返回用户信息的元组"""
    return "张三", 25, "工程师"

def get_circle_info(radius):
    """计算圆的周长和面积"""
    import math
    circumference = 2 * math.pi * radius
    area = math.pi * radius ** 2
    return circumference, area  # 返回元组

# 使用返回的元组
user_info = get_user_info()
print(f"用户信息: {user_info}")

# 解包返回值
name, age, job = get_user_info()
print(f"解包: {name}, {age} 岁, {job}")

# 计算圆的信息
c, a = get_circle_info(5)
print(f"半径 5 的圆: 周长={c:.2f}, 面积={a:.2f}")
```

### 配置和常量

```python runner
# 使用元组定义配置常量
DEFAULT_SETTINGS = (
    800,      # 宽度
    600,      # 高度
    "white",  # 背景色
    True      # 全屏
)

# 解包配置
width, height, bg_color, fullscreen = DEFAULT_SETTINGS
print(f"窗口配置: {width}x{height}, 背景: {bg_color}, 全屏: {fullscreen}")

# RGB 颜色常量
COLORS = {
    "RED": (255, 0, 0),
    "GREEN": (0, 255, 0),
    "BLUE": (0, 0, 255),
    "WHITE": (255, 255, 255),
    "BLACK": (0, 0, 0)
}

# 使用颜色
red_color = COLORS["RED"]
r, g, b = red_color
print(f"红色 RGB: ({r}, {g}, {b})")
```

### 数据库记录

```python runner
# 模拟数据库查询结果
def query_users():
    """模拟返回用户记录"""
    return [
        (1, "张三", "zhangsan@email.com", 25),
        (2, "李四", "lisi@email.com", 30),
        (3, "王五", "wangwu@email.com", 28)
    ]

# 处理查询结果
users = query_users()
print("用户列表:")
for user_id, name, email, age in users:
    print(f"  ID:{user_id} {name} ({email}) - {age} 岁")

# 查找特定用户
target_id = 2
for user_id, name, email, age in users:
    if user_id == target_id:
        print(f"找到用户: {name}")
        break
```

## 元组 vs 列表的选择

如果数据结构固定且不需要修改（如坐标、配置信息、函数返回的多个值），适合使用元组；如果需要动态添加、删除或修改元素（如购物车、成绩列表），适合使用列表。另外，元组由于不可变性，在内存使用和访问速度上通常比列表更高效。

```python runner
# 使用元组的场景示例
print("=== 适合使用元组的场景 ===")

# 1. 坐标、点位等固定结构
point_2d = (3, 5)
point_3d = (3, 5, 2)
print(f"2D 坐标: {point_2d}")
print(f"3D 坐标: {point_3d}")

# 2. 配置信息（不希望被意外修改）
database_config = ("localhost", 5432, "mydb", "user")
print(f"数据库配置: {database_config}")

# 3. 函数返回的多个相关值
def get_min_max(numbers):
    return min(numbers), max(numbers)

min_val, max_val = get_min_max([3, 1, 4, 1, 5, 9])
print(f"最小值: {min_val}, 最大值: {max_val}")

print("\n=== 适合使用列表的场景 ===")

# 1. 需要修改的数据集合
shopping_cart = ["苹果", "香蕉"]
shopping_cart.append("橙子")  # 添加商品
print(f"购物车: {shopping_cart}")

# 2. 数量可变的数据
scores = [90, 85, 92]
scores.append(88)  # 添加新成绩
print(f"成绩列表: {scores}")

# 3. 需要排序、过滤等操作的数据
numbers = [3, 1, 4, 1, 5, 9]
numbers.sort()  # 排序
print(f"排序后: {numbers}")
```



## 命名元组

虽然不是本章的重点，但值得了解 Python 还提供了命名元组，让元组更具可读性：

```python runner
from collections import namedtuple

# 创建命名元组类
Point = namedtuple('Point', ['x', 'y'])
Person = namedtuple('Person', ['name', 'age', 'job'])

# 使用命名元组
p1 = Point(3, 5)
person1 = Person("张三", 25, "工程师")

print(f"点坐标: {p1}")
print(f"通过名称访问: x={p1.x}, y={p1.y}")
print(f"通过索引访问: x={p1[0]}, y={p1[1]}")

print(f"人员信息: {person1}")
print(f"姓名: {person1.name}, 年龄: {person1.age}")

# 命名元组仍然是元组
print(f"是否为元组: {isinstance(p1, tuple)}")
print(f"支持解包: {tuple(p1)}")
```

## 小结

元组是 Python 中一种重要的不可变序列类型：

1. **不可变性**：一旦创建就不能修改，提供数据安全性和性能优化
2. **有序性**：保持元素的插入顺序，支持索引和切片操作
3. **混合类型**：可以存储不同类型的数据，与列表类似
4. **解包功能**：支持优雅的多重赋值和变量交换
5. **字典键值**：由于不可变性，可以作为字典的键
6. **内存效率**：比列表占用更少内存，创建和访问更快
7. **语法简洁**：使用圆括号创建，但要注意单元素元组的逗号

选择元组还是列表的关键在于：如果数据结构固定且不需要修改，使用元组；如果需要动态添加、删除或修改元素，使用列表。元组特别适合表示坐标、配置信息、函数返回的多个值等场景。 