import {
  useGlobalSettingStore,
  useMiddleFormStore,
  useWorkspaceStore,
} from '@ideal-schema/playground-store'
import { useCrudPageCode } from './useCrudPageCode'
import { useFormDialogCode } from './useFormDialogCode'
import { useCrudDialogCode } from './useCrudDialogCode'
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
    const { code } = useCrudPageCode()
    if (workspaceComponentType.value === 'crud') {
      if (isDialog.value)
        return useCrudDialogCode().code
      return code
    }

    return ''
  }

  return { getPageCode }
}
