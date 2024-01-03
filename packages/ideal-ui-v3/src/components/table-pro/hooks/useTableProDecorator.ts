import { computed } from 'vue';
import { isObject } from '@ideal-schema/shared';

export const useTableProDecorator = (props: Record<any, any>) => {
  const formDecoratorName = computed(() => {
    return isObject(props.config.formDecorator)
      ? props.config.formDecorator.name || 'el-card'
      : 'el-card';
  });

  const tableDecoratorName = computed(() => {
    return isObject(props.config.tableDecorator)
      ? props.config.tableDecorator.name || 'el-card'
      : 'el-card';
  });

  const formDecoratorProps = computed(() => {
    return isObject(props.config.formDecorator) ? props.config.formDecorator.attrs : {};
  });

  const tableDecoratorProps = computed(() => {
    return isObject(props.config.tableDecorator) ? props.config.tableDecorator.attrs : {};
  });

  const formDecoratorEvents = computed(() => {
    return isObject(props.config.formDecorator) ? props.config.formDecorator.on : {};
  });

  const tableDecoratorEvents = computed(() => {
    return isObject(props.config.tableDecorator) ? props.config.tableDecorator.on : {};
  });

  return {
    formDecoratorName,
    tableDecoratorName,
    formDecoratorProps,
    tableDecoratorProps,
    formDecoratorEvents,
    tableDecoratorEvents,
  };
};
