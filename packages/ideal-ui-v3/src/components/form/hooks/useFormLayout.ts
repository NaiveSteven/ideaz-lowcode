import { computed } from 'vue';
import type { FormItemConfigItem } from '@ideal-schema/ideal-ui-v3';

export const useFormLayout = (props: IndexType) => {
  const rowLayout = computed(() => {
    return props.layout.rowLayout
      ? props.layout.rowLayout
      : {
          gutter: 0,
          interval: 0,
          justify: 'start',
          direction: 'row',
        };
  });
  const colLayout = computed(() => {
    return props.layout.colLayout
      ? props.layout.colLayout
      : {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 8,
        };
  });

  const getColLayout = (col: FormItemConfigItem) => {
    return { ...colLayout.value, ...col.colGrid };
  };

  return { rowLayout, colLayout, getColLayout };
};
