import type MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer'
import type Token from 'markdown-it/lib/token'

export function interactiveCodePlugin(md: MarkdownIt): void {
  // 保存原始的fence渲染器
  const fence: RenderRule = md.renderer.rules.fence || function(tokens: Token[], idx: number, options: any, env: any, renderer: any): string {
    return renderer.renderToken(tokens, idx, options)
  }

  md.renderer.rules.fence = function(tokens: Token[], idx: number, options: any, env: any, renderer: any): string {
    const token = tokens[idx]
    const info = token.info.trim()
        
    // 检查是否有语言标识
    const codeMatch = info.match(/^(\w+)(?:\s+(runner))?(?:\s+(.+))?/)
    
    if (codeMatch) {
      const [, lang, isRunner, title] = codeMatch
      const code = token.content.trim()
      
      // 规范化语言名称
      const normalizedLang = lang === 'javascript' ? 'js' : lang === 'python' ? 'py' : lang === 'typescript' ? 'ts' : lang
      
      // 只有 js 和 py 支持 runner 功能
      const supportsRunner = normalizedLang === 'js' || normalizedLang === 'py'
      const runnable = supportsRunner && !!isRunner
      
      // 使用 Base64 编码，完全避免 HTML 属性特殊字符问题
      const encodedCode = Buffer.from(code, 'utf8').toString('base64')
      const encodedTitle = title ? Buffer.from(title, 'utf8').toString('base64') : ''
      
      // 返回特殊的 HTML 标记，稍后由客户端 JavaScript 处理
      const result = `<div class="interactive-code-block" data-lang="${normalizedLang}" data-title="${encodedTitle}" data-code="${encodedCode}" data-runnable="${runnable}"></div>\n`
      
      return result
    }
    
    // 如果没有语言标识，使用原始渲染器
    return fence(tokens, idx, options, env, renderer)
  }
} 