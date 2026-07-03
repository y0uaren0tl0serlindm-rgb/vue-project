import { createApp } from 'vue'
import { ElButton, ElCard, ElInput, ElSlider, ElTag } from 'element-plus'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-button.css'
import 'element-plus/theme-chalk/el-card.css'
import 'element-plus/theme-chalk/el-input.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-slider.css'
import 'element-plus/theme-chalk/el-tag.css'
import 'element-plus/theme-chalk/el-tooltip.css'
import '@/styles/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.component(ElButton.name, ElButton)
app.component(ElCard.name, ElCard)
app.component(ElInput.name, ElInput)
app.component(ElSlider.name, ElSlider)
app.component(ElTag.name, ElTag)
app.mount('#app')
