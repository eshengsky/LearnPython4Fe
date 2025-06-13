# 字典

在 JavaScript 中，对象是存储键值对数据的核心方式，我们使用大括号和键值对来组织相关数据。Python 的字典与 JavaScript 对象在概念上非常相似，都是用来存储键值对的数据结构，但在语法和功能上有一些有趣的差异。

## 创建字典

JavaScript 中创建对象很直观，属性名可以加引号也可以不加：

```javascript runner
// JavaScript 对象创建 - 属性名可以不加引号
let person = {
    name: "张三",        // 不加引号
    age: 25,
    city: "北京"
};

// 也可以加引号，特殊字符或保留字必须加引号
let scores = {
    "math": 90,          // 加引号
    "english": 85,
    "data-science": 92,  // 包含特殊字符，必须加引号
    "class": "A"         // 保留字，必须加引号
};

console.log(person);
console.log(scores);
```

Python 字典的键名必须用引号包围，这是与 JavaScript 的一个重要差异：

```python runner
# Python 字典创建
person = {
    "name": "张三",
    "age": 25,
    "city": "北京"
}

scores = {
    "math": 90,
    "english": 85,
    "science": 92
}

print(person)
print(scores)
```

### 使用构造函数创建

JavaScript 可以使用`Object()`或其他方式，Python 有`dict()`构造函数：

```python runner
# 使用 dict() 构造函数
empty_dict = dict()
print(f"空字典: {empty_dict}")

# 使用关键字参数创建（注意：这种方式键名不需要引号）
person = dict(name="李四", age=30, city="上海")
print(f"使用关键字参数: {person}")

# 但不能使用特殊字符或数字开头的键名
# person = dict(data-science=95)  # 错误：特殊字符
# person = dict(123="invalid")    # 错误：数字开头

# 从元组列表创建
pairs = [("a", 1), ("b", 2), ("c", 3)]
letters = dict(pairs)
print(f"从元组列表创建: {letters}")

# 从其他字典创建（复制）
original = {"x": 10, "y": 20}
copy_dict = dict(original)
print(f"复制字典: {copy_dict}")

# 从其他数据结构创建字典的更多方式
zip_dict = dict(zip(['a', 'b', 'c'], [1, 2, 3]))
print(f"使用 zip 创建: {zip_dict}")
```

## 键类型

JavaScript 对象的属性名总是字符串类型（ES6 后也支持 Symbol），数字键会自动转换：

```javascript runner
// JavaScript 对象的键会被转换为字符串
let jsObj = {
    1: "数字 1",
    "1": "字符串 1",  // 会覆盖上面的值！
    true: "布尔 true",
    "true": "字符串 true"  // 会覆盖上面的值！
};

console.log(jsObj);
console.log("键的数量:", Object.keys(jsObj).length);  // 只有 2 个键
console.log("访问数字 1:", jsObj[1]);      // "字符串 true"（被覆盖了）
console.log("访问字符串 1:", jsObj["1"]);  // "字符串 true"
```

Python 字典支持多种键类型且不会自动转换：

```python runner
# Python 字典可以使用多种不可变类型作为键
py_dict = {
    1: "数字 1",
    "1": "字符串 1",        # 不会覆盖数字键
    True: "布尔 True",      # 注意：1 和 True 在 Python 中相等
    "True": "字符串 True",
    (1, 2): "元组键",
    3.14: "浮点数键"
}

print("字典内容:", py_dict)
print("键的数量:", len(py_dict))

# 分别访问不同类型的键
print(f"数字键 1: {py_dict[1]}")          # 注意：会返回布尔 True 的值
print(f"字符串键'1': {py_dict['1']}")
print(f"元组键 (1,2): {py_dict[(1, 2)]}")
print(f"浮点数键 3.14: {py_dict[3.14]}")

# 演示 1 和 True 的特殊情况
print(f"1 == True: {1 == True}")  # True，所以它们是同一个键
```

### 键的可变性要求

由于字典内部使用哈希表实现，只有不可变（hashable）类型才能作为键。这个概念在"变量"章节中详细介绍过：

```python runner
# 可以作为键的类型（不可变类型）
valid_keys = {
    "string": "字符串",
    42: "整数", 
    3.14: "浮点数",
    True: "布尔值",
    (1, 2, 3): "元组",
    frozenset([1, 2]): "冻结集合"
}

print("有效的键类型:", valid_keys)

# 不能作为键的类型（可变类型）
try:
    invalid_dict = {[1, 2, 3]: "列表键"}  # 列表是可变的
except TypeError as e:
    print(f"列表作为键的错误: {e}")
```

### 实际应用示例

利用不同键类型的特性可以构建更灵活的数据结构：

```python runner
# 使用元组作为坐标键
game_board = {
    (0, 0): "起点",
    (1, 2): "宝箱", 
    (3, 4): "怪物",
    (5, 5): "终点"
}

# 查找特定位置
pos = (1, 2)
if pos in game_board:
    print(f"位置 {pos} 有: {game_board[pos]}")

# 使用数字作为 ID，字符串作为名称
student_records = {
    20230001: {"name": "张三", "grade": 90},
    20230002: {"name": "李四", "grade": 85},
    "admin": {"name": "管理员", "grade": None}
}

print("学生记录:")
for student_id, info in student_records.items():
    print(f"  {student_id}: {info['name']} - {info['grade']}")
```

这种灵活的键类型设计让 Python 字典比 JavaScript 对象在某些场景下更加强大和直观。

## 访问值

JavaScript 中使用点号或方括号访问对象属性：

```javascript runner
// JavaScript 对象访问
let person = {
    name: "张三",
    age: 25,
    city: "北京"
};

console.log(person.name);      // 点号访问（只能用于有效标识符）
console.log(person["age"]);    // 方括号访问（任何字符串都可以）
console.log(person["data-science"]); // 特殊字符必须用方括号
```

Python 字典只能使用方括号语法，不支持点号访问，但提供了更安全的访问方法：

```python runner
person = {
    "name": "张三",
    "age": 25,
    "city": "北京"
}

# 使用方括号访问
print(person["name"])
print(person["age"])

# 使用 get() 方法安全访问
print(person.get("city"))          # 存在的键
print(person.get("phone"))         # 不存在的键，返回 None
print(person.get("phone", "未知"))  # 不存在的键，返回默认值

# 注意：无法使用点号语法
# print(person.name)  # 错误：字典不支持点号访问
```

访问不存在的键时，Python 的行为更安全：

```python runner
person = {"name": "张三", "age": 25}

# 直接访问不存在的键会报错
try:
    print(person["phone"])
except KeyError as e:
    print(f"键错误: {e}")

# 使用 get() 方法更安全
phone = person.get("phone")
if phone is None:
    print("电话号码未设置")
else:
    print(f"电话: {phone}")
```

## 检查键是否存在

JavaScript 使用`in`操作符或`hasOwnProperty()`方法：

```javascript runner
// JavaScript 检查属性是否存在
let person = {
    name: "张三",
    age: 25,
    city: "北京"
};

console.log("name" in person);                    // true
console.log("phone" in person);                   // false
console.log(person.hasOwnProperty("age"));        // true - 推荐用法
console.log(person.hasOwnProperty("email"));      // false
// hasOwnProperty() 避免原型链属性的干扰
```

Python 使用`in`关键字，语法更简洁且没有原型链的困扰：

```python runner
person = {
    "name": "张三",
    "age": 25,
    "city": "北京"
}

print("name" in person)     # True
print("phone" in person)    # False
print("age" not in person)  # False

# 实际应用示例
if "email" in person:
    print(f"邮箱: {person['email']}")
else:
    print("未设置邮箱")
```

## 修改字典

修改现有值的方式很相似：

```python runner
person = {
    "name": "张三",
    "age": 25,
    "city": "北京"
}

print(f"修改前: {person}")

# 修改现有值
person["age"] = 26
person["city"] = "上海"

# 添加新键值对
person["phone"] = "13800138000"
person["email"] = "zhangsan@example.com"

print(f"修改后: {person}")

# setdefault() 方法的特殊用途
# 除了基本的修改操作，Python 还提供了 setdefault() 方法来安全地设置键值：
# 它的作用是：如果键不存在则设置默认值，如果键已存在则不修改并返回现有值
inventory = {"apple": 50, "banana": 30}
print(f"原始库存: {inventory}")

# 如果键不存在，设置默认值并返回该值
watermelon_count = inventory.setdefault("watermelon", 0)
print(f"西瓜数量: {watermelon_count}")
print(f"设置默认值后: {inventory}")

# 如果键已存在，返回现有值，不会修改
apple_count = inventory.setdefault("apple", 100)
print(f"苹果数量: {apple_count}")  # 返回 50，不是 100
print(f"苹果数量未被修改: {inventory}")
```

## 删除项目

JavaScript 使用`delete`操作符：

```javascript runner
// JavaScript 删除对象属性
let person = {
    name: "张三",
    age: 25,
    city: "北京",
    phone: "13800138000"
};

console.log("删除前:", person);
delete person.phone;
console.log("删除后:", person);
```

Python 提供了多种删除方式，每种都有不同的特点和使用场景：

- **`del`关键字**：直接删除指定键，如果键不存在会抛出`KeyError`异常
- **`pop()`方法**：删除指定键并返回其值，可以提供默认值避免异常
- **`popitem()`方法**：删除并返回最后插入的键值对，适用于需要按插入顺序处理数据
- **`clear()`方法**：清空整个字典，保留字典对象本身

```python runner
person = {
    "name": "张三",
    "age": 25,
    "city": "北京",
    "phone": "13800138000",
    "email": "zhangsan@example.com"
}

print(f"原始字典: {person}")

# 使用 del 关键字删除
del person["email"]
print(f"删除 email 后: {person}")

# 使用 pop() 方法删除并返回值
phone = person.pop("phone")
print(f"删除的电话: {phone}")
print(f"删除 phone 后: {person}")

# 使用 pop() 安全删除（提供默认值）
website = person.pop("website", "无网站")
print(f"尝试删除 website: {website}")
print(f"最终字典: {person}")

# popitem() - 删除并返回最后插入的键值对
inventory = {"apple": 50, "banana": 30, "orange": 25, "grape": 40}
print(f"删除前库存: {inventory}")

last_item = inventory.popitem()
print(f"删除的最后项目: {last_item}")
print(f"删除后库存: {inventory}")

# clear() - 清空整个字典
backup = inventory.copy()  # 先备份
inventory.clear()
print(f"清空后: {inventory}")

# 恢复数据
inventory = backup
print(f"恢复数据: {inventory}")
```

## 遍历字典

在遍历字典之前，我们需要了解如何获取字典的键、值和项目。JavaScript 使用`Object.keys()`、`Object.values()`和`Object.entries()`：

```javascript runner
// JavaScript 获取对象的键、值、项目
let scores = {
    math: 90,
    english: 85,
    science: 92
};

console.log("键:", Object.keys(scores));
console.log("值:", Object.values(scores));
console.log("项目:", Object.entries(scores));
```

Python 提供了对应的方法，但语法更直接：

```python runner
scores = {
    "math": 90,
    "english": 85,
    "science": 92
}

# 获取键、值、项目
print(f"键: {list(scores.keys())}")
print(f"值: {list(scores.values())}")
print(f"项目: {list(scores.items())}")

# 这些方法返回的是视图对象，可以直接遍历
print("\n 直接遍历:")
for key in scores.keys():
    print(f"科目: {key}")

for value in scores.values():
    print(f"分数: {value}")

for key, value in scores.items():
    print(f"{key}: {value}")
```

### 字典遍历的各种方式

JavaScript 中遍历对象的常见方式：

```javascript runner
// JavaScript 遍历对象
let person = {
    name: "张三",
    age: 25,
    city: "北京"
};

// 使用 for...in
console.log("使用 for...in:");
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// 使用 Object.entries()
console.log("\n 使用 Object.entries():");
for (let [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}
```

Python 的遍历方式更简洁自然：

```python runner
person = {
    "name": "张三",
    "age": 25,
    "city": "北京"
}

# 遍历键
print("遍历键:")
for key in person:
    print(f"键: {key}")

# 遍历值
print("\n 遍历值:")
for value in person.values():
    print(f"值: {value}")

# 同时遍历键和值
print("\n 同时遍历键和值:")
for key, value in person.items():
    print(f"{key}: {value}")

# 带索引的遍历
print("\n 带索引的遍历:")
for index, (key, value) in enumerate(person.items()):
    print(f"{index}: {key} = {value}")
```

## 字典推导式

Python 提供了类似列表推导式的字典推导式，这是 JavaScript 所没有的强大特性：

```python runner
# 基本字典推导式
numbers = [1, 2, 3, 4, 5]
squares = {x: x**2 for x in numbers}
print(f"平方字典: {squares}")

# 条件字典推导式
even_squares = {x: x**2 for x in numbers if x % 2 == 0}
print(f"偶数平方: {even_squares}")

# 从两个列表创建字典
subjects = ["math", "english", "science"]
scores = [90, 85, 92]
grade_dict = {subject: score for subject, score in zip(subjects, scores)}
print(f"成绩字典: {grade_dict}")

# 转换现有字典
original = {"a": 1, "b": 2, "c": 3}
doubled = {key: value * 2 for key, value in original.items()}
print(f"值翻倍: {doubled}")
```

## 嵌套字典

处理复杂的嵌套数据结构：

```python runner
# 嵌套字典示例
students = {
    "张三": {
        "age": 20,
        "grades": {"math": 90, "english": 85},
        "contact": {"email": "zhangsan@example.com", "phone": "13800138000"}
    },
    "李四": {
        "age": 22,
        "grades": {"math": 88, "english": 92},
        "contact": {"email": "lisi@example.com", "phone": "13900139000"}
    }
}

print("学生信息:")
for name, info in students.items():
    print(f"\n{name}:")
    print(f"  年龄: {info['age']}")
    print(f"  数学成绩: {info['grades']['math']}")
    print(f"  英语成绩: {info['grades']['english']}")
    print(f"  邮箱: {info['contact']['email']}")

# 安全访问深层嵌套数据
def get_nested_value(data, keys, default=None):
    """安全获取嵌套字典的值"""
    for key in keys:
        if isinstance(data, dict) and key in data:
            data = data[key]
        else:
            return default
    return data

# 使用安全访问函数
math_score = get_nested_value(students, ["张三", "grades", "math"])
print(f"\n 张三数学成绩: {math_score}")

missing_score = get_nested_value(students, ["王五", "grades", "math"], "未找到")
print(f"王五数学成绩: {missing_score}")
```

## 字典拷贝

在 JavaScript 中，对象拷贝一直是一个重要话题，因为对象赋值默认是引用传递：

```javascript runner
// JavaScript 对象的引用问题
let originalObj = {name: "张三", age: 25, hobbies: ["读书", "游戏"]};
let refObj = originalObj;  // 这只是引用，不是拷贝

refObj.age = 30;
console.log("修改引用后 - 原对象:", originalObj);  // 原对象也被修改了！

// 浅拷贝方法
let shallowCopy1 = {...originalObj};           // 展开语法
let shallowCopy2 = Object.assign({}, originalObj);  // Object.assign

// 浅拷贝的限制：嵌套对象仍然是引用
shallowCopy1.name = "李四";  // 不影响原对象
shallowCopy1.hobbies.push("运动");  // 影响原对象！

console.log("浅拷贝修改后 - 原对象:", originalObj);
console.log("浅拷贝对象:", shallowCopy1);

// 深拷贝需要特殊处理
let deepCopy = JSON.parse(JSON.stringify(originalObj));  // 简单深拷贝（有限制）
console.log("深拷贝对象:", deepCopy);
```

Python 字典拷贝的概念和 JavaScript 类似，但提供了更明确的方法：

```python runner
# Python 字典的引用行为
original_dict = {"name": "张三", "age": 25, "hobbies": ["读书", "游戏"]}
ref_dict = original_dict  # 这也是引用，不是拷贝

ref_dict["age"] = 30
print(f"修改引用后 - 原字典: {original_dict}")  # 原字典也被修改了

# 浅拷贝方法
shallow_copy1 = original_dict.copy()          # copy() 方法
shallow_copy2 = dict(original_dict)           # dict() 构造函数
shallow_copy3 = {**original_dict}             # 解包语法

# 浅拷贝的特点：顶层独立，嵌套对象仍然共享
shallow_copy1["name"] = "李四"        # 不影响原字典
shallow_copy1["hobbies"].append("运动")  # 影响原字典！

print(f"浅拷贝修改后 - 原字典: {original_dict}")
print(f"浅拷贝字典: {shallow_copy1}")

# 深拷贝需要 copy 模块
import copy

deep_copy = copy.deepcopy(original_dict)
deep_copy["hobbies"].append("绘画")  # 不影响原字典

print(f"深拷贝修改后 - 原字典: {original_dict}")
print(f"深拷贝字典: {deep_copy}")
```

### 选择合适的拷贝方式

根据实际需求选择合适的拷贝方式：

- **引用赋值**：当你需要多个变量指向同一个字典时
- **浅拷贝**：当字典只包含不可变对象，或者你确定不会修改嵌套对象时
- **深拷贝**：当字典包含嵌套的可变对象，且需要完全独立的副本时

相比 JavaScript 的对象拷贝，Python 提供了更明确和统一的方法，`copy.deepcopy()`比 JavaScript 的各种深拷贝技巧更可靠。

## 字典合并

JavaScript 中合并对象主要使用展开语法或`Object.assign()`方法：

```javascript runner
// JavaScript 对象合并
let obj1 = {a: 1, b: 2};
let obj2 = {c: 3, d: 4};
let obj3 = {b: 20, e: 5};  // 注意键 "b" 重复

// 使用展开语法合并（ES6+）
let result1 = {...obj1, ...obj2};
console.log("展开语法合并:", result1);

// 合并多个对象，后面的会覆盖前面的
let result2 = {...obj1, ...obj2, ...obj3};
console.log("多对象合并:", result2);

// 使用 Object.assign()（ES5+）
let result3 = Object.assign({}, obj1, obj2);
console.log("Object.assign 合并:", result3);
```

Python 提供了更多种合并字典的方式，语法上也更直观：

```python runner
# 传统合并方式
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
dict3 = {"b": 20, "e": 5}  # 注意键 "b" 重复

# 使用 update() 方法
result1 = dict1.copy()
result1.update(dict2)
print(f"使用 update 合并: {result1}")

# 使用解包语法合并（Python 3.5+）
result2 = {**dict1, **dict2, **dict3}
print(f"使用解包合并: {result2}")

# 使用 dict() 构造函数（只能合并两个，且第二个不能有特殊字符键）
result3 = dict(dict1, **dict2)
print(f"使用构造函数合并: {result3}")

# 展示键冲突时的覆盖行为（后面的会覆盖前面的）
conflict_demo = {**dict1, **dict3}
print(f"键冲突演示: {conflict_demo}")  # dict3 的值会覆盖 dict1 的值
```


## 小结

Python 字典是一种强大而灵活的数据结构，与 JavaScript 对象相比有以下特点：

**相似之处：**
- 都使用大括号语法创建
- 都存储键值对数据
- 都支持动态添加和删除项目
- 都可以存储不同类型的值

**Python 字典的优势：**
- 提供了`get()`方法进行安全访问
- `in`关键字检查键存在性更简洁
- 字典推导式功能强大
- `items()`、`keys()`、`values()`方法直接可用
- 支持多种删除方式（`del`、`pop()`、`popitem()`、`clear()`）
- `setdefault()`方法方便设置默认值

**语法差异：**
- 键名必须用引号包围（除非使用`dict()`构造函数的关键字参数形式）
- 只能使用方括号访问，不支持点号语法
- 没有原型链的概念，`in`操作符直接检查字典本身
- 提供了更多内置方法来操作字典
- 键可以是任何不可变类型（字符串、数字、元组等），不仅限于字符串

字典在 Python 中被广泛用于配置信息、数据缓存、对象属性存储等场景，是 Python 编程中不可或缺的数据结构。 