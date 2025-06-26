# 元组

Python 除了提供列表外，还有一种特殊的数据结构叫做元组 (Tuple 读作 /ˈtuːpl/)。元组是一种有序的、不可变的数据集合，一旦创建就不能修改其中的元素，这为数据提供了额外的安全性和性能优化。

## 创建

JavaScript 中没有直接对应的数据结构，最接近的是使用`Object.freeze()`冻结数组，但这种方式在语法上不够简洁：

```javascript runner
// JavaScript 创建不可变数组（模拟元组）
const frozenArray = Object.freeze([1, 2, 3]);
console.log(frozenArray);
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

## 不可变性

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
print("ID:", id(person))

# 不能修改元组本身
# person[0] = "李四"  # 这会报错

# 但可以修改列表内容
person[1].append(88)
print(f"修改成绩后: {person}")

# 元组的引用没变，但内容发生了变化
print(f"ID 保持不变: {id(person)}")
```

## 访问元素

元组的访问方式与列表完全相同：

```python runner
fruits = ("apple", "banana", "cherry")

print(f"第一个元素: {fruits[0]}")
print(f"第二个元素: {fruits[1]}")
print(f"最后一个元素: {fruits[-1]}")  # 负索引
print(f"倒数第二个: {fruits[-2]}")
```

## 长度

与列表一样，使用 `len()` 函数获取元组长度：

```python runner
fruits = ("apple", "banana", "cherry")
numbers = (1, 2, 3, 4, 5)
empty_tuple = ()

print(f"水果元组长度: {len(fruits)}")
print(f"数字元组长度: {len(numbers)}")
print(f"空元组长度: {len(empty_tuple)}")
```

## 比较

元组比较与列表类似，Python 会逐个比较元素内容。需要注意的是，由于元组的不可变性，Python 可能会对一些简单的元组进行内部优化：

```python runner
# 内容比较
tuple1 = (1, 2, 3)
tuple2 = (1, 2, 3)
tuple3 = tuple1

print(f"内容相同的元组: {tuple1 == tuple2}")  # True
print(f"同一个对象: {tuple1 is tuple3}")      # True

# 注意：简单元组可能因为Python优化而指向同一对象
print(f"简单元组的身份比较: {tuple1 is tuple2}")  # 可能是True（内部做了优化）

# 使用包含可变对象的元组来确保是不同对象
tuple4 = (1, [2, 3])
tuple5 = (1, [2, 3])
print(f"复杂元组的身份比较: {tuple4 is tuple5}")  # False
print(f"但内容确实相同: {tuple4 == tuple5}")       # True

# 顺序敏感的比较
tuple4 = (3, 2, 1)
print(f"顺序不同: {tuple1 == tuple4}")  # False

# 元组支持大小比较（按字典序）
print(f"(1, 2) < (1, 3): {(1, 2) < (1, 3)}")    # True
print(f"(1, 2) < (2, 1): {(1, 2) < (2, 1)}")    # True
print(f"('a', 'b') < ('a', 'c'): {('a', 'b') < ('a', 'c')}")  # True
```

## 元素查找

使用 `in` 和 `not in` 关键字检查元素是否存在：

```python runner
fruits = ("apple", "banana", "cherry")

print(f"包含 apple: {'apple' in fruits}")      # True
print(f"包含 orange: {'orange' in fruits}")    # False
print(f"不包含 orange: {'orange' not in fruits}")  # True

# 检查子元组
colors = (("red", 255), ("green", 128), ("blue", 64))
print(f"包含红色信息: {('red', 255) in colors}")  # True
```

### 索引查找

使用 `.index()` 方法查找元素第一次出现的索引：

```python runner
fruits = ("apple", "banana", "cherry", "banana")

# 查找元素的索引
index = fruits.index("banana")
print(f"banana 的索引: {index}")  # 第一次出现的位置

# 查找不存在的元素会报错
try:
    index = fruits.index("orange")
except ValueError:
    print("orange 不在元组中")
```

### 计数

使用 `.count()` 方法统计元素出现次数：

```python runner
numbers = (1, 2, 3, 2, 4, 2, 5)

# 统计元素出现次数
count_2 = numbers.count(2)
print(f"数字 2 出现次数: {count_2}")
```

## 切片

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

## 连接操作

虽然元组不可变，但可以通过连接创建新元组：

```python runner
tuple1 = (1, 2, 3)
tuple2 = (4, 5, 6)

# 连接两个元组（创建新元组）
combined = tuple1 + tuple2
print(f"连接结果: {combined}")
print(f"原 tuple1: {tuple1}")  # 原元组不变
print(f"原 tuple2: {tuple2}")  # 原元组不变

# 多个元组连接
tuple3 = (7, 8, 9)
super_tuple = tuple1 + tuple2 + tuple3
print(f"多个连接: {super_tuple}")
```

## 重复操作

与字符串和列表类似，Python 元组也支持使用`*`运算符进行重复操作：

```python runner
pattern = ("hello", "world")

# 重复元组
repeated = pattern * 3
print(f"重复 3 次: {repeated}")

# 创建固定长度的初始化元组
zeros = (0,) * 5
print(f"5个零: {zeros}")

# 原元组保持不变
print(f"原模式: {pattern}")
```

## 复制

### 元组的复制特性

由于元组是不可变的，复制操作有特殊的行为：

```python runner
original = (1, 2, 3)

# 元组不支持 copy() 方法，需要使用其他方式复制
copy1 = original[:]     # 切片复制
copy2 = tuple(original) # 构造函数复制
copy3 = original + ()   # 连接空元组复制

# 由于元组不可变，Python 可能会优化为同一个对象
print(f"原元组: {original}")
print(f"切片复制: {copy1}")
print(f"构造函数复制: {copy2}")
print(f"连接复制: {copy3}")

print(f"原元组与切片复制是同一对象: {original is copy1}")
print(f"原元组与构造函数复制是同一对象: {original is copy2}")
print(f"原元组与连接复制是同一对象: {original is copy3}")
```

### 包含可变对象的元组复制

当元组包含可变对象时，需要注意深拷贝：

```python runner
# 包含列表的元组
original = ("name", [1, 2, 3])
copy_shallow = original[:]

print(f"原元组: {original}")
print(f"浅拷贝: {copy_shallow}")

# 修改列表内容
original[1].append(4)
print(f"修改后原元组: {original}")
print(f"修改后浅拷贝: {copy_shallow}")  # 浅拷贝也受影响

# 如需深拷贝
import copy
original = ("name", [1, 2, 3])
copy_deep = copy.deepcopy(original)

original[1].append(5)
print(f"深拷贝原元组: {original}")
print(f"深拷贝副本: {copy_deep}")  # 深拷贝不受影响
```

## 解包

元组解包是 Python 多重赋值的重要基础。在前面的列表章节中，我们已经学习了解包的基本概念，元组解包的语法完全相同，但元组更适合用于固定结构的数据：

```python runner
# 元组解包 - 适合固定结构的数据
coordinates = (3, 5)
x, y = coordinates
print(f"坐标: x={x}, y={y}")

# 元组特别适合表示不会改变的数据结构
rgb_color = (255, 128, 0)
red, green, blue = rgb_color
print(f"RGB: R={red}, G={green}, B={blue}")
```

### 元组解包的高级用法

元组解包同样支持星号操作符，特别适合处理具有固定开头和结尾的数据：

```python runner
# 元组的扩展解包 - 处理可变长度但结构固定的数据
user_record = ("张三", 25, "工程师", "Python", "JavaScript", "Vue.js", "未婚")
name, age, job, *skills, status = user_record
print(f"姓名: {name}, 年龄: {age}, 职业: {job}")
print(f"技能: {skills}")  # 中间的技能数量可变
print(f"状态: {status}")

# 坐标序列的处理
coordinates = (10, 20, 30, 40, 50, 60)
start_x, start_y, *waypoints, end_x, end_y = coordinates
print(f"起点: ({start_x}, {start_y})")
print(f"路径点: {waypoints}")
print(f"终点: ({end_x}, {end_y})")
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

## 元组操作一览

### 元组方法

由于元组的不可变性，它只有很少的方法：

| 方法 | 功能 | 示例 | 返回值 |
|------|------|------|--------|
| `count(item)` | 统计元素出现次数 | `tup.count('apple')` | 出现次数 |
| `index(item)` | 返回元素首次出现的索引 | `tup.index('apple')` | 索引值 |

### 内置函数

| 函数 | 功能 | 示例 | 返回值 |
|------|------|------|--------|
| `len(tup)` | 获取元组长度 | `len((1, 2, 3))` | 长度 |
| `max(tup)` | 获取最大值 | `max((1, 2, 3))` | 最大值 |
| `min(tup)` | 获取最小值 | `min((1, 2, 3))` | 最小值 |
| `sum(tup)` | 计算数值元组的和 | `sum((1, 2, 3))` | 总和 |
| `sorted(tup)` | 返回排序后的列表 | `sorted((3, 1, 2))` | 新的排序列表 |
| `tuple(iterable)` | 将可迭代对象转为元组 | `tuple([1, 2, 3])` | 新元组 |

### 运算符和关键字

| 操作 | 功能 | 示例 | 返回值 |
|------|------|------|--------|
| `+` | 连接元组 | `(1, 2) + (3, 4)` | 新元组 |
| `*` | 重复元组 | `(1, 2) * 3` | 新元组 |
| `in` | 检查元素是否存在 | `'apple' in fruits` | 布尔值 |
| `not in` | 检查元素是否不存在 | `'apple' not in fruits` | 布尔值 |
| `==` | 比较元组内容 | `(1, 2) == (1, 2)` | 布尔值 |
| `<`, `>`, `<=`, `>=` | 按字典序比较 | `(1, 2) < (1, 3)` | 布尔值 |

### 切片操作

| 操作 | 功能 | 示例 | 返回值 |
|------|------|------|--------|
| `tup[start:end]` | 切片 | `tup[1:3]` | 新元组 |
| `tup[start:end:step]` | 带步长切片 | `tup[::2]` | 新元组 |
| `tup[::-1]` | 反转元组 | `tup[::-1]` | 新元组 |

## 小结

元组是 Python 中一种重要的不可变序列类型：

1. **不可变性**：一旦创建就不能修改，提供数据安全性和性能优化
2. **有序性**：保持元素的插入顺序，支持索引和切片操作
3. **混合类型**：可以存储不同类型的数据，与列表类似
4. **解包功能**：支持优雅的多重赋值和变量交换
5. **数据组合**：适合将多个相关数据组合成一个整体
6. **内存效率**：比列表占用更少内存，创建和访问更快
7. **语法简洁**：使用圆括号创建，但要注意单元素元组的逗号
8. **内部优化**：Python 可能会对相同内容的简单元组进行优化，使其指向同一对象

选择元组还是列表的关键在于：如果数据结构固定且不需要修改，使用元组；如果需要动态添加、删除或修改元素，使用列表。元组特别适合表示坐标、配置信息、函数返回的多个值等场景。

## 练习

学校要记录三个班级的基本信息，每个班级包含班级名称、学生人数、班主任姓名。请使用元组的特性完成以下任务：

```python runner
# 班级基本信息（使用元组存储固定的数据结构）
class_a = ("高一1班", 45, "张老师")
class_b = ("高一2班", 42, "李老师") 
class_c = ("高一3班", 47, "王老师")

# 任务 1: 使用元组解包获取第一个班级的信息
# 将 class_a 解包到 name1, count1, teacher1 三个变量

# 任务 2: 创建包含所有班级信息的元组
# all_classes = ...

# 任务 3: 使用索引和解包获取第二个班级的班主任姓名
# second_teacher = ...

# 任务 4: 创建学校总体信息的元组
# school_info = ("阳光中学", 学生总数, 班级总数)

# 任务 5: 验证元组的不可变性
# 尝试修改 class_a 的学生人数看是否会报错）

# 任务 6: 创建一个包含所有班主任姓名的元组
# teachers = ...

# 任务 7: 使用元组连接操作
# 创建一个包含班级名称和对应班主任的元组
# class_teacher_pairs = ...

# 任务 8: 比较元组
# 创建另一个班级信息，并比较是否相同
# class_a_copy = ("高一1班", 45, "张老师")

```

::: details 点击查看参考答案
```python runner
# 班级基本信息（使用元组存储固定的数据结构）
class_a = ("高一1班", 45, "张老师")
class_b = ("高一2班", 42, "李老师") 
class_c = ("高一3班", 47, "王老师")

# 任务 1: 使用元组解包获取第一个班级的信息
name1, count1, teacher1 = class_a
print(f"第一个班级: {name1}, 学生人数: {count1}, 班主任: {teacher1}")

# 任务 2: 创建包含所有班级信息的元组
all_classes = (class_a, class_b, class_c)
print(f"所有班级信息: {all_classes}")

# 任务 3: 使用索引和解包获取第二个班级的班主任姓名
_, _, second_teacher = all_classes[1]  # 使用 _ 忽略不需要的值
print(f"第二个班级的班主任: {second_teacher}")

# 任务 4: 创建学校总体信息的元组
total_students = count1 + class_b[1] + class_c[1]
total_classes = len(all_classes)
school_info = ("阳光中学", total_students, total_classes)
school_name, student_total, class_total = school_info
print(f"学校: {school_name}, 总学生数: {student_total}, 总班级数: {class_total}")

# 任务 5: 验证元组的不可变性（取消注释会报错）
# class_a[1] = 46  # TypeError: 'tuple' object does not support item assignment
print("元组是不可变的，无法修改其中的元素")

# 任务 6: 创建一个包含所有班主任姓名的元组
teachers = (class_a[2], class_b[2], class_c[2])
print(f"所有班主任: {teachers}")

# 任务 7: 使用元组连接操作
class_names = (class_a[0], class_b[0], class_c[0])
class_teacher_pairs = class_names + teachers
print(f"班级和老师信息: {class_teacher_pairs}")

# 任务 8: 比较元组
class_a_copy = ("高一1班", 45, "张老师")
print(f"班级信息是否相同: {class_a == class_a_copy}")
print(f"是否为同一个对象: {class_a is class_a_copy}")  # 注意：可能因Python优化而为True
```
::: 