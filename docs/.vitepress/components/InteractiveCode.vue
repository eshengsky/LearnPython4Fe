<template>
  <div class="interactive-code border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden my-4">
    <div class="border-b border-gray-200 dark:border-gray-700">
      <div class="px-4 py-2 flex justify-between items-center text-xs font-semibold bg-transparent dark:bg-[#1e1e1e]"
        :class="[colorTheme.text]">
        <span class="text-sm">{{ computedTitle }}</span>
        <div class="flex items-center gap-1">
          <button @click="copyCode"
            class="text-current px-2 py-1.5 rounded-md text-xs cursor-pointer transition-all duration-200 flex items-center gap-1"
            :class="[colorTheme.hover]" title="复制代码">
            <CopyIcon v-if="!copySuccess" :size="14" />
            <CheckIcon v-else :size="14" />
            <span class="text-xs">{{ copySuccess ? '已复制' : '复制' }}</span>
          </button>
          <button v-if="runnable" @click="resetCode"
            class="text-current px-2 py-1.5 rounded-md text-xs cursor-pointer transition-all duration-200 flex items-center gap-1"
            :class="[colorTheme.hover]" title="重置代码">
            <RotateCcwIcon :size="14" />
            <span class="text-xs">重置</span>
          </button>
          <button v-if="runnable" @click="runCode"
            class="text-current px-2 py-1.5 rounded-md text-xs cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            :class="[colorTheme.hover]" :disabled="isRunning || (lang === 'py' && !pyodideReady)"
            :title="getButtonText()">
            <LoaderIcon v-if="isRunning || (lang === 'py' && !pyodideReady)" :size="14" class="animate-spin" />
            <PlayIcon v-else :size="14" />
            <span class="text-xs">{{ getSimpleButtonText() }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="relative" :class="{ 'readonly-code': !runnable }">
        <!-- 懒加载占位符 -->
        <div v-if="!isInitialized" 
             ref="placeholderRef"
             class="text-gray-900 dark:text-gray-100 border-none outline-none bg-gray-50 dark:bg-gray-800 flex items-center justify-center"
             :style="{ minHeight: '100px' }">
          <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <LoaderIcon :size="16" class="animate-spin" />
            <span>正在加载编辑器...</span>
          </div>
        </div>
        <!-- 实际编辑器 -->
        <div v-show="isInitialized" ref="editorRef" class="text-gray-900 dark:text-gray-100 border-none outline-none"></div>
      </div>

      <div v-if="runnable && showOutput"
        class="border-t border-gray-200 bg-neutral-50 dark:bg-neutral-800 dark:border-gray-700">
        <div
          class="px-4 pt-3 flex justify-between items-center text-xs font-semibold text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700">
          <span class="select-none">输出结果</span>
          <button @click="closeOutput"
            class="text-current h-4 w-4 flex items-center justify-center rounded-sm text-xs cursor-pointer transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            title="关闭输出">
            <XIcon :size="12" />
          </button>
        </div>
        <pre
          class="m-0 px-4 py-3 font-mono text-xs leading-relaxed text-gray-900 dark:text-gray-100 bg-transparent whitespace-pre-wrap break-words"
          :class="{ 'text-red-600 dark:text-red-400': hasError }">{{ output || '点击运行查看结果' }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, onUnmounted, type Ref } from 'vue'
import { EditorView, keymap } from '@codemirror/view'
import { indentWithTab } from '@codemirror/commands'
import { EditorState } from '@codemirror/state'
import { basicSetup } from 'codemirror'
import { autocompletion, completionKeymap, CompletionContext, CompletionResult, snippetCompletion, acceptCompletion } from '@codemirror/autocomplete'
import { javascript, javascriptLanguage } from '@codemirror/lang-javascript'
import { python, pythonLanguage } from '@codemirror/lang-python'
import { indentUnit } from '@codemirror/language'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { json } from '@codemirror/lang-json'
import { vsCodeLight } from '@fsegurai/codemirror-theme-vscode-light'
import { vsCodeDark } from '@fsegurai/codemirror-theme-vscode-dark'
import { PlayIcon, LoaderIcon, RotateCcwIcon, CopyIcon, CheckIcon, XIcon } from 'lucide-vue-next'
import inspect from 'object-inspect'

interface Props {
  lang: string  // 改为支持所有语言
  code?: string
  title?: string
  runnable?: boolean  // 控制是否显示运行按钮
  lazy?: boolean  // 控制是否启用懒加载
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  title: '',
  runnable: false,  // 默认不显示运行按钮
  lazy: false  // 默认不启用懒加载
})

// 响应式数据
const editorRef: Ref<HTMLElement | null> = ref(null)
const placeholderRef: Ref<HTMLElement | null> = ref(null)
const output: Ref<string> = ref('')
const hasError: Ref<boolean> = ref(false)
const isRunning: Ref<boolean> = ref(false)
const pyodideReady: Ref<boolean> = ref(false)
const showOutput: Ref<boolean> = ref(false)
const copySuccess: Ref<boolean> = ref(false)
const isInitialized: Ref<boolean> = ref(false)  // 标记编辑器是否已初始化

let pyodide: any = null
let editorView: EditorView | null = null
let intersectionObserver: IntersectionObserver | null = null

// 计算属性
const computedTitle = computed((): string => {
  if (props.title) return props.title

  // 根据语言返回友好的显示名称
  const langNames: Record<string, string> = {
    js: 'JavaScript',
    ts: 'TypeScript',
    py: 'Python',
    html: 'HTML',
    css: 'CSS',
    json: 'JSON',
    xml: 'XML',
    yaml: 'YAML',
    yml: 'YAML',
    bash: 'Bash',
    sh: 'Shell',
    powershell: 'PowerShell',
    dockerfile: 'Dockerfile',
    markdown: 'Markdown',
    md: 'Markdown',
    vue: 'Vue',
    scss: 'SCSS',
    sass: 'Sass',
    less: 'Less',
    stylus: 'Stylus'
  }

  return langNames[props.lang] || props.lang.toUpperCase()
})

// 颜色主题计算属性
const colorTheme = computed(() => {
  if (props.lang === 'js' || props.lang === 'javascript' || props.lang === 'ts' || props.lang === 'typescript') {
    return {
      text: 'text-yellow-600 dark:text-yellow-700',
      hover: 'hover:bg-yellow-50 hover:dark:bg-yellow-900/20'
    }
  } else if (props.lang === 'py' || props.lang === 'python') {
    return {
      text: 'text-cyan-600 dark:text-cyan-700',
      hover: 'hover:bg-cyan-50 hover:dark:bg-cyan-900/20'
    }
  } else if (props.lang === 'html') {
    return {
      text: 'text-orange-600 dark:text-orange-400',
      hover: 'hover:bg-orange-50 hover:dark:bg-orange-900/20'
    }
  } else if (props.lang === 'css') {
    return {
      text: 'text-blue-600 dark:text-blue-400',
      hover: 'hover:bg-blue-50 hover:dark:bg-blue-900/20'
    }
  } else if (props.lang === 'json') {
    return {
      text: 'text-green-700 dark:text-green-700',
      hover: 'hover:bg-green-50 hover:dark:bg-green-900/20'
    }
  } else {
    return {
      text: 'text-gray-600 dark:text-gray-400',
      hover: 'hover:bg-gray-50 hover:dark:bg-gray-700/50'
    }
  }
})

// 处理代码内容 - 支持模板字符串的自动格式化
function processCode(code: string): string {
  if (!code) return ''

  // 如果是多行字符串，自动处理缩进
  const lines = code.split('\n')

  // 移除开头和结尾的空行
  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift()
  }
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop()
  }

  if (lines.length === 0) return ''

  // 找到最小缩进（忽略空行）
  const nonEmptyLines = lines.filter(line => line.trim() !== '')
  if (nonEmptyLines.length === 0) return code

  const minIndent = Math.min(
    ...nonEmptyLines.map(line => {
      const match = line.match(/^(\s*)/)
      return match ? match[1].length : 0
    })
  )

  // 移除最小缩进
  const processed = lines.map(line => {
    if (line.trim() === '') return ''
    return line.slice(minIndent)
  })

  return processed.join('\n')
}

// 创建JavaScript全局对象补全源
function createJavaScriptCompletions(context: CompletionContext): CompletionResult | null {
  const word = context.matchBefore(/\w*/)
  if (word === null || (word.from === word.to && !context.explicit)) {
    return null
  }

  // JavaScript 全局对象和方法
  const globalCompletions = [
    // Console API
    { label: 'console', type: 'variable', info: '控制台对象，用于调试输出' },
    snippetCompletion('console.log(${1})', {
      label: 'console.log',
      type: 'function',
      info: '输出信息到控制台'
    }),
    snippetCompletion('console.error(${1})', {
      label: 'console.error',
      type: 'function',
      info: '输出错误信息到控制台'
    }),
    snippetCompletion('console.warn(${1})', {
      label: 'console.warn',
      type: 'function',
      info: '输出警告信息到控制台'
    }),
    snippetCompletion('console.info(${1})', {
      label: 'console.info',
      type: 'function',
      info: '输出信息到控制台'
    }),

    // Window API
    { label: 'window', type: 'variable', info: '全局窗口对象' },
    snippetCompletion('alert(${1})', {
      label: 'alert',
      type: 'function',
      info: '显示警告对话框'
    }),
    snippetCompletion('confirm(${1})', {
      label: 'confirm',
      type: 'function',
      info: '显示确认对话框'
    }),
    snippetCompletion('prompt(${1})', {
      label: 'prompt',
      type: 'function',
      info: '显示输入对话框'
    }),

    // Timer functions
    snippetCompletion('setTimeout(${1}, ${2})', {
      label: 'setTimeout',
      type: 'function',
      info: '延迟执行函数'
    }),
    snippetCompletion('setInterval(${1}, ${2})', {
      label: 'setInterval',
      type: 'function',
      info: '定时重复执行函数'
    }),
    snippetCompletion('clearTimeout(${1})', {
      label: 'clearTimeout',
      type: 'function',
      info: '清除setTimeout定时器'
    }),
    snippetCompletion('clearInterval(${1})', {
      label: 'clearInterval',
      type: 'function',
      info: '清除setInterval定时器'
    }),

    // Global functions
    snippetCompletion('parseInt(${1})', {
      label: 'parseInt',
      type: 'function',
      info: '将字符串解析为整数'
    }),
    snippetCompletion('parseFloat(${1})', {
      label: 'parseFloat',
      type: 'function',
      info: '将字符串解析为浮点数'
    }),
    snippetCompletion('isNaN(${1})', {
      label: 'isNaN',
      type: 'function',
      info: '检查值是否为NaN'
    }),
    snippetCompletion('isFinite(${1})', {
      label: 'isFinite',
      type: 'function',
      info: '检查值是否为有限数'
    }),
    snippetCompletion('encodeURIComponent(${1})', {
      label: 'encodeURIComponent',
      type: 'function',
      info: '编码URI组件'
    }),
    snippetCompletion('decodeURIComponent(${1})', {
      label: 'decodeURIComponent',
      type: 'function',
      info: '解码URI组件'
    }),

    // JSON
    { label: 'JSON', type: 'variable', info: 'JSON对象，用于处理JSON数据' },
    snippetCompletion('JSON.parse(${1})', {
      label: 'JSON.parse',
      type: 'function',
      info: '解析JSON字符串'
    }),
    snippetCompletion('JSON.stringify(${1})', {
      label: 'JSON.stringify',
      type: 'function',
      info: '将对象转换为JSON字符串'
    }),

    // Math
    { label: 'Math', type: 'variable', info: '数学对象，提供数学常数和函数' },
    { label: 'Math.PI', type: 'property', info: '圆周率' },
    { label: 'Math.E', type: 'property', info: '自然对数的底数' },
    snippetCompletion('Math.abs(${1})', {
      label: 'Math.abs',
      type: 'function',
      info: '返回数的绝对值'
    }),
    snippetCompletion('Math.max(${1})', {
      label: 'Math.max',
      type: 'function',
      info: '返回最大值'
    }),
    snippetCompletion('Math.min(${1})', {
      label: 'Math.min',
      type: 'function',
      info: '返回最小值'
    }),
    snippetCompletion('Math.round(${1})', {
      label: 'Math.round',
      type: 'function',
      info: '四舍五入到最近的整数'
    }),
    snippetCompletion('Math.floor(${1})', {
      label: 'Math.floor',
      type: 'function',
      info: '向下取整'
    }),
    snippetCompletion('Math.ceil(${1})', {
      label: 'Math.ceil',
      type: 'function',
      info: '向上取整'
    }),
    snippetCompletion('Math.random()', {
      label: 'Math.random',
      type: 'function',
      info: '返回0到1之间的随机数'
    }),
    snippetCompletion('Math.pow(${1}, ${2})', {
      label: 'Math.pow',
      type: 'function',
      info: '返回x的y次幂'
    }),
    snippetCompletion('Math.sqrt(${1})', {
      label: 'Math.sqrt',
      type: 'function',
      info: '返回数的平方根'
    }),

    // Array methods
    { label: 'Array', type: 'variable', info: '数组构造函数' },
    snippetCompletion('Array.isArray(${1})', {
      label: 'Array.isArray',
      type: 'function',
      info: '检查值是否为数组'
    }),
    snippetCompletion('Array.from(${1})', {
      label: 'Array.from',
      type: 'function',
      info: '从类数组对象创建数组'
    }),

    // Object methods
    { label: 'Object', type: 'variable', info: '对象构造函数' },
    snippetCompletion('Object.keys(${1})', {
      label: 'Object.keys',
      type: 'function',
      info: '返回对象的键数组'
    }),
    snippetCompletion('Object.values(${1})', {
      label: 'Object.values',
      type: 'function',
      info: '返回对象的值数组'
    }),
    snippetCompletion('Object.entries(${1})', {
      label: 'Object.entries',
      type: 'function',
      info: '返回对象的键值对数组'
    }),
    snippetCompletion('Object.assign(${1}, ${2})', {
      label: 'Object.assign',
      type: 'function',
      info: '复制对象属性'
    })
  ]

  return {
    from: word.from,
    options: globalCompletions,
    validFor: /^\w*$/
  }
}

// 创建Python全局对象补全源
function createPythonCompletions(context: CompletionContext): CompletionResult | null {
  const word = context.matchBefore(/\w*/)
  if (word === null || (word.from === word.to && !context.explicit)) {
    return null
  }

  // Python 内置函数和对象（只包含语言包可能没有提供的）
  const pythonCompletions = [
    // 基本输入输出 - 使用 snippet 提供更好的体验
    snippetCompletion('print(${1})', {
      label: 'print',
      type: 'function',
      info: '输出内容到控制台'
    }),
    snippetCompletion('input(${1})', {
      label: 'input',
      type: 'function', 
      info: '从用户获取输入'
    }),

    // 类型转换函数
    snippetCompletion('int(${1})', {
      label: 'int',
      type: 'function',
      info: '转换为整数'
    }),
    snippetCompletion('float(${1})', {
      label: 'float',
      type: 'function',
      info: '转换为浮点数'
    }),
    snippetCompletion('str(${1})', {
      label: 'str',
      type: 'function',
      info: '转换为字符串'
    }),
    snippetCompletion('bool(${1})', {
      label: 'bool',
      type: 'function',
      info: '转换为布尔值'
    }),
    snippetCompletion('list(${1})', {
      label: 'list',
      type: 'function',
      info: '创建列表'
    }),
    snippetCompletion('tuple(${1})', {
      label: 'tuple',
      type: 'function',
      info: '创建元组'
    }),
    snippetCompletion('dict(${1})', {
      label: 'dict',
      type: 'function',
      info: '创建字典'
    }),
    snippetCompletion('set(${1})', {
      label: 'set',
      type: 'function',
      info: '创建集合'
    }),

    // 数学函数
    snippetCompletion('abs(${1})', {
      label: 'abs',
      type: 'function',
      info: '返回绝对值'
    }),
    snippetCompletion('max(${1})', {
      label: 'max',
      type: 'function',
      info: '返回最大值'
    }),
    snippetCompletion('min(${1})', {
      label: 'min',
      type: 'function',
      info: '返回最小值'
    }),
    snippetCompletion('sum(${1})', {
      label: 'sum',
      type: 'function',
      info: '返回序列的和'
    }),
    snippetCompletion('round(${1})', {
      label: 'round',
      type: 'function',
      info: '四舍五入'
    }),
    snippetCompletion('pow(${1}, ${2})', {
      label: 'pow',
      type: 'function',
      info: '返回x的y次幂'
    }),
    snippetCompletion('divmod(${1}, ${2})', {
      label: 'divmod',
      type: 'function',
      info: '返回商和余数'
    }),

    // 序列函数
    snippetCompletion('len(${1})', {
      label: 'len',
      type: 'function',
      info: '返回对象长度'
    }),
    snippetCompletion('range(${1})', {
      label: 'range',
      type: 'function',
      info: '生成数字序列'
    }),
    snippetCompletion('enumerate(${1})', {
      label: 'enumerate',
      type: 'function',
      info: '返回枚举对象'
    }),
    snippetCompletion('zip(${1})', {
      label: 'zip',
      type: 'function',
      info: '将多个序列打包'
    }),
    snippetCompletion('sorted(${1})', {
      label: 'sorted',
      type: 'function',
      info: '返回排序后的列表'
    }),
    snippetCompletion('reversed(${1})', {
      label: 'reversed',
      type: 'function',
      info: '返回反转的迭代器'
    }),
    snippetCompletion('filter(${1}, ${2})', {
      label: 'filter',
      type: 'function',
      info: '过滤序列'
    }),
    snippetCompletion('map(${1}, ${2})', {
      label: 'map',
      type: 'function',
      info: '对序列应用函数'
    }),

    // 对象检查函数
    snippetCompletion('type(${1})', {
      label: 'type',
      type: 'function',
      info: '返回对象类型'
    }),
    snippetCompletion('isinstance(${1}, ${2})', {
      label: 'isinstance',
      type: 'function',
      info: '检查对象是否为指定类型'
    }),
    snippetCompletion('hasattr(${1}, ${2})', {
      label: 'hasattr',
      type: 'function',
      info: '检查对象是否有指定属性'
    }),
    snippetCompletion('getattr(${1}, ${2})', {
      label: 'getattr',
      type: 'function',
      info: '获取对象属性'
    }),
    snippetCompletion('setattr(${1}, ${2}, ${3})', {
      label: 'setattr',
      type: 'function',
      info: '设置对象属性'
    }),
    snippetCompletion('dir(${1})', {
      label: 'dir',
      type: 'function',
      info: '返回对象的属性列表'
    }),
    snippetCompletion('vars(${1})', {
      label: 'vars',
      type: 'function',
      info: '返回对象的__dict__属性'
    }),
    snippetCompletion('id(${1})', {
      label: 'id',
      type: 'function',
      info: '返回对象的唯一标识符'
    }),

    // 其他常用函数
    snippetCompletion('help(${1})', {
      label: 'help',
      type: 'function',
      info: '获取帮助信息'
    }),
    snippetCompletion('exec(${1})', {
      label: 'exec',
      type: 'function',
      info: '执行Python代码'
    }),
    snippetCompletion('eval(${1})', {
      label: 'eval',
      type: 'function',
      info: '计算表达式'
    }),
    snippetCompletion('compile(${1}, ${2}, ${3})', {
      label: 'compile',
      type: 'function',
      info: '编译代码'
    }),
    snippetCompletion('globals()', {
      label: 'globals',
      type: 'function',
      info: '返回全局命名空间'
    }),
    snippetCompletion('locals()', {
      label: 'locals',
      type: 'function',
      info: '返回局部命名空间'
    }),

    // 逻辑运算符和关键字（语言包可能未完全提供）
    { label: 'and', type: 'keyword', info: '逻辑与运算符' },
    { label: 'or', type: 'keyword', info: '逻辑或运算符' },
    { label: 'not', type: 'keyword', info: '逻辑非运算符' },
    { label: 'is', type: 'keyword', info: '身份比较运算符' },
    { label: 'in', type: 'keyword', info: '成员运算符' },
    { label: 'nonlocal', type: 'keyword', info: '声明非局部变量' },
    { label: 'global', type: 'keyword', info: '声明全局变量' },
    snippetCompletion('lambda ${1}: ${2}', {
      label: 'lambda',
      type: 'keyword',
      info: '创建匿名函数'
    }),
    { label: 'yield', type: 'keyword', info: '生成器关键字' },
    { label: 'async', type: 'keyword', info: '异步函数关键字' },
    { label: 'await', type: 'keyword', info: '等待异步操作' },

    // 异常处理
    snippetCompletion('Exception(${1})', {
      label: 'Exception',
      type: 'class',
      info: '基础异常类'
    }),
    snippetCompletion('ValueError(${1})', {
      label: 'ValueError',
      type: 'class',
      info: '值错误异常'
    }),
    snippetCompletion('TypeError(${1})', {
      label: 'TypeError',
      type: 'class',
      info: '类型错误异常'
    }),
    snippetCompletion('IndexError(${1})', {
      label: 'IndexError',
      type: 'class',
      info: '索引错误异常'
    }),
    snippetCompletion('KeyError(${1})', {
      label: 'KeyError',
      type: 'class',
      info: '键错误异常'
    }),
    snippetCompletion('AttributeError(${1})', {
      label: 'AttributeError',
      type: 'class',
      info: '属性错误异常'
    }),
    snippetCompletion('NameError(${1})', {
      label: 'NameError',
      type: 'class',
      info: '名称错误异常'
    }),
    snippetCompletion('FileNotFoundError(${1})', {
      label: 'FileNotFoundError',
      type: 'class',
      info: '文件未找到异常'
    })
  ]

  return {
    from: word.from,
    options: pythonCompletions,
    validFor: /^\w*$/
  }
}

// 获取语言支持
function getLanguageSupport() {
  try {
    switch (props.lang) {
      case 'js':
      case 'javascript':
        return [
          javascript({
            jsx: false,
            typescript: false
          }),
          javascriptLanguage.data.of({
            autocomplete: createJavaScriptCompletions
          })
        ]
      case 'ts':
      case 'typescript':
        return [
          javascript({ typescript: true }),
          javascriptLanguage.data.of({
            autocomplete: createJavaScriptCompletions
          })
        ]
      case 'py':
      case 'python':
        return [
          python(),
          pythonLanguage.data.of({
            autocomplete: createPythonCompletions
          })
        ]
      case 'html':
        return html()
      case 'css':
        return css()
      case 'json':
        return json()
      default:
        return null
    }
  } catch (error) {
    console.warn(`Language support for ${props.lang} not available, using basic highlighting`)
    return null
  }
}

// 创建 Tab 键映射 - 使用官方推荐的方案
function createTabKeymap() {
  return keymap.of([
    { key: 'Tab', run: acceptCompletion },
    indentWithTab
  ])
}

// 创建编辑器扩展
function createEditorExtensions(isDark: boolean) {
  const languageSupport = getLanguageSupport()
  const tabKeymap = createTabKeymap()
  const tabSize = props.lang === 'py' || props.lang === 'python' ? 4 : 2

  const extensions = [
    basicSetup,
    EditorState.tabSize.of(tabSize),
    indentUnit.of(' '.repeat(tabSize)), // 明确设置缩进单位
    autocompletion({
      activateOnTyping: true,
      closeOnBlur: true,
      maxRenderedOptions: 10,
      defaultKeymap: true
    }),
    EditorView.theme({
      '&': {
        fontSize: '14px',
        border: 'none',
        outline: 'none',
        maxHeight: '600px'
      },
      '.cm-focused': {
        outline: 'none',
      },
      '.cm-editor': {
        borderRadius: '0'
      },
      '.cm-scroller': {
        fontFamily: 'var(--vp-font-family-mono)',
        lineHeight: '1.4',
        overflow: 'auto'
      },
      '.cm-content': {
        padding: '16px',
        minHeight: '100px'
      },
      '.cm-line': {
        paddingLeft: '0',
        paddingRight: '0'
      },
      // 隐藏行号
      '.cm-gutters': {
        display: 'none'
      },
      // 自定义自动补全样式
      '.cm-tooltip-autocomplete': {
        border: '1px solid var(--vp-c-divider)',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'var(--vp-c-bg-elv)',
        fontSize: '13px'
      },
      '.cm-completionLabel': {
        color: 'var(--vp-c-text-1)'
      },
      '.cm-completionDetail': {
        color: 'var(--vp-c-text-2)',
        fontSize: '12px'
      }
    }),
    EditorView.updateListener.of(update => {
      if (update.docChanged) {
        onCodeChange()
      }
    })
  ]

  // 只有可运行的代码块才添加 Tab 键映射，否则设为只读
  if (props.runnable) {
    extensions.push(tabKeymap)
  } else {
    extensions.push(EditorState.readOnly.of(true))
  }

  // 如果有语言支持，添加到扩展中
  if (languageSupport) {
    if (Array.isArray(languageSupport)) {
      extensions.splice(1, 0, ...languageSupport)  // 在 basicSetup 后插入数组
    } else {
      extensions.splice(1, 0, languageSupport)  // 在 basicSetup 后插入单个扩展
    }
  }

  // 根据主题模式添加相应的主题
  if (isDark) {
    extensions.push(vsCodeDark)
  } else {
    extensions.push(vsCodeLight)
  }

  return extensions
}

// 初始化 CodeMirror 编辑器
function initializeEditor(): void {
  if (!editorRef.value) return

  const initialDoc = processCode(props.code)
  const isDark = document.documentElement.classList.contains('dark')
  const extensions = createEditorExtensions(isDark)

  const state = EditorState.create({
    doc: initialDoc,
    extensions
  })

  editorView = new EditorView({
    state,
    parent: editorRef.value
  })

  isInitialized.value = true
}

// 监听主题变化
function handleThemeChange(): void {
  if (!editorView) return

  const isDark = document.documentElement.classList.contains('dark')
  const extensions = createEditorExtensions(isDark)

  // 使用重新配置而不是重新创建编辑器
  const currentDoc = editorView.state.doc.toString()

  const state = EditorState.create({
    doc: currentDoc,
    extensions
  })

  editorView.setState(state)
}

// 获取编辑器内容
function getEditorContent(): string {
  return editorView ? editorView.state.doc.toString() : ''
}

// 懒加载初始化函数
async function initializeLazyEditor(): Promise<void> {
  if (isInitialized.value) return

  await nextTick()
  initializeEditor()

  if (props.runnable && props.lang === 'py') {
    await initializePyodide()
  }

  setupThemeObserver()
}

// 设置主题变化观察器
function setupThemeObserver(): void {
  // 优化主题变化监听器 - 使用防抖
  let themeChangeTimeout: ReturnType<typeof setTimeout> | null = null

  const debouncedThemeChange = (): void => {
    if (themeChangeTimeout) {
      clearTimeout(themeChangeTimeout)
    }
    themeChangeTimeout = setTimeout(() => {
      handleThemeChange()
      themeChangeTimeout = null
    }, 100) // 100ms 防抖
  }

  const observer = new MutationObserver((mutations): void => {
    // 只在 class 属性真正改变时触发
    const hasClassChange = mutations.some(mutation =>
      mutation.type === 'attributes' &&
      mutation.attributeName === 'class' &&
      mutation.oldValue !== (mutation.target as Element).className
    )

    if (hasClassChange) {
      debouncedThemeChange()
    }
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
    attributeOldValue: true  // 记录旧值以便比较
  })

  // 保存观察器引用以便清理
  ; (window as any)._themeObserver = observer
}

// 设置交叉观察器
function setupIntersectionObserver(): void {
  if (!placeholderRef.value) return

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isInitialized.value) {
          // 元素进入视口，初始化编辑器
          initializeLazyEditor()
          // 停止观察，避免重复初始化
          if (intersectionObserver) {
            intersectionObserver.disconnect()
            intersectionObserver = null
          }
        }
      })
    },
    {
      // 提前 100px 开始加载，提升用户体验
      rootMargin: '100px 0px',
      threshold: 0.1
    }
  )

  intersectionObserver.observe(placeholderRef.value)
}

// 初始化代码内容
onMounted(async (): Promise<void> => {
  await nextTick()

  // 根据是否启用懒加载决定初始化方式
  if (props.lazy) {
    // 启用懒加载，设置交叉观察器
    setupIntersectionObserver()
  } else {
    // 不启用懒加载，直接初始化
    await initializeLazyEditor()
  }

  // 设置 Pyodide 全局事件监听（如果需要）
  if (props.runnable && props.lang === 'py') {
    const handlePyodideReady = (event: CustomEvent): void => {
      if (!pyodideReady.value) {
        pyodide = event.detail
        pyodideReady.value = true
      }
    }

    window.addEventListener('pyodideReady', handlePyodideReady as EventListener)
    // 保存事件监听器引用以便清理
    ; (window as any)._pyodideReadyListener = handlePyodideReady
  }
})

// 清理
onUnmounted((): void => {
  if (editorView) {
    editorView.destroy()
  }
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    intersectionObserver = null
  }
  if ((window as any)._themeObserver) {
    ; (window as any)._themeObserver.disconnect()
    delete (window as any)._themeObserver
  }
  if ((window as any)._pyodideReadyListener) {
    window.removeEventListener('pyodideReady', (window as any)._pyodideReadyListener as EventListener)
    delete (window as any)._pyodideReadyListener
  }
})

async function initializePyodide(): Promise<void> {
  try {
    // 检查是否已经加载完成
    if ((window as any).pyodide) {
      pyodide = (window as any).pyodide
      pyodideReady.value = true
      return
    }

    // 检查是否正在加载中
    if ((window as any).pyodideLoading) {
      // 如果正在加载，等待加载完成
      return new Promise((resolve) => {
        const handlePyodideReady = (event: CustomEvent): void => {
          pyodide = event.detail
          pyodideReady.value = true
          window.removeEventListener('pyodideReady', handlePyodideReady as EventListener)
          resolve()
        }

        window.addEventListener('pyodideReady', handlePyodideReady as EventListener)

        // 再次检查，避免竞态条件
        if ((window as any).pyodide) {
          pyodide = (window as any).pyodide
          pyodideReady.value = true
          window.removeEventListener('pyodideReady', handlePyodideReady as EventListener)
          resolve()
        }
      })
    }

    // 标记正在加载，防止重复加载
    ; (window as any).pyodideLoading = true

    // 动态加载 Pyodide
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/pyodide@0.27.7/pyodide.js'
    document.head.appendChild(script)

    script.onload = async (): Promise<void> => {
      try {
        pyodide = await (window as any).loadPyodide()
          ; (window as any).pyodide = pyodide // 全局缓存
          ; (window as any).pyodideLoading = false // 标记加载完成

        // 触发全局事件，通知所有等待的组件
        window.dispatchEvent(new CustomEvent('pyodideReady', { detail: pyodide }))

        pyodideReady.value = true
        console.log('Pyodide 加载完成')
      } catch (error) {
        console.error('Pyodide 加载失败:', error)
          ; (window as any).pyodideLoading = false
        output.value = 'Python 环境加载失败'
        hasError.value = true
      }
    }

    script.onerror = (): void => {
      console.error('Pyodide 脚本加载失败')
        ; (window as any).pyodideLoading = false
      output.value = 'Python 环境加载失败'
      hasError.value = true
    }
  } catch (error) {
    console.error('无法加载 Pyodide:', error)
      ; (window as any).pyodideLoading = false
  }
}

// 获取按钮文本
function getButtonText(): string {
  if (isRunning.value) return '运行中...'
  if (props.lang === 'py' && !pyodideReady.value) return '加载中...'
  return '运行'
}

// 获取简化的按钮文本
function getSimpleButtonText(): string {
  if (isRunning.value) return '运行中'
  if (props.lang === 'py' && !pyodideReady.value) return '加载中'
  return '运行'
}

// 运行代码
async function runCode(): Promise<void> {
  if (isRunning.value) return
  if (props.lang === 'py' && !pyodideReady.value) return

  isRunning.value = true
  hasError.value = false
  output.value = ''
  showOutput.value = true  // 显示输出部分

  try {
    if (props.lang === 'js') {
      await runJavaScript()
    } else {
      await runPython()
    }
  } finally {
    isRunning.value = false
  }
}

// 执行 JavaScript 代码
async function runJavaScript(): Promise<void> {
  try {
    const code = getEditorContent()

    // 创建一个沙盒来捕获 console 输出
    const originalConsole = {
      log: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error,
      debug: console.debug
    }
    const outputs: string[] = []

    const formatArgs = (args: any[]) => args.map(arg =>
      typeof arg === 'object' ? inspect(arg) : String(arg)
    ).join(' ')

    const captureOutput = (...args: any[]): void => {
      outputs.push(formatArgs(args))
    }

    console.log = captureOutput
    console.info = captureOutput
    console.warn = captureOutput
    console.error = captureOutput
    console.debug = captureOutput

    // 执行代码
    const result = eval(code)

    // 如果代码有返回值且没有console输出，显示返回值
    if (result !== undefined && outputs.length === 0) {
      outputs.push(typeof result === 'object' ? inspect(result) : String(result))
    }

    output.value = outputs.length > 0 ? outputs.join('\n') : '代码执行完成，无输出'

    // 恢复原始的 console
    Object.assign(console, originalConsole)

  } catch (error) {
    hasError.value = true
    output.value = `错误: ${(error as Error).message}`
  }
}

// 执行 Python 代码
async function runPython(): Promise<void> {
  try {
    const code = getEditorContent()

    // 重定向 Python 的标准输出和错误
    await pyodide.runPython(`
import sys
import traceback
from io import StringIO

# 重定向输出
stdout_capture = StringIO()
stderr_capture = StringIO()
sys.stdout = stdout_capture
sys.stderr = stderr_capture

# 全局变量用于存储结果
exec_result = {"error": False, "message": ""}
`)

    // 设置用户代码到 Pyodide 环境
    pyodide.globals.set("user_code", code)

    // 执行用户代码并捕获错误
    await pyodide.runPython(`
try:
    exec(user_code)
    stdout_result = stdout_capture.getvalue()
    stderr_result = stderr_capture.getvalue()
    
    if stderr_result:
        exec_result["error"] = True
        exec_result["message"] = stderr_result
    else:
        exec_result["error"] = False
        exec_result["message"] = stdout_result or "代码执行完成，无输出"
except Exception as e:
    # 获取简洁的错误信息（类似 JavaScript Error.message）
    error_type = type(e).__name__
    error_msg = str(e)
    
    # 组合简洁的错误信息
    if error_msg:
        simple_error = f"{error_type}: {error_msg}"
    else:
        simple_error = error_type
    
    exec_result["error"] = True
    exec_result["message"] = simple_error
`)

    // 获取执行结果
    const result = pyodide.globals.get("exec_result").toJs()

    if (result.error) {
      hasError.value = true
      output.value = `错误：${result.message}`
    } else {
      output.value = result.message
    }

  } catch (error) {
    hasError.value = true

    // 改进 Pyodide 错误信息显示
    let errorMessage = ''

    console.log('Python error object:', error) // 调试信息

    // Pyodide 错误通常包含更详细的信息
    if (error && typeof error === 'object') {
      // 优先尝试获取 Pyodide 特有的错误信息
      if (error.message) {
        errorMessage = error.message
      } else if (error.toString && typeof error.toString === 'function') {
        errorMessage = error.toString()
      } else {
        // 尝试获取错误对象的所有可能属性
        const errorKeys = Object.keys(error)
        console.log('Error keys:', errorKeys)

        if (errorKeys.length > 0) {
          errorMessage = JSON.stringify(error, null, 2)
        } else {
          errorMessage = String(error)
        }
      }
    } else {
      errorMessage = String(error)
    }

    // 清理错误信息格式
    if (errorMessage.includes('PythonError:')) {
      // 移除 PythonError: 前缀，保留实际错误信息
      errorMessage = errorMessage.replace(/^.*?PythonError:\s*/, '')
    }

    // 如果仍然是空的或无用信息
    if (!errorMessage || errorMessage.trim() === '' || errorMessage === '[object Object]') {
      errorMessage = '代码执行时发生错误，请检查语法是否正确'
    }

    output.value = errorMessage
  }
}

// 代码变化处理 - 优化性能
let codeChangeTimeout: ReturnType<typeof setTimeout> | null = null

function onCodeChange(): void {
  // 使用防抖避免频繁更新
  if (codeChangeTimeout) {
    clearTimeout(codeChangeTimeout)
  }

  codeChangeTimeout = setTimeout(() => {
    output.value = ''
    hasError.value = false
    showOutput.value = false
    codeChangeTimeout = null
  }, 50)
}

// 重置代码到初始状态
function resetCode(): void {
  if (!editorView) return

  const initialCode = processCode(props.code)
  const transaction = editorView.state.update({
    changes: {
      from: 0,
      to: editorView.state.doc.length,
      insert: initialCode
    }
  })

  editorView.dispatch(transaction)

  // 重置输出状态
  output.value = ''
  hasError.value = false
  showOutput.value = false
}

// 关闭输出面板
function closeOutput(): void {
  showOutput.value = false
}

// 复制代码到剪贴板
async function copyCode(): Promise<void> {
  try {
    // 如果编辑器未初始化，复制原始代码
    const code = isInitialized.value ? getEditorContent() : processCode(props.code)
    await navigator.clipboard.writeText(code)

    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (error) {
    console.error('复制失败:', error)
    // 降级到传统方法
    try {
      const code = isInitialized.value ? getEditorContent() : processCode(props.code)
      const textArea = document.createElement('textarea')
      textArea.value = code
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)

      copySuccess.value = true
      setTimeout(() => {
        copySuccess.value = false
      }, 2000)
    } catch (fallbackError) {
      console.error('复制失败:', fallbackError)
    }
  }
}
</script>

<style scoped>
.interactive-code :deep(.cm-editor) {
  color: var(--vp-c-text-1) !important;
}

.interactive-code :deep(.cm-content) {
  color: var(--vp-c-text-1) !important;
}

.interactive-code :deep(.cm-focused) {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}

.interactive-code :deep(.cm-line) {
  background-color: transparent !important;
  color: var(--vp-c-text-1) !important;
}

.interactive-code :deep(.cm-gutters) {
  display: none !important;
}

.interactive-code :deep(.cm-editor.cm-focused) {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}

.interactive-code :deep(.cm-cursor) {
  border-left-color: var(--vp-c-text-1) !important;
}

/* 只读代码块样式 */

/* 只读状态下隐藏光标 */
.readonly-code :deep(.cm-cursor) {
  display: none !important;
}
</style>