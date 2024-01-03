
import { ref, computed } from 'vue';
import { useWindowReactiveSize } from './useWindowReactiveSize';
import { isFunction } from '@ideal-schema/shared';
import type { TableCol } from '@ideal-schema/ideal-ui-v3';

export const useTableProFormItems = (props: Record<any, any>) => {
  const toggleButtonType = ref(props.config.defaultExpand ? 'up' : 'expand');

  const { windowReactiveSize } = useWindowReactiveSize();

  const virtualFormItemConfig = computed(() => {
    return props.config.tableCols
      ?.filter((item: TableCol) => {
        if (item.formItemProps) {
          return (
            item.formItemProps &&
            (isFunction(item.formItemProps.hide)
              ? !item.formItemProps.hide()
              : !item.formItemProps.hide)
          );
        }
      })
      .map((cur: TableCol, index: number) => ({
        prop: cur.prop,
        ...cur.formItemProps,
        formItem: {
          label: cur.label,
          ...cur.formItemProps?.formItem,
          class: getNoLabelClass(cur, index),
        },
        attrs: {
          placeholder: setDefaultPlaceholder(cur),
          clearable: true,
          filterable: true,
          ...cur.formItemProps?.attrs,
        },
        hideUseVShow: () => judgeIsHideFormItem(index),
      }));
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
    const arrLength = virtualFormItemConfig.value.length + 1;
    return {
      class:
        toggleButtonType.value === 'expand'
          ? 'c-button-col__container c-table-pro-btn__col'
          : 'c-table-pro-btn__col',
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
      return virtualFormItemConfig.value.length + 1 > 3;
    }
    if (
      windowReactiveSize.value === 'md' ||
      windowReactiveSize.value === 'sm' ||
      windowReactiveSize.value === 'xs'
    ) {
      return virtualFormItemConfig.value.length + 1 > 2;
    }
    return true;
  });

  const computedOffset = (span: number, length: number) => {
    if (toggleButtonType.value === 'expand') {
      if (
        length === 2 &&
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

  const judgeIsHideFormItem = (index: number) => {
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

  const getNoLabelClass = (tableCol: TableCol, index: number) => {
    let cls = tableCol.formItemProps?.formItem?.class
      ? tableCol.formItemProps?.formItem?.class
      : '';
    if (tableCol.formItemProps?.formItem?.label === '') {
      if (windowReactiveSize.value === 'xl' || windowReactiveSize.value === 'lg') {
        if (index % 3 === 0) {
          cls += ' c-table-pro-item__label--left c-table-pro-item__label--no';
        }
        if (index % 3 === 1) {
          cls += ' c-table-pro-item__label--middle c-table-pro-item__label--no';
        }
        if (index % 3 === 2) {
          cls += ' c-table-pro-item__label--right c-table-pro-item__label--no';
        }
      }
      if (windowReactiveSize.value === 'md' || windowReactiveSize.value === 'sm') {
        if (index % 2 === 0) {
          cls += ' c-table-pro-item-md__label--left c-table-pro-item__label--no';
        }
        if (index % 2 === 1) {
          cls += ' c-table-pro-item-md__label--right c-table-pro-item__label--no';
        }
      }
      if (windowReactiveSize.value === 'xs') {
        cls += ' c-table-pro-item__label--no';
      }
    }
    return cls;
  };

  const setDefaultPlaceholder = (tableCol: TableCol) => {
    const selectTypes = ['cascader', 'select', 'datepicker', 'picker'];
    const label = tableCol.formItemProps?.formItem?.label || tableCol.label;
    const type = tableCol.formItemProps?.type;
    if (selectTypes.indexOf(type) > -1) {
      return label ? `请选择${label}` : '请选择';
    } else {
      return label ? `请输入${label}` : '请输入';
    }
  };

  return { isShowToggleButton, formItemConfig, toggleButtonType };
};
