<template>
  <component :is="componentName" v-model="bindVal" v-bind="attrsAll" v-on="onAll" />
</template>

<script lang="ts" setup>
  import { useFormComponentAttrs } from '@ideal-schema/ideal-ui-v3';
  import type { OptionsItem } from '@ideal-schema/ideal-ui-v3';

  interface CInputProps {
    modelValue: any;
    prop?: string;
    componentName: string;
    attrs?: {
      [propName: string]: any;
    };
    options?: OptionsItem[];
    on?: {
      [propName: string]: any;
    };
    rowData?: any;
  }

  const props = withDefaults(defineProps<CInputProps>(), {
    on: () => ({}),
    attrs: () => ({}),
  });
  const emit = defineEmits(['input', 'update:modelValue']);
  const { bindVal, attrsAll, onAll } = useFormComponentAttrs(props, emit);
</script>
