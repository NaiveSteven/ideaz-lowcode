import { computed } from 'vue'
import {
  useGlobalSettingStore,
  useMiddleFormStore,
  useWorkspaceStore,
} from '@ideal-schema/playground-store'
import { useTableProCode } from './useTableProPageCode'
import { useFormDialogCode } from './useFormDialogCode'
import { useTableProDialogCode } from './useTableProDialogCode'
import { useFormPageCode } from './useFormPageCode'

export function usePageCode() {
  const workspaceStore = useWorkspaceStore()
  const middleFormStore = useMiddleFormStore()
  const globalSettingStore = useGlobalSettingStore()
  const workspaceComponentType = computed(() => globalSettingStore.getWorkspaceComponentType)

  const componentList = computed(() => workspaceStore.getWorkspaceComponentList)
  const middleFormConfig = computed(() => middleFormStore.getFormConfig)

  const isDialog = computed(() => {
    if (workspaceComponentType.value === 'form')
      return middleFormConfig.value.background === 'dialog'

    return componentList.value[0]?.componentFormData?.background === 'dialog'
  })

  const getPageCode = () => {
    if (workspaceComponentType.value === 'form') {
      if (isDialog.value)
        return useFormDialogCode()
      return useFormPageCode()
    }
    const { code } = useTableProCode()
    if (workspaceComponentType.value === 'tablePro') {
      if (isDialog.value)
        return useTableProDialogCode().code
      return code
    }

    return ''
  }

  return { getPageCode }
}
