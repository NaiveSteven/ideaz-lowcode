import { ref, computed } from 'vue';
import { useWindowReactiveSize } from '../use-window-reactive-size';
import type { TableProCol, FormItemConfigItem } from '@ideal-schema/ideal-ui-v3';

export const useTableProFormItems = (props: Record<any, any>) => {
  const toggleButtonType = ref('expand');

  const { windowReactiveSize } = useWindowReactiveSize();

  const virtualFormItemConfig = computed<FormItemConfigItem[]>(() => {
    return props.config.tableCols
      ?.filter((item: TableProCol) => {
        if (item.formItemProps) {
          return item.formItemProps;
        }
      })
      .map(
        (cur: TableProCol, index: number): FormItemConfigItem => ({
          prop: cur.prop,
          formItem: {
            label: cur.label,
            ...cur.formItemProps?.formItem,
          },
          hideUseVShow: () => judgeIsHideFormItem(index),
          ...cur.formItemProps,
        })
      );
  });

  const formItemConfig = computed(() => {
    return virtualFormItemConfig.value.concat([
      {
        slot: 'button',
        colGrid: btnLayout.value,
      },
    ]);
  });

  const btnLayout = computed(() => {
    const arrLength: number =
      props.config.tableCols?.filter((item: TableProCol) => {
        if (item.formItemProps) {
          return item.formItemProps;
        }
      }).length + 1;
    return {
      class: 'c-table-pro-btn-col',
      xs: {
        span: 24,
        offset: computedOffset(24, arrLength),
      },
      sm: {
        span: 12,
        offset: computedOffset(12, arrLength),
      },
      md: {
        span: 12,
        offset: computedOffset(12, arrLength),
      },
      lg: {
        span: 8,
        offset: computedOffset(8, arrLength),
      },
      xl: {
        span: 8,
        offset: computedOffset(8, arrLength),
      },
    };
  });

  const isShowToggleButton = computed(() => {
    if (windowReactiveSize.value === 'xl' || windowReactiveSize.value === 'lg') {
      return formItemConfig.value.length > 3;
    }
    if (
      windowReactiveSize.value === 'md' ||
      windowReactiveSize.value === 'sm' ||
      windowReactiveSize.value === 'xs'
    ) {
      return formItemConfig.value.length > 2;
    }
    return true;
  });

  const computedOffset = (span: number, length: number) => {
    const itemsLength = virtualFormItemConfig.value.length;
    if (toggleButtonType.value === 'expand') {
      if (
        itemsLength === 1 &&
        (windowReactiveSize.value === 'lg' || windowReactiveSize.value === 'xl')
      ) {
        return 8;
      }
      return 0;
    }
    // 一行几个
    const num = 24 / span;
    // 余数
    const remainder = length % num;
    if (remainder === 0) {
      return 0;
    } else {
      return (num - remainder) * span;
    }
  };

  const judgeIsHideFormItem = (index: number): boolean => {
    if (windowReactiveSize.value === 'xl' || windowReactiveSize.value === 'lg') {
      return index > 1 && toggleButtonType.value === 'expand';
    }
    if (
      windowReactiveSize.value === 'md' ||
      windowReactiveSize.value === 'sm' ||
      windowReactiveSize.value === 'xs'
    ) {
      return index > 0 && toggleButtonType.value === 'expand';
    }
    return false;
  };

  return { toggleButtonType, formItemConfig, isShowToggleButton };
};
