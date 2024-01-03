import { computed } from 'vue';
import { isFunction } from '@ideal-schema/shared';

export const useFormItemProps = (props: Record<any, any>) => {
  const formItemProps = computed(() => {
    const myProps = { ...(props.col.formItem || {}) };
    if (isFunction(myProps.label)) {
      delete myProps.label;
    }
    return myProps;
  });

  return { formItemProps };
};
