# Python基础语法

欢迎来到Python语法学习！作为前端开发者，你已经熟悉了JavaScript的语法，现在让我们看看Python有什么不同和相似之处。

## 最重要的区别：缩进

### JavaScript使用大括号，Python使用缩进

```javascript runner
// JavaScript
if (user.isActive) {
    console.log('用户活跃');
    if (user.isPremium) {
        console.log('VIP用户');
    }
}
```

```python runner
# Python
if user.is_active:
    print('用户活跃')
    if user.is_premium:
        print('VIP用户')
```

::: warning 缩进规则
- **必须使用缩进** 来表示代码块层级
- **推荐使用4个空格** （不要用Tab）
- **同一层级必须保持相同缩进**
- **缩进错误会导致程序无法运行**
:::

## 注释

### 单行注释对比

```javascript runner
// 这是JavaScript单行注释
let name = '张三'; // 行末注释
```

```python runner
# 这是Python单行注释
name = '张三'  # 行末注释
```

### 多行注释对比

```javascript runner
/*
 * JavaScript多行注释
 * 可以跨越多行
 */
```

```python runner
"""
Python多行注释
可以使用三个引号
"""

'''
也可以使用三个单引号
但通常用双引号
'''
```

## 变量和命名

### 变量声明对比

```javascript runner
// JavaScript需要声明关键字
let name = '张三';
const age = 25;
var score = 95;
```

```python runner
# Python直接赋值即可
name = '张三'
age = 25
score = 95
```

### 命名规范对比

```javascript runner
// JavaScript: 驼峰命名法
let userName = '张三';
let isLoggedIn = true;
let maxRetryCount = 3;

function getUserInfo() {
    return userInfo;
}
```

```python runner
# Python: 下划线命名法
user_name = '张三'
is_logged_in = True
max_retry_count = 3

def get_user_info():
    return user_info
```

::: tip Python命名建议
- **变量和函数**: `snake_case` (下划线分隔)
- **常量**: `UPPER_CASE` (全大写)
- **类名**: `PascalCase` (帕斯卡命名法)
- **私有变量**: `_private_var` (下划线开头)
:::

## 语句和表达式

### 语句结束对比

```javascript runner
// JavaScript需要分号
let x = 10;
let y = 20;
console.log(x + y);
```

```python runner
# Python不需要分号
x = 10
y = 20
print(x + y)

# 一行多个语句时才需要分号
x = 10; y = 20; print(x + y)
```

### 行连接对比

```javascript runner
// JavaScript自动处理换行
let longString = '这是一个很长的字符串，' +
                 '可以用加号连接';

// 模板字符串支持换行
let multiLine = `
    第一行
    第二行
    第三行
`;
```

```python runner
# Python使用反斜杠连接行
long_string = '这是一个很长的字符串，' \
              '可以用反斜杠连接'

# 括号内可以自然换行
long_list = [
    '第一项',
    '第二项', 
    '第三项'
]

# 三引号支持真正的多行
multi_line = """
    第一行
    第二行
    第三行
"""
```

## 基本数据类型

### 数字类型对比

```javascript runner
// JavaScript只有Number类型
let integer = 42;
let float = 3.14;
let scientific = 2.5e3; // 2500

console.log(typeof integer); // 'number'
console.log(typeof float);   // 'number'
```

```python runner
# Python有多种数字类型
integer = 42        # int 整数
float_num = 3.14    # float 浮点数
scientific = 2.5e3  # 科学计数法
complex_num = 3+4j  # complex 复数

print(type(integer))     # <class 'int'>
print(type(float_num))   # <class 'float'>
```

### 字符串操作对比

```javascript runner
// JavaScript
let single = '单引号字符串';
let double = "双引号字符串";
let name = 'Python';
let template = `模板字符串：${name}`;

// 字符串连接
let greeting = 'Hello ' + 'World';
```

```python runner
# Python
single = '单引号字符串'
double = "双引号字符串"
triple = """三引号
多行字符串"""

# f-string (Python 3.6+)
name = 'Python'
f_string = f'格式化字符串：{name}'

# 字符串连接
greeting = 'Hello ' + 'World'
```

### 布尔值对比

```javascript runner
// JavaScript
let isTrue = true;
let isFalse = false;

// 真值检测
if (0) { console.log('不执行'); }           // false
if ('') { console.log('不执行'); }          // false
if (null) { console.log('不执行'); }        // false
if (undefined) { console.log('不执行'); }   // false
```

```python runner
# Python (注意首字母大写)
is_true = True
is_false = False

# 真值检测
if 0: print('不执行')           # False
if '': print('不执行')          # False
if None: print('不执行')        # False
if []: print('不执行')          # False (空列表)
```

### 空值对比

```javascript runner
// JavaScript
let empty = null;
let notDefined = undefined;

console.log(empty == null);      // true
console.log(notDefined == null); // true
```

```python runner
# Python
empty = None  # 相当于JavaScript的null

print(empty is None)  # True
print(empty == None)  # True (但推荐用 is)
```

## 运算符

### 算术运算符
| 运算符 | JavaScript | Python | 说明 |
|--------|------------|--------|------|
| `+` | ✅ | ✅ | 加法 |
| `-` | ✅ | ✅ | 减法 |
| `*` | ✅ | ✅ | 乘法 |
| `/` | ✅ | ✅ | 除法 |
| `%` | ✅ | ✅ | 取余 |
| `**` | ✅ | ✅ | 幂运算 |
| `//` | ❌ | ✅ | 整除（Python独有） |

```javascript runner
console.log(10 / 3);     // 3.3333333333333335
console.log(10 % 3);     // 1
console.log(10 ** 2);    // 100
console.log(Math.floor(10 / 3)); // 3 (需要Math.floor)
```

```python runner
print(10 / 3)    # 3.3333333333333335 (浮点除法)
print(10 % 3)    # 1
print(10 ** 2)   # 100 (幂运算)
print(10 // 3)   # 3 (整除，Python独有)
```

### 逻辑运算符对比

```javascript runner
// JavaScript
let a = true;
let b = false;

console.log(a && b);  // false
console.log(a || b);  // true
console.log(!a);      // false
```

```python runner
# Python (使用英文单词)
a = True
b = False

print(a and b)  # False
print(a or b)   # True
print(not a)    # False
```

### 比较运算符对比

```javascript runner
// JavaScript
let x = 5, y = '5';

console.log(x == y);   // true (类型转换)
console.log(x === y);  // false (严格相等)
console.log(x != y);   // false
console.log(x !== y);  // true
```

```python runner
# Python
x = 5
y = '5'

print(x == y)        # False (不会自动类型转换)
print(x is y)        # False (身份比较)
print(x != y)        # True
print(x is not y)    # True
```

### 成员运算符对比

```javascript runner
// JavaScript
let arr = [1, 2, 3];
let obj = {name: '张三', age: 25};

console.log(arr.includes(2));        // true
console.log('name' in obj);          // true
console.log(obj.hasOwnProperty('age')); // true
```

```python runner
# Python
arr = [1, 2, 3]
obj = {'name': '张三', 'age': 25}

print(2 in arr)           # True
print('name' in obj)      # True
print(2 not in arr)       # False
```

## 实践练习

让我们写一个简单的程序，对比JavaScript和Python的实现：

### 个人信息管理程序

```javascript runner
// JavaScript版本
const userName = '张三';
const userAge = 25;
const isVip = true;
const balance = 1250.75;

// 使用模板字符串
console.log(`用户姓名：${userName}`);
console.log(`用户年龄：${userAge}`);

// 条件判断
if (isVip) {
    console.log('您是VIP用户');
    if (balance > 1000) {
        console.log('账户余额充足');
    } else {
        console.log('建议充值');
    }
} else {
    console.log('普通用户');
}

// 计算
const yearsToThirty = 30 - userAge;
console.log(`距离30岁还有 ${yearsToThirty} 年`);
```

```python runner
# Python版本
user_name = '张三'
user_age = 25
is_vip = True
balance = 1250.75

# 使用f-string
print(f'用户姓名：{user_name}')
print(f'用户年龄：{user_age}')

# 条件判断 (注意缩进和冒号)
if is_vip:
    print('您是VIP用户')
    if balance > 1000:
        print('账户余额充足')
    else:
        print('建议充值')
else:
    print('普通用户')

# 计算
years_to_thirty = 30 - user_age
print(f'距离30岁还有 {years_to_thirty} 年')
```

### 数组/列表操作对比

```javascript runner
// JavaScript数组操作
let fruits = ['苹果', '香蕉', '橙子'];

// 添加元素
fruits.push('葡萄');
fruits.unshift('草莓');

// 访问元素
console.log(fruits[0]);        // '草莓'
console.log(fruits.length);    // 5

// 遍历
fruits.forEach(fruit => {
    console.log(fruit);
});

// 检查元素
if (fruits.includes('苹果')) {
    console.log('有苹果');
}
```

```python runner
# Python列表操作
fruits = ['苹果', '香蕉', '橙子']

# 添加元素
fruits.append('葡萄')
fruits.insert(0, '草莓')

# 访问元素
print(fruits[0])        # '草莓'
print(len(fruits))      # 5

# 遍历
for fruit in fruits:
    print(fruit)

# 检查元素
if '苹果' in fruits:
    print('有苹果')
```

### 对象/字典操作对比

```javascript runner
// JavaScript对象操作
let user = {
    name: '张三',
    age: 25,
    city: '北京'
};

// 访问属性
console.log(user.name);        // '张三'
console.log(user['age']);      // 25

// 添加属性
user.email = 'zhangsan@example.com';

// 遍历属性
for (let key in user) {
    console.log(`${key}: ${user[key]}`);
}

// 检查属性
if ('name' in user) {
    console.log('用户有姓名');
}
```

```python runner
# Python字典操作
user = {
    'name': '张三',
    'age': 25,
    'city': '北京'
}

# 访问属性
print(user['name'])        # '张三'
print(user.get('age'))     # 25

# 添加属性
user['email'] = 'zhangsan@example.com'

# 遍历属性
for key, value in user.items():
    print(f'{key}: {value}')

# 检查属性
if 'name' in user:
    print('用户有姓名')
```

## 语法速查表

| 特性 | JavaScript | Python | 备注 |
|------|------------|--------|------|
| 代码块 | `{ }` | 缩进 | Python最大特色 |
| 语句结束 | `;` | 换行 | Python更简洁 |
| 注释 | `//` `/* */` | `#` `""" """` | 多行注释不同 |
| 变量声明 | `let/const/var` | 直接赋值 | Python更简单 |
| 布尔值 | `true/false` | `True/False` | 注意大小写 |
| 空值 | `null/undefined` | `None` | Python只有一种 |
| 逻辑运算 | `&&` `||` `!` | `and` `or` `not` | Python用单词 |
| 字符串模板 | `${var}` | `f"{var}"` | 语法略不同 |
| 命名规范 | `camelCase` | `snake_case` | 风格差异 |
| 类型检查 | `typeof` | `type()` | 函数形式 |
| 成员检查 | `includes()` `in` | `in` | Python更统一 |

## 下一步

恭喜！你已经掌握了Python的基础语法。现在你可以：

- ✅ 理解Python的缩进规则
- ✅ 正确命名变量和函数
- ✅ 使用基本的数据类型和运算符
- ✅ 通过对比JavaScript更好地理解Python
- ✅ 编写简单的Python程序

接下来，我们将学习[变量和数据类型](/guide/variables)，深入了解Python的类型系统。

::: tip 学习建议
1. **多练习** - 在Python环境中运行示例代码
2. **注意缩进** - 这是最容易犯错的地方
3. **对比记忆** - 利用JavaScript知识理解Python概念
4. **动手实践** - 把JavaScript代码改写成Python版本
5. **循序渐进** - 不要急于学习复杂语法
:::

::: warning 常见错误
```python
# ❌ 错误：缩进不一致
if True:
  print("2个空格")
    print("4个空格")  # IndentationError!

# ❌ 错误：忘记冒号
if True
    print("缺少冒号")  # SyntaxError!

# ❌ 错误：使用JavaScript语法
if (True) {             # SyntaxError!
    print("错误语法")
}

# ✅ 正确
if True:
    print("正确的缩进")
    print("保持一致")
```
:::