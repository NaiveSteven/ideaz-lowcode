import { useGlobalSettingStore } from '../modules/globalSetting'

export const useGlobalSetting = ()=> {
  const globalSettingStore = useGlobalSettingStore()

  const workspaceComponentType = computed(() => globalSettingStore.workspaceComponentType)
  const version = computed(() => globalSettingStore.version)

  return {
    version,
    workspaceComponentType,
    updateVersion: globalSettingStore.updateVersion,
    updateWorkspaceComponentType: globalSettingStore.updateWorkspaceComponentType
  }
}
