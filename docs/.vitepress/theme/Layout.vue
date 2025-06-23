<template>
  <Layout />
</template>

<script>
import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, onUpdated, watch } from 'vue'
import { useRoute } from 'vitepress'
import { createApp } from 'vue'

const Layout = DefaultTheme.Layout

export default {
  name: 'CustomLayout',
  components: {
    Layout
  },
  setup() {
    const route = useRoute()
    
    // 处理交互式代码块的函数
    const handleCodeBlocks = async (force = false) => {
      await nextTick()
      await processInteractiveCodeBlocks(force)
    }
    
    // 页面首次加载时处理
    onMounted(() => handleCodeBlocks())
    
    // DOM 更新后处理（包括路由变化）
    onUpdated(() => handleCodeBlocks())
    
    // 监听路由变化
    watch(() => route.path, async () => {
      await handleCodeBlocks(true) // 路由变化时强制重新处理
    }, { flush: 'post' })

    // 热更新时的额外处理
    if (import.meta.hot) {
      import.meta.hot.on('vite:afterUpdate', () => {
        // 延迟处理，确保 DOM 已经更新
        setTimeout(() => handleCodeBlocks(true), 100)
      })
    }

    return {}
  }
}

// Base64 解码 UTF-8 字符串的辅助函数
function base64DecodeUtf8(str) {
  try {
    // 使用 TextDecoder 正确解码 UTF-8
    const bytes = Uint8Array.from(atob(str), c => c.charCodeAt(0))
    return new TextDecoder('utf-8').decode(bytes)
  } catch (error) {
    console.error('Base64 decode error:', error)
    return str
  }
}

// 处理交互式代码块的函数
async function processInteractiveCodeBlocks(force = false) {
  // 查找所有需要处理的标记
  const blocks = document.querySelectorAll('.interactive-code-block')
  
  if (blocks.length === 0) return

  // 动态导入 InteractiveCode 组件
  const { default: InteractiveCode } = await import('../components/InteractiveCode.vue')
  
  blocks.forEach((block, index) => {
    // 检查是否已经处理过了（避免重复处理）
    if (!force && block.querySelector('.interactive-code')) {
      return
    }
        
    const lang = block.dataset.lang
    const encodedTitle = block.dataset.title
    const encodedCode = block.dataset.code
    const runnable = block.dataset.runnable === 'true'  // 读取 runnable 属性
    
    if (!lang || !encodedCode) {
      console.warn('⚠️ Invalid block data:', { lang, encodedTitle, encodedCode })
      return
    }
    
    try {
      // 使用正确的 UTF-8 Base64 解码
      const decodedCode = base64DecodeUtf8(encodedCode)
      const decodedTitle = encodedTitle ? base64DecodeUtf8(encodedTitle) : ''
      
      // 如果是强制重新处理，需要先清理旧的实例
      if (force && block._vueApp) {
        try {
          block._vueApp.unmount()
        } catch (e) {
          // 忽略卸载错误
          console.warn('Warning during Vue app unmount:', e)
        }
        delete block._vueApp
      }
      
      // 清空原有内容
      block.innerHTML = ''
      
      // 创建 Vue 应用实例
      const app = createApp(InteractiveCode, {
        lang: lang,
        title: decodedTitle,
        code: decodedCode,
        runnable: runnable  // 传递 runnable 属性
      })
      
      // 保存应用实例的引用，便于后续清理
      block._vueApp = app
      
      // 挂载到当前位置
      app.mount(block)
    } catch (error) {
      console.error('❌ Error processing block:', error)
      console.error('Raw data:', { lang, encodedTitle, encodedCode })
    }
  })
}
</script> 