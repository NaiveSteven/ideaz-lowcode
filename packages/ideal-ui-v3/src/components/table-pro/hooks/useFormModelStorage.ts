import { ref, watch, computed } from 'vue';
import { cloneDeep } from 'lodash-es';
import { isObject } from '@ideal-schema/shared';

export const useFormModelStorage = (props: any) => {
  const originFormModel = ref(cloneDeep(props.config.formModel || {}));
  const tableProName = props.config.name || '';

  const middleFormModel = ref(
    window.sessionStorage.getItem('tableProFormData')
      ? JSON.parse(window.sessionStorage.getItem('tableProFormData')!)[tableProName] ||
          originFormModel.value
      : originFormModel.value
  );

  const isUseFormModelStorage = computed(() => {
    const config = {
      formStorage: true,
      ...props.config,
    };
    return props.config.name && config.formStorage;
  });

  watch(
    () => middleFormModel.value,
    () => {
      if (isObject(props.config.formModel) && isUseFormModelStorage.value) {
        Object.keys(props.config.formModel).forEach((key) => {
          props.config.formModel[key] = middleFormModel.value[key];
        });
      }
    },
    { deep: true, immediate: true }
  );

  watch(
    () => props.config.formModel,
    () => {
      if (isObject(props.config.formModel) && isUseFormModelStorage.value) {
        Object.keys(props.config.formModel).forEach((key) => {
          middleFormModel.value[key] = props.config.formModel[key];
        });
      }
    },
    { deep: true }
  );

  return { middleFormModel, originFormModel, isUseFormModelStorage };
};
