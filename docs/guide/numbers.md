# 数字

在 JavaScript 中，我们只有一种数字类型`number`，它能处理整数和浮点数。Python 将数字进行了更细致的分类，提供了三种主要的数值类型：整数（`int`）、浮点数（`float`）和复数（`complex`），每种类型都有其特定的用途和优势。

## 类型概述

Python 的数值类型比 JavaScript 更加丰富：

```python runner
# Python 的三种数值类型
integer_num = 20          # 整数
float_num = 20.5          # 浮点数  
complex_num = 1j          # 复数

print(f"整数: {integer_num} ({type(integer_num).__name__})")
print(f"浮点数: {float_num} ({type(float_num).__name__})")
print(f"复数: {complex_num} ({type(complex_num).__name__})")
```

## 整数（int）

JavaScript 中所有数字都是浮点数类型，即使看起来像整数：

```javascript runner
// JavaScript 中的"整数"实际上是浮点数
let num = 123;
console.log(typeof num);        // "number"
console.log(Number.isInteger(num)); // true，但底层还是浮点数
```

JavaScript 数字有精度限制：
```javascript runner
// JavaScript 数字有精度限制
console.log(Number.MAX_SAFE_INTEGER);        // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1);    // 9007199254740992
console.log(Number.MAX_SAFE_INTEGER + 2);    // 9007199254740992 (精度丢失!)

// 超过安全范围的大数需要用字符串或 BigInt
let bigNumber = "123456789012345678901234567890";  // 字符串形式
let bigInt = 123456789012345678901234567890n;      // BigInt 类型
console.log(typeof bigInt);  // "bigint"
```

Python 的整数是真正的整数类型，并且支持任意精度。这是与 JavaScript 的一个重要区别：
```python runner
# Python 整数支持任意精度，没有大小限制
small_int = 123
big_int = 123456789012345678901234567890

print(f"小整数: {small_int}")
print(f"大整数: {big_int}")
print(f"大整数类型: {type(big_int).__name__}")

# 计算一个非常大的数
huge_number = 2 ** 1000  # 2 的 1000 次方
print(f"2 的 1000 次方有 {len(str(huge_number))} 位数字")

# Python 可以直接进行大数运算
result = big_int * 999999999999999999999
print(f"大数运算结果: {result}")
```

**关键区别**：JavaScript 中所有的数字（包括看起来像整数的）都采用 IEEE 754 双精度浮点数标准，因此最大安全整数是 2^53-1，超过这个范围就可能失去精度，必须使用 BigInt 类型。而 Python 的整数（`int`）是独立的数据类型，采用任意精度算法实现，没有大小限制，这在密码学、数学计算、金融计算等需要精确大数运算的场景中具有巨大优势。

## 浮点数（float）

当处理小数时，Python 的浮点数（`float`）与 JavaScript 的浮点数一样，都遵循 IEEE 754 双精度浮点数标准：

```javascript runner
// JavaScript 浮点数
let price = 19.99;
let rate = 0.05;
console.log("价格:", price);
console.log("费率:", rate);
console.log("价格类型:", typeof price);
```

```python runner
# Python 浮点数
price = 19.99
rate = 0.05

print(f"价格: {price}")
print(f"费率: {rate}")
print(f"价格类型: {type(price).__name__}")
```

### 浮点数精度问题

由于 IEEE 754 标准的限制，JavaScript 和 Python 的浮点数都存在精度问题：

```javascript runner
// JavaScript 浮点数精度问题
console.log(0.1 + 0.2);                    // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);           // false
console.log(0.7 + 0.1);                    // 0.7999999999999999
```

```python runner
# Python 也有相同的精度问题
print(0.1 + 0.2)                    # 0.30000000000000004
print(0.1 + 0.2 == 0.3)             # False
print(0.7 + 0.1)                    # 0.7999999999999999
```

这种精度问题在金融计算中尤其危险，需要特别注意，这里介绍几种解决方案：

```python runner
# 解决方案 1: 使用 round() 函数
result = 0.1 + 0.2
print(f"原始结果: {result}")
print(f"round() 处理: {round(result, 1)}")
print(f"round(0.1 + 0.2, 1) == 0.3: {round(0.1 + 0.2, 1) == 0.3}")

# 解决方案 2: 使用 decimal 模块实现精确计算
from decimal import Decimal

decimal_result = Decimal('0.1') + Decimal('0.2')
print(f"使用 Decimal: {decimal_result}")
print(f"Decimal 结果等于 0.3: {decimal_result == Decimal('0.3')}")
```

### 科学计数法

两种语言都支持科学计数法：

```javascript runner
// JavaScript 科学计数法
let largeNum = 3.5e8;     // 3.5 × 10^8
let smallNum = 1.2e-4;    // 1.2 × 10^-4

console.log("大数:", largeNum);
console.log("小数:", smallNum);
```

```python runner
# Python 科学计数法表示
large_num = 3.5e8     # 3.5 × 10^8
small_num = 1.2e-4    # 1.2 × 10^-4

print(f"大数: {large_num}")
print(f"小数: {small_num}")
```



## 复数（complex）

这是 Python 独有的数值类型，JavaScript 原生不支持复数：

```python runner
# 创建复数
z1 = 3 + 4j           # 使用 j 表示虚数单位
z2 = complex(5, 6)    # 使用 complex() 函数创建

print(f"复数 1: {z1}")
print(f"复数 2: {z2}")

# 复数的实部和虚部
print(f"z1 的实部: {z1.real}")
print(f"z1 的虚部: {z1.imag}")

# 复数运算
z3 = z1 + z2
print(f"复数相加: {z1} + {z2} = {z3}")
```

注意 Python 使用`j`而不是数学中常用的`i`来表示虚数单位，这是因为在工程领域（特别是电气工程）习惯使用`j`。

## 特殊数值

IEEE 754 标准定义了一些特殊的浮点数值，JavaScript 和 Python 都支持：

```javascript runner
// JavaScript 特殊数值
console.log("=== 特殊数值创建 ===");
console.log("正无穷:", Infinity);
console.log("负无穷:", -Infinity);
console.log("非数字:", NaN);

console.log("\n=== 产生特殊值的运算 ===");
console.log("1/0 =", 1/0);                    // Infinity
console.log("-1/0 =", -1/0);                  // -Infinity
console.log("0/0 =", 0/0);                    // NaN
console.log("Infinity - Infinity =", Infinity - Infinity); // NaN

console.log("\n=== 特殊值运算 ===");
console.log("Infinity + 1 =", Infinity + 1);  // 仍然是 Infinity
console.log("NaN + 1 =", NaN + 1);            // 仍然是 NaN
console.log("NaN === NaN:", NaN === NaN);      // false (NaN 不等于自身)
```

```python runner
import math

# Python 特殊数值
print("=== 特殊数值创建 ===")
print("正无穷:", float('inf'))
print("负无穷:", float('-inf'))
print("非数字:", float('nan'))

print("\n=== 产生特殊值的运算 ===")
print("float('inf') / 2 =", float('inf') / 2)              # 仍然是 inf
print("float('inf') - float('inf') =", float('inf') - float('inf'))  # nan
print("math.sqrt(-1) 会报错，需要用复数")

print("\n=== 特殊值运算 ===")
print("float('inf') + 1 =", float('inf') + 1)              # 仍然是 inf
print("float('nan') + 1 =", float('nan') + 1)              # 仍然是 nan  
print("float('nan') == float('nan'):", float('nan') == float('nan'))  # False
```

这些特殊值在数学计算和数据处理中很有用，比如表示缺失数据、计算溢出或无效运算结果。

## 类型转换

JavaScript 的数值转换有时比较宽松：

```javascript runner
// JavaScript 类型转换
let text = "123";
let floatText = "123.45";
let invalidText = "123abc";

console.log(`Number('${text}'):`, Number(text));           // 123
console.log(`Number('${floatText}'):`, Number(floatText)); // 123.45
console.log(`Number('${invalidText}'):`, Number(invalidText)); // NaN
console.log(`parseInt('${floatText}'):`, parseInt(floatText)); // 123
console.log(`parseFloat('${floatText}'):`, parseFloat(floatText)); // 123.45
```

Python 的转换更加严格和明确：

```python runner
# Python 数值转换
text = "123"
float_text = "123.45"

# 字符串转整数
num_int = int(text)
print(f"int('{text}'): {num_int} ({type(num_int).__name__})")

# 字符串转浮点数
num_float = float(float_text)
print(f"float('{float_text}'): {num_float} ({type(num_float).__name__})")

# 浮点数转整数（截断小数部分）
truncated = int(123.45)
print(f"int(123.45): {truncated}")

# 整数转浮点数
float_from_int = float(123)
print(f"float(123): {float_from_int}")
```

### 转换错误处理

```python runner
# Python 对无效转换会抛出异常
valid_number = "123"
invalid_number = "123abc"

try:
    result1 = int(valid_number)
    print(f"成功转换: {result1}")
    
    result2 = int(invalid_number)  # 这里会出错
    print(f"转换结果: {result2}")
except ValueError as e:
    print(f"转换失败: {e}")
```

## 运算

### 基本运算符

Python 和 JavaScript 的基本运算符基本相同：

```javascript runner
// JavaScript 基本运算
let a = 10, b = 3;

console.log(`加法: ${a} + ${b} = ${a + b}`);
console.log(`减法: ${a} - ${b} = ${a - b}`);
console.log(`乘法: ${a} * ${b} = ${a * b}`);
console.log(`除法: ${a} / ${b} = ${a / b}`);
```

```python runner
# Python 基本运算
a = 10
b = 3

print(f"加法: {a} + {b} = {a + b}")
print(f"减法: {a} - {b} = {a - b}")
print(f"乘法: {a} * {b} = {a * b}")
print(f"除法: {a} / {b} = {a / b}")
```

### 高级运算符

Python 和 JavaScript 都支持一些高级运算符，但有细微差异：

```javascript runner
// JavaScript 高级运算符  
let a = 10, b = 3;

console.log(`幂运算: ${a} ** ${b} = ${a ** b}`);          // ES2016+ 支持
console.log(`取余运算: ${a} % ${b} = ${a % b}`);           // 一直支持
console.log(`整除: Math.floor(${a} / ${b}) = ${Math.floor(a / b)}`); // 需要 Math.floor

// 老版本也可以用 Math.pow
console.log(`幂运算(兼容): Math.pow(${a}, ${b}) = ${Math.pow(a, b)}`);
```

```python runner
# Python 高级运算符
a = 10
b = 3

print(f"幂运算: {a} ** {b} = {a ** b}")
print(f"取余运算: {a} % {b} = {a % b}")
print(f"整除: {a} // {b} = {a // b}")      # Python 独有的整除运算符
```

### 增强赋值运算符

JavaScript 中我们经常使用 `++` 和 `--` 进行自增自减操作：

```javascript runner
// JavaScript 的自增自减
let count = 5;
console.log("初始值:", count);

count++;        // 后缀自增
console.log("自增后:", count);

count--;        // 后缀自减  
console.log("自减后:", count);

// 增强赋值运算符
let x = 5;
x += 2;
console.log("x += 2:", x);
x *= 3;
console.log("x *= 3:", x);
```

**重要差异**：Python 没有 `++` 和 `--` 操作符，必须使用 `+=` 和 `-=`：

```python runner
# Python 没有 ++ 和 -- 运算符
count = 5
print(f"初始值: {count}")

# Python 中这样写会报错：
# count++    # SyntaxError!
# ++count    # SyntaxError!

# 正确的写法：
count += 1    # 等同于 count = count + 1
print(f"自增后: {count}")

count -= 1    # 等同于 count = count - 1
print(f"自减后: {count}")

# 增强赋值运算符
x = 5
x += 2
print(f"x += 2: {x}")
x *= 3
print(f"x *= 3: {x}")
```

## 数值比较

数值比较在两种语言中基本相同：

```javascript runner
// JavaScript 数值比较
let a = 10, b = 20, c = 10;

console.log(`${a} == ${c}:`, a == c);     // 相等
console.log(`${a} != ${b}:`, a != b);     // 不等  
console.log(`${a} < ${b}:`, a < b);       // 小于
console.log(`${b} > ${a}:`, b > a);       // 大于
console.log(`${a} <= ${c}:`, a <= c);     // 小于等于
console.log(`${b} >= ${a}:`, b >= a);     // 大于等于
```

```python runner
# Python 数值比较
a = 10
b = 20
c = 10

print(f"{a} == {c}: {a == c}")    # 相等
print(f"{a} != {b}: {a != b}")    # 不等
print(f"{a} < {b}: {a < b}")      # 小于
print(f"{b} > {a}: {b > a}")      # 大于
print(f"{a} <= {c}: {a <= c}")    # 小于等于
print(f"{b} >= {a}: {b >= a}")    # 大于等于
```

### 不同类型的数值比较

Python 允许不同数值类型之间的比较：

```python runner
int_num = 5
float_num = 5.0
complex_num = 5 + 0j

print(f"int vs float: {int_num} == {float_num} -> {int_num == float_num}")
print(f"int vs complex: {int_num} == {complex_num} -> {int_num == complex_num}")

# 但复数不能进行大小比较
try:
    result = complex_num > int_num
except TypeError as e:
    print(f"复数比较错误: {e}")
```

## 内置数学函数

Python 提供了一些基本的内置数学函数：

```python runner
# 绝对值函数 abs()
print("=== 绝对值函数 ===")
print(f"abs(-4.7) = {abs(-4.7)}")
print(f"abs(-2) = {abs(-2)}")
print(f"abs(0) = {abs(0)}")
print(f"abs(2) = {abs(2)}")
print(f"abs(4.7) = {abs(4.7)}")

# 最大值、最小值、求和函数
numbers = [-4.7, -2, 0, 2, 4.7]
print(f"\n=== 统计函数 ===")
print(f"max(numbers): {max(numbers)}")
print(f"min(numbers): {min(numbers)}")
print(f"sum(numbers): {sum(numbers)}")

# round() 函数进行四舍五入
print(f"\n=== 四舍五入函数 ===")
print(f"round(3.14159, 2) = {round(3.14159, 2)}")
print(f"round(2.678, 2) = {round(2.678, 2)}")
print(f"round(9.1234, 2) = {round(9.1234, 2)}")
print(f"round(2.5) = {round(2.5)}")      # 注意 Python 的银行家舍入
print(f"round(3.5) = {round(3.5)}")
```

## 数学模块

JavaScript 有 Math 对象，提供更丰富的数学函数：

```javascript runner
// JavaScript Math 对象
console.log("=== 数学模块函数 ===");
let x = 16;
let y = Math.PI / 4;  // 45 度对应的弧度

console.log(`平方根: Math.sqrt(${x}) = ${Math.sqrt(x)}`);
console.log(`向上取整: Math.ceil(4.1) = ${Math.ceil(4.1)}`);
console.log(`向下取整: Math.floor(4.9) = ${Math.floor(4.9)}`);

console.log("\n=== 三角函数 ===");
console.log(`sin(π/4) = ${Math.sin(y).toFixed(4)}`);
console.log(`cos(π/4) = ${Math.cos(y).toFixed(4)}`);
console.log(`tan(π/4) = ${Math.tan(y).toFixed(4)}`);

console.log("\n=== 对数和指数 ===");
console.log(`自然对数: Math.log(Math.E) = ${Math.log(Math.E).toFixed(4)}`);
console.log(`以 10 为底: Math.log10(100) = ${Math.log10(100)}`);
console.log(`指数函数: Math.exp(1) = ${Math.exp(1).toFixed(4)}`);

console.log("\n=== 常数 ===");
console.log(`圆周率 π = ${Math.PI}`);
console.log(`自然常数 e = ${Math.E}`);
```

Python 也有 math 模块：
```python runner
# Python math 模块
import math

print("=== 数学模块函数 ===")
x = 16
y = math.pi / 4  # 45 度对应的弧度

print(f"平方根: math.sqrt({x}) = {math.sqrt(x)}")
print(f"向上取整: math.ceil(4.1) = {math.ceil(4.1)}")
print(f"向下取整: math.floor(4.9) = {math.floor(4.9)}")

print(f"\n=== 三角函数 ===")
print(f"sin(π/4) = {math.sin(y):.4f}")
print(f"cos(π/4) = {math.cos(y):.4f}")
print(f"tan(π/4) = {math.tan(y):.4f}")

print(f"\n=== 对数和指数 ===")
print(f"自然对数: math.log(math.e) = {math.log(math.e):.4f}")
print(f"以 10 为底: math.log10(100) = {math.log10(100)}")
print(f"指数函数: math.exp(1) = {math.exp(1):.4f}")

print(f"\n=== 常数 ===")
print(f"圆周率 π = {math.pi}")
print(f"自然常数 e = {math.e}")
```

## 数值格式化

在前端开发中，我们经常需要格式化数字用于显示：

```javascript runner
// JavaScript 数字格式化
let num = 1234.5678;
let percentage = 0.156;

console.log("保留 2 位小数:", num.toFixed(2));
console.log("千位分隔符:", num.toLocaleString());
console.log("百分比格式:", (percentage * 100).toFixed(1) + "%");
console.log("科学计数法:", num.toExponential(2));
console.log("四舍五入:", Math.round(num * 100) / 100);
```

Python 提供了多种格式化方式，格式化语法在字符串章节有详细介绍：

```python runner
# Python 数字格式化
num = 1234.5678
percentage = 0.156

# 使用 f-string（推荐）
print(f"保留 2 位小数: {num:.2f}")
print(f"百分比格式: {percentage:.1%}")
print(f"科学计数法: {num:.2e}")

# 使用 format() 方法
print("千位分隔符: {:,}".format(int(num)))
print("补零对齐: {:08.2f}".format(num))

# round() 函数
print(f"四舍五入: {round(num, 2)}")
```

## 随机数

JavaScript 使用 `Math.random()` 生成 0-1 之间的随机浮点数，然后通过数学运算得到需要的范围：

```javascript runner
// JavaScript 随机数
console.log("=== 随机数生成 ===");
console.log("0-1 之间:", Math.random().toFixed(4));
console.log("1-10 之间:", Math.floor(Math.random() * 10) + 1);
console.log("浮点数 (1-10):", (Math.random() * 9 + 1).toFixed(2));

// 从数组中随机选择
let fruits = ["apple", "banana", "orange", "grape"];
let randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
console.log("随机水果:", randomFruit);

// 随机打乱数组（简单示例）
let numbers = [1, 2, 3, 4, 5];
// 简单的随机交换几次
let i = Math.floor(Math.random() * numbers.length);
let j = Math.floor(Math.random() * numbers.length);
[numbers[i], numbers[j]] = [numbers[j], numbers[i]];
console.log("打乱后:", numbers);
```

Python 的 random 模块提供了更丰富和便利的随机数函数：

* **`random.random()`** - 与 JavaScript 相同，生成 0-1 之间的随机浮点数
* **`random.randint(a, b)`** - 生成 a 到 b 之间的随机整数，**两端都包含**
* **`random.randrange(start, stop)`** - 生成 start 到 stop 之间的随机整数，**含左不含右**（类似 `range()` 函数）
* **`random.uniform(a, b)`** - 生成 a 到 b 之间的随机浮点数
* **`random.choice(seq)`** - 从序列中随机选择一个元素
* **`random.shuffle(list)`** - 随机打乱列表（原地修改）

```python runner
import random

print("=== 随机数生成 ===")
print(f"0-1 之间: {random.random():.4f}")
print(f"1-10 之间: {random.randint(1, 10)}")      # 包含 1 和 10
print(f"1-9 之间: {random.randrange(1, 10)}")     # 包含 1，不包含 10
print(f"浮点数 (1-10): {random.uniform(1, 10):.2f}")

# 从列表中随机选择
fruits = ["apple", "banana", "orange", "grape"]
print(f"随机水果: {random.choice(fruits)}")

# 随机打乱列表
numbers = [1, 2, 3, 4, 5]
random.shuffle(numbers)
print(f"打乱后: {numbers}")
```

## 进制转换

JavaScript 和 Python 都支持多种进制的转换：

```javascript runner
// JavaScript 进制转换
let number = 42;

console.log("=== 从十进制转换 ===");
console.log(`十进制: ${number}`);
console.log(`二进制: ${number.toString(2)}`);
console.log(`八进制: ${number.toString(8)}`);
console.log(`十六进制: ${number.toString(16).toUpperCase()}`);

console.log("\n=== 转回十进制 ===");
console.log(`二进制 '101010' -> ${parseInt('101010', 2)}`);
console.log(`八进制 '52' -> ${parseInt('52', 8)}`);
console.log(`十六进制 '2A' -> ${parseInt('2A', 16)}`);
```

```python runner
# Python 进制转换
number = 42

print("=== 从十进制转换 ===")
print(f"十进制: {number}")
print(f"二进制: {bin(number)}")    # 0b 前缀
print(f"八进制: {oct(number)}")    # 0o 前缀  
print(f"十六进制: {hex(number)}")  # 0x 前缀

# 去掉前缀
print(f"纯二进制: {bin(number)[2:]}")
print(f"纯十六进制: {hex(number)[2:].upper()}")

print(f"\n=== 转回十进制 ===")
print(f"二进制 '101010' -> {int('101010', 2)}")
print(f"八进制 '52' -> {int('52', 8)}")
print(f"十六进制 '2A' -> {int('2A', 16)}")
```

## 数值检查

JavaScript 和 Python 都提供了数值类型和特殊值的检查函数：

```javascript runner
// JavaScript 数值检查
console.log("=== JavaScript 数值检查 ===");

console.log(`42 是数字: ${typeof 42 === 'number'}`);
console.log(`3.14 是整数: ${Number.isInteger(3.14)}`);
console.log(`Infinity 是有限数: ${Number.isFinite(Infinity)}`);
console.log(`NaN 是 NaN: ${Number.isNaN(NaN)}`);
```

```python runner
import math

# Python 数值检查
print("=== Python 数值检查 ===")

print(f"42 是数字: {isinstance(42, (int, float, complex))}")
print(f"42 是整数: {isinstance(42, int)}")
print(f"3.14 是浮点数: {isinstance(3.14, float)}")
print(f"3+4j 是复数: {isinstance(3+4j, complex)}")
print(f"float('inf') 是有限数: {math.isfinite(float('inf'))}")
print(f"float('nan') 是 NaN: {math.isnan(float('nan'))}")
```

## 数值操作一览

| 操作 | JavaScript | Python |
|-----|------------|---------|
| **基本运算** |
| 加减乘除 | `+` `-` `*` `/` | `+` `-` `*` `/` |
| 幂运算 | `**` 或 `Math.pow(a, b)` | `**` |
| 整除 | `Math.floor(a / b)` | `a // b` |
| 取余 | `%` | `%` |
| **增强赋值** |
| 自增自减 | `++` `--` 或 `+= 1` `-= 1` | `+= 1` `-= 1` |
| 加减赋值 | `+=` `-=` | `+=` `-=` |
| 乘除赋值 | `*=` `/=` | `*=` `/=` |
| 幂运算赋值 | `**=` | `**=` |
| 取余赋值 | `%=` | `%=` |
| 整除赋值 | `x = Math.floor(x / y)` | `x //= y` |
| **统计函数** |
| 最大值 | `Math.max(a, b, c)` | `max(a, b, c)` |
| 最小值 | `Math.min(a, b, c)` | `min(a, b, c)` |
| 求和 | `array.reduce((a,b)=>a+b, 0)` | `sum(iterable)` |
| **特殊值** |
| 正无穷 | `Infinity` | `float('inf')` |
| 负无穷 | `-Infinity` | `float('-inf')` |
| 非数字 | `NaN` | `float('nan')` |
| **数值检查** |
| 是否有限 | `Number.isFinite(x)` | `math.isfinite(x)` |
| 是否无穷 | `!Number.isFinite(x) && !Number.isNaN(x)` | `math.isinf(x)` |
| 是否 NaN | `Number.isNaN(x)` | `math.isnan(x)` |
| **类型转换** |
| 转整数 | `parseInt(str)` | `int(str)` |
| 转浮点数 | `parseFloat(str)` | `float(str)` |
| 检查整数 | `Number.isInteger(x)` | `isinstance(x, int)` |
| **随机数** |
| 0-1随机数 | `Math.random()` | `random.random()` |
| 整数随机数 | `Math.floor(Math.random()*n)+1` | `random.randint(1, n)` |
| 浮点随机数 | `Math.random() * (max-min) + min` | `random.uniform(min, max)` |
| 随机选择 | `arr[Math.floor(Math.random()*arr.length)]` | `random.choice(list)` |
| **格式化** |
| 保留小数位 | `num.toFixed(2)` | `f"{num:.2f}"` |
| 千位分隔符 | `num.toLocaleString()` | `f"{num:,}"` |
| 科学计数法 | `num.toExponential(2)` | `f"{num:.2e}"` |
| **进制转换** |
| 转二进制 | `num.toString(2)` | `bin(num)[2:]` |
| 转八进制 | `num.toString(8)` | `oct(num)[2:]` |
| 转十六进制 | `num.toString(16)` | `hex(num)[2:]` |
| 解析进制 | `parseInt(str, base)` | `int(str, base)` |
| **数学函数** |
| 绝对值 | `Math.abs(x)` | `abs(x)` |
| 平方根 | `Math.sqrt(x)` | `math.sqrt(x)` |
| 向上取整 | `Math.ceil(x)` | `math.ceil(x)` |
| 向下取整 | `Math.floor(x)` | `math.floor(x)` |
| 四舍五入 | `Math.round(x)` | `round(x, 位数)` |
| 三角函数 | `Math.sin(x)` `Math.cos(x)` | `math.sin(x)` `math.cos(x)` |
| 对数函数 | `Math.log(x)` `Math.log10(x)` | `math.log(x)` `math.log10(x)` |
| 指数函数 | `Math.exp(x)` | `math.exp(x)` |
| **常数** |
| 圆周率 | `Math.PI` | `math.pi` |
| 自然常数 | `Math.E` | `math.e` |
## 小结

Python 的数值系统相比 JavaScript 更加丰富和精确：

1. **类型细分明确**：`int`、`float`、`complex`三种类型各司其职，整数支持任意精度
2. **运算符丰富**：提供`//`（整除）和`**`（幂运算）等便利运算符
3. **类型转换严格**：避免隐式转换带来的意外结果，错误处理更明确
4. **数学功能强大**：内置函数和 math 模块提供丰富的数学运算功能
5. **精度控制**：decimal 模块解决浮点数精度问题，适合金融等精确计算场景
6. **格式化灵活**：f-string 和 format 方法提供强大的数值格式化能力
7. **进制转换便利**：内置函数支持多种进制转换操作

理解这些数值类型的特性和使用场景，能帮助你在数据处理、科学计算、Web 开发等不同场景中选择合适的数值类型和处理方法。特别是 Python 在处理大整数和精确小数方面的优势，让它在数据科学和金融计算领域广受欢迎。

## 练习

完成一个餐厅订单计算系统，练习数字运算和格式化：

```
=== 餐厅订单计算系统 ===
商品价格: [28.5, 32.8, 45.0]
商品名称: ["牛肉面", "宫保鸡丁", "红烧肉"]

=== 价格统计 ===
最贵菜品: ¥45.00
最便宜菜品: ¥28.50
总计金额: ¥106.30
平均价格: ¥35.43

=== 优惠计算 ===
满100减10元: ¥96.30
服务费 (10%): ¥9.63
最终金额: ¥105.93

=== 支付处理 ===
向上取整金额: ¥106
向下取整金额: ¥105  
四舍五入金额: ¥106
2人分摊: 每人 ¥52.97

=== 随机活动 ===
随机折扣: 85%
折扣后金额: ¥90.04
抽奖编号: 7392
```

```python runner
import math
import random

# 商品数据
prices = [28.5, 32.8, 45.0]
items = ["牛肉面", "宫保鸡丁", "红烧肉"]

print("=== 餐厅订单计算系统 ===")
print(f"商品价格: {prices}")
print(f"商品名称: {items}")

print("\n=== 价格统计 ===")
# 1. 使用内置函数计算价格统计


# 2. 计算总金额和平均价格


print("\n=== 优惠计算 ===")
# 3. 满100减10元优惠


# 4. 计算10%服务费


# 5. 计算最终金额


print("\n=== 支付处理 ===")
# 6. 使用不同取整方式处理金额


# 7. 计算2人分摊金额


print("\n=== 随机活动 ===")
# 8. 生成随机折扣 (75%-95%，整数百分比)


# 9. 计算折扣后金额


# 10. 生成4位随机抽奖编号


```

:::details 参考答案
```python runner
import math
import random

# 商品数据
prices = [28.5, 32.8, 45.0]
items = ["牛肉面", "宫保鸡丁", "红烧肉"]

print("=== 餐厅订单计算系统 ===")
print(f"商品价格: {prices}")
print(f"商品名称: {items}")

print("\n=== 价格统计 ===")
# 1. 使用内置函数计算价格统计
max_price = max(prices)
min_price = min(prices)
print(f"最贵菜品: ¥{max_price:.2f}")
print(f"最便宜菜品: ¥{min_price:.2f}")

# 2. 计算总金额和平均价格
total_amount = sum(prices)
avg_price = total_amount / len(prices)
print(f"总计金额: ¥{total_amount:.2f}")
print(f"平均价格: ¥{avg_price:.2f}")

print("\n=== 优惠计算 ===")
# 3. 满100减10元优惠
discounted_amount = total_amount - 10
print(f"满100减10元: ¥{discounted_amount:.2f}")

# 4. 计算10%服务费
service_fee = discounted_amount * 0.1
print(f"服务费 (10%): ¥{service_fee:.2f}")

# 5. 计算最终金额
final_amount = discounted_amount + service_fee
print(f"最终金额: ¥{final_amount:.2f}")

print("\n=== 支付处理 ===")
# 6. 使用不同取整方式处理金额
ceil_amount = math.ceil(final_amount)
floor_amount = math.floor(final_amount)
round_amount = round(final_amount)
print(f"向上取整金额: ¥{ceil_amount}")
print(f"向下取整金额: ¥{floor_amount}")
print(f"四舍五入金额: ¥{round_amount}")

# 7. 计算2人分摊金额
per_person = final_amount / 2
print(f"2人分摊: 每人 ¥{per_person:.2f}")

print("\n=== 随机活动 ===")
# 8. 生成随机折扣 (75%-95%，整数百分比)
discount_rate = random.randint(75, 95)
print(f"随机折扣: {discount_rate}%")

# 9. 计算折扣后金额
discounted_final = final_amount * (discount_rate / 100)
print(f"折扣后金额: ¥{discounted_final:.2f}")

# 10. 生成4位随机抽奖编号
lottery_number = random.randint(1000, 9999)
print(f"抽奖编号: {lottery_number}")
```
:::
