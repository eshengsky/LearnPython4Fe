# 列表

在 JavaScript 中，数组是存储多个值的最重要的数据结构，我们使用方括号来创建和操作数组。Python 的列表与 JavaScript 数组非常相似，但提供了更多强大的功能和更优雅的语法。

## 创建

JavaScript 中创建数组很简单：

```javascript runner
// JavaScript 数组创建
let fruits = ["apple", "banana", "cherry"];
let numbers = [1, 2, 3, 4, 5];
let mixed = ["hello", 42, true];

console.log(fruits);
console.log(numbers);
console.log(mixed);
```

Python 的列表创建语法完全相同：

```python runner
# Python 列表创建
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True]

print(fruits)
print(numbers)
print(mixed)
```

Python 列表同样支持混合数据类型，这得益于 Python 的动态类型系统。

### 使用构造函数创建

JavaScript 可以使用`Array()`构造函数创建数组：

```javascript runner
// JavaScript 使用 Array() 构造函数
let emptyArray = new Array();
console.log("空数组:", emptyArray);

// 从字符串创建数组需要使用其他方法
let stringArray = "hello".split("");
console.log("从字符串创建:", stringArray);

// 创建指定长度的数组
let rangeArray = Array.from({length: 5}, (_, i) => i);
console.log("创建范围数组:", rangeArray);

// 从其他数组创建
let tupleArray = Array.from([1, 2, 3]);
console.log("从数组创建:", tupleArray);
```

Python 也有`list()`构造函数，可以从各种可迭代对象创建列表：

```python runner
# 使用 list() 构造函数
empty_list = list()
print(f"空列表: {empty_list}")

# 从其他可迭代对象创建列表
string_list = list("hello")
print(f"从字符串创建: {string_list}")

# range() 函数生成数字序列，详细用法请参考循环语句章节
range_list = list(range(5))  # range(5) 生成 0 到 4 的数字序列
print(f"从范围创建: {range_list}")

# 从元组创建（元组使用圆括号，我们后续章节会详细介绍）
tuple_list = list((1, 2, 3))
print(f"从元组创建: {tuple_list}")

# 从已有列表创建（实际上是复制）
existing_list = [1, 2, 3]
copied_list = list(existing_list)
print(f"从列表复制: {copied_list}")

# list() 可以接受任何可迭代对象
set_list = list({3, 1, 2})  # 从集合创建，注意顺序可能不同
print(f"从集合创建: {set_list}")
```

## 访问元素

JavaScript 中使用索引访问数组元素：

```javascript runner
// JavaScript 数组访问
let colors = ["red", "green", "blue"];

console.log(colors[0]);  // 第一个元素
console.log(colors[1]);  // 第二个元素
console.log(colors[-1]); // undefined (JavaScript 不支持负索引)
```

Python 的访问方式相同，但支持负索引这个强大特性：

```python runner
colors = ["red", "green", "blue"]

print(colors[0])   # 第一个元素
print(colors[1])   # 第二个元素
print(colors[-1])  # 最后一个元素 (negative indexing)
print(colors[-2])  # 倒数第二个元素
```

负索引让我们能够很方便地从列表末尾访问元素，这在 JavaScript 中需要使用`array[array.length - 1]`的方式。

## 长度

JavaScript 使用`.length`属性：

```javascript runner
let fruits = ["apple", "banana", "cherry"];
console.log(fruits.length);  // 输出: 3
```

Python 使用`len()`函数：

```python runner
fruits = ["apple", "banana", "cherry"]
print(len(fruits))
```

## 比较

JavaScript 数组的比较主要基于引用：

```javascript runner
let list1 = [1, 2, 3];
let list2 = [1, 2, 3];
let list3 = list1;

console.log(list1 === list2);  // false (不同的对象)
console.log(list1 === list3);  // true (同一个对象)

// 内容比较需要额外的方法
console.log(JSON.stringify(list1) === JSON.stringify(list2));  // true
```

Python 列表的比较与 JavaScript 数组不同。Python 的`==`会比较列表内容，而 JavaScript 比较的是引用：

```python runner
# Python 列表内容比较
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1

print(f"内容相同的列表: {list1 == list2}")  # True
print(f"同一个对象: {list1 is list3}")      # True
print(f"不同对象但内容相同: {list1 is list2}")  # False

# 注意：列表比较是顺序敏感的
list4 = [3, 2, 1]
print(f"顺序不同: {list1 == list4}")  # False

# 列表支持大小比较（按字典序）
print(f"[1, 2] < [1, 3]: {[1, 2] < [1, 3]}")    # True
print(f"[1, 2] < [2, 1]: {[1, 2] < [2, 1]}")    # True
print(f"['a', 'b'] < ['a', 'c']: {['a', 'b'] < ['a', 'c']}")  # True
```

关于`==`和`is`的详细差异，请参考布尔值章节的比较运算符部分。

## 元素查找

### 检查元素存在

JavaScript 中使用`.includes()`方法：

```javascript runner
let fruits = ["apple", "banana", "cherry"];

console.log(fruits.includes("apple"));   // 输出: true
console.log(fruits.includes("orange"));  // 输出: false
```

Python 使用更直观的`in`关键字：

```python runner
fruits = ["apple", "banana", "cherry"]

print("apple" in fruits)   # 输出: True
print("orange" in fruits)  # 输出: False

# 也可以使用 not in
print("orange" not in fruits)  # 输出: True
```

### 索引查找

JavaScript 使用`.indexOf()`方法查找元素的索引：

```javascript runner
let fruits = ["apple", "banana", "cherry", "banana"];

console.log(fruits.indexOf("banana"));   // 输出: 1 (第一次出现的位置)
console.log(fruits.indexOf("orange"));   // 输出: -1 (不存在)

// 查找最后一次出现的位置
console.log(fruits.lastIndexOf("banana")); // 输出: 3
```

Python 使用`.index()`方法，但不存在时会报错：

```python runner
fruits = ["apple", "banana", "cherry", "banana"]

# 查找元素的索引
index = fruits.index("banana")
print(f"banana 的索引: {index}")  # 第一次出现的位置

# 查找不存在的元素会报错
try:
    index = fruits.index("orange")
except ValueError:
    print("orange 不在列表中")

# 安全的查找方式
if "orange" in fruits:
    index = fruits.index("orange")
    print(f"orange 的索引: {index}")
else:
    print("orange 不在列表中")
```

### 计数

JavaScript 需要使用`filter()`方法来计数：

```javascript runner
let numbers = [1, 2, 3, 2, 4, 2, 5];

// 计算元素出现次数
let count = numbers.filter(x => x === 2).length;
console.log(`数字 2 出现次数: ${count}`);

// 或使用 reduce
let count2 = numbers.reduce((acc, val) => val === 2 ? acc + 1 : acc, 0);
console.log(`数字 2 出现次数: ${count2}`);
```

Python 提供了简洁的`.count()`方法：

```python runner
numbers = [1, 2, 3, 2, 4, 2, 5]

# 计算元素出现次数
count = numbers.count(2)
print(f"数字 2 出现次数: {count}")
```

## 切片

JavaScript 使用`.slice()`方法来获取数组的部分：

```javascript runner
let numbers = [0, 1, 2, 3, 4, 5];

console.log(numbers.slice(2, 5));   // [2, 3, 4]
console.log(numbers.slice(0, 3));   // [0, 1, 2]
console.log(numbers.slice(2));      // [2, 3, 4, 5]
```

Python 的切片语法 `[开始:结束]` 更简洁优雅：

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

需要注意的是，Python 切片遵循"含左不含右"的规则，即`numbers[2:5]`包含索引 2、3、4 的元素，但不包含索引 5 的元素。

### 步长切片

Python 切片还支持步长参数，完整语法是 `[开始:结束:步长]`，这是 JavaScript 所没有的：

```python runner
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print("原列表:", numbers)
print("索引:  ", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
print()

# 从位置 0 到位置 5，每隔一个取值
print("numbers[0:6:2] =", numbers[0:6:2])  # [0, 2, 4] 取索引 0, 2, 4
print()

# 更多步长示例
print("numbers[::2] =", numbers[::2])       # [0, 2, 4, 6, 8] 从头到尾，每隔一个
print("numbers[1::2] =", numbers[1::2])     # [1, 3, 5, 7, 9] 从索引 1 开始，每隔一个
print("numbers[::3] =", numbers[::3])       # [0, 3, 6, 9] 从头到尾，每隔两个
print("numbers[2:8:2] =", numbers[2:8:2])   # [2, 4, 6] 从索引 2 到 7，每隔一个
print()

# 负步长：反向遍历
print("numbers[::-1] =", numbers[::-1])     # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] 反转列表
print("numbers[::-2] =", numbers[::-2])     # [9, 7, 5, 3, 1] 反向每隔一个
```

## 修改元素

与 JavaScript 数组一样，Python 列表支持通过索引直接修改元素，但 Python 还支持通过切片批量修改多个元素。

JavaScript 中修改数组元素：

```javascript runner
let fruits = ["apple", "banana", "cherry"];
console.log("原数组:", fruits);

// 修改单个元素
fruits[1] = "orange";
console.log("修改后:", fruits);

// 批量修改需要使用 splice 方法
fruits.splice(1, 2, "kiwi", "mango");  // 从索引 1 开始删除 2 个，插入新元素
console.log("批量修改:", fruits);
```

Python 提供了更简洁的语法：

```python runner
fruits = ["apple", "banana", "cherry"]
print(f"原列表: {fruits}")

# 修改单个项目
fruits[1] = "orange"
print(f"修改后: {fruits}")

# 修改多个项目（使用切片）
fruits[1:3] = ["kiwi", "mango"]
print(f"批量修改: {fruits}")
```

### 替换时改变列表长度

Python 列表切片赋值可以改变列表长度：

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

### append 和 extend

JavaScript 使用`.push()`方法，可以添加一个或多个元素：

```javascript runner
let fruits = ["apple", "banana"];

// 添加单个元素
fruits.push("cherry");
console.log(fruits);  // ["apple", "banana", "cherry"]

// 添加多个元素
fruits.push("orange", "kiwi");
console.log(fruits);  // ["apple", "banana", "cherry", "orange", "kiwi"]
```

Python 区分单个元素添加和多个元素添加，分别使用`.append()`和`.extend()`方法：

```python runner
fruits = ["apple", "banana"]

# append：添加单个元素
fruits.append("cherry")
print(f"append 单个元素: {fruits}")

# append 只能添加一个元素，如果传入列表会整个作为一个元素
fruits.append(["orange", "kiwi"])  
print(f"append 列表: {fruits}")  # ['apple', 'banana', 'cherry', ['orange', 'kiwi']]

# extend：添加多个元素（展开列表）
fruits = ["apple", "banana"]
more_fruits = ["cherry", "orange", "kiwi"]
fruits.extend(more_fruits)
print(f"extend 多个元素: {fruits}")

# extend 也可以添加任何可迭代对象
numbers = [1, 2, 3]
numbers.extend(range(4, 7))  # 添加 4, 5, 6
print(f"extend 范围: {numbers}")

# 字符串也是可迭代的
letters = ['a', 'b']
letters.extend("cde")
print(f"extend 字符串: {letters}")
```

### insert 和位置插入

JavaScript 使用`.unshift()`方法在数组开头添加元素，用`.splice()`方法在指定位置插入：

```javascript runner
let fruits = ["banana", "cherry"];

// 在开头添加
fruits.unshift("apple");
console.log(fruits);  // ["apple", "banana", "cherry"]

// 在指定位置插入
fruits.splice(1, 0, "mango");  // 在索引 1 处插入，删除 0 个元素
console.log(fruits);  // ["apple", "mango", "banana", "cherry"]
```

Python 的`.insert()`方法可以在任意位置插入：

```python runner
fruits = ["banana", "cherry"]

# 在开头插入
fruits.insert(0, "apple")
print(fruits)

# 在指定位置插入
fruits.insert(1, "mango")
print(fruits)

# 或者使用列表拼接在开头添加
fruits = ["banana", "cherry"]
fruits = ["apple"] + fruits
print(fruits)
```

## 连接操作

JavaScript 中连接数组需要使用`.concat()`方法：

```javascript runner
let fruits1 = ["apple", "banana"];
let fruits2 = ["cherry", "orange"];

// 连接数组（创建新数组）
let allFruits = fruits1.concat(fruits2);
console.log("连接结果:", allFruits);
console.log("原数组 1:", fruits1);  // 原数组不变
console.log("原数组 2:", fruits2);  // 原数组不变
```

Python 使用`+`运算符更简洁：

```python runner
fruits1 = ["apple", "banana"]
fruits2 = ["cherry", "orange"]

# 连接两个列表（创建新列表）
all_fruits = fruits1 + fruits2
print(f"连接结果: {all_fruits}")
print(f"原列表 1: {fruits1}")  # 原列表不变
print(f"原列表 2: {fruits2}")  # 原列表不变

# 多个列表连接
fruits3 = ["kiwi", "mango"]
super_fruits = fruits1 + fruits2 + fruits3
print(f"多个连接: {super_fruits}")

# += 操作符（修改原列表）
fruits1 += fruits2
print(f"使用+=后: {fruits1}")

# += 等价于 extend()，但语法更简洁
fruits = ["a", "b"]
fruits += ["c", "d"]
print(f"+=等价于 extend: {fruits}")
```

## 重复操作

与字符串类似，Python 列表也支持使用`*`运算符进行重复操作。

JavaScript 中重复数组需要使用循环或其他方法：

```javascript runner
let pattern = ["hello", "world"];

// JavaScript 重复数组的一种方式
let repeated = [];
for (let i = 0; i < 3; i++) {
    repeated = repeated.concat(pattern);
}
console.log("重复结果:", repeated);

// 或使用现代方法
let repeated2 = Array(3).fill(pattern).flat();
console.log("另一种方式:", repeated2);
```

Python 使用`*`运算符非常简洁：

```python runner
pattern = ["hello", "world"]

# 重复列表
repeated = pattern * 3
print(f"重复 3 次: {repeated}")
```

### 重复操作的注意事项

在创建包含可变对象的列表时需要特别小心：

```python runner
# 创建二维列表需要注意
# 错误方式（共享引用）
wrong_matrix = [[0] * 3] * 2
print(f"错误方式创建: {wrong_matrix}")

wrong_matrix[0][0] = 1
print(f"修改后: {wrong_matrix}")  # 两行都被修改了！

# 正确方式
correct_matrix = [[0] * 3 for _ in range(2)]
print(f"正确方式创建: {correct_matrix}")

correct_matrix[0][0] = 1
print(f"修改后: {correct_matrix}")  # 只有第一行被修改
```

## 删除元素

### remove 和 pop

JavaScript 中没有直接删除值的方法，通常需要先找到索引，再使用 `.splice()` 删除元素：

```javascript runner
let fruits = ["apple", "banana", "cherry"];
let index = fruits.indexOf("banana");
if (index > -1) {
    fruits.splice(index, 1);
}
console.log(fruits);  // ["apple", "cherry"]
```

Python 的`.remove()`方法更直接：

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

JavaScript 的`.pop()`只能删除最后一个元素，`.splice()`可以删除任意位置：

```javascript runner
let fruits = ["apple", "banana", "cherry"];

let last = fruits.pop();        // 删除最后一个
console.log(last);              // "cherry"

fruits.splice(0, 1);            // 删除第一个
console.log(fruits);            // ["banana"]
```

Python 的`.pop()`方法更灵活，可以删除任意位置：

```python runner
fruits = ["apple", "banana", "cherry"]

# 删除最后一个元素
last_fruit = fruits.pop()
print(f"删除的元素: {last_fruit}")
print(f"剩余列表: {fruits}")

# 删除指定索引的元素
fruits = ["apple", "banana", "cherry", "orange"]
second_fruit = fruits.pop(1)  # 删除索引 1 的元素
print(f"删除的元素: {second_fruit}")
print(f"剩余列表: {fruits}")
```

### del 语句

JavaScript 虽然有`delete`操作符，但在数组中使用会产生"空洞"，通常不推荐：

```javascript runner
let fruits = ["apple", "banana", "cherry", "orange"];

// delete 会留下空洞，不会改变数组长度
delete fruits[1];
console.log(fruits);        // ["apple", empty, "cherry", "orange"]
console.log(fruits.length); // 4 (长度不变)
console.log(fruits[1]);     // undefined

// 推荐使用 splice 来真正删除元素
fruits = ["apple", "banana", "cherry", "orange"];
fruits.splice(1, 1);  // 从索引 1 开始删除 1 个元素
console.log(fruits);  // ["apple", "cherry", "orange"]
```

Python 的`del`关键字会真正删除元素，后面的元素会前移：

```python runner
fruits = ["apple", "banana", "cherry", "orange", "kiwi"]

# 删除指定索引
del fruits[1]
print(f"删除索引 1 后: {fruits}")

# 删除切片
del fruits[1:3]
print(f"删除切片后: {fruits}")

# 清空列表
fruits_backup = fruits.copy()
del fruits[:]
print(f"清空后: {fruits}")
print(f"备份: {fruits_backup}")
```

### clear 清空

```python runner
fruits = ["apple", "banana", "cherry"]
print(f"清空前: {fruits}")

fruits.clear()
print(f"清空后: {fruits}")
```

### 删除方法总结

Python 提供了多种删除列表元素的方法，每种方法适用于不同的场景：

| 方法 | 语法 | 功能 | 返回值 | 使用场景 |
|------|------|------|--------|----------|
| `remove(item)` | `lst.remove("apple")` | 删除第一个匹配的值 | None | 知道要删除的值，不知道位置 |
| `pop()` | `lst.pop()` | 删除最后一个元素 | 被删除的元素 | 需要删除并使用最后一个元素 |
| `pop(index)` | `lst.pop(0)` | 删除指定位置的元素 | 被删除的元素 | 知道位置，需要删除并使用该元素 |
| `del lst[index]` | `del lst[0]` | 删除指定位置的元素 | None | 知道位置，只删除不需要返回值 |
| `del lst[start:end]` | `del lst[1:3]` | 删除指定范围的元素 | None | 删除连续的多个元素 |
| `clear()` | `lst.clear()` | 删除所有元素 | None | 清空整个列表 |

## 排序

### 原地排序

JavaScript 使用`.sort()`方法进行排序，支持自定义比较函数：

```javascript runner
// 数字排序
let numbers1 = [3, 1, 4, 1, 5, 9, 2];
let numbers2 = [3, 1, 4, 1, 5, 9, 2];

numbers1.sort((a, b) => a - b);  // 数字升序
console.log("数字升序:", numbers1);

numbers2.sort((a, b) => b - a);  // 数字降序
console.log("数字降序:", numbers2);

// 字符串排序
let fruits1 = ["banana", "apple", "cherry"];
let fruits2 = ["banana", "apple", "cherry"];

fruits1.sort();  // 字母升序
console.log("字母顺序:", fruits1);

fruits2.sort((a, b) => b.localeCompare(a));  // 字母降序
console.log("字母倒序:", fruits2);
```

Python 的`.sort()`方法默认就能正确处理数字和字符串：

```python runner
# 数字排序
numbers1 = [3, 1, 4, 1, 5, 9, 2]
numbers2 = [3, 1, 4, 1, 5, 9, 2]

numbers1.sort()
print(f"数字升序: {numbers1}")

numbers2.sort(reverse=True)
print(f"数字降序: {numbers2}")

# 字符串排序
fruits1 = ["banana", "apple", "cherry"]
fruits2 = ["banana", "apple", "cherry"]

fruits1.sort()
print(f"字母顺序: {fruits1}")

fruits2.sort(reverse=True)
print(f"字母倒序: {fruits2}")
```

### 返回新排序列表

如果想保持原列表不变，创建一个新的排序列表，可以使用 `sorted()` 函数：

```python runner
original_numbers = [3, 1, 4, 1, 5, 9, 2]

# 创建排序后的新列表，原列表不变
sorted_numbers = sorted(original_numbers)
print(f"原列表: {original_numbers}")
print(f"排序后: {sorted_numbers}")

# 降序排序
sorted_desc = sorted(original_numbers, reverse=True)
print(f"降序排序: {sorted_desc}")

# 字符串排序
fruits = ["banana", "apple", "cherry"]
sorted_fruits = sorted(fruits)
print(f"字母排序: {sorted_fruits}")
```

### 自定义排序

JavaScript 使用比较函数来控制排序逻辑：

```javascript runner
// JavaScript 自定义排序
let words = ["python", "java", "c", "javascript"];

// 按字符串长度排序
let sortedByLength = [...words].sort((a, b) => a.length - b.length);
console.log("按长度排序:", sortedByLength);

// 按最后一个字母排序
let sortedByLast = [...words].sort((a, b) => a[a.length-1].localeCompare(b[b.length-1]));
console.log("按最后字母排序:", sortedByLast);

// 数字按个位数降序排序
let numbers = [23, 45, 12, 67, 8, 91];
let sortedByOnes = [...numbers].sort((a, b) => (b % 10) - (a % 10));
console.log("按个位数降序排序:", sortedByOnes);
```

Python 使用 `key` 参数进行自定义排序，`key` 指定一个函数，用来从每个元素中提取比较的关键值：

```python runner
# Python 自定义排序
words = ["python", "java", "c", "javascript"]

# 按长度排序：key=len 表示用每个字符串的长度来比较
sorted_by_length = sorted(words, key=len)
print(f"按长度排序: {sorted_by_length}")

# 定义函数来获取最后一个字母，函数会在后续章节学习
def get_last_char(word):
    return word[-1]

sorted_by_last = sorted(words, key=get_last_char)
print(f"按最后字母排序: {sorted_by_last}")

# 数字按个位数降序排序
numbers = [23, 45, 12, 67, 8, 91]
def get_ones_digit(num):
    return num % 10

sorted_by_ones = sorted(numbers, key=get_ones_digit, reverse=True)
print(f"按个位数降序排序: {sorted_by_ones}")
```

## 反转列表

Python 提供了两种反转列表的方法：`.reverse()` 方法会直接修改原列表，而切片 `[::-1]` 会创建新列表。

```python runner
fruits = ["apple", "banana", "cherry"]
print(f"原列表: {fruits}")

# reverse() 方法：直接修改原列表
fruits.reverse()
print(f"reverse() 后: {fruits}")

# 切片方法：创建新列表，原列表不变
fruits = ["apple", "banana", "cherry"]
reversed_fruits = fruits[::-1]
print(f"原列表: {fruits}")
print(f"切片反转: {reversed_fruits}")
```

## 复制

### 浅拷贝

JavaScript 中可以使用展开语法或`.slice()`：

```javascript runner
let original = [1, 2, 3];
let copy1 = [...original];
let copy2 = original.slice();

console.log(copy1);  // [1, 2, 3]
console.log(copy2);  // [1, 2, 3]
```

Python 提供多种浅拷贝方式：

```python runner
original = [1, 2, 3]

# 方式 1: copy() 方法
copy1 = original.copy()

# 方式 2: list() 构造函数
copy2 = list(original)

# 方式 3: 切片
copy3 = original[:]

print(f"原列表: {original}")
print(f"拷贝 1: {copy1}")
print(f"拷贝 2: {copy2}")
print(f"拷贝 3: {copy3}")

# 验证是不同的对象
copy1.append(6)
print(f"修改拷贝后原列表: {original}")
print(f"修改拷贝后拷贝 1: {copy1}")
```

### 深拷贝

对于包含嵌套列表的情况，需要深拷贝。

JavaScript 的深拷贝：

```javascript runner
// 嵌套数组
let original = [[1, 2], [3, 4], [5, 6]];

// 浅拷贝 - 嵌套数组仍然是同一个对象
let shallowCopy = [...original];
shallowCopy[0].push(99);

console.log("原数组:", original);        // [[1, 2, 99], [3, 4], [5, 6]]
console.log("浅拷贝:", shallowCopy);     // [[1, 2, 99], [3, 4], [5, 6]]

// 深拷贝 - 完全独立的副本
original = [[1, 2], [3, 4], [5, 6]];
let deepCopy = JSON.parse(JSON.stringify(original));
deepCopy[0].push(99);

console.log("原数组:", original);        // [[1, 2], [3, 4], [5, 6]]
console.log("深拷贝:", deepCopy);        // [[1, 2, 99], [3, 4], [5, 6]]
```

不过`JSON.stringify`有一些限制：无法处理函数、`undefined`、`Symbol`、`Date`对象等。对于复杂情况，可以使用`structuredClone()`或第三方库。

Python 可以直接使用 `copy` 模块的 `deepcopy()` 函数：

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

## zip 函数

JavaScript 中组合多个数组通常需要手动处理：

```javascript runner
let names = ["Alice", "Bob", "Charlie"];
let ages = [25, 30, 35];

// JavaScript 手动组合数组
let combined = [];
for (let i = 0; i < names.length; i++) {
    combined.push([names[i], ages[i]]);
}
console.log("手动组合:", combined);

// 创建对象（类似字典）
let people = {};
for (let i = 0; i < names.length; i++) {
    people[names[i]] = ages[i];
}
console.log("创建对象:", people);
```

Python 的 `zip()` 函数可以直接处理这些操作：

```python runner
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

# zip 组合多个列表，返回组合后的迭代器
zipped = zip(names, ages)
print(f"zip 对象: {zipped}")

# 转换为列表查看结果
combined = list(zip(names, ages))
print(f"组合结果: {combined}")

# 创建字典
people_dict = dict(zip(names, ages))
print(f"创建字典: {people_dict}")
```

### 多个列表组合

`zip()` 可以同时处理任意数量的列表：

```python runner
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
cities = ["Beijing", "Shanghai", "Guangzhou"]
jobs = ["Engineer", "Designer", "Manager"]

# 组合四个列表
all_info = list(zip(names, ages, cities, jobs))
print("完整信息:")
print(all_info)

# 直接创建包含多个值的字典（值为组合数据）
info_dict = dict(zip(names, zip(ages, cities, jobs)))
print(f"信息字典: {info_dict}")
```

### 矩阵转置

`zip()` 的一个经典用法是矩阵转置：

```python runner
# 原始矩阵（行列表示）
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print("原始矩阵:")
print(matrix)

# 使用 zip 进行转置（* 用于解包列表）
transposed = list(zip(*matrix))
print("转置后:")
print(transposed)

# 转换回列表格式
transposed_lists = [list(row) for row in zip(*matrix)]
print("转置为列表:")
print(transposed_lists)
```

### 处理不同长度的列表

当列表长度不同时，`zip()` 以最短的为准：

```python runner
short_list = [1, 2]
long_list = ["a", "b", "c", "d"]
another_list = ["x", "y", "z"]

result = list(zip(short_list, long_list, another_list))
print(f"不同长度组合: {result}")

# 如果需要保留所有元素，可以先填充短列表
max_len = max(len(short_list), len(long_list), len(another_list))
padded_short = short_list + [None] * (max_len - len(short_list))
result_padded = list(zip(padded_short, long_list, another_list))
print(f"填充后组合: {result_padded}")
```

## 解包

JavaScript 中有数组解构赋值：

```javascript runner
// JavaScript 数组解构
const coordinates = [10, 20];
const [x, y] = coordinates;
console.log(`坐标: x=${x}, y=${y}`);

// 交换变量
let a = 1, b = 2;
[a, b] = [b, a];
console.log(`交换后: a=${a}, b=${b}`);

// 忽略元素
const numbers = [1, 2, 3, 4, 5];
const [first, , third] = numbers;  // 忽略第二个元素
console.log(`第一个: ${first}, 第三个: ${third}`);
```

Python 的列表解包功能类似，但语法更简洁：

```python runner
# 基本解包
coordinates = [10, 20]
x, y = coordinates
print(f"坐标: x={x}, y={y}")

# 变量交换
a, b = 1, 2
a, b = b, a
print(f"交换后: a={a}, b={b}")

# 忽略元素
numbers = [1, 2, 3, 4, 5]
first, _, third, *_ = numbers  # 使用 _ 忽略不需要的元素
print(f"第一个: {first}, 第三个: {third}")
```

### 扩展解包

Python 支持使用星号（*）进行扩展解包：

```python runner
# 扩展解包：收集多个元素
numbers = [1, 2, 3, 4, 5]

# 取第一个和最后一个，中间的收集到列表中
first, *middle, last = numbers
print(f"第一个: {first}")
print(f"中间部分: {middle}")  # 这是一个列表
print(f"最后一个: {last}")

# 取前两个，剩余的收集起来
a, b, *rest = numbers
print(f"前两个: {a}, {b}")
print(f"剩余: {rest}")

# 只取前三个，忽略其余
x, y, z, *_ = numbers  # 使用 _ 表示忽略
print(f"前三个: {x}, {y}, {z}")
```

### 嵌套列表解包

对于嵌套的列表结构，也可以进行解包：

```python runner
# 解包嵌套结构
coordinate_data = [[10, 20], [30, 40]]
point1, point2 = coordinate_data
x1, y1 = point1
x2, y2 = point2
print(f"第一个点: ({x1}, {y1})")
print(f"第二个点: ({x2}, {y2})")
```



## 列表推导式

JavaScript 中处理数组时，我们经常需要使用`.map()`、`.filter()`等方法来变换和过滤数据：

```javascript runner
// JavaScript 处理数组
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 获取所有数字的平方
let squares = numbers.map(x => x * x);
console.log("平方:", squares);

// 过滤出偶数
let evens = numbers.filter(x => x % 2 === 0);
console.log("偶数:", evens);

// 先过滤偶数，再计算平方
let evenSquares = numbers
    .filter(x => x % 2 === 0)
    .map(x => x * x);
console.log("偶数的平方:", evenSquares);

// 获取大写的水果名
let fruits = ["apple", "banana", "cherry"];
let upperFruits = fruits.map(fruit => fruit.toUpperCase());
console.log("大写水果:", upperFruits);
```

### 推导式语法详解

Python 提供了 **列表推导式（List Comprehension）** 这一独特特性，它是一种简洁的语法，可以在一行代码中创建新列表。

推导式的完整语法结构是：`[表达式 for 变量 in 可迭代对象 if 条件]`，各部分说明：

- **表达式**：对每个元素进行的操作或变换
- **for 变量 in 可迭代对象**：遍历数据源
- **if 条件**：过滤条件（可选）

```python runner
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 1. 基本推导式：[表达式 for 变量 in 可迭代对象]
squares = [x * x for x in numbers]
print(f"平方: {squares}")

# 2. 带条件的推导式：[表达式 for 变量 in 可迭代对象 if 条件]
evens = [x for x in numbers if x % 2 == 0]
print(f"偶数: {evens}")

# 3. 组合变换和条件：先过滤偶数，再计算平方
even_squares = [x * x for x in numbers if x % 2 == 0]
print(f"偶数的平方: {even_squares}")

# 4. 处理字符串列表
fruits = ["apple", "banana", "cherry"]
upper_fruits = [fruit.upper() for fruit in fruits]
print(f"大写水果: {upper_fruits}")
```

### 嵌套推导式

推导式还可以处理嵌套数据结构：

```python runner
# 嵌套推导式
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(f"原矩阵: {matrix}")

# 扁平化矩阵：[元素 for 行 in 矩阵 for 元素 in 行]
flattened = [num for row in matrix for num in row]
print(f"扁平化: {flattened}")

# 等价的传统写法
traditional_flat = []
for row in matrix:
    for num in row:
        traditional_flat.append(num)
print(f"传统方法: {traditional_flat}")

# 矩阵转置
transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]
print(f"转置矩阵: {transposed}")

# 生成乘法表
multiplication_table = [f"{i}x{j}={i*j}" for i in range(1, 4) for j in range(1, 4)]
print(f"乘法表: {multiplication_table}")
```

## 列表操作一览

### 列表方法

| 方法 | 功能 | 示例 | 返回值 |
|------|------|------|--------|
| `append(item)` | 在末尾添加一个元素 | `lst.append('new')` | None |
| `extend(iterable)` | 在末尾添加多个元素 | `lst.extend([1, 2, 3])` | None |
| `insert(index, item)` | 在指定位置插入元素 | `lst.insert(0, 'first')` | None |
| `remove(item)` | 删除第一个匹配的元素 | `lst.remove('apple')` | None |
| `pop(index)` | 删除并返回指定位置元素 | `lst.pop()` 或 `lst.pop(0)` | 被删除的元素 |
| `clear()` | 清空所有元素 | `lst.clear()` | None |
| `index(item)` | 返回元素首次出现的索引 | `lst.index('apple')` | 索引值 |
| `count(item)` | 统计元素出现次数 | `lst.count('apple')` | 出现次数 |
| `sort()` | 原地排序 | `lst.sort()` 或 `lst.sort(reverse=True)` | None |
| `reverse()` | 原地反转 | `lst.reverse()` | None |
| `copy()` | 创建浅拷贝 | `new_lst = lst.copy()` | 新列表 |

### 内置函数

| 函数 | 功能 | 示例 | 返回值 |
|------|------|------|--------|
| `len(lst)` | 获取列表长度 | `len([1, 2, 3])` | 长度 |
| `max(lst)` | 获取最大值 | `max([1, 2, 3])` | 最大值 |
| `min(lst)` | 获取最小值 | `min([1, 2, 3])` | 最小值 |
| `sum(lst)` | 计算数值列表的和 | `sum([1, 2, 3])` | 总和 |
| `sorted(lst)` | 返回排序后的新列表 | `sorted([3, 1, 2])` | 新的排序列表 |
| `reversed(lst)` | 返回反转的迭代器 | `list(reversed([1, 2, 3]))` | 反转的迭代器 |
| `zip(lst1, lst2)` | 组合多个列表 | `list(zip([1, 2], ['a', 'b']))` | 组合后的迭代器 |

### 运算符和关键字

| 操作 | 功能 | 示例 | 返回值 |
|------|------|------|--------|
| `+` | 连接列表 | `[1, 2] + [3, 4]` | 新列表 |
| `*` | 重复列表 | `[1, 2] * 3` | 新列表 |
| `in` | 检查元素是否存在 | `'apple' in fruits` | 布尔值 |
| `not in` | 检查元素是否不存在 | `'apple' not in fruits` | 布尔值 |
| `==` | 比较列表内容 | `[1, 2] == [1, 2]` | 布尔值 |
| `<`, `>`, `<=`, `>=` | 按字典序比较 | `[1, 2] < [1, 3]` | 布尔值 |
| `del` | 删除元素或切片 | `del lst[0]` 或 `del lst[1:3]` | None |

### 切片操作

| 操作 | 功能 | 示例 | 返回值 |
|------|------|------|--------|
| `lst[start:end]` | 切片 | `lst[1:3]` | 新列表 |
| `lst[start:end:step]` | 带步长切片 | `lst[::2]` | 新列表 |
| `lst[::-1]` | 反转列表 | `lst[::-1]` | 新列表 |

## 小结

Python 列表是一个功能强大且灵活的数据结构：

1. **语法相似**：与 JavaScript 数组语法高度相似，学习成本低
2. **负索引**：支持从末尾访问元素，比 JavaScript 的`array.length-1`更简洁
3. **切片功能**：提供强大的切片操作，支持步长和负索引
4. **丰富的方法**：`append()`、`extend()`、`insert()`、`remove()`、`pop()` 等方法覆盖各种操作需求
5. **列表推导式**：提供比 JavaScript`.map()`和`.filter()`更简洁的语法
6. **多种排序**：`sort()`原地排序，`sorted()`返回新列表，都支持自定义排序规则
7. **灵活复制**：多种浅拷贝方式，配合`copy`模块支持深拷贝
8. **内置函数支持**：`len()`、`sum()`、`max()`、`min()`等函数都支持列表操作
9. **类型转换**：可以与字符串、其他数据类型方便地相互转换

掌握列表操作是 Python 编程的基础，它不仅是数据存储的重要工具，也是实现复杂算法和数据处理的基石。列表推导式等 Python 特有功能更是提高代码简洁性和可读性的重要工具。

## 练习

某班有 6 名学生的考试成绩数据，请完成以下学生成绩管理任务：

```python runner
# 学生姓名和成绩
names = ["张三", "李四", "王五", "赵六", "孙七", "周八"]
scores = [85, 92, 78, 96, 88, 82]

# 任务 1: 使用 zip 组合姓名和成绩，查看学生信息

# 任务 2: 找出成绩最高的学生和成绩最低的学生

# 任务 3: 使用列表推导式，筛选出成绩大于等于 90 分的学生姓名

# 任务 4: 计算班级平均分和总分

# 任务 5: 添加一名新学生"钱九"，成绩 94 分

# 任务 6: 统计成绩在不同区间的学生人数（优秀>=90，良好80-89，及格60-79，不及格<60）

# 任务 7: 创建一个新列表，包含所有学生的成绩等级

# 任务 8: 最终汇总，使用 zip 组合学生姓名、成绩和等级信息
```

::: details 点击查看参考答案
```python runner
# 学生姓名和成绩
names = ["张三", "李四", "王五", "赵六", "孙七", "周八"]
scores = [85, 92, 78, 96, 88, 82]

# 任务 1: 使用 zip 组合姓名和成绩
student_info = list(zip(names, scores))
print(f"学生信息: {student_info}")

# 任务 2: 找出成绩最高的学生和成绩最低的学生
max_score = max(scores)
min_score = min(scores)
max_index = scores.index(max_score)
min_index = scores.index(min_score)
print(f"最高分学生: {names[max_index]} - {max_score}分")
print(f"最低分学生: {names[min_index]} - {min_score}分")

# 任务 3: 筛选出成绩 >= 90 分的学生姓名
excellent_students = [name for name, score in student_info if score >= 90]
print(f"优秀学生: {excellent_students}")

# 任务 4: 计算班级平均分和总分
total_score = sum(scores)
average_score = total_score / len(scores)
print(f"班级总分: {total_score}")
print(f"班级平均分: {average_score:.1f}")
print(f"班级人数: {len(scores)}")

# 任务 5: 添加新学生
names.append("钱九")
scores.append(94)
student_info = list(zip(names, scores))
print(f"添加新学生后: {student_info}")

# 任务 6: 统计成绩区间
excellent_count = len([s for s in scores if s >= 90])
good_count = len([s for s in scores if 80 <= s < 90])
pass_count = len([s for s in scores if 60 <= s < 80])
fail_count = len([s for s in scores if s < 60])
print(f"优秀(>=90): {excellent_count}人")
print(f"良好(80-89): {good_count}人")
print(f"及格(60-79): {pass_count}人")
print(f"不及格(<60): {fail_count}人")

# 任务 7: 创建成绩等级列表（使用列表推导式）
grades = ["优秀" if s >= 90 else "良好" if s >= 80 else "及格" if s >= 60 else "不及格" for s in scores]
print(f"成绩等级: {grades}")

# 最终学生信息汇总
final_info = list(zip(names, scores, grades))
print("最终学生信息（姓名，成绩，等级）:")
print(final_info)
```
::: 