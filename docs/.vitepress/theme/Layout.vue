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
    const handleCodeBlocks = async () => {
      await nextTick()
      await processInteractiveCodeBlocks()
    }
    
    // 页面首次加载时处理
    onMounted(handleCodeBlocks)
    
    // DOM 更新后处理（包括路由变化）
    onUpdated(handleCodeBlocks)
    
    // 监听路由变化
    watch(() => route.path, async () => {
      await handleCodeBlocks()
    }, { flush: 'post' })

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
async function processInteractiveCodeBlocks() {
  // 查找所有需要处理的标记
  const blocks = document.querySelectorAll('.interactive-code-block')
  
  if (blocks.length === 0) return

  // 动态导入 InteractiveCode 组件
  const { default: InteractiveCode } = await import('../components/InteractiveCode.vue')
  
  blocks.forEach((block, index) => {
    // 检查是否已经处理过了（避免重复处理）
    if (block.querySelector('.interactive-code')) {
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
      
      // 清空原有内容
      block.innerHTML = ''
      
      // 创建 Vue 应用实例
      const app = createApp(InteractiveCode, {
        lang: lang,
        title: decodedTitle,
        code: decodedCode,
        runnable: runnable  // 传递 runnable 属性
      })
      
      // 挂载到当前位置
      app.mount(block)
    } catch (error) {
      console.error('❌ Error processing block:', error)
      console.error('Raw data:', { lang, encodedTitle, encodedCode })
    }
  })
}
</script> 