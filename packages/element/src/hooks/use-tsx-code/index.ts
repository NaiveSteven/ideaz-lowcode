import {
  useGlobalSetting,
  useWorkspaceComponent,
  useWorkspaceForm,
} from '@ideal-schema/playground-store'
import { useCrudDialogCode } from './useCrudDialogCode'
import { useCrudPageCode } from './useCrudPageCode'
import { useFormDialogCode } from './useFormDialogCode'
import { useFormPageCode } from './useFormPageCode'

export function useTsxCode() {
  const { widgets } = useWorkspaceComponent()
  const { formConfig } = useWorkspaceForm()
  const { workspaceWidgetType } = useGlobalSetting()

  const isDialog = computed(() => {
    if (workspaceWidgetType.value === 'form')
      return formConfig.value.background === 'dialog'

    return widgets.value[0]?.componentFormData?.background === 'dialog'
  })

  const getTsxCode = () => {
    if (workspaceWidgetType.value === 'form') {
      if (isDialog.value)
        return useFormDialogCode()
      return useFormPageCode()
    }
    const { code } = useCrudPageCode()
    if (workspaceWidgetType.value === 'crud') {
      if (isDialog.value)
        return useCrudDialogCode().code
      return code
    }
  }

  return { getTsxCode }
}
