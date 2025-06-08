export function interactiveCodePlugin(md) {
  console.log('🔧 Interactive code plugin loaded')
  
  // 保存原始的fence渲染器
  const fence = md.renderer.rules.fence || function(tokens, idx, options, env, renderer) {
    return renderer.renderToken(tokens, idx, options)
  }

  md.renderer.rules.fence = function(tokens, idx, options, env, renderer) {
    const token = tokens[idx]
    const info = token.info.trim()
    
    console.log('🔍 Processing fence with info:', info)
    
    // 检查是否是交互式代码块
    const interactiveMatch = info.match(/^(javascript|js|python|py)\s+(runner)?/)
    
    if (interactiveMatch) {
      console.log('✅ Found interactive code block:', interactiveMatch)
      
      const [, lang, , title] = interactiveMatch
      const code = token.content.trim()
      const normalizedLang = lang === 'javascript' ? 'js' : lang === 'python' ? 'py' : lang
      
      // 使用 Base64 编码，完全避免 HTML 属性特殊字符问题
      const encodedCode = Buffer.from(code, 'utf8').toString('base64')
      const encodedTitle = title ? Buffer.from(title, 'utf8').toString('base64') : ''
      
      // 返回特殊的 HTML 标记，稍后由客户端 JavaScript 处理
      const result = `<div class="interactive-code-block" data-lang="${normalizedLang}" data-title="${encodedTitle}" data-code="${encodedCode}"></div>\n`
      
      return result
    }
    
    // 使用原始渲染器处理其他代码块
    return fence(tokens, idx, options, env, renderer)
  }
} 