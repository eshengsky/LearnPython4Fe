# 条件判断

JavaScript 中使用大括号包围代码块，Python 则通过缩进来确定代码结构。这种差异不仅影响条件判断的写法，更体现了两种语言的设计哲学：Python 追求简洁优雅，JavaScript 追求明确界定。

## if 语句

在 JavaScript 中，我们使用大括号来包围条件语句的代码块，即使只有一行代码也推荐使用大括号：

```javascript runner
let age = 20;

// JavaScript 的 if 语句
if (age >= 18) {
    console.log("你已经成年了");
}

// 多行代码块
if (age >= 18) {
    console.log("你已经成年了");
    console.log("可以独立承担法律责任");
}
```

Python 使用冒号和缩进来替代大括号：

```python runner
age = 20

# Python 的 if 语句 - 使用冒号和缩进
if age >= 18:
    print("你已经成年了")

# 多行代码块 - 保持相同缩进
if age >= 18:
    print("你已经成年了")
    print("可以独立承担法律责任")
```

## if-else 语句

JavaScript 的 if-else 语句使用大括号明确界定每个分支：

```javascript runner
let score = 85;

// JavaScript 的 if-else
if (score >= 90) {
    console.log("优秀");
} else if (score >= 80) {
    console.log("良好");
} else if (score >= 70) {
    console.log("中等");
} else if (score >= 60) {
    console.log("及格");
} else {
    console.log("不及格");
}
```

Python 使用`elif`关键字替代`else if`，代码更加简洁：

```python runner
score = 85

# Python 的 if-elif-else
if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 70:
    print("中等")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

## else 语句

JavaScript 中使用`else`作为默认分支，当所有前面的条件都不满足时执行：

```javascript runner
let age = 16;

if (age >= 18) {
    console.log("成年人");
} else {
    console.log("未成年人");
}
```

Python 的`else`语句语法相同：

```python runner
age = 16

# 基本的 if-else
if age >= 18:
    print("成年人")
else:
    print("未成年人")

# 多条件判断中的 else
score = 75

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"  
elif score >= 70:
    grade = "C"
else:
    grade = "D"  # 所有其他情况的默认值
    
print(f"成绩等级: {grade}")
```

除了条件判断，Python 的`else`还可以与循环语句和异常处理配合使用，这些用法会在后续的循环和异常处理章节中介绍。

## 三元操作符

JavaScript 中的三元操作符是一个常用的简洁条件表达式：

```javascript runner
let age = 20;

// JavaScript 三元操作符
let status = age >= 18 ? "成年人" : "未成年人";
console.log(status);

// 可以嵌套使用（但不推荐过度嵌套）
let level = age >= 60 ? "老年人" : (age >= 18 ? "成年人" : "未成年人");
console.log(level);
```

Python 也有条件表达式，但语法更接近自然语言：

```python runner
age = 20

# Python 的条件表达式（类似三元操作符）
status = "成年人" if age >= 18 else "未成年人"
print(status)

# 可以嵌套，但同样不推荐过度使用
level = "老年人" if age >= 60 else ("成年人" if age >= 18 else "未成年人")
print(level)

# 更推荐使用多行的清晰写法
if age >= 60:
    level = "老年人"
elif age >= 18:
    level = "成年人"
else:
    level = "未成年人"
print(f"推荐写法结果: {level}")
```

Python 的条件表达式语法是`value_if_true if condition else value_if_false`，读起来更像英语。

## 逻辑运算符

在条件判断中，我们经常需要组合多个条件。JavaScript 使用`&&`、`||`、`!`，Python 使用英文单词`and`、`or`、`not`：

```python runner
age = 25
has_license = True
has_insurance = False

# 组合多个条件
if age >= 18 and has_license:
    print("符合开车条件")

if has_license or has_insurance:
    print("至少有一项证件")

if not has_insurance:
    print("建议购买保险")
```

详细的逻辑运算符介绍和真值判断规则，请参考 [布尔值](./booleans) 章节。

## 成员检查

在 JavaScript 中，检查数组或对象是否包含某个元素需要使用特定的方法：

```javascript runner
// JavaScript 的包含检查
let fruits = ["apple", "banana", "orange"];
let person = { name: "张三", age: 25 };

// 数组包含检查
if (fruits.includes("apple")) {
    console.log("有苹果");
}

// 对象属性检查
if ("name" in person) {
    console.log("有 name 属性");
}

if (person.hasOwnProperty("age")) {
    console.log("有 age 属性");
}
```

Python 使用更直观的`in`关键字：

```python runner
# Python 的成员检查 - 统一使用 in 关键字
fruits = ["apple", "banana", "orange"]
person = {"name": "张三", "age": 25}

# 列表成员检查
if "apple" in fruits:
    print("有苹果")

# 字典键检查
if "name" in person:
    print("有 name 键")

# 字符串子串检查
if "张" in person["name"]:
    print("姓名中包含'张'")

# 范围检查
if 25 in range(20, 30):
    print("25 在 20-30 范围内")
```

## None 值检查

JavaScript 中检查`null`或`undefined`：

```javascript runner
let value = null;
let undefinedValue;

// JavaScript 的空值检查
if (value === null) {
    console.log("value 是 null");
}

if (undefinedValue === undefined) {
    console.log("undefinedValue 是 undefined");
}

// 检查是否为"假值"
if (!value) {
    console.log("value 是假值");
}
```

Python 中主要检查`None`：

```python runner
# Python 的 None 检查
value = None

# 推荐的 None 检查方式 - 使用 is
if value is None:
    print("value 是 None")

# 不推荐使用==检查 None
if value == None:  # 可以工作，但不推荐
    print("这样也能检查 None，但不推荐")

# 检查不是 None
if value is not None:
    print("value 不是 None")
else:
    print("value 确实是 None")

# 结合其他条件
data = None
if data is not None and len(data) > 0:
    print("数据不为空且有内容")
else:
    print("数据为空或是 None")
```

**为什么使用 is 而不是==？**

`is`检查身份（同一个对象），`==`检查值的相等性。对于`None`这样的单例对象，应该使用`is`：

```python runner
# 演示 is 和==的区别
class AlwaysEqual:
    def __eq__(self, other):
        return True  # 总是返回 True

weird_obj = AlwaysEqual()

print(f"weird_obj == None: {weird_obj == None}")    # True（被重写的__eq__）
print(f"weird_obj is None: {weird_obj is None}")    # False（真正的身份检查）

# None 的身份检查
none1 = None
none2 = None
print(f"none1 is none2: {none1 is none2}")         # True（同一个对象）
```

## 条件语句的最佳实践

### 避免深层嵌套

JavaScript 中深层嵌套的问题：

```javascript runner
// JavaScript 中避免深层嵌套的技巧
function processUser(user) {
    // 不好的写法（深层嵌套）
    if (user) {
        if (user.isActive) {
            if (user.permissions) {
                if (user.permissions.includes("admin")) {
                    console.log("管理员用户");
                }
            }
        }
    }
    
    // 好的写法（早期返回）
    if (!user) return console.log("用户不存在");
    if (!user.isActive) return console.log("用户未激活");
    if (!user.permissions) return console.log("无权限信息");
    if (!user.permissions.includes("admin")) return console.log("非管理员");
    
    console.log("管理员用户验证通过");
}

// 测试
processUser({
    isActive: true,
    permissions: ["admin", "read"]
});
```

Python 中的类似改进：

```python runner
# Python 中避免深层嵌套
def process_user(user):
    # 不好的写法（深层嵌套）
    if user:
        if user.get("is_active"):
            if user.get("permissions"):
                if "admin" in user["permissions"]:
                    print("管理员用户")
    
def process_user_better(user):
    # 好的写法（早期返回）
    if not user:
        print("用户不存在")
        return
    
    if not user.get("is_active"):
        print("用户未激活")
        return
        
    if not user.get("permissions"):
        print("无权限信息")
        return
        
    if "admin" not in user["permissions"]:
        print("非管理员")
        return
    
    print("管理员用户验证通过")

# 测试
user_data = {
    "is_active": True,
    "permissions": ["admin", "read"]
}

process_user_better(user_data)
```

### 使用字典替代多重 if-elif

对于多分支的条件判断，Python 可以使用字典来简化：

```python runner
# 传统的多重 if-elif
def get_weekday_traditional(day_num):
    if day_num == 1:
        return "星期一"
    elif day_num == 2:
        return "星期二"
    elif day_num == 3:
        return "星期三"
    elif day_num == 4:
        return "星期四"
    elif day_num == 5:
        return "星期五"
    elif day_num == 6:
        return "星期六"
    elif day_num == 7:
        return "星期日"
    else:
        return "无效的日期"

# 使用字典简化
def get_weekday_dict(day_num):
    weekdays = {
        1: "星期一",
        2: "星期二", 
        3: "星期三",
        4: "星期四",
        5: "星期五",
        6: "星期六",
        7: "星期日"
    }
    return weekdays.get(day_num, "无效的日期")

# 测试两种方法
print(f"传统方法: {get_weekday_traditional(3)}")
print(f"字典方法: {get_weekday_dict(3)}")
print(f"无效输入: {get_weekday_dict(8)}")
```

### 利用布尔值的特性

Python 中的真值判断可以让条件语句更简洁：

```python runner
# 利用 Python 的真值判断特性
data = []
message = ""
count = 0

# 不够简洁的写法
if len(data) == 0:
    print("数据为空")

if message == "":
    print("消息为空")

if count == 0:
    print("计数为零")

# 更简洁的写法 - 利用假值特性
if not data:
    print("数据为空（简洁写法）")

if not message:
    print("消息为空（简洁写法）")

if not count:
    print("计数为零（简洁写法）")

# 检查非空的情况
data_with_content = [1, 2, 3]
if data_with_content:  # 非空列表是真值
    print(f"数据有 {len(data_with_content)} 个元素")
```

## 总结

Python 的条件判断通过缩进替代大括号，使代码结构更加清晰直观。关键特点包括：使用冒号开始代码块，通过缩进确定代码层级，`elif`关键字简化多分支判断。

Python 的`in`关键字统一了成员检查操作，`is`和`is not`用于 None 值的身份检查。合理利用字典映射和早期返回模式，可以写出更简洁易读的条件判断代码。记住缩进是语法的一部分，保持一致的缩进风格对代码的正确性至关重要。 