<template>
  <div class="playground-editor fixed top-[64px] left-0 right-0 bottom-0 flex flex-col bg-white dark:bg-gray-900">
    <!-- 顶部工具栏 -->
    <div class="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <div class="px-4 py-3 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="lang-selector-container text-xl">
            <select v-model="selectedLang" 
                    class="language-selector text-lg font-semibold bg-transparent border-none outline-none cursor-pointer text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              <option value="py">Python</option>
              <option value="js">JavaScript</option>
            </select>
            <svg class="selector-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          <div class="text-xl text-gray-900 dark:text-gray-100">Playground</div>
        </div>
        <div class="flex items-center gap-2">
          <button @click="copyCode"
            class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-1.5 rounded-md text-sm cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-1"
            title="复制代码">
            <CopyIcon v-if="!copySuccess" :size="16" />
            <CheckIcon v-else :size="16" />
            <span>{{ copySuccess ? '已复制' : '复制' }}</span>
          </button>
                     <button @click="() => runCode(selectedLang)"
             class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
             :disabled="isRunning || (selectedLang === 'py' && !pyodideReady)"
             :title="getButtonText(selectedLang)">
             <LoaderIcon v-if="isRunning || (selectedLang === 'py' && !pyodideReady)" :size="16" class="animate-spin" />
             <PlayIcon v-else :size="16" />
             <span>{{ getSimpleButtonText(selectedLang) }}</span>
           </button>
        </div>
      </div>
    </div>

    <!-- 主要编辑区域 -->
    <div class="flex-1 flex overflow-hidden">
      <!-- 左侧代码编辑器 -->
      <div class="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-700">
        <div class="flex-1 relative">
          <!-- 懒加载占位符 -->
          <div v-if="!isInitialized" 
               ref="placeholderRef"
               class="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <LoaderIcon :size="16" class="animate-spin" />
              <span>正在加载编辑器...</span>
            </div>
          </div>
          <!-- 实际编辑器 -->
          <div v-show="isInitialized" ref="editorRef" class="absolute inset-0"></div>
        </div>
      </div>

      <!-- 右侧输出区域 -->
      <div class="w-96 flex flex-col bg-gray-50 dark:bg-gray-800">
        <div class="h-[40px] px-4 flex justify-between items-center bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <span class="text-sm text-gray-600 dark:text-gray-400">输出结果</span>
          <button v-if="output" @click="clearOutput"
            class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1 rounded text-xs transition-all duration-200"
            title="清空输出">
            <XIcon :size="14" />
          </button>
        </div>
        <div class="flex-1 overflow-auto">
          <pre v-if="output"
            class="m-0 p-4 font-mono text-sm leading-relaxed text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words h-full"
            :class="{ 'text-red-600 dark:text-red-400': hasError }">{{ output }}</pre>
          <div v-else class="p-4 text-gray-500 dark:text-gray-400 text-sm">
            点击运行按钮查看结果
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, onUnmounted, watch, type Ref } from 'vue'
import { PlayIcon, LoaderIcon, CopyIcon, CheckIcon, XIcon } from 'lucide-vue-next'
import { useCodeEditor } from '../composables/useCodeEditor'

const placeholderRef: Ref<HTMLElement | null> = ref(null)
const selectedLang: Ref<string> = ref('py')

// 代码变化时的回调 - 重置输出
const onCodeChange = () => {
  output.value = ''
  hasError.value = false
}

// 使用 composable
const {
  editorRef,
  output,
  hasError,
  isRunning,
  pyodideReady,
  copySuccess,
  isInitialized,
  initializeEditor,
  updateEditorLanguage,
  handleThemeChange,
  getEditorContent,
  initializePyodide,
  runCode,
  copyCode,
  getButtonText,
  getSimpleButtonText,
  destroy
} = useCodeEditor({ runnable: true, onCodeChange })

// 默认代码模板
const defaultCode = computed(() => {
  if (selectedLang.value === 'py') {
    return `# 欢迎使用 Python Playground
# 你可以在这里编写和运行 Python 代码

print("Hello, Python!")

# 试试一些基本操作
name = "Python"
version = 3.12
print(f"我正在学习 {name} {version}")

# 创建一个简单的列表
fruits = ["苹果", "香蕉", "橘子"]
for fruit in fruits:
    print(f"我喜欢 {fruit}")
`
  } else {
    return `// 欢迎使用 JavaScript Playground
// 你可以在这里编写和运行 JavaScript 代码

console.log("Hello, JavaScript!")

// 试试一些基本操作
const name = "JavaScript"
const year = 2024
console.log(\`我正在学习 \${name} - \${year}\`)

// 创建一个简单的数组
const fruits = ["苹果", "香蕉", "橘子"]
fruits.forEach(fruit => {
    console.log(\`我喜欢 \${fruit}\`)
})
`
  }
})

// 清空输出
function clearOutput(): void {
  output.value = ''
  hasError.value = false
}

// playground 专用主题配置
const playgroundTheme = {
  '&': {
    fontSize: '14px',
    height: '100%'
  },
  '.cm-editor': {
    height: '100%'
  },
  '.cm-scroller': {
    // lineHeight: '1.5',
  },
  '.cm-content': {
    minHeight: '100%',
    padding: '12px 0'
  },
  '.cm-gutters': {
    display: 'flex', // 覆盖默认的 display: 'none'，显示行号
    background: 'transparent',
    border: 'none',
    paddingRight: '0'
  },
  '.cm-lineNumbers': {
    color: '#6b7280',
    fontSize: '13px'
  },
  '.cm-lineNumbers .cm-gutterElement': {
    textAlign: 'right',
    minWidth: '40px',
    lineHeight: '22px'
  }
}

// 监听语言变化
watch(selectedLang, (newLang) => {
  updateEditorLanguage(newLang, defaultCode.value, playgroundTheme)
  
  // 切换语言时清空输出
  output.value = ''
  hasError.value = false
})

onMounted(async (): Promise<void> => {
  await nextTick()
  
  // 初始化编辑器
  initializeEditor(selectedLang.value, defaultCode.value, playgroundTheme)
  
  // 初始化 Pyodide
  await initializePyodide()

  // 监听主题变化
  const observer = new MutationObserver(() => {
    handleThemeChange(selectedLang.value, playgroundTheme)
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

onUnmounted((): void => {
  destroy()
})
</script> 
<style scoped>
.playground-editor :deep(.cm-editor) {
  color: var(--vp-c-text-1) !important;
}

.playground-editor :deep(.cm-content) {
  color: var(--vp-c-text-1) !important;
}

.playground-editor :deep(.cm-editor.cm-focused) {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}

/* 语言选择器容器 */
.lang-selector-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.lang-selector-container:hover {
  background: rgba(59, 130, 246, 0.1);
}

html.dark .lang-selector-container:hover {
  background: rgba(96, 165, 250, 0.1);
}

/* 自定义语言选择器样式 */
.language-selector {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  transition: color 0.2s ease;
}

.language-selector:focus {
  outline: none;
}

/* 选择器箭头图标 */
.selector-arrow {
  width: 16px;
  height: 16px;
  color: #6b7280;
  pointer-events: none;
  transition: all 0.2s ease;
  transform: translateY(0);
}

html.dark .selector-arrow {
  color: #9ca3af;
}

/* 悬停和焦点状态 */
.lang-selector-container:hover .selector-arrow {
  color: rgb(59 130 246);
  transform: translateY(1px);
}

.language-selector:focus ~ .selector-arrow,
.lang-selector-container:hover .language-selector {
  color: rgb(59 130 246);
}

html.dark .lang-selector-container:hover .selector-arrow,
html.dark .language-selector:focus ~ .selector-arrow {
  color: rgb(96 165 250);
}

html.dark .lang-selector-container:hover .language-selector {
  color: rgb(96 165 250);
}

/* 行号在暗色主题下的样式 */
html.dark .playground-editor :deep(.cm-lineNumbers) {
  color: #9ca3af;
}

html.dark .playground-editor :deep(.cm-gutters) {
  background: transparent;
}

/* 选择器下拉选项的样式 */
.language-selector option {
  background: white;
  color: #374151;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
}

html.dark .language-selector option {
  background: #374151;
  color: #f9fafb;
}
</style> 