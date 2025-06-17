import DefaultTheme from 'vitepress/theme'
import InteractiveCode from '../components/InteractiveCode.vue'
import PlaygroundEditor from '../components/PlaygroundEditor.vue'
import Layout from './Layout.vue'
import './tailwind.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // 注册组件
    app.component('InteractiveCode', InteractiveCode)
    app.component('PlaygroundEditor', PlaygroundEditor)
  }
} 