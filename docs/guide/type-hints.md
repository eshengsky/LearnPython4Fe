# 类型注解

## 从 TypeScript 到 Python 的类型系统

在 JavaScript 生态中，我们通过 TypeScript 来获得静态类型检查的好处。TypeScript 通过类型注解让 JavaScript 代码更加安全和可维护：

```typescript
// TypeScript 的类型注解
let userName: string = "张三";
let userAge: number = 25;
let isActive: boolean = true;

console.log(userName, userAge, isActive);

// TypeScript 支持联合类型、接口等高级特性
let status: "loading" | "success" | "error" = "loading";

interface User {
    name: string;
    age: number;
    isVip?: boolean;  // 可选属性
}

const user: User = {
    name: "张三",
    age: 25
};
```

对比普通 JavaScript 只能通过变量名和注释来表达类型意图：

```javascript runner
// 普通 JavaScript - 无类型约束
let userName = "张三";
let userAge = 25;
let isActive = true;

console.log(userName, userAge, isActive);

// 运行时可能出现类型错误
userName = 123;  // JavaScript 允许，但可能不是我们想要的
console.log("用户名变成了数字:", userName);
```

在前端开发中，TypeScript 已经成为大型项目的标准选择，它在保持 JavaScript 灵活性的同时提供了类型安全。

Python 从 3.5 版本开始引入了类型注解（Type Hints），这让 Python 也能享受到静态类型检查的好处，同时保持了动态语言的灵活性：

```python runner
# Python 的类型注解
user_name: str = "张三"
user_age: int = 25
is_active: bool = True
user_score: float = 95.5

print(f"用户信息: {user_name}, {user_age} 岁, 活跃状态: {is_active}, 得分: {user_score}")

# 类型注解不影响运行时行为
print("类型信息:", type(user_name), type(user_age), type(is_active))
```

## 基本类型注解

Python 的类型注解有几个重要特点，这让它在某些方面比 TypeScript 更加灵活：

```python runner
# 1. 类型注解是可选的，不影响运行时
name = "张三"          # 没有注解也完全正常
age: int = 25         # 有注解更清晰

# 2. 可以逐步添加类型注解
def greet(name):      # 老代码无需修改
    return f"Hello, {name}!"

def greet_typed(name: str) -> str:  # 新代码可以加注解
    return f"Hello, {name}!"

print(greet("李四"))
print(greet_typed("王五"))

# 3. 基本数据类型的注解
count: int = 100
price: float = 19.99
message: str = "欢迎"
is_valid: bool = True

print(f"计数: {count}, 价格: {price}, 消息: {message}, 有效: {is_valid}")
```

**类型注解与动态类型的平衡**

Python 的类型注解最大的优势是可选性 - 你可以在需要的地方添加类型信息，而不会影响 Python 的动态特性：

```python runner
# 混合使用：有些变量有类型注解，有些没有
user_id: int = 1001
username = "张三"      # 推断为 str
score = 95.5          # 推断为 float
tags: list = ["VIP", "新用户"]

print(f"用户 {username} (ID: {user_id}) 得分: {score}, 标签: {tags}")

# 即使有类型注解，仍然可以动态改变类型（虽然不推荐）
user_id = "USER_1001"  # 运行时允许，但类型检查器会警告
print(f"用户 ID 现在是字符串: {user_id}")
```

## 复杂类型注解

Python 的类型注解支持很多高级特性，类似 TypeScript 的类型系统：

```python runner
from typing import List, Dict, Optional, Union, Tuple

# 容器类型的注解
numbers: List[int] = [1, 2, 3, 4, 5]
user_info: Dict[str, str] = {"name": "张三", "email": "zhangsan@example.com"}
coordinates: Tuple[float, float] = (120.5, 30.2)

print("数字列表:", numbers)
print("用户信息:", user_info)
print("坐标:", coordinates)

# 可选类型（类似 TypeScript 的联合类型）
user_id: Optional[int] = None  # 等同于 Union[int, None]
status: Union[str, int] = "active"  # 可以是字符串或数字

print("用户 ID:", user_id)
print("状态:", status)

# 更新值来演示联合类型
status = 200  # 现在是数字
print("新状态:", status)
```

**现代 Python 的类型注解语法**

Python 3.9+引入了更简洁的类型注解语法，不再需要从`typing`模块导入基本容器类型：

```python runner
# Python 3.9+ 的新语法（如果环境支持）
try:
    # 新语法：直接使用内置类型
    modern_list: list[int] = [1, 2, 3]
    modern_dict: dict[str, int] = {"a": 1, "b": 2}
    
    print("现代语法支持:", modern_list, modern_dict)
except TypeError:
    # 如果环境不支持，使用传统语法
    from typing import List, Dict
    
    traditional_list: List[int] = [1, 2, 3]
    traditional_dict: Dict[str, int] = {"a": 1, "b": 2}
    
    print("传统语法:", traditional_list, traditional_dict)
```

## 函数的类型注解

函数的类型注解让代码的输入输出更加明确，这在团队协作中特别有用：

```python runner
# 函数参数和返回值的类型注解
def calculate_total(price: float, tax_rate: float = 0.1) -> float:
    """计算含税总价
    
    Args:
        price: 商品价格
        tax_rate: 税率，默认 10%
    
    Returns:
        含税总价
    """
    return price * (1 + tax_rate)

def format_user_info(name: str, age: int, is_vip: bool = False) -> str:
    """格式化用户信息"""
    vip_status = "VIP" if is_vip else "普通"
    return f"{name}（{age} 岁，{vip_status} 用户）"

# 使用带类型注解的函数
total_price = calculate_total(100.0, 0.13)
user_desc = format_user_info("张三", 25, True)

print(f"总价: {total_price}")
print(f"用户: {user_desc}")
```

**高级函数类型注解**

对于更复杂的函数，Python 提供了丰富的类型注解选项：

```python runner
from typing import List, Dict, Callable, Any, Union

# 回调函数类型
def process_data(data: List[int], callback: Callable[[int], str]) -> List[str]:
    """处理数据并应用回调函数"""
    return [callback(x) for x in data]

def number_to_string(n: int) -> str:
    return f"数字:{n}"

# 使用回调函数
numbers = [1, 2, 3, 4, 5]
results = process_data(numbers, number_to_string)
print("处理结果:", results)

# 返回多个值的函数
def get_user_stats(user_id: int) -> Tuple[str, int, float]:
    """返回用户统计信息：(名称, 年龄, 得分)"""
    return ("张三", 25, 95.5)

name, age, score = get_user_stats(1001)
print(f"用户统计: {name}, {age} 岁, 得分 {score}")
```

## 类和接口的类型注解

虽然 Python 没有 interface 关键字，但可以使用 Protocol 或抽象基类来实现类似的功能：

```python runner
from typing import Protocol

# 使用 Protocol 定义接口（Python 3.8+）
class Drawable(Protocol):
    def draw(self) -> str:
        ...

class Circle:
    def __init__(self, radius: float):
        self.radius: float = radius
    
    def draw(self) -> str:
        return f"画一个半径为 {self.radius} 的圆"

class Rectangle:
    def __init__(self, width: float, height: float):
        self.width: float = width
        self.height: float = height
    
    def draw(self) -> str:
        return f"画一个 {self.width}x{self.height} 的矩形"

# 使用类型注解的函数，接受任何实现了 Drawable 协议的对象
def render_shape(shape: Drawable) -> None:
    print(shape.draw())

# 创建和使用对象
circle = Circle(5.0)
rectangle = Rectangle(10.0, 8.0)

render_shape(circle)
render_shape(rectangle)
```

## 类型检查工具

虽然 Python 的类型注解在运行时不做检查，但可以使用静态类型检查工具（如 mypy）来验证类型正确性：

```python runner
# 这些代码在运行时不会报错，但静态检查工具会发现问题
def add_numbers(a: int, b: int) -> int:
    return a + b

# 运行时正常，但类型不匹配
result = add_numbers(5, 3)  # 正确用法
print("正确结果:", result)

# 这样使用类型不匹配，但 Python 运行时允许
result2 = add_numbers("5", "3")  # 类型检查器会警告，但能运行
print("字符串'相加':", result2)  # 实际是字符串拼接

# 显示实际类型
print("result 类型:", type(result))
print("result2 类型:", type(result2))

# 模拟类型检查器的行为
def type_safe_add(a: int, b: int) -> int:
    """带运行时类型检查的加法函数"""
    if not isinstance(a, int) or not isinstance(b, int):
        raise TypeError(f"期望 int 类型，得到 {type(a)} 和 {type(b)}")
    return a + b

# 这会抛出异常
try:
    type_safe_add("5", "3")
except TypeError as e:
    print(f"运行时类型检查错误: {e}")
```

## 类型注解的最佳实践

Python 类型注解的使用有一些最佳实践：

```python runner
from typing import List, Dict, Union, Optional

# 1. 公共 API 和复杂函数建议添加类型注解
def process_user_data(data: List[Dict[str, any]]) -> Dict[str, int]:
    """处理用户数据的公共函数，类型注解很重要"""
    result = {}
    for item in data:
        name = item.get("name", "unknown")
        result[name] = len(str(item))
    return result

# 2. 简单的局部变量可以省略注解
def simple_calculation():
    x = 10  # 类型显而易见，无需注解
    y = 20
    return x + y

# 3. 使用有意义的类型别名
UserId = int
UserName = str
UserData = Dict[str, Union[str, int, bool]]

def create_user(user_id: UserId, name: UserName) -> UserData:
    return {
        "id": user_id,
        "name": name,
        "is_active": True,
        "login_count": 0
    }

# 4. 复杂类型可以分步定义
Point = Tuple[float, float]
Path = List[Point]

def calculate_distance(path: Path) -> float:
    """计算路径总长度"""
    if len(path) < 2:
        return 0.0
    
    total = 0.0
    for i in range(1, len(path)):
        x1, y1 = path[i-1]
        x2, y2 = path[i]
        total += ((x2-x1)**2 + (y2-y1)**2)**0.5
    return total

# 演示使用
sample_data = [{"name": "张三", "value": 123}, {"name": "李四", "data": "test"}]
processed = process_user_data(sample_data)
simple_result = simple_calculation()
new_user = create_user(1001, "王五")

path_data: Path = [(0, 0), (3, 4), (6, 8)]
distance = calculate_distance(path_data)

print("处理结果:", processed)
print("简单计算:", simple_result)
print("新用户:", new_user)
print(f"路径长度: {distance:.2f}")
```

## 渐进式类型注解

Python 类型注解的最大优势是渐进式采用。你可以：

```python runner
# 1. 从现有代码开始，不添加任何类型注解
def old_function(data):
    return len(data)

# 2. 逐步为关键函数添加类型注解
def important_function(data: list) -> int:
    return len(data)

# 3. 为新代码添加完整的类型注解
def new_function(data: List[Union[str, int]], min_length: int = 0) -> bool:
    """检查数据长度是否满足要求"""
    return len(data) >= min_length

# 所有版本都能正常工作
test_data = [1, 2, 3, "hello"]

print("旧函数:", old_function(test_data))
print("重要函数:", important_function(test_data))
print("新函数:", new_function(test_data, 3))
```

Python 的类型注解提供了一个很好的平衡：你可以在需要的地方添加类型信息来提高代码质量，同时保持 Python 动态语言的灵活性。这让 Python 在大型项目中也能保持良好的可维护性，同时不会失去快速原型开发的优势。

## 小结

Python 类型注解系统提供了静态类型检查的好处，同时保持了动态语言的灵活性：

1. **可选性优势**：类型注解完全可选，不影响运行时性能，可渐进式采用
2. **基本类型覆盖**：支持所有内置类型的注解，如`str`、`int`、`list`、`dict`等
3. **复杂类型支持**：通过`typing`模块支持泛型、联合类型、可选类型等高级特性
4. **函数注解增强**：参数和返回值类型注解让函数接口更加清晰
5. **类和协议**：支持 Protocol 协议和抽象基类，实现类似接口的功能
6. **工具生态完善**：mypy 等静态检查工具提供编译时类型验证
7. **渐进式演进**：新版本 Python 不断简化类型注解语法，如`list[int]`替代`List[int]`

类型注解的核心价值在于提高代码可维护性和团队协作效率。在大型项目中，适当使用类型注解能显著减少因类型错误导致的 bug，同时让代码意图更加明确。建议在公共 API、复杂函数和关键业务逻辑中优先使用类型注解。 