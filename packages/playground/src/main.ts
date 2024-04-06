import * as ElIconModules from '@element-plus/icons-vue'
import VueDragResizeRotate from '@gausszhou/vue3-drag-resize-rotate'
import '@gausszhou/vue3-drag-resize-rotate/lib/bundle.esm.css'
import idealUiV3 from '@ideal-schema/ideal-ui-v3'
import '@ideal-schema/ideal-ui-v3/theme-chalk/src/index.scss'
import CommonComponents from '@ideal-schema/playground-components'
import { store } from '@ideal-schema/playground-store'
import { UndoManager } from '@ideal-schema/playground-undo'
import IdeazElement from '@ideaz/element/element'
import zhCn from '@ideaz/element/locale/lang/zh-cn'
import '@ideaz/element/theme-chalk/src/index.scss'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/dracula.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'uno.css'
import { createApp } from 'vue'
import App from './App.vue'
import './design/index.scss'
import router from './router/index'

function transElIconName(iconName: string) {
  return `i${iconName.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}`
}

const app = createApp(App)
app.use(store).use(VueDragResizeRotate)
Object.keys(ElIconModules).forEach((item: string) => {
  const cur = item as keyof typeof ElIconModules
  app.component(transElIconName(item), ElIconModules[cur])
})

app.use(idealUiV3)

app
  .use(router)
  // .use(store)
  .use(ElementPlus, { size: 'small' })
  .use(CommonComponents)
  .use(IdeazElement, { locale: zhCn, size: 'default' })
  .mount('#app')

const undoManager = new UndoManager()
export { undoManager }
