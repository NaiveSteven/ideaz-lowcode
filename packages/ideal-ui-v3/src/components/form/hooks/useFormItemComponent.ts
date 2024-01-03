import { computed } from 'vue';

export const useFormItemComponent = (props: Record<any, any>) => {
  const componentName = computed(() => {
    return getComponentName(props.col.type);
  });

  const getComponentName = (type: string | (() => string)) => {
    const cNames = ['select', 'radio', 'checkbox'];
    const eleNames = ['input', 'datepicker', 'switch'];
    const propComponentName = typeof type === 'function' ? type() : type;

    if (cNames.indexOf(propComponentName) > -1) {
      return 'il-' + propComponentName;
    } else if (eleNames.indexOf(propComponentName) > -1) {
      if (propComponentName === 'datepicker') {
        return 'el-date-picker';
      }
      return 'el-' + propComponentName;
    } else {
      return propComponentName || 'unknown';
    }
  };

  return { componentName };
};
