# 异常处理

## 异常处理基础

在 JavaScript 中，我们使用`try...catch`来处理运行时错误，这让程序能够优雅地处理异常情况而不是直接崩溃：

```javascript runner
try {
    console.log(undefinedVariable); // 这会抛出 ReferenceError
} catch (error) {
    console.log("捕获到错误:", error.message);
}
```

Python 采用了类似但更加清晰的异常处理机制。Python 使用`try...except`语法，`except`这个词比`catch`更加直观地表达了"处理异常"的含义：

```python runner
try:
    print(x)  # x 未定义，会抛出 NameError
except:
    print("发生了异常")
```

当没有异常处理时，程序会直接终止并显示错误信息。有了异常处理，程序能够继续运行：

```python runner
# 演示没有异常处理的情况
try:
    # 模拟可能出错的代码
    result = 10 / 0
except ZeroDivisionError:
    print("不能除以零")
    result = 0

print("程序继续执行，result =", result)
```

## 具体异常类型处理

JavaScript 开发者习惯通过检查错误对象的类型或属性来处理不同的错误：

```javascript runner
try {
    // 可能抛出不同类型错误的代码
    let obj = null;
    console.log(obj.property); // TypeError
} catch (error) {
    if (error instanceof TypeError) {
        console.log("类型错误:", error.message);
    } else if (error instanceof ReferenceError) {
        console.log("引用错误:", error.message);
    } else {
        console.log("其他错误:", error.message);
    }
}
```

Python 提供了更加优雅的多异常处理语法。你可以为不同类型的异常编写专门的处理代码，让错误处理更加精确和有针对性：

```python runner
try:
    # 尝试访问不存在的变量
    print(undefined_var)
except NameError:
    print("变量未定义错误")
except TypeError:
    print("类型错误") 
except ZeroDivisionError:
    print("除零错误")
except:
    print("发生了其他类型的错误")
```

你也可以在一个`except`子句中处理多种异常类型：

```python runner
try:
    # 这里可能出现多种错误
    value = int(input("请输入一个数字: "))  # 可能的 ValueError
    result = 10 / value  # 可能的 ZeroDivisionError
except (ValueError, ZeroDivisionError) as e:
    print(f"输入或计算错误: {e}")
except Exception as e:
    print(f"其他错误: {e}")
```

**Python 异常处理的优势**：Python 的异常类型系统比 JavaScript 更加丰富和明确。JavaScript 主要有几种基础错误类型，而 Python 有完整的异常类层次结构，让错误处理更加精确。

## else 子句

JavaScript 的`try...catch`没有直接等价的`else`概念，但 Python 的`else`子句提供了一个非常实用的功能：**只有当没有异常发生时才执行的代码**。

```python runner
def divide_numbers(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("错误：不能除以零")
        return None
    else:
        # 只有当没有异常时才执行
        print(f"计算成功：{a} / {b} = {result}")
        return result

# 测试不同情况
divide_numbers(10, 2)  # 正常情况，会执行 else
divide_numbers(10, 0)  # 异常情况，不会执行 else
```

这种设计让代码逻辑更加清晰：异常处理代码在`except`中，正常流程的后续处理在`else`中，避免了逻辑混淆。

## finally 子句

JavaScript 和 Python 都支持`finally`子句，用于执行无论是否发生异常都需要运行的清理代码：

```javascript runner
let file = null;
try {
    // 模拟文件操作
    file = { name: "example.txt", close: () => console.log("文件已关闭") };
    console.log("文件操作完成");
} catch (error) {
    console.log("文件操作失败:", error.message);
} finally {
    if (file) {
        file.close(); // 确保文件被关闭
    }
}
```

Python 的`finally`用法几乎相同，但在文件处理等资源管理场景中更加常见：

```python runner
def file_operation():
    file_handle = None
    try:
        # 模拟打开文件
        file_handle = "模拟文件句柄"
        print("文件操作中...")
        # 这里可能发生异常
        result = 10 / 2
        print("操作成功")
    except Exception as e:
        print(f"操作失败: {e}")
    finally:
        # 无论是否发生异常都会执行
        if file_handle:
            print("清理资源：关闭文件")

file_operation()
```

**实际应用场景**：`finally`常用于资源清理，比如关闭文件、网络连接、数据库连接等。这确保了即使程序出错，重要的清理工作也能完成。

## 抛出异常

JavaScript 使用`throw`关键字来主动抛出异常，这在参数验证和错误条件检查中很常见：

```javascript runner
function validateAge(age) {
    if (age < 0) {
        throw new Error("年龄不能为负数");
    }
    if (age > 150) {
        throw new Error("年龄不能超过 150 岁");
    }
    return "年龄验证通过";
}

try {
    console.log(validateAge(25));  // 正常
    console.log(validateAge(-5));  // 抛出异常
} catch (error) {
    console.log("验证失败:", error.message);
}
```

Python 使用`raise`关键字来抛出异常，功能类似但语法更加简洁。你可以抛出内置的异常类型，也可以创建自定义异常：

```python runner
def validate_age(age):
    """验证年龄的有效性"""
    if age < 0:
        raise ValueError("年龄不能为负数")
    if age > 150:
        raise ValueError("年龄不能超过 150 岁")
    return "年龄验证通过"

# 测试异常抛出
try:
    print(validate_age(25))   # 正常情况
    print(validate_age(-5))   # 触发异常
except ValueError as e:
    print(f"验证失败: {e}")
```

你也可以抛出更通用的异常类型：

```python runner
def check_permission(user_role):
    """检查用户权限"""
    if user_role != "admin":
        raise Exception("权限不足：需要管理员权限")
    return "权限验证通过"

try:
    check_permission("user")
except Exception as e:
    print(f"权限检查失败: {e}")
```

**Python 异常抛出的特点**：
- 使用`raise`关键字，比`throw`更加直观
- 可以抛出具体的异常类型（如`ValueError`、`TypeError`等），让错误信息更准确
- 支持异常链，可以在处理一个异常时抛出另一个异常，保留原始错误信息

## 异常链和上下文

Python 的一个强大特性是异常链，允许在处理异常时保留原始异常的信息：

```python runner
def process_data(data):
    """处理数据，演示异常链"""
    try:
        # 尝试将字符串转换为整数
        number = int(data)
        return 100 / number
    except ValueError:
        # 捕获转换异常，抛出更具体的业务异常
        raise Exception(f"无法处理数据: {data}") from ValueError("数据格式错误")
    except ZeroDivisionError:
        raise Exception("计算错误") from ZeroDivisionError("除零操作")

try:
    result = process_data("abc")
except Exception as e:
    print(f"最终异常: {e}")
    print(f"原始异常: {e.__cause__}")
```

## 自定义异常类

Python 允许创建自定义异常类，这在大型项目中非常有用：

```python runner
class ValidationError(Exception):
    """自定义验证异常"""
    def __init__(self, field, value, message="验证失败"):
        self.field = field
        self.value = value
        self.message = message
        super().__init__(f"{field} 字段验证失败: {message}, 值: {value}")

def validate_email(email):
    """邮箱验证示例"""
    if "@" not in email:
        raise ValidationError("email", email, "缺少@符号")
    return True

try:
    validate_email("invalid-email")
except ValidationError as e:
    print(f"字段: {e.field}")
    print(f"值: {e.value}")
    print(f"错误: {e.message}")
```

## 最佳实践

**1. 具体异常胜过通用异常**

```python runner
# 推荐：具体的异常处理
try:
    age = int(input("请输入年龄: "))
    if age < 0:
        raise ValueError("年龄不能为负数")
except ValueError as e:
    print(f"输入错误: {e}")

# 不推荐：过于宽泛的异常处理
# try:
#     # 一些代码
# except Exception:
#     print("出错了")  # 信息不够具体
```

**2. 合理使用 finally 进行资源清理**

```python runner
def safe_file_operation():
    """安全的文件操作示例"""
    file_content = None
    try:
        # 模拟文件读取
        print("开始读取文件...")
        file_content = "文件内容"
        # 可能的异常操作
        processed = file_content.upper()
        return processed
    except Exception as e:
        print(f"文件处理出错: {e}")
        return None
    finally:
        # 清理工作
        print("清理临时资源")

result = safe_file_operation()
print("处理结果:", result)
```

**3. 异常信息要清晰有用**

```python runner
def calculate_discount(price, discount_rate):
    """计算折扣价格"""
    try:
        if price < 0:
            raise ValueError(f"价格不能为负数: {price}")
        if not 0 <= discount_rate <= 1:
            raise ValueError(f"折扣率必须在 0-1 之间: {discount_rate}")
        
        return price * (1 - discount_rate)
    except ValueError as e:
        print(f"参数错误: {e}")
        return None

# 测试
calculate_discount(-100, 0.2)  # 价格错误
calculate_discount(100, 1.5)   # 折扣率错误
calculate_discount(100, 0.2)   # 正常情况
```

## 小结

Python 的异常处理机制相比 JavaScript 具有以下特点和优势：

1. **语法更清晰**：`try...except`比`try...catch`更直观，`raise`比`throw`更明确
2. **异常类型丰富**：Python 提供了完整的异常类层次结构，错误分类更精确
3. **`else`子句独特**：提供了"无异常时执行"的逻辑分支，让代码结构更清晰
4. **`finally`子句一致**：与 JavaScript 类似，用于资源清理和必须执行的代码
5. **异常链支持**：可以保留原始异常信息，便于调试和错误追踪
6. **自定义异常灵活**：易于创建业务相关的异常类型

掌握异常处理是编写健壮 Python 程序的关键技能。合理的异常处理不仅能让程序更稳定，还能提供更好的用户体验和调试信息。记住要捕获具体的异常类型，提供有意义的错误信息，并确保重要资源得到正确清理。 