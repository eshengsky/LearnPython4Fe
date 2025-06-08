import { defineConfig } from 'vitepress'
import { interactiveCodePlugin } from './plugins/interactive-code-plugin.js'

export default defineConfig({
  title: 'Python for Frontend Developers',
  description: '给前端开发者的Python入门教程',
  lang: 'zh-CN',
  
  markdown: {
    config: (md) => {
      interactiveCodePlugin(md);
    }
  },
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '教程指南', link: '/guide/' },
      { text: '实例代码', link: '/examples/' }
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: '入门准备',
          collapsed: false,
          items: [
            { text: '开始学习', link: '/guide/' },
            { text: 'Python简介', link: '/guide/introduction' },
            { text: '环境搭建', link: '/guide/installation' },
            { text: '第一个Python程序', link: '/guide/first-program' }
          ]
        },
        {
          text: 'Python基础',
          collapsed: false,
          items: [
            { text: '基础语法', link: '/guide/syntax' },
            { text: '变量和数据类型', link: '/guide/variables' },
            { text: '字符串操作', link: '/guide/strings' },
            { text: '运算符', link: '/guide/operators' }
          ]
        },
        {
          text: '数据结构',
          collapsed: false,
          items: [
            { text: '列表(List)', link: '/guide/list' },
            { text: '元组(Tuple)', link: '/guide/tuple' },
            { text: '字典(Dict)', link: '/guide/dict' },
            { text: '集合(Set)', link: '/guide/set' }
          ]
        },
        {
          text: '程序控制',
          collapsed: false,
          items: [
            { text: '条件判断', link: '/guide/conditions' },
            { text: '循环语句', link: '/guide/loops' },
            { text: '异常处理', link: '/guide/exceptions' }
          ]
        },
        {
          text: '函数',
          collapsed: false,
          items: [
            { text: '函数基础', link: '/guide/functions' },
            { text: '高级函数特性', link: '/guide/advanced-functions' }
          ]
        },
        {
          text: '面向对象编程',
          collapsed: true,
          items: [
            { text: '类和对象', link: '/guide/classes' },
            { text: '继承和多态', link: '/guide/inheritance' },
            { text: '面向对象高级特性', link: '/guide/oop-advanced' }
          ]
        },
        {
          text: '模块和包',
          collapsed: true,
          items: [
            { text: '模块使用', link: '/guide/modules' },
            { text: '第三方包管理', link: '/guide/packages' }
          ]
        },
        {
          text: '文件和IO',
          collapsed: true,
          items: [
            { text: '文件操作', link: '/guide/file-io' },
            { text: 'JSON和数据序列化', link: '/guide/json-serialization' }
          ]
        },
        {
          text: '常用标准库',
          collapsed: true,
          items: [
            { text: '日期时间处理', link: '/guide/datetime' },
            { text: '正则表达式', link: '/guide/regex' },
            { text: '系统操作', link: '/guide/os-operations' }
          ]
        },
        {
          text: '网络编程',
          collapsed: true,
          items: [
            { text: 'HTTP请求', link: '/guide/http-requests' },
            { text: '网络编程基础', link: '/guide/network-programming' }
          ]
        },
        {
          text: 'Web开发',
          collapsed: true,
          items: [
            { text: 'Web开发基础', link: '/guide/web-basics' },
            { text: 'Flask快速入门', link: '/guide/flask' },
            { text: 'Django快速入门', link: '/guide/django' },
            { text: 'FastAPI快速入门', link: '/guide/fastapi' }
          ]
        },
        {
          text: '数据库操作',
          collapsed: true,
          items: [
            { text: 'SQLite操作', link: '/guide/sqlite' },
            { text: 'MySQL操作', link: '/guide/mysql' },
            { text: 'ORM框架', link: '/guide/orm' }
          ]
        },
        {
          text: '数据处理',
          collapsed: true,
          items: [
            { text: 'NumPy数值计算', link: '/guide/numpy' },
            { text: 'Pandas数据分析', link: '/guide/pandas' },
            { text: 'Matplotlib数据可视化', link: '/guide/matplotlib' }
          ]
        },
        {
          text: '并发编程',
          collapsed: true,
          items: [
            { text: '多线程编程', link: '/guide/threading' },
            { text: '异步编程', link: '/guide/async-programming' }
          ]
        },
        {
          text: '开发工具和最佳实践',
          collapsed: true,
          items: [
            { text: '虚拟环境和包管理', link: '/guide/venv-pip' },
            { text: '代码规范和调试', link: '/guide/best-practices' },
            { text: '测试和部署', link: '/guide/testing-deployment' }
          ]
        },
        {
          text: '总结',
          collapsed: true,
          items: [
            { text: '学习总结', link: '/guide/summary' },
            { text: '进阶学习资源', link: '/guide/resources' }
          ]
        }
      ],
      '/examples/': [
        {
          text: '基础练习',
          collapsed: false,
          items: [
            { text: '示例总览', link: '/examples/' },
            { text: '语法和数据类型', link: '/examples/basic-syntax' },
            { text: '控制流练习', link: '/examples/control-flow' },
            { text: '函数练习', link: '/examples/functions-practice' }
          ]
        },
        {
          text: '实用工具',
          collapsed: false,
          items: [
            { text: '文件处理工具', link: '/examples/file-tools' },
            { text: '网络请求工具', link: '/examples/http-tools' },
            { text: '数据处理工具', link: '/examples/data-tools' },
            { text: '系统管理工具', link: '/examples/system-tools' }
          ]
        },
        {
          text: '项目实战',
          collapsed: false,
          items: [
            { text: 'Web API项目', link: '/examples/web-api' },
            { text: '网络爬虫', link: '/examples/web-scraping' },
            { text: '数据分析项目', link: '/examples/data-analysis' },
            { text: '自动化脚本', link: '/examples/automation' }
          ]
        },
        {
          text: '经典练习题',
          collapsed: true,
          items: [
            { text: '基础题(1-30)', link: '/examples/exercises-basic' },
            { text: '进阶题(31-60)', link: '/examples/exercises-intermediate' },
            { text: '项目题(61-100)', link: '/examples/exercises-advanced' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/LearnPython4Fe' }
    ],
    
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024-present Python for Frontend Developers'
    },
    
    search: {
      provider: 'local'
    }
  }
}) 