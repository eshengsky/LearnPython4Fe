import { ref, computed, nextTick, onMounted, onUnmounted, type Ref } from 'vue'
import { EditorView, keymap } from '@codemirror/view'
import { indentWithTab } from '@codemirror/commands'
import { EditorState } from '@codemirror/state'
import { basicSetup } from 'codemirror'
import { autocompletion, CompletionContext, CompletionResult, snippetCompletion, acceptCompletion } from '@codemirror/autocomplete'
import { javascript, javascriptLanguage } from '@codemirror/lang-javascript'
import { python, pythonLanguage } from '@codemirror/lang-python'
import { indentUnit } from '@codemirror/language'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { json } from '@codemirror/lang-json'
import { vsCodeLight } from '@fsegurai/codemirror-theme-vscode-light'
import { vsCodeDark } from '@fsegurai/codemirror-theme-vscode-dark'
import inspect from 'object-inspect'

interface UseCodeEditorOptions {
  initialCode?: string
  lang?: string
  runnable?: boolean
  onCodeChange?: () => void
}

export function useCodeEditor(options: UseCodeEditorOptions = {}) {
  // 响应式数据
  const editorRef: Ref<HTMLElement | null> = ref(null)
  const output: Ref<string> = ref('')
  const hasError: Ref<boolean> = ref(false)
  const isRunning: Ref<boolean> = ref(false)
  const pyodideReady: Ref<boolean> = ref(false)
  const copySuccess: Ref<boolean> = ref(false)
  const isInitialized: Ref<boolean> = ref(false)

  let pyodide: any = null
  let editorView: EditorView | null = null

  // 创建JavaScript补全
  function createJavaScriptCompletions(context: CompletionContext): CompletionResult | null {
    const word = context.matchBefore(/\w*/)
    if (word === null || (word.from === word.to && !context.explicit)) {
      return null
    }

    const globalCompletions = [
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
      { label: 'Math', type: 'variable', info: '数学对象，提供数学常数和函数' },
      snippetCompletion('Math.random()', {
        label: 'Math.random',
        type: 'function',
        info: '返回0到1之间的随机数'
      }),
      snippetCompletion('Math.floor(${1})', {
        label: 'Math.floor',
        type: 'function',
        info: '向下取整'
      }),
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
    ]

    return {
      from: word.from,
      options: globalCompletions,
      validFor: /^\w*$/
    }
  }

  // 创建Python补全
  function createPythonCompletions(context: CompletionContext): CompletionResult | null {
    const word = context.matchBefore(/\w*/)
    if (word === null || (word.from === word.to && !context.explicit)) {
      return null
    }

    const pythonCompletions = [
      snippetCompletion('print(${1})', {
        label: 'print',
        type: 'function',
        info: '输出内容到控制台'
      }),
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
      snippetCompletion('int(${1})', {
        label: 'int',
        type: 'function',
        info: '转换为整数'
      }),
      snippetCompletion('str(${1})', {
        label: 'str',
        type: 'function',
        info: '转换为字符串'
      }),
      snippetCompletion('list(${1})', {
        label: 'list',
        type: 'function',
        info: '创建列表'
      }),
    ]

    return {
      from: word.from,
      options: pythonCompletions,
      validFor: /^\w*$/
    }
  }

  // 获取语言支持
  function getLanguageSupport(lang: string) {
    try {
      switch (lang) {
        case 'js':
        case 'javascript':
          return [
            javascript({ jsx: false, typescript: false }),
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
      console.warn(`Language support for ${lang} not available`)
      return null
    }
  }

  // 深度合并主题对象
  function deepMergeTheme(defaultTheme: any, customTheme: any): any {
    const result = { ...defaultTheme }
    
    for (const key in customTheme) {
      if (customTheme[key] && typeof customTheme[key] === 'object' && !Array.isArray(customTheme[key])) {
        result[key] = {
          ...defaultTheme[key],
          ...customTheme[key]
        }
      } else {
        result[key] = customTheme[key]
      }
    }
    
    return result
  }

  // 创建编辑器扩展
  function createEditorExtensions(lang: string, isDark: boolean, customTheme: any = {}) {
    const languageSupport = getLanguageSupport(lang)
    const tabKeymap = keymap.of([
      { key: 'Tab', run: acceptCompletion },
      indentWithTab
    ])

    const defaultTheme = {
      '&': {
        fontSize: '14px',
        border: 'none',
        outline: 'none'
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
      '.cm-gutters': {
        display: 'none'
      }
    }

    const mergedTheme = deepMergeTheme(defaultTheme, customTheme)

    const extensions = [
      basicSetup,
      EditorState.tabSize.of(4),
      indentUnit.of('    '),
      autocompletion({
        activateOnTyping: true,
        closeOnBlur: true,
        maxRenderedOptions: 10,
        defaultKeymap: true
      }),
      EditorView.theme(mergedTheme),
      EditorView.updateListener.of(update => {
        if (update.docChanged && options.onCodeChange) {
          options.onCodeChange()
        }
      })
    ]

    // 只有可运行的代码块才添加 Tab 键映射，否则设为只读
    if (options.runnable) {
      extensions.push(tabKeymap)
    } else {
      extensions.push(EditorState.readOnly.of(true))
    }

    if (languageSupport) {
      if (Array.isArray(languageSupport)) {
        extensions.splice(1, 0, ...languageSupport)
      } else {
        extensions.splice(1, 0, languageSupport)
      }
    }

    if (isDark) {
      extensions.push(vsCodeDark)
    } else {
      extensions.push(vsCodeLight)
    }

    return extensions
  }

  // 初始化编辑器
  function initializeEditor(lang: string, initialCode: string, customTheme: any = {}) {
    if (!editorRef.value) return

    const isDark = document.documentElement.classList.contains('dark')
    const extensions = createEditorExtensions(lang, isDark, customTheme)

    const state = EditorState.create({
      doc: initialCode,
      extensions
    })

    editorView = new EditorView({
      state,
      parent: editorRef.value
    })

    isInitialized.value = true
  }

  // 更新编辑器语言
  function updateEditorLanguage(lang: string, newCode?: string, customTheme: any = {}) {
    if (!editorView) return

    const isDark = document.documentElement.classList.contains('dark')
    const extensions = createEditorExtensions(lang, isDark, customTheme)
    const currentDoc = newCode !== undefined ? newCode : editorView.state.doc.toString()

    const state = EditorState.create({
      doc: currentDoc,
      extensions
    })

    editorView.setState(state)
  }

  // 监听主题变化
  function handleThemeChange(lang: string, customTheme: any = {}) {
    if (!editorView) return

    const isDark = document.documentElement.classList.contains('dark')
    const extensions = createEditorExtensions(lang, isDark, customTheme)
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

  // 初始化 Pyodide
  async function initializePyodide(): Promise<void> {
    if ((window as any).pyodide) {
      pyodide = (window as any).pyodide
      pyodideReady.value = true
      return
    }

    if ((window as any).pyodideLoading) {
      return new Promise((resolve) => {
        const handlePyodideReady = (event: CustomEvent): void => {
          pyodide = event.detail
          pyodideReady.value = true
          window.removeEventListener('pyodideReady', handlePyodideReady as EventListener)
          resolve()
        }
        window.addEventListener('pyodideReady', handlePyodideReady as EventListener)
      })
    }

    ;(window as any).pyodideLoading = true

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/pyodide@0.27.7/pyodide.js'
    document.head.appendChild(script)

    script.onload = async (): Promise<void> => {
      try {
        pyodide = await (window as any).loadPyodide()
        ;(window as any).pyodide = pyodide
        ;(window as any).pyodideLoading = false

        window.dispatchEvent(new CustomEvent('pyodideReady', { detail: pyodide }))
        pyodideReady.value = true
      } catch (error) {
        console.error('Pyodide 加载失败:', error)
        ;(window as any).pyodideLoading = false
      }
    }
  }

  // 执行 JavaScript
  async function runJavaScript(): Promise<void> {
    try {
      const code = getEditorContent()
      const outputs: string[] = []

      const formatArgs = (args: any[]) => args.map(arg =>
        typeof arg === 'object' ? inspect(arg) : String(arg)
      ).join(' ')

      const captureOutput = (...args: any[]): void => {
        outputs.push(formatArgs(args))
      }

      const originalConsole = {
        log: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error
      }

      console.log = captureOutput
      console.info = captureOutput
      console.warn = captureOutput
      console.error = captureOutput

      const result = eval(code)

      if (result !== undefined && outputs.length === 0) {
        outputs.push(typeof result === 'object' ? inspect(result) : String(result))
      }

      output.value = outputs.length > 0 ? outputs.join('\n') : '代码执行完成，无输出'

      Object.assign(console, originalConsole)
    } catch (error) {
      hasError.value = true
      output.value = `错误: ${(error as Error).message}`
    }
  }

  // 执行 Python
  async function runPython(): Promise<void> {
    try {
      const code = getEditorContent()

      await pyodide.runPython(`
import sys
from io import StringIO

stdout_capture = StringIO()
stderr_capture = StringIO()
sys.stdout = stdout_capture
sys.stderr = stderr_capture

exec_result = {"error": False, "message": ""}
`)

      pyodide.globals.set("user_code", code)

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
    error_type = type(e).__name__
    error_msg = str(e)
    simple_error = f"{error_type}: {error_msg}" if error_msg else error_type
    exec_result["error"] = True
    exec_result["message"] = simple_error
`)

      const result = pyodide.globals.get("exec_result").toJs()

      if (result.error) {
        hasError.value = true
        output.value = `错误：${result.message}`
      } else {
        output.value = result.message
      }
    } catch (error) {
      hasError.value = true
      output.value = String(error)
    }
  }

  // 运行代码
  async function runCode(lang: string): Promise<void> {
    if (isRunning.value) return
    if (lang === 'py' && !pyodideReady.value) return

    isRunning.value = true
    hasError.value = false

    try {
      if (lang === 'js' || lang === 'javascript') {
        await runJavaScript()
      } else {
        await runPython()
      }
    } finally {
      isRunning.value = false
    }
  }

  // 复制代码
  async function copyCode(): Promise<void> {
    try {
      const code = getEditorContent()
      await navigator.clipboard.writeText(code)
      copySuccess.value = true
      setTimeout(() => {
        copySuccess.value = false
      }, 2000)
    } catch (error) {
      console.error('复制失败:', error)
    }
  }

  // 获取按钮文本
  function getButtonText(lang: string): string {
    if (isRunning.value) return '运行中...'
    if (lang === 'py' && !pyodideReady.value) return '加载中...'
    return '运行'
  }

  function getSimpleButtonText(lang: string): string {
    if (isRunning.value) return '运行中'
    if (lang === 'py' && !pyodideReady.value) return '加载中'
    return '运行'
  }

  // 清理
  function destroy() {
    if (editorView) {
      editorView.destroy()
      editorView = null
    }
  }

  return {
    // 响应式数据
    editorRef,
    output,
    hasError,
    isRunning,
    pyodideReady,
    copySuccess,
    isInitialized,

    // 方法
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
  }
} 