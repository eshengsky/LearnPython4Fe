// 阅读时间估算插件
import type MarkdownIt from 'markdown-it'

interface ReadingTimeStats {
  words: number
  minutes: number
  text: string
}

// 中文字符阅读速度：300字/分钟
// 英文单词阅读速度：160词/分钟
const CHINESE_CHARS_PER_MINUTE = 300
const ENGLISH_WORDS_PER_MINUTE = 160

export function readingTimePlugin(md: MarkdownIt) {
  // 保存原始的 render 方法
  const originalRender = md.render
  
  md.render = function(src: string, env?: any): string {
    // 计算阅读时间
    const stats = calculateReadingTime(src)
    
    // 调用原始渲染方法
    let html = originalRender.call(this, src, env)
    
    // 检查是否应该显示阅读时间
    if (shouldShowReadingTime(src, env, stats)) {
      const readingTimeHtml = `
<div class="reading-time-wrapper">
  <div class="reading-time">
    <svg class="reading-time-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
      <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <span class="reading-time-text">${stats.text}</span>
  </div>
</div>`
      
      // 在第一个 h1 后插入阅读时间
      html = html.replace(/(<h1[^>]*>.*?<\/h1>)/, `$1${readingTimeHtml}`)
    }
    
    return html
  }
}

/**
 * 判断是否应该显示阅读时间
 */
function shouldShowReadingTime(src: string, env: any, stats: ReadingTimeStats): boolean {
  // 通过 frontmatter 配置控制（优先级最高）
  if (env?.frontmatter?.readingTime === false) {
    return false
  }
  
  return true
}

function calculateReadingTime(content: string): ReadingTimeStats {
  // 分别提取和统计不同类型的内容
  const codeBlocks = extractCodeBlocks(content)
  const inlineCode = extractInlineCode(content) 
  const plainText = extractPlainText(content)
  
  // 计算不同内容的阅读时间
  const codeBlockTime = calculateCodeTime(codeBlocks)
  const inlineCodeTime = calculateInlineCodeTime(inlineCode)
  const textTime = calculateTextTime(plainText)
  
  // 合并统计
  const totalWords = codeBlocks.totalChars + inlineCode.totalChars + plainText.chineseChars + plainText.englishWords
  const totalMinutes = Math.ceil(codeBlockTime + inlineCodeTime + textTime)
  const readingMinutes = Math.max(1, totalMinutes)

  return {
    words: totalWords,
    minutes: readingMinutes,
    text: `约<span class="reading-time-count">${totalWords}</span>字，阅读约<span class="reading-time-count">${readingMinutes}</span>分钟`
  }
}

/**
 * 提取代码块内容
 */
function extractCodeBlocks(content: string): { blocks: string[], totalChars: number } {
  const codeBlockRegex = /```[\s\S]*?```/g
  const blocks = content.match(codeBlockRegex) || []
  
  // 计算代码块总字符数（包括中英文）
  const totalChars = blocks.reduce((sum, block) => {
    // 移除 ``` 标记，只统计实际代码内容
    const codeContent = block.replace(/^```[^\n]*\n/, '').replace(/\n```$/, '')
    return sum + codeContent.length
  }, 0)
  
  return { blocks, totalChars }
}

/**
 * 提取行内代码内容
 */
function extractInlineCode(content: string): { codes: string[], totalChars: number } {
  // 先移除代码块，避免重复统计
  const contentWithoutBlocks = content.replace(/```[\s\S]*?```/g, '')
  const inlineCodeRegex = /`[^`]+`/g
  const codes = contentWithoutBlocks.match(inlineCodeRegex) || []
  
  const totalChars = codes.reduce((sum, code) => {
    // 移除反引号，只统计实际代码内容
    const codeContent = code.replace(/`/g, '')
    return sum + codeContent.length
  }, 0)
  
  return { codes, totalChars }
}

/**
 * 提取纯文本内容
 */
function extractPlainText(content: string): { chineseChars: number, englishWords: number } {
  // 移除所有代码内容，只保留纯文本
  let cleanContent = content
    // 移除代码块
    .replace(/```[\s\S]*?```/g, '')
    // 移除行内代码
    .replace(/`[^`]*`/g, '')
    // 移除 HTML 标签
    .replace(/<[^>]*>/g, '')
    // 移除 Markdown 语法
    .replace(/#{1,6}\s/g, '') // 标题
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接
    .replace(/[*_~]/g, '') // 格式化符号
    .replace(/^\s*[-*+]\s/gm, '') // 列表符号
    .replace(/^\s*\d+\.\s/gm, '') // 有序列表
    .replace(/^\s*>\s/gm, '') // 引用
    .trim()

  // 统计中文字符数（包括中文标点）
  const chineseChars = (cleanContent.match(/[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g) || []).length
  
  // 统计英文单词数
  const englishWords = cleanContent
    .replace(/[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g, ' ') // 替换中文字符为空格
    .split(/\s+/)
    .filter(word => word.length > 0 && /[a-zA-Z]/.test(word)).length

  return { chineseChars, englishWords }
}

/**
 * 计算代码块阅读时间
 * 代码块需要更多时间理解，设置更低的阅读速度
 */
function calculateCodeTime(codeBlocks: { blocks: string[], totalChars: number }): number {
  // 代码阅读速度：每分钟150字符（比普通文字慢很多）
  const CODE_CHARS_PER_MINUTE = 150
  return codeBlocks.totalChars / CODE_CHARS_PER_MINUTE
}

/**
 * 计算行内代码阅读时间
 */
function calculateInlineCodeTime(inlineCode: { codes: string[], totalChars: number }): number {
  // 行内代码阅读速度：每分钟200字符（比代码块快一些，但比普通文字慢）
  const INLINE_CODE_CHARS_PER_MINUTE = 200
  return inlineCode.totalChars / INLINE_CODE_CHARS_PER_MINUTE
}

/**
 * 计算纯文本阅读时间
 */
function calculateTextTime(plainText: { chineseChars: number, englishWords: number }): number {
  // 中文字符阅读速度：300字/分钟
  // 英文单词阅读速度：160词/分钟
  const CHINESE_CHARS_PER_MINUTE = 300
  const ENGLISH_WORDS_PER_MINUTE = 160
  
  const chineseMinutes = plainText.chineseChars / CHINESE_CHARS_PER_MINUTE
  const englishMinutes = plainText.englishWords / ENGLISH_WORDS_PER_MINUTE
  
  return chineseMinutes + englishMinutes
} 