import { defineStore } from 'pinia'

interface GlobalSettingState {
  version: number
  workspaceComponentType: 'form' | 'crud'
}

export const useGlobalSettingStore = defineStore({
  id: 'globalSetting',
  state: (): GlobalSettingState => ({
    version: localStorage.getItem('version')
      ? Number(JSON.parse(localStorage.getItem('version')!))
      : 2,
    workspaceComponentType: 'form',
  }),
  getters: {
    getVersion(): number {
      return this.version
    },
    getWorkspaceComponentType(): 'form' | 'crud' {
      return this.workspaceComponentType
    },
  },
  actions: {
    updateVersion(version: number) {
      this.version = version
    },
    updateWorkspaceComponentType(type: 'form' | 'crud') {
      this.workspaceComponentType = type
    },
  },
})
