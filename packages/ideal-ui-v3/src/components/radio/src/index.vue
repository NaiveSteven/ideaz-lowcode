<template>
  <el-radio-group v-model="bindVal" v-bind="attrsAll" v-on="onAll">
    <component
      v-bind="option"
      :is="getChildComponentName(option)"
      v-for="(option, idx) in options"
      :key="`${option.value}_${idx}`"
      :label="option.value"
    >
      {{ option.label }}
    </component>
  </el-radio-group>
</template>
<script lang="ts" setup>
  import { useFormComponentAttrs } from '@ideal-schema/ideal-ui-v3';
  import type { RadioOptionsItem, IndexType } from '@ideal-schema/ideal-ui-v3';

  interface CSelectProps {
    modelValue: any;
    prop?: string;
    attrs?: IndexType;
    options?: RadioOptionsItem[];
    on?: IndexType;
    rowData?: any;
  }

  const props = withDefaults(defineProps<CSelectProps>(), {
    on: () => ({}),
    attrs: () => ({}),
  });
  const emit = defineEmits(['update:modelValue', 'input']);
  const { bindVal, attrsAll, onAll } = useFormComponentAttrs(props, emit);

  const getChildComponentName = (option: RadioOptionsItem) => {
    if (!option.type) return 'el-radio';
    if (option.type === 'radio' || option.type === 'radio-button') return 'el-' + option.type;
    return 'el-radio';
  };
</script>
