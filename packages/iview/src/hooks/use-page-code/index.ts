import {
  useGlobalSetting,
  useWorkspaceForm,
  useWorkspaceStore
} from '@ideal-schema/playground-store'
import { useCrudDialogCode } from './useCrudDialogCode'
import { useCrudPageCode } from './useCrudPageCode'
import { useFormDialogCode } from './useFormDialogCode'
import { useFormPageCode } from './useFormPageCode'

export function usePageCode() {
  const workspaceStore = useWorkspaceStore()
  const { formConfig } = useWorkspaceForm()
  const { workspaceComponentType } = useGlobalSetting()

  const componentList = computed(() => workspaceStore.getWorkspaceComponentList)

  const isDialog = computed(() => {
    if (workspaceComponentType.value === 'form')
      return formConfig.value.background === 'dialog'

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
