# 列表

在JavaScript中，数组是存储多个值的最重要的数据结构，我们使用方括号来创建和操作数组。Python的列表与JavaScript数组非常相似，但提供了更多强大的功能和更优雅的语法。

## 创建

JavaScript中创建数组很简单：

```javascript runner
// JavaScript 数组创建
let fruits = ["apple", "banana", "cherry"];
let numbers = [1, 2, 3, 4, 5];
let mixed = ["hello", 42, true];

console.log(fruits);
console.log(numbers);
console.log(mixed);
```

Python的列表创建语法完全相同：

```python runner
# Python 列表创建
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True]

print(fruits)
print(numbers)
print(mixed)
```

Python列表同样支持混合数据类型，这得益于Python的动态类型系统。

### 使用构造函数创建

JavaScript可以使用`Array()`构造函数，Python也有`list()`构造函数：

```python runner
# 使用 list() 构造函数
empty_list = list()
print(f"空列表: {empty_list}")

# 从其他可迭代对象创建列表
string_list = list("hello")
print(f"从字符串创建: {string_list}")

range_list = list(range(5))
print(f"从范围创建: {range_list}")

tuple_list = list((1, 2, 3))
print(f"从元组创建: {tuple_list}")
```

## 访问元素

JavaScript中使用索引访问数组元素：

```javascript runner
// JavaScript 数组访问
let colors = ["red", "green", "blue"];

console.log(colors[0]);  // 第一个元素
console.log(colors[1]);  // 第二个元素
console.log(colors[-1]); // undefined (JavaScript不支持负索引)
```

Python的访问方式相同，但支持负索引这个强大特性：

```python runner
colors = ["red", "green", "blue"]

print(colors[0])   # 第一个元素
print(colors[1])   # 第二个元素
print(colors[-1])  # 最后一个元素 (negative indexing)
print(colors[-2])  # 倒数第二个元素
```

负索引让我们能够很方便地从列表末尾访问元素，这在JavaScript中需要使用`array[array.length - 1]`的方式。

## 长度

JavaScript使用`.length`属性：

```javascript runner
let fruits = ["apple", "banana", "cherry"];
console.log(fruits.length);  // 输出: 3
```

Python使用`len()`函数：

```python runner
fruits = ["apple", "banana", "cherry"]
print(len(fruits))
```

## 检查项目是否存在

JavaScript中使用`.includes()`方法：

```javascript runner
let fruits = ["apple", "banana", "cherry"];

console.log(fruits.includes("apple"));   // 输出: true
console.log(fruits.includes("orange"));  // 输出: false
```

Python使用更直观的`in`关键字：

```python runner
fruits = ["apple", "banana", "cherry"]

print("apple" in fruits)   # 输出: True
print("orange" in fruits)  # 输出: False

# 也可以使用 not in
print("orange" not in fruits)  # 输出: True
```

## 切片

JavaScript使用`.slice()`方法来获取数组的部分：

```javascript runner
let numbers = [0, 1, 2, 3, 4, 5];

console.log(numbers.slice(2, 5));   // [2, 3, 4]
console.log(numbers.slice(0, 3));   // [0, 1, 2]
console.log(numbers.slice(2));      // [2, 3, 4, 5]
```

Python的切片语法更简洁优雅：

```python runner
numbers = [0, 1, 2, 3, 4, 5]

print(numbers[2:5])    # [2, 3, 4]
print(numbers[0:3])    # [0, 1, 2]  
print(numbers[2:])     # [2, 3, 4, 5]
print(numbers[:3])     # [0, 1, 2]
print(numbers[:])      # [0, 1, 2, 3, 4, 5] 复制整个列表

# 使用负索引切片
print(numbers[-3:])    # [3, 4, 5] 最后三个元素
print(numbers[:-2])    # [0, 1, 2, 3] 除了最后两个元素
```

需要注意的是，Python切片遵循"含左不含右"的规则，即`numbers[2:5]`包含索引2、3、4的元素，但不包含索引5的元素：

```python runner
numbers = [0, 1, 2, 3, 4, 5]

# 切片边界说明
print("列表:", numbers)
print("索引: ", [0, 1, 2, 3, 4, 5])
print()
print("numbers[2:5] =", numbers[2:5])  # 从索引2开始，到索引5结束（不包含）
print("包含的索引: 2, 3, 4")
print("对应的值: ", numbers[2], numbers[3], numbers[4])
```

这种设计让切片操作更加直观，比如`numbers[:3]`正好取前3个元素，`numbers[3:]`取剩余元素，两者拼接起来就是完整列表。

### 步长切片

Python切片还支持步长参数，这是JavaScript所没有的：

```python runner
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(numbers[::2])     # [0, 2, 4, 6, 8] 每隔一个元素
print(numbers[1::2])    # [1, 3, 5, 7, 9] 从索引1开始，每隔一个
print(numbers[::3])     # [0, 3, 6, 9] 每隔两个元素
print(numbers[::-1])    # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] 反转列表
```

## 修改元素

```python runner
fruits = ["apple", "banana", "cherry"]
print(f"原列表: {fruits}")

# 修改单个项目
fruits[1] = "orange"
print(f"修改后: {fruits}")

# 修改多个项目
fruits[1:3] = ["kiwi", "mango"]
print(f"批量修改: {fruits}")
```

### 替换时改变列表长度

Python列表切片赋值可以改变列表长度：

```python runner
fruits = ["apple", "banana", "cherry"]
print(f"原列表: {fruits}")

# 用更多元素替换
fruits[1:2] = ["orange", "kiwi", "melon"]
print(f"替换后: {fruits}")

# 用更少元素替换
fruits[1:4] = ["watermelon"]
print(f"再次替换: {fruits}")
```

## 添加元素

### 添加元素到末尾

JavaScript使用`.push()`方法，可以添加一个或多个元素：

```javascript runner
let fruits = ["apple", "banana"];

// 添加单个元素
fruits.push("cherry");
console.log(fruits);  // ["apple", "banana", "cherry"]

// 添加多个元素
fruits.push("orange", "kiwi");
console.log(fruits);  // ["apple", "banana", "cherry", "orange", "kiwi"]
```

Python的`.append()`方法只能添加一个元素：

```python runner
fruits = ["apple", "banana"]

# 添加单个元素
fruits.append("cherry")
print(fruits)

# append只能添加一个元素，如果传入列表会整个作为一个元素
fruits.append(["orange", "kiwi"])  
print(fruits)  # ['apple', 'banana', 'cherry', ['orange', 'kiwi']]

# 如果要添加多个单独的元素，需要多次调用append
fruits = ["apple", "banana"]
fruits.append("cherry")
fruits.append("orange")
fruits.append("kiwi")
print(fruits)  # ['apple', 'banana', 'cherry', 'orange', 'kiwi']
```

### 在开头添加元素

JavaScript使用`.unshift()`方法在数组开头添加元素：

```javascript runner
let fruits = ["banana", "cherry"];
fruits.unshift("apple");
console.log(fruits);  // ["apple", "banana", "cherry"]

// 也可以添加多个元素
fruits.unshift("mango", "orange");
console.log(fruits);  // ["mango", "orange", "apple", "banana", "cherry"]
```

Python可以使用`.insert(0, element)`在列表开头插入：

```python runner
fruits = ["banana", "cherry"]
fruits.insert(0, "apple")
print(fruits)

# 或者使用列表拼接
fruits = ["banana", "cherry"]
fruits = ["apple"] + fruits
print(fruits)

# 使用+=操作符（注意顺序）
new_fruits = ["mango", "orange"]
fruits = new_fruits + fruits
print(fruits)
```

### 在指定位置插入元素

JavaScript使用`.splice()`方法插入：

```javascript runner
let fruits = ["apple", "cherry"];
fruits.splice(1, 0, "banana");  // 在索引1处插入，删除0个元素
console.log(fruits);  // ["apple", "banana", "cherry"]
```

Python的`.insert()`方法更直观：

```python runner
fruits = ["apple", "cherry"]
fruits.insert(1, "banana")  # 在索引1处插入
print(fruits)
```

### 添加多个元素

JavaScript可以使用`.push()`配合展开语法：

```javascript runner
let fruits = ["apple", "banana"];
let more_fruits = ["cherry", "orange"];
fruits.push(...more_fruits);
console.log(fruits);  // ["apple", "banana", "cherry", "orange"]
```

Python的`.extend()`方法更清晰：

```python runner
fruits = ["apple", "banana"]
more_fruits = ["cherry", "orange"]

fruits.extend(more_fruits)
print(fruits)

# 也可以添加任何可迭代对象
numbers = [1, 2, 3]
numbers.extend(range(4, 7))
print(numbers)
```

### 使用 + 操作符

```python runner
fruits1 = ["apple", "banana"]
fruits2 = ["cherry", "orange"]

# 连接两个列表（创建新列表）
all_fruits = fruits1 + fruits2
print(f"连接结果: {all_fruits}")
print(f"原列表1: {fruits1}")  # 原列表不变
print(f"原列表2: {fruits2}")  # 原列表不变

# += 操作符（修改原列表）
fruits1 += fruits2
print(f"使用+=后: {fruits1}")
```

## 删除元素

### 删除指定值

JavaScript中没有直接删除值的方法，通常需要先找到索引：

```javascript runner
let fruits = ["apple", "banana", "cherry"];
let index = fruits.indexOf("banana");
if (index > -1) {
    fruits.splice(index, 1);
}
console.log(fruits);  // ["apple", "cherry"]
```

Python的`.remove()`方法更直接：

```python runner
fruits = ["apple", "banana", "cherry"]
fruits.remove("banana")
print(fruits)

# 如果值不存在会报错，可以先检查
fruits_to_remove = ["orange", "apple"]
for fruit in fruits_to_remove:
    if fruit in fruits:
        fruits.remove(fruit)
        print(f"删除了 {fruit}")
    else:
        print(f"{fruit} 不在列表中")

print(f"最终列表: {fruits}")
```

### 删除指定索引

JavaScript的`.pop()`只能删除最后一个元素，`.splice()`可以删除任意位置：

```javascript runner
let fruits = ["apple", "banana", "cherry"];

let last = fruits.pop();        // 删除最后一个
console.log(last);              // "cherry"

fruits.splice(0, 1);            // 删除第一个
console.log(fruits);            // ["banana"]
```

Python的`.pop()`方法更灵活：

```python runner
fruits = ["apple", "banana", "cherry"]

# 删除最后一个元素
last_fruit = fruits.pop()
print(f"删除的元素: {last_fruit}")
print(f"剩余列表: {fruits}")

# 删除指定索引的元素
fruits = ["apple", "banana", "cherry", "orange"]
second_fruit = fruits.pop(1)  # 删除索引1的元素
print(f"删除的元素: {second_fruit}")
print(f"剩余列表: {fruits}")
```

### del 关键字

JavaScript虽然有`delete`操作符，但在数组中使用会产生"空洞"，通常不推荐：

```javascript runner
let fruits = ["apple", "banana", "cherry", "orange"];

// delete会留下空洞，不会改变数组长度
delete fruits[1];
console.log(fruits);        // ["apple", empty, "cherry", "orange"]
console.log(fruits.length); // 4 (长度不变)
console.log(fruits[1]);     // undefined

// 推荐使用splice来真正删除元素
fruits = ["apple", "banana", "cherry", "orange"];
fruits.splice(1, 1);  // 从索引1开始删除1个元素
console.log(fruits);  // ["apple", "cherry", "orange"]
```

Python的`del`关键字会真正删除元素，后面的元素会前移：

```python runner
fruits = ["apple", "banana", "cherry", "orange", "kiwi"]

# 删除指定索引
del fruits[1]
print(f"删除索引1后: {fruits}")

# 删除切片
del fruits[1:3]
print(f"删除切片后: {fruits}")

# 清空列表
fruits_backup = fruits.copy()
del fruits[:]
print(f"清空后: {fruits}")
print(f"备份: {fruits_backup}")
```

### 清空

```python runner
fruits = ["apple", "banana", "cherry"]
print(f"清空前: {fruits}")

fruits.clear()
print(f"清空后: {fruits}")
```

## 遍历

### 基本遍历

JavaScript使用`for...of`循环：

```javascript runner
let fruits = ["apple", "banana", "cherry"];

for (let fruit of fruits) {
    console.log(fruit);
}
```

Python的语法更简洁：

```python runner
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
```

### 同时获取索引和值

JavaScript可以使用`.forEach()`或`for`循环：

```javascript runner
let fruits = ["apple", "banana", "cherry"];

fruits.forEach((fruit, index) => {
    console.log(`${index}: ${fruit}`);
});
```

Python使用`enumerate()`函数：

```python runner
fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# 可以指定起始索引
for index, fruit in enumerate(fruits, start=1):
    print(f"第{index}个: {fruit}")
```

### 遍历多个列表

Python的`zip()`函数可以同时遍历多个列表：

```python runner
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
cities = ["New York", "London", "Tokyo"]

for name, age, city in zip(names, ages, cities):
    print(f"{name}, {age}岁, 来自{city}")

# 如果列表长度不同，zip会在最短的列表结束时停止
numbers = [1, 2, 3, 4, 5]
letters = ["a", "b", "c"]

for num, letter in zip(numbers, letters):
    print(f"{num}: {letter}")
```

## 排序

### 原地排序

JavaScript使用`.sort()`方法：

```javascript runner
let numbers = [3, 1, 4, 1, 5, 9, 2];
numbers.sort((a, b) => a - b);  // 数字升序
console.log(numbers);

let fruits = ["banana", "apple", "cherry"];
fruits.sort();  // 字母顺序
console.log(fruits);
```

Python的`.sort()`方法默认就能正确处理数字和字符串：

```python runner
# 数字排序
numbers = [3, 1, 4, 1, 5, 9, 2]
numbers.sort()
print(f"数字升序: {numbers}")

numbers.sort(reverse=True)
print(f"数字降序: {numbers}")

# 字符串排序
fruits = ["banana", "apple", "cherry"]
fruits.sort()
print(f"字母顺序: {fruits}")

fruits.sort(reverse=True)
print(f"字母倒序: {fruits}")
```

### 返回新排序列表

```python runner
original_numbers = [3, 1, 4, 1, 5, 9, 2]

# 创建排序后的新列表，原列表不变
sorted_numbers = sorted(original_numbers)
print(f"原列表: {original_numbers}")
print(f"排序后: {sorted_numbers}")

# 自定义排序
words = ["python", "java", "c", "javascript"]

# 按长度排序
sorted_by_length = sorted(words, key=len)
print(f"按长度排序: {sorted_by_length}")

# 按最后一个字母排序
sorted_by_last = sorted(words, key=lambda x: x[-1])
print(f"按最后字母排序: {sorted_by_last}")
```

### 反转

```python runner
fruits = ["apple", "banana", "cherry"]
print(f"原列表: {fruits}")

fruits.reverse()
print(f"反转后: {fruits}")

# 或者使用切片
fruits = ["apple", "banana", "cherry"]
reversed_fruits = fruits[::-1]
print(f"使用切片反转: {reversed_fruits}")
```

## 复制

### 浅拷贝

JavaScript中可以使用展开语法或`.slice()`：

```javascript runner
let original = [1, 2, 3];
let copy1 = [...original];
let copy2 = original.slice();

console.log(copy1);  // [1, 2, 3]
console.log(copy2);  // [1, 2, 3]
```

Python提供多种浅拷贝方式：

```python runner
original = [1, 2, 3, 4, 5]

# 方式1: copy() 方法
copy1 = original.copy()

# 方式2: list() 构造函数
copy2 = list(original)

# 方式3: 切片
copy3 = original[:]

print(f"原列表: {original}")
print(f"拷贝1: {copy1}")
print(f"拷贝2: {copy2}")
print(f"拷贝3: {copy3}")

# 验证是不同的对象
copy1.append(6)
print(f"修改拷贝后原列表: {original}")
print(f"修改拷贝后拷贝1: {copy1}")
```

### 深拷贝

对于包含嵌套列表的情况，需要深拷贝。

JavaScript常用`JSON.parse(JSON.stringify())`方法：

```javascript runner
// 嵌套数组
let original = [[1, 2], [3, 4], [5, 6]];

// 深拷贝
let deepCopy = JSON.parse(JSON.stringify(original));
deepCopy[0].push(99);

console.log("原数组:", original);    // [[1, 2], [3, 4], [5, 6]]
console.log("深拷贝:", deepCopy);    // [[1, 2, 99], [3, 4], [5, 6]]
```

不过`JSON.stringify`有一些限制：无法处理函数、`undefined`、`Symbol`、`Date`对象等。对于复杂情况，可以使用`structuredClone()`或第三方库。

Python使用`copy.deepcopy()`：

```python runner
import copy

# 嵌套列表
original = [[1, 2], [3, 4], [5, 6]]

# 浅拷贝 - 嵌套列表仍然是同一个对象
shallow_copy = original.copy()
shallow_copy[0].append(99)

print(f"原列表: {original}")        # [[1, 2, 99], [3, 4], [5, 6]]
print(f"浅拷贝: {shallow_copy}")    # [[1, 2, 99], [3, 4], [5, 6]]

# 深拷贝 - 完全独立的副本
original = [[1, 2], [3, 4], [5, 6]]
deep_copy = copy.deepcopy(original)
deep_copy[0].append(99)

print(f"原列表: {original}")        # [[1, 2], [3, 4], [5, 6]]
print(f"深拷贝: {deep_copy}")       # [[1, 2, 99], [3, 4], [5, 6]]
```

## 列表推导式

这是Python独有的强大特性，可以用简洁的语法创建列表：

```python runner
# 基本列表推导式
numbers = [x for x in range(10)]
print(f"0-9的数字: {numbers}")

# 带条件的列表推导式
even_numbers = [x for x in range(20) if x % 2 == 0]
print(f"0-19的偶数: {even_numbers}")

# 对元素进行变换
squares = [x**2 for x in range(10)]
print(f"0-9的平方: {squares}")

# 处理字符串列表
fruits = ["apple", "banana", "cherry"]
upper_fruits = [fruit.upper() for fruit in fruits]
print(f"大写水果: {upper_fruits}")

# 复杂的列表推导式
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(f"扁平化矩阵: {flattened}")
```

与JavaScript的`.map()`和`.filter()`对比：

```javascript runner
// JavaScript 使用 map 和 filter
let numbers = Array.from({length: 10}, (_, i) => i);
let evenSquares = numbers
    .filter(x => x % 2 === 0)
    .map(x => x * x);

console.log(evenSquares);  // [0, 4, 16, 36, 64]
```

```python runner
# Python 列表推导式
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)  # [0, 4, 16, 36, 64]
```

## 常用列表方法总结

```python runner
# 创建测试列表
numbers = [1, 2, 3, 2, 4, 2, 5]
print(f"原列表: {numbers}")

# count() - 计算某个值出现的次数
count_2 = numbers.count(2)
print(f"数字2出现次数: {count_2}")

# index() - 找到某个值的首次出现位置
index_of_3 = numbers.index(3)
print(f"数字3的位置: {index_of_3}")

# 尝试查找不存在的值会报错
try:
    index_of_10 = numbers.index(10)
except ValueError:
    print("数字10不在列表中")

# 可以指定搜索范围
index_of_2_after_pos_2 = numbers.index(2, 2)  # 从索引2开始搜索
print(f"从位置2开始搜索，数字2的位置: {index_of_2_after_pos_2}")
```

## 列表与其他数据类型的转换

```python runner
# 字符串转列表
text = "hello"
char_list = list(text)
print(f"字符串转列表: {char_list}")

# 列表转字符串
fruits = ["apple", "banana", "cherry"]
joined_string = ", ".join(fruits)
print(f"列表转字符串: {joined_string}")

# 元组转列表
tuple_data = (1, 2, 3, 4, 5)
list_data = list(tuple_data)
print(f"元组转列表: {list_data}")

# 列表转元组
tuple_from_list = tuple(list_data)
print(f"列表转元组: {tuple_from_list}")

# 集合转列表（会去除重复元素）
set_data = {3, 1, 4, 1, 5, 9, 2, 6}
list_from_set = list(set_data)
print(f"集合转列表: {list_from_set}")
```

## 高级技巧

### 列表的布尔值判断

```python runner
# 空列表为False，非空列表为True
empty_list = []
non_empty_list = [1, 2, 3]

print(f"空列表的布尔值: {bool(empty_list)}")
print(f"非空列表的布尔值: {bool(non_empty_list)}")

# 在条件语句中的应用
if empty_list:
    print("空列表为真")
else:
    print("空列表为假")

if non_empty_list:
    print("非空列表为真")
```

### 列表解包

```python runner
# 列表解包
fruits = ["apple", "banana", "cherry"]

# 解包到变量
first, second, third = fruits
print(f"第一个: {first}, 第二个: {second}, 第三个: {third}")

# 使用*收集剩余元素
numbers = [1, 2, 3, 4, 5]
first, *middle, last = numbers
print(f"第一个: {first}")
print(f"中间的: {middle}")
print(f"最后一个: {last}")

# 函数参数解包
def print_fruits(fruit1, fruit2, fruit3):
    print(f"水果: {fruit1}, {fruit2}, {fruit3}")

fruits = ["苹果", "香蕉", "樱桃"]
print_fruits(*fruits)  # 相当于 print_fruits("苹果", "香蕉", "樱桃")
```

## 列表性能注意事项

```python runner
import time

# append vs insert 性能对比
def test_append():
    lst = []
    start = time.time()
    for i in range(10000):
        lst.append(i)
    return time.time() - start

def test_insert():
    lst = []
    start = time.time()
    for i in range(10000):
        lst.insert(0, i)  # 总是插入到开头
    return time.time() - start

append_time = test_append()
insert_time = test_insert()

print(f"append操作耗时: {append_time:.4f}秒")
print(f"insert操作耗时: {insert_time:.4f}秒")
print(f"insert比append慢了约 {insert_time/append_time:.1f} 倍")

# 推荐：需要频繁在开头插入时，考虑使用collections.deque
from collections import deque

def test_deque():
    dq = deque()
    start = time.time()
    for i in range(10000):
        dq.appendleft(i)
    return time.time() - start

deque_time = test_deque()
print(f"deque.appendleft耗时: {deque_time:.4f}秒")
```

## 小结

Python列表是一个功能强大且灵活的数据结构：

1. **语法相似**：与JavaScript数组语法高度相似，学习成本低
2. **负索引**：支持从末尾访问元素，比JavaScript的`array.length-1`更简洁
3. **切片功能**：提供强大的切片操作，支持步长和负索引
4. **丰富的方法**：`append()`、`extend()`、`insert()`、`remove()`、`pop()` 等方法覆盖各种操作需求
5. **列表推导式**：提供比JavaScript`.map()`和`.filter()`更简洁的语法
6. **多种排序**：`sort()`原地排序，`sorted()`返回新列表，都支持自定义排序规则
7. **灵活复制**：多种浅拷贝方式，配合`copy`模块支持深拷贝
8. **内置函数支持**：`len()`、`sum()`、`max()`、`min()`等函数都支持列表操作
9. **类型转换**：可以与字符串、元组、集合等类型方便地相互转换

掌握列表操作是Python编程的基础，它不仅是数据存储的重要工具，也是实现复杂算法和数据处理的基石。列表推导式等Python特有功能更是提高代码简洁性和可读性的重要工具。 