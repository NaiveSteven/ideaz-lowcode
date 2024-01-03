import { computed, ref, watch } from 'vue';
import { cloneDeep } from 'lodash-es';
import type { FormItemConfigItem } from '@ideal-schema/ideal-ui-v3';

export const useFormItems = (props: Record<any, any>) => {
  const formatFormItems = ref([...props.formItemConfig]);
  // const formatFormItems = computed(() => {
  //   const _schema = formItems;
  //   return _schema.filter((item: FormItemConfigItem) => !isHide(item));
  // });

  const isHide = (item: FormItemConfigItem) => {
    return typeof item.hide === 'function' ? item.hide() : item.hide;
  };

  watch(
    () => props.formItemConfig,
    () => {
      formatFormItems.value = props.formItemConfig.filter(
        (item: FormItemConfigItem) => !isHide(item)
      );
    },
    { immediate: true }
  );

  return { formatFormItems };
};
