import { computed, getCurrentInstance } from 'vue';
import { debounce } from 'lodash-es';
import { ElForm } from 'element-plus';
import { useFormModelStorage } from './useFormModelStorage';
import { isObject } from '@ideal-schema/shared';
import type { ComponentInternalInstance } from 'vue';

export const useFormConfig = (props: Record<any, any>, emit: any) => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance;

  const { middleFormModel, originFormModel, isUseFormModelStorage } = useFormModelStorage(props);

  const formConfig = computed(() => {
    return props.config.formConfig
      ? {
          labelPosition: 'right',
          labelWidth: '90px',
          size: 'small',
          ...props.config.formConfig,
        }
      : {
          labelPosition: 'right',
          labelWidth: '90px',
          size: 'small',
        };
  });

  const layout = computed(() => {
    return {
      colLayout: {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 8,
        xl: 8,
      },
    };
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = debounce(function () {
    if (isUseFormModelStorage.value) {
      updateTableProFormData(props.config, props.config.formModel);
    }
    emit('search');
  }, 200);

  const handleReset = () => {
    (ctx!.$refs.form as typeof ElForm).resetFields();
    if (isUseFormModelStorage.value && isObject(props.config.formModel)) {
      Object.keys(props.config.formModel).forEach((key) => {
        props.config.formModel[key] = originFormModel.value[key];
        middleFormModel.value[key] = originFormModel.value[key];
      });
      updateTableProFormData(props.config);
    }
    emit('reset');
  };

  const updateTableProFormData = (config: IndexType, data?: IndexType) => {
    const tableProFormData = window.sessionStorage.getItem('tableProFormData')
      ? JSON.parse(window.sessionStorage.getItem('tableProFormData')!)
      : {};
    tableProFormData[config.name] = data;
    if (!data) {
      delete tableProFormData[config.name];
    }
    window.sessionStorage.setItem('tableProFormData', JSON.stringify(tableProFormData));
  };

  return {
    formConfig,
    layout,
    handleSearch,
    handleReset,
    handleKeyDown,
    middleFormModel,
    isUseFormModelStorage,
  };
};
