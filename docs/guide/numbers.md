# 数字

在JavaScript中，我们只有一种数字类型`number`，它能处理整数和浮点数。Python将数字进行了更细致的分类，提供了三种主要的数值类型：整数（`int`）、浮点数（`float`）和复数（`complex`），每种类型都有其特定的用途和优势。

## 类型概述

Python的数值类型比JavaScript更加丰富：

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

JavaScript中所有数字都是浮点数类型，即使看起来像整数：

```javascript runner
// JavaScript 中的"整数"实际上是浮点数
let num = 123;
console.log(typeof num);        // "number"
console.log(Number.isInteger(num)); // true，但底层还是浮点数
```

Python的整数是真正的整数类型，并且支持任意精度。这是与JavaScript的一个重要区别：

```javascript runner
// JavaScript 数字有精度限制
console.log(Number.MAX_SAFE_INTEGER);        // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1);    // 9007199254740992
console.log(Number.MAX_SAFE_INTEGER + 2);    // 9007199254740992 (精度丢失!)

// 超过安全范围的大数需要用字符串或BigInt
let bigNumber = "123456789012345678901234567890";  // 字符串形式
let bigInt = 123456789012345678901234567890n;      // BigInt类型
console.log(typeof bigInt);  // "bigint"
```

```python runner
# Python 整数支持任意精度，没有大小限制
small_int = 123
big_int = 123456789012345678901234567890

print(f"小整数: {small_int}")
print(f"大整数: {big_int}")
print(f"大整数类型: {type(big_int).__name__}")

# 计算一个非常大的数
huge_number = 2 ** 1000  # 2的1000次方
print(f"2的1000次方有 {len(str(huge_number))} 位数字")

# Python可以直接进行大数运算
result = big_int * 999999999999999999999
print(f"大数运算结果: {result}")
```

JavaScript的数字限制来源于IEEE 754双精度浮点数标准，最大安全整数是2^53-1。超过这个范围就可能失去精度，必须使用BigInt类型或字符串来处理。而Python的任意精度整数让大数计算变得非常简单，这在密码学、数学计算、金融计算等场景中是巨大的优势。

## 浮点数（float）

JavaScript和Python都使用IEEE 754标准来表示浮点数：

```javascript runner
// JavaScript 浮点数
let price = 19.99;
let rate = 0.05;
console.log(price, rate);
```

```python runner
# Python 浮点数
price = 19.99
rate = 0.05

print(f"价格: {price}")
print(f"费率: {rate}")
print(f"价格类型: {type(price).__name__}")
```

### 科学计数法

两种语言都支持科学计数法：

```python runner
# 科学计数法表示
large_num = 3.5e8     # 3.5 × 10^8
small_num = 1.2e-4    # 1.2 × 10^-4

print(f"大数: {large_num}")
print(f"小数: {small_num}")
```

## 复数（complex）

这是Python独有的数值类型，JavaScript原生不支持复数：

```python runner
# 创建复数
z1 = 3 + 4j           # 使用 j 表示虚数单位
z2 = complex(5, 6)    # 使用 complex() 函数创建

print(f"复数1: {z1}")
print(f"复数2: {z2}")

# 复数的实部和虚部
print(f"z1的实部: {z1.real}")
print(f"z1的虚部: {z1.imag}")

# 复数运算
z3 = z1 + z2
print(f"复数相加: {z1} + {z2} = {z3}")
```

注意Python使用`j`而不是数学中常用的`i`来表示虚数单位，这是因为在工程领域（特别是电气工程）习惯使用`j`。

## 类型转换

JavaScript的数值转换有时比较宽松：

```javascript runner
// JavaScript 类型转换
console.log(Number("123"));     // 123
console.log(Number("123.45"));  // 123.45
console.log(Number("123abc"));  // NaN
console.log(parseInt("123.45")); // 123
console.log(parseFloat("123.45")); // 123.45
```

Python的转换更加严格和明确：

```python runner
# Python 数值转换
text = "123"
float_text = "123.45"

# 字符串转整数
num_int = int(text)
print(f"'{text}' -> {num_int} ({type(num_int).__name__})")

# 字符串转浮点数
num_float = float(float_text)
print(f"'{float_text}' -> {num_float} ({type(num_float).__name__})")

# 浮点数转整数（截断小数部分）
truncated = int(123.89)
print(f"123.89 -> {truncated}")

# 整数转浮点数
float_from_int = float(123)
print(f"123 -> {float_from_int}")
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

Python和JavaScript的基本运算符基本相同：

```python runner
a = 10
b = 3

print(f"加法: {a} + {b} = {a + b}")
print(f"减法: {a} - {b} = {a - b}")
print(f"乘法: {a} * {b} = {a * b}")
print(f"除法: {a} / {b} = {a / b}")
```

### Python独有的运算符

Python提供了一些JavaScript没有的有用运算符：

```python runner
a = 10
b = 3

# 整数除法（向下取整）
print(f"整数除法: {a} // {b} = {a // b}")

# 幂运算
print(f"幂运算: {a} ** {b} = {a ** b}")

# 取模运算
print(f"取模: {a} % {b} = {a % b}")
```

JavaScript中需要使用Math对象来实现类似功能：

```javascript runner
// JavaScript 需要使用 Math 对象
let a = 10, b = 3;

console.log(`整数除法: Math.floor(${a} / ${b}) = ${Math.floor(a / b)}`);
console.log(`幂运算: Math.pow(${a}, ${b}) = ${Math.pow(a, b)}`);
console.log(`取模: ${a} % ${b} = ${a % b}`);
```

### 增强赋值运算符

两种语言都支持增强赋值运算符：

```python runner
x = 5

x += 2    # 等同于 x = x + 2
print(f"x += 2: {x}")

x *= 3    # 等同于 x = x * 3
print(f"x *= 3: {x}")

x //= 4   # 整数除法赋值
print(f"x //= 4: {x}")

x **= 2   # 幂运算赋值
print(f"x **= 2: {x}")
```

## 数值比较

数值比较在两种语言中基本相同：

```python runner
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

Python允许不同数值类型之间的比较：

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

Python提供了一些基本的内置数学函数：

```python runner
numbers = [-4.7, -2, 0, 2, 4.7]

print("=== 内置数学函数 ===")
for num in numbers:
    print(f"abs({num:>4}) = {abs(num):>4}")

print(f"\nmax(numbers): {max(numbers)}")
print(f"min(numbers): {min(numbers)}")
print(f"sum(numbers): {sum(numbers)}")

# round() 函数进行四舍五入
float_numbers = [3.14159, 2.678, 9.1234]
for num in float_numbers:
    print(f"round({num}, 2) = {round(num, 2)}")
```

## 数学模块

JavaScript有Math对象，Python有math模块，提供更丰富的数学函数：

```python runner
import math

print("=== 数学模块函数 ===")
x = 16
y = math.pi / 4  # 45度对应的弧度

print(f"平方根: sqrt({x}) = {math.sqrt(x)}")
print(f"向上取整: ceil(4.1) = {math.ceil(4.1)}")
print(f"向下取整: floor(4.9) = {math.floor(4.9)}")

print(f"\n=== 三角函数 ===")
print(f"sin(π/4) = {math.sin(y):.4f}")
print(f"cos(π/4) = {math.cos(y):.4f}")
print(f"tan(π/4) = {math.tan(y):.4f}")

print(f"\n=== 对数和指数 ===")
print(f"自然对数: log(e) = {math.log(math.e):.4f}")
print(f"以10为底: log10(100) = {math.log10(100)}")
print(f"指数函数: exp(1) = {math.exp(1):.4f}")

print(f"\n=== 常数 ===")
print(f"圆周率 π = {math.pi:.6f}")
print(f"自然常数 e = {math.e:.6f}")
```

## 随机数

在Web开发中经常需要生成随机数，JavaScript使用`Math.random()`：

```javascript runner
// JavaScript 随机数
console.log("0-1之间:", Math.random());
console.log("1-10之间:", Math.floor(Math.random() * 10) + 1);
```

Python使用random模块：

```python runner
import random

print("=== 随机数生成 ===")
print(f"0-1之间: {random.random():.4f}")
print(f"1-10之间: {random.randint(1, 10)}")
print(f"浮点数(1-10): {random.uniform(1, 10):.2f}")

# 从列表中随机选择
fruits = ["apple", "banana", "orange", "grape"]
print(f"随机水果: {random.choice(fruits)}")

# 随机打乱列表
numbers = [1, 2, 3, 4, 5]
random.shuffle(numbers)
print(f"打乱后: {numbers}")
```

## 数值格式化

在前端开发中，我们经常需要格式化数字用于显示：

```javascript runner
// JavaScript 数字格式化
let num = 1234.5678;
console.log(num.toFixed(2));        // "1234.57"
console.log(num.toLocaleString());  // "1,234.568" (根据地区)
```

Python提供了多种格式化方式：

```python runner
# Python 数字格式化
num = 1234.5678

# 使用 f-string（推荐）
print(f"保留2位小数: {num:.2f}")
print(f"百分比格式: {0.156:.1%}")
print(f"科学计数法: {num:.2e}")

# 使用 format() 方法
print("千位分隔符: {:,}".format(int(num)))
print("补零对齐: {:08.2f}".format(num))

# round() 函数
print(f"四舍五入: {round(num, 2)}")
```

### 进制转换

```python runner
number = 42

print(f"十进制: {number}")
print(f"二进制: {bin(number)}")    # 0b前缀
print(f"八进制: {oct(number)}")    # 0o前缀  
print(f"十六进制: {hex(number)}")  # 0x前缀

# 去掉前缀
print(f"纯二进制: {bin(number)[2:]}")
print(f"纯十六进制: {hex(number)[2:].upper()}")

# 从其他进制转回十进制
binary_str = "101010"
hex_str = "2A"
print(f"二进制 '{binary_str}' -> {int(binary_str, 2)}")
print(f"十六进制 '{hex_str}' -> {int(hex_str, 16)}")
```

## 数值检查

Python提供了一些有用的数值检查函数：

```python runner
import math

# 测试数值
test_values = [42, 3.14, float('inf'), float('-inf'), float('nan')]

print("=== 数值检查 ===")
for val in test_values:
    print(f"\n值: {val}")
    print(f"  是否有限: {math.isfinite(val)}")
    print(f"  是否无穷: {math.isinf(val)}")
    print(f"  是否NaN: {math.isnan(val)}")

# 整数检查
mixed_numbers = [42, 42.0, 42.5, "42"]
print(f"\n=== 整数检查 ===")
for num in mixed_numbers:
    try:
        is_int = isinstance(num, int) or (isinstance(num, float) and num.is_integer())
        print(f"{num} 是整数: {is_int}")
    except AttributeError:
        print(f"{num} 不是数字类型")
```

## 数值精度问题

浮点数精度是编程中的常见问题，JavaScript和Python都会遇到：

```javascript runner
// JavaScript 精度问题
console.log(0.1 + 0.2);                    // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);           // false
```

```python runner
# Python 也有相同的精度问题
result = 0.1 + 0.2
print(f"0.1 + 0.2 = {result}")
print(f"0.1 + 0.2 == 0.3: {result == 0.3}")

# 解决方案1: 使用 round()
print(f"round(0.1 + 0.2, 1) == 0.3: {round(0.1 + 0.2, 1) == 0.3}")

# 解决方案2: 使用 decimal 模块实现精确计算
from decimal import Decimal

decimal_result = Decimal('0.1') + Decimal('0.2')
print(f"使用 Decimal: {decimal_result}")
print(f"Decimal 结果等于 0.3: {decimal_result == Decimal('0.3')}")
```

### 使用decimal模块处理金融计算

```python runner
from decimal import Decimal, getcontext

# 设置精度
getcontext().prec = 10

# 金融计算示例
price = Decimal('19.99')
tax_rate = Decimal('0.08')
quantity = Decimal('3')

subtotal = price * quantity
tax = subtotal * tax_rate
total = subtotal + tax

print(f"商品单价: ${price}")
print(f"数量: {quantity}")
print(f"小计: ${subtotal}")
print(f"税率: {tax_rate * 100}%")
print(f"税额: ${tax}")
print(f"总计: ${total}")
```

## 小结

Python的数值系统相比JavaScript更加丰富和精确：

1. **类型细分明确**：`int`、`float`、`complex`三种类型各司其职，整数支持任意精度
2. **运算符丰富**：提供`//`（整数除法）和`**`（幂运算）等便利运算符
3. **类型转换严格**：避免隐式转换带来的意外结果，错误处理更明确
4. **数学功能强大**：内置函数和math模块提供丰富的数学运算功能
5. **精度控制**：decimal模块解决浮点数精度问题，适合金融等精确计算场景
6. **格式化灵活**：f-string和format方法提供强大的数值格式化能力
7. **进制转换便利**：内置函数支持多种进制转换操作

理解这些数值类型的特性和使用场景，能帮助你在数据处理、科学计算、Web开发等不同场景中选择合适的数值类型和处理方法。特别是Python在处理大整数和精确小数方面的优势，让它在数据科学和金融计算领域广受欢迎。 