import type { TableCol } from '@ideal-schema/ideal-ui-v3';

export const useTableColComponentName = (tableCol: TableCol) => {
  const getComponentName = (type: string | (() => string)) => {
    const cNames = ['select'];
    const propComponentName = typeof type === 'function' ? type() : type;

    if (cNames.indexOf(propComponentName) > -1) {
      return 'il-' + propComponentName;
    } else {
      return 'il-dynamic-component';
    }
  };

  const getDynamicComponentName = (type: string | (() => string)) => {
    const eleNames = ['input', 'datepicker', 'switch'];
    const propComponentName = typeof type === 'function' ? type() : type;

    if (eleNames.indexOf(propComponentName) > -1) {
      if (propComponentName === 'datepicker') {
        return 'el-date-picker';
      }
      return 'el-' + propComponentName;
    } else {
      return propComponentName || 'unknown';
    }
  };

  return { getComponentName, getDynamicComponentName };
};
