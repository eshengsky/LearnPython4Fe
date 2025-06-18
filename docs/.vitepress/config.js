import { defineConfig } from 'vitepress'
import { interactiveCodePlugin } from './plugins/interactive-code-plugin.ts'

export default defineConfig({
  title: 'Python 教程（进行中）',
  description: '给前端开发者的 Python 教程',
  lang: 'zh-CN',
  
  vite: {
    server: {
      port: 9000
    }
  },
  
  markdown: {
    config: (md) => {
      interactiveCodePlugin(md);
    }
  },
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '开始学习', link: '/guide/' },
      { text: '代码实验室', link: '/playground' },
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: '开始学习',
          collapsed: false,
          items: [
            { text: '教程说明', link: '/guide/' },
            { text: 'Python简介', link: '/guide/introduction' },
            { text: '环境搭建', link: '/guide/installation' },
          ]
        },
        {
          text: 'Python基础',
          collapsed: false,
          items: [
            { text: '基础概念', link: '/guide/syntax' },
            { text: '变量', link: '/guide/variables' },
            { text: '数据类型', link: '/guide/data-types' },
          ]
        },
        // {
        //   text: '基本数据类型',
        //   collapsed: false,
        //   items: [
        //     { text: '字符串', link: '/guide/strings' },
        //     { text: '数字', link: '/guide/numbers' },
        //     { text: '布尔值', link: '/guide/booleans' },
        //   ]
        // },
        // {
        //   text: '数据结构',
        //   collapsed: false,
        //   items: [
        //     { text: '列表', link: '/guide/lists' },
        //     { text: '元组', link: '/guide/tuples' },
        //     { text: '字典', link: '/guide/dictionaries' },
        //     { text: '集合', link: '/guide/sets' },
        //   ]
        // },
        // {
        //   text: '程序控制',
        //   collapsed: false,
        //   items: [
        //     { text: '条件判断', link: '/guide/conditions' },
        //     { text: '循环语句', link: '/guide/loops' },
        //     { text: 'Match语句', link: '/guide/match' },
        //     { text: '异常处理', link: '/guide/exceptions' },
        //   ]
        // },
        // {
        //   text: '函数',
        //   collapsed: false,
        //   items: [
        //     { text: '函数基础', link: '/guide/functions' },
        //     { text: 'Lambda表达式', link: '/guide/lambda' },
        //     { text: '作用域', link: '/guide/scope' },
        //     { text: '高级函数特性', link: '/guide/advanced-functions' },
        //   ]
        // },
        // {
        //   text: '面向对象编程',
        //   collapsed: false,
        //   items: [
        //     { text: '类和对象', link: '/guide/classes' },
        //     { text: '继承', link: '/guide/inheritance' },
        //     { text: '多态', link: '/guide/polymorphism' },
        //     { text: '迭代器', link: '/guide/iterators' },
        //   ]
        // },
        // {
        //   text: '模块和包',
        //   collapsed: false,
        //   items: [
        //     { text: '模块使用', link: '/guide/modules' },
        //     { text: '第三方包管理', link: '/guide/packages' },
        //     { text: '虚拟环境', link: '/guide/virtual-env' },
        //   ]
        // },
        // {
        //   text: '文件和IO',
        //   collapsed: true,
        //   items: [
        //     { text: '文件操作', link: '/guide/file-io' },
        //     { text: '用户输入', link: '/guide/user-input' },
        //   ]
        // },
        // {
        //   text: '常用标准库',
        //   collapsed: true,
        //   items: [
        //     { text: 'JSON处理', link: '/guide/json' },
        //     { text: '日期时间', link: '/guide/datetime' },
        //     { text: '数学运算', link: '/guide/math' },
        //     { text: '正则表达式', link: '/guide/regex' },
        //     { text: '系统操作', link: '/guide/os-operations' },
        //   ]
        // },
        // {
        //   text: '网络编程',
        //   collapsed: true,
        //   items: [
        //     { text: 'HTTP请求', link: '/guide/http-requests' },
        //     { text: '网络编程基础', link: '/guide/network-programming' },
        //   ]
        // },
        // {
        //   text: '并发编程',
        //   collapsed: true,
        //   items: [
        //     { text: '多线程编程', link: '/guide/threading' },
        //     { text: '异步编程', link: '/guide/async-programming' },
        //   ]
        // },
        // {
        //   text: 'Web开发',
        //   collapsed: true,
        //   items: [
        //     { text: 'Web开发基础', link: '/guide/web-basics' },
        //     { text: 'Flask快速入门', link: '/guide/flask' },
        //     { text: 'Django快速入门', link: '/guide/django' },
        //     { text: 'FastAPI快速入门', link: '/guide/fastapi' },
        //   ]
        // },
        // {
        //   text: '高级特性',
        //   collapsed: true,
        //   items: [
        //     { text: '类型注解', link: '/guide/type-hints' },
        //     { text: '装饰器', link: '/guide/decorators' },
        //     { text: '生成器', link: '/guide/generators' },
        //     { text: '上下文管理器', link: '/guide/context-managers' },
        //   ]
        // },
      ],
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/eshengsky/LearnPython4Fe' }
    ],

    editLink: {
      pattern: 'https://github.com/eshengsky/LearnPython4Fe/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    lastUpdated: {
      text: '最后更新于',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025-present Python for Frontend Developers'
    },
    
    search: {
      provider: 'local'
    },

    outline: {
      label: '页面导航'
    },
  },
  base: '/LearnPython4Fe/'
}) 