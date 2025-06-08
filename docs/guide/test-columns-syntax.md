# 测试 Columns 语法

## ⚠️ 重要发现：冒号数量的技术必要性

### ❌ 错误用法：3个冒号（解析失败）

```markdown
::: columns
::: column
第一列内容
:::
::: column  ← 这里会被解析为与columns同级！
第二列内容
:::
:::
```

**问题**: 第二个 `::: column` 会被解析到 `columns-container` 外面，导致布局错乱。

::: columns
::: column
**左列 - 解析正常**

第一个column容器正常嵌套。

```js runner
console.log('第一列的代码');
```
:::
::: column
**右列 - 解析错误**  

这个column容器被解析到了columns-container外面！

```py runner
print('第二列的代码 - 布局可能错乱')
```
:::
:::

### ✅ 正确用法：4个冒号（解析正确）

```markdown
::: columns
:::: column
第一列内容
::::
:::: column
第二列内容  
::::
:::
```

**正确**: 使用4个冒号，两个column都正确嵌套在columns-container内。

::: columns
:::: column
**左列 - 解析正确**

使用4个冒号，正确嵌套在columns容器内。

```js runner
console.log('4个冒号的JavaScript代码');
```
::::
:::: column
**右列 - 解析正确**

同样使用4个冒号，布局正常。

```py runner
print('4个冒号的Python代码')
```
::::
:::

## 🔍 技术原理

**markdown-it-container 解析逻辑**：

1. 遇到 `::: columns` → 开始解析外层容器
2. 遇到 `::: column` → 解析器认为这是在**关闭** `::: columns`
3. 第二个 `::: column` → 被当作新的顶级容器

**解决方案**：
- **外层容器**: 3个冒号 `::: columns`
- **内层容器**: 4个冒号 `:::: column`
- **层级区分**: 不同冒号数量防止解析冲突

## 📋 最佳实践

```markdown
::: columns
:::: column
左列内容（支持 markdown、代码块等）
::::
:::: column  
右列内容（支持 markdown、代码块等）
::::
:::
```

**结论**: 4个冒号不是约定，而是**技术必需**！用于正确的嵌套解析。

## 测试：3个冒号 vs 4个冒号

### 使用3个冒号（推荐）

::: columns
::: column
**左列 - 3个冒号**

这里使用3个冒号定义列容器。

```js runner
console.log('3个冒号的JavaScript代码');
```
:::
::: column
**右列 - 3个冒号**

这里也使用3个冒号定义列容器。

```py runner
print('3个冒号的Python代码')
```
:::
:::

### 使用4个冒号（原来的方式）

::: columns
:::: column
**左列 - 4个冒号**

这里使用4个冒号定义列容器。

```js runner
console.log('4个冒号的JavaScript代码');
```
::::
:::: column
**右列 - 4个冒号**

这里也使用4个冒号定义列容器。

```py runner
print('4个冒号的Python代码')
```
::::
:::

## 结论

两种方式都能正常工作！实际上：

- **3个冒号**: `::: column` - 更简洁，推荐使用
- **4个冒号**: `:::: column` - 原来的方式，也完全可用

选择哪种主要看个人喜好和团队约定。 