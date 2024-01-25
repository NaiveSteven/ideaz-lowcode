import { useMiddleFormStore } from '../modules/middleForm'

export const useWorkspaceForm = () => {
  const workspaceForm = useMiddleFormStore()

  const formData = computed(() => workspaceForm.getFormData)
  const formConfig = computed(() => workspaceForm.getFormConfig)

  return {
    formData,
    formConfig,
    setFormConfig: workspaceForm.setFormConfig,
  }
}
