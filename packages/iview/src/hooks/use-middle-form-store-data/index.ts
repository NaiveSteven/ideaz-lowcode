import { useMiddleFormStore } from '@ideal-schema/playground-store'

export function useMiddleFormStoreData() {
  const middleFormStore = useMiddleFormStore()

  const rootSchema = computed(() => middleFormStore.getSchemas)
  const formData = computed(() => middleFormStore.getFormData)
  const formConfig = computed(() => middleFormStore.getFormConfig)

  return {
    rootSchema,
    formData,
    formConfig,
  }
}
