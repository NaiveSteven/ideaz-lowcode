import { createPinia } from 'pinia'

const store = createPinia()

export { store }

export * from './modules/middleForm'
export * from './modules/workspace'
export * from './modules/globalSetting'
