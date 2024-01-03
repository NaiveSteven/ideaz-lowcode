import { computed } from 'vue';
import { useMiddleFormStore } from '@ideal-schema/playground-store';

export const useMiddleFormStoreData = () => {
  const middleFormStore = useMiddleFormStore();

  const rootSchema = computed(() => middleFormStore.getSchemas);
  const formData = computed(() => middleFormStore.getFormData);
  const formConfig = computed(() => middleFormStore.getFormConfig);

  return {
    rootSchema,
    formData,
    formConfig,
  };
};
