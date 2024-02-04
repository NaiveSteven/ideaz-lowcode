import { useGlobalSettingStore } from '../modules/globalSetting'

export function useGlobalSetting() {
  const globalSettingStore = useGlobalSettingStore()

  const workspaceComponentType = computed(() => globalSettingStore.workspaceComponentType)
  const version = computed(() => globalSettingStore.version)
  const compositeArrowDirection = computed(() => globalSettingStore.compositeArrowDirection)
  const settingArrowDirection = computed(() => globalSettingStore.settingArrowDirection)

  return {
    version,
    workspaceComponentType,
    compositeArrowDirection,
    settingArrowDirection,
    updateVersion: globalSettingStore.updateVersion,
    updateWorkspaceComponentType: globalSettingStore.updateWorkspaceComponentType,
    updateCompositeArrowDirection: globalSettingStore.updateCompositeArrowDirection,
    updateSettingArrowDirection: globalSettingStore.updateSettingArrowDirection,
  }
}
