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
          <button v-if="runnable" @click="() => customRunCode(lang)"
            class="text-current px-2 py-1.5 rounded-md text-xs cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            :class="[colorTheme.hover]" :disabled="isRunning || (lang === 'py' && !pyodideReady)"
            :title="getButtonText(lang)">
            <LoaderIcon v-if="isRunning || (lang === 'py' && !pyodideReady)" :size="14" class="animate-spin" />
            <PlayIcon v-else :size="14" />
            <span class="text-xs">{{ getSimpleButtonText(lang) }}</span>
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
import { ref, computed, nextTick, onMounted, onUnmounted, type Ref } from 'vue'
import { PlayIcon, LoaderIcon, RotateCcwIcon, CopyIcon, CheckIcon, XIcon } from 'lucide-vue-next'
import { useCodeEditor } from '../composables/useCodeEditor'

interface Props {
  lang: string
  code?: string
  title?: string
  runnable?: boolean
  lazy?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  title: '',
  runnable: false,
  lazy: false
})

// 响应式数据
const placeholderRef: Ref<HTMLElement | null> = ref(null)
const showOutput: Ref<boolean> = ref(false)
let intersectionObserver: IntersectionObserver | null = null

// 代码变化处理
const onCodeChange = () => {
  output.value = ''
  hasError.value = false
  showOutput.value = false
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
  handleThemeChange,
  getEditorContent,
  initializePyodide,
  runCode,
  copyCode,
  getButtonText,
  getSimpleButtonText,
  destroy
} = useCodeEditor({ runnable: props.runnable, onCodeChange })

// 计算属性
const computedTitle = computed((): string => {
  if (props.title) return props.title

  const langNames: Record<string, string> = {
    js: 'JavaScript',
    ts: 'TypeScript',
    py: 'Python',
    html: 'HTML',
    css: 'CSS',
    json: 'JSON'
  }

  return langNames[props.lang] || props.lang.toUpperCase()
})

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
  } else {
    return {
      text: 'text-gray-600 dark:text-gray-400',
      hover: 'hover:bg-gray-50 hover:dark:bg-gray-700/50'
    }
  }
})

// 处理代码内容
function processCode(code: string): string {
  if (!code) return ''

  const lines = code.split('\n')

  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift()
  }

  if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop()
  }

  if (lines.length === 0) return ''

  const nonEmptyLines = lines.filter(line => line.trim() !== '')
  if (nonEmptyLines.length === 0) return code

  const minIndent = Math.min(
    ...nonEmptyLines.map(line => {
      const match = line.match(/^(\s*)/)
      return match ? match[1].length : 0
    })
  )

  const processed = lines.map(line => {
    if (line.trim() === '') return ''
    return line.slice(minIndent)
  })

  return processed.join('\n')
}

// 懒加载初始化
async function initializeLazyEditor(): Promise<void> {
  if (isInitialized.value) return

  await nextTick()
  
  const processedCode = processCode(props.code)
  initializeEditor(props.lang, processedCode, {
    maxHeight: '600px'
  })

  if (props.runnable && props.lang === 'py') {
    await initializePyodide()
  }

  setupThemeObserver()
}

// 设置主题观察器
function setupThemeObserver(): void {
  let themeChangeTimeout: ReturnType<typeof setTimeout> | null = null

  const debouncedThemeChange = (): void => {
    if (themeChangeTimeout) {
      clearTimeout(themeChangeTimeout)
    }
    themeChangeTimeout = setTimeout(() => {
      handleThemeChange(props.lang, { maxHeight: '600px' })
      themeChangeTimeout = null
    }, 100)
  }

  const observer = new MutationObserver((mutations): void => {
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
    attributeOldValue: true
  })
}

// 设置交叉观察器
function setupIntersectionObserver(): void {
  if (!placeholderRef.value) return

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isInitialized.value) {
          initializeLazyEditor()
          if (intersectionObserver) {
            intersectionObserver.disconnect()
            intersectionObserver = null
          }
        }
      })
    },
    {
      rootMargin: '100px 0px',
      threshold: 0.1
    }
  )

  intersectionObserver.observe(placeholderRef.value)
}

// 重置代码
function resetCode(): void {
  const processedCode = processCode(props.code)
  
  // 先销毁现有编辑器
  destroy()
  
  // 重新初始化编辑器
  initializeEditor(props.lang, processedCode, {
    maxHeight: '600px'
  })

  output.value = ''
  hasError.value = false
  showOutput.value = false
}

// 关闭输出
function closeOutput(): void {
  showOutput.value = false
}

// 覆盖运行函数以显示输出
const originalRunCode = runCode
const customRunCode = async (lang: string) => {
  await originalRunCode(lang)
  showOutput.value = true
}

onMounted(async (): Promise<void> => {
  await nextTick()

  if (props.lazy) {
    setupIntersectionObserver()
  } else {
    await initializeLazyEditor()
  }
})

onUnmounted((): void => {
  destroy()
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    intersectionObserver = null
  }
})
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

.readonly-code :deep(.cm-cursor) {
  display: none !important;
}
</style> 