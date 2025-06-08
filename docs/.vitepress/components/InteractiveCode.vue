<template>
  <div class="interactive-code" :class="`lang-${lang}`">
    <div class="code-header">
      <div class="language-tag" :class="lang">
        <span>{{ computedTitle }}</span>
        <button @click="runCode" class="run-btn" :disabled="isRunning || (lang === 'py' && !pyodideReady)">
          {{ getButtonText() }}
        </button>
      </div>
    </div>
    
    <div class="code-content">
      <textarea
        v-model="editableCode"
        class="code-editor"
        :placeholder="placeholder"
        spellcheck="false"
        @input="onCodeChange"
      ></textarea>
      
      <div class="output-section">
        <div class="output-header">输出结果：</div>
        <pre class="output-content" :class="{ error: hasError }">{{ output || '点击运行查看结果' }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  lang: {
    type: String,
    required: true,
    validator: (value) => ['js', 'py'].includes(value)
  },
  code: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})

// 响应式数据
const editableCode = ref('')
const output = ref('')
const hasError = ref(false)
const isRunning = ref(false)
const pyodideReady = ref(false)

let pyodide = null

// 计算属性
const placeholder = computed(() => {
  return props.lang === 'js' 
    ? '输入 JavaScript 代码...' 
    : '输入 Python 代码...'
})

const computedTitle = computed(() => {
  if (props.title) return props.title
  return props.lang === 'js' ? 'JavaScript' : 'Python'
})

// 处理代码内容 - 支持模板字符串的自动格式化
function processCode(code) {
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

// 初始化代码内容
onMounted(async () => {
  editableCode.value = processCode(props.code)
  
  if (props.lang === 'py') {
    await initializePyodide()
  }
})

async function initializePyodide() {
  try {
    // 检查是否已经加载过
    if (window.pyodide) {
      pyodide = window.pyodide
      pyodideReady.value = true
      return
    }

    // 动态加载 Pyodide
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/pyodide@0.27.7/pyodide.js'
    document.head.appendChild(script)
    
    script.onload = async () => {
      try {
        pyodide = await loadPyodide()
        window.pyodide = pyodide // 全局缓存
        pyodideReady.value = true
        console.log('Pyodide 加载完成')
      } catch (error) {
        console.error('Pyodide 加载失败:', error)
        output.value = 'Python 环境加载失败'
        hasError.value = true
      }
    }
  } catch (error) {
    console.error('无法加载 Pyodide:', error)
  }
}

// 获取按钮文本
function getButtonText() {
  if (isRunning.value) return '运行中...'
  if (props.lang === 'py' && !pyodideReady.value) return '加载中...'
  return '▶ 运行'
}

// 运行代码
async function runCode() {
  if (isRunning.value) return
  if (props.lang === 'py' && !pyodideReady.value) return
  
  isRunning.value = true
  hasError.value = false
  output.value = ''
  
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
async function runJavaScript() {
  try {
    // 创建一个沙盒来捕获 console.log 输出
    const originalLog = console.log
    const originalError = console.error
    const outputs = []
    
    console.log = (...args) => {
      outputs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '))
    }
    
    console.error = (...args) => {
      outputs.push('ERROR: ' + args.map(arg => String(arg)).join(' '))
    }
    
    // 执行代码
    const result = eval(editableCode.value)
    
    // 如果代码有返回值且没有console输出，显示返回值
    if (result !== undefined && outputs.length === 0) {
      outputs.push(String(result))
    }
    
    output.value = outputs.length > 0 ? outputs.join('\n') : '代码执行完成，无输出'
    
    // 恢复原始的 console
    console.log = originalLog
    console.error = originalError
    
  } catch (error) {
    hasError.value = true
    output.value = `错误: ${error.message}`
  }
}

// 执行 Python 代码
async function runPython() {
  try {
    // 重定向 Python 的标准输出
    await pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`)
    
    // 执行用户代码
    await pyodide.runPython(editableCode.value)
    
    // 获取输出
    const stdout = await pyodide.runPython('sys.stdout.getvalue()')
    const stderr = await pyodide.runPython('sys.stderr.getvalue()')
    
    if (stderr) {
      hasError.value = true
      output.value = `错误: ${stderr}`
    } else {
      output.value = stdout || '代码执行完成，无输出'
    }
    
  } catch (error) {
    hasError.value = true
    output.value = `错误: ${error.message}`
  }
}

// 代码变化处理
function onCodeChange() {
  output.value = ''
  hasError.value = false
}
</script>

<style scoped>
.interactive-code {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
  margin: 16px 0;
  font-family: var(--vp-font-family-base);
}

.code-header {
  background-color: var(--vp-c-bg-mute);
  border-bottom: 1px solid var(--vp-c-border);
}

.language-tag {
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.language-tag.js {
  background-color: #f7df1e20;
  color: #f7df1e;
}

.language-tag.py {
  background-color: #3776ab20;
  color: #3776ab;
}

.run-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid currentColor;
  color: inherit;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
}

.run-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.run-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.code-content {
  display: flex;
  flex-direction: column;
}

.code-editor {
  min-height: 200px;
  padding: 16px;
  border: none;
  background-color: var(--vp-code-block-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  line-height: 1.4;
  resize: vertical;
  outline: none;
  white-space: pre;
  overflow-wrap: normal;
}

.code-editor:focus {
  background-color: var(--vp-c-bg-soft);
}

.code-editor::placeholder {
  color: var(--vp-c-text-3);
  font-style: italic;
}

.output-section {
  border-top: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg-alt);
}

.output-header {
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-mute);
  border-bottom: 1px solid var(--vp-c-border);
}

.output-content {
  margin: 0;
  padding: 12px 16px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.4;
  color: var(--vp-c-text-1);
  background-color: transparent;
  min-height: 60px;
  white-space: pre-wrap;
  word-break: break-word;
}

.output-content.error {
  color: var(--vp-c-danger-1);
}

/* 语言特定样式 */
.lang-js .code-editor {
  border-left: 3px solid #f7df1e;
}

.lang-py .code-editor {
  border-left: 3px solid #3776ab;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .language-tag {
    flex-direction: column;
    gap: 4px;
    padding: 12px 16px;
  }
  
  .code-editor {
    min-height: 150px;
  }
}

/* 暗色模式适配 */
.dark .language-tag.js {
  background-color: #f7df1e15;
  color: #f7df1e;
}

.dark .language-tag.py {
  background-color: #3776ab15;
  color: #4a9eff;
}

.dark .run-btn {
  background: rgba(255, 255, 255, 0.1);
}

.dark .run-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

.dark .lang-js .code-editor {
  border-left-color: #f7df1e;
}

.dark .lang-py .code-editor {
  border-left-color: #4a9eff;
}
</style> 