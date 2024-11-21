import {
  useGlobalSetting, useWorkspaceComponent, useWorkspaceForm
} from '@ideal-schema/playground-store'
import { useCrudDialogCode } from './useCrudDialogCode'
import { useCrudPageCode } from './useCrudPageCode'
import { useFormDialogCode } from './useFormDialogCode'
import { useFormPageCode } from './useFormPageCode'

export function usePageCode() {
  const { widgets } = useWorkspaceComponent()
  const { formConfig } = useWorkspaceForm()
  const { workspaceComponentType } = useGlobalSetting()

  const isDialog = computed(() => {
    if (workspaceComponentType.value === 'form')
      return formConfig.value.background === 'dialog'

    return widgets.value[0]?.componentFormData?.background === 'dialog'
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
