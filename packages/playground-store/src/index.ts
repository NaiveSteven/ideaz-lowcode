import { createPinia } from 'pinia'

const store = createPinia()

export * from './hooks'
export * from './modules/globalSetting'
export * from './modules/history'
export * from './modules/middleForm'
export * from './modules/undo'
export * from './modules/workspace'
export { store }
