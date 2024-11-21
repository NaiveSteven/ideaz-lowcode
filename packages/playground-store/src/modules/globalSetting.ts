import { defineStore } from 'pinia'

interface GlobalSettingState {
  version: number
  workspaceWidgetType: 'form' | 'crud'
  compositeArrowDirection: 'left' | 'right'
  settingArrowDirection: 'left' | 'right'
}

export const useGlobalSettingStore = defineStore({
  id: 'globalSetting',
  state: (): GlobalSettingState => ({
    version: localStorage.getItem('version')
      ? Number(JSON.parse(localStorage.getItem('version')!))
      : 2,
    workspaceWidgetType: 'form',
    compositeArrowDirection: 'left',
    settingArrowDirection: 'right',
  }),
  getters: {
    getVersion(): number {
      return this.version
    },
    getWorkspaceComponentType(): 'form' | 'crud' {
      return this.workspaceWidgetType
    },
    getCompositeArrowDirection(): 'right' | 'left' {
      return this.compositeArrowDirection
    },
    getSettingArrowDirection(): 'right' | 'left' {
      return this.settingArrowDirection
    },
  },
  actions: {
    updateVersion(version: number) {
      this.version = version
    },
    updateWorkspaceComponentType(type: 'form' | 'crud') {
      this.workspaceWidgetType = type
    },
    updateCompositeArrowDirection(direction: 'right' | 'left') {
      this.compositeArrowDirection = direction
    },
    updateSettingArrowDirection(direction: 'right' | 'left') {
      this.settingArrowDirection = direction
    },
  },
})
