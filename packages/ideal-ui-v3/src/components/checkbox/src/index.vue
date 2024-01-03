<template>
  <el-checkbox-group v-model="bindVal" v-bind="attrsAll" v-on="onAll">
    <el-checkbox
      v-for="(option, idx) in options"
      :key="`${option.label}_${idx}`"
      v-bind="option"
      :label="option.value"
    >
      {{ option.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>
<script lang="ts" setup>
  import { useFormComponentAttrs } from '@ideal-schema/ideal-ui-v3';
  import type { CheckboxOptionsItem, IndexType } from '@ideal-schema/ideal-ui-v3';

  interface CSelectProps {
    modelValue: any;
    prop?: string;
    attrs?: IndexType;
    options?: CheckboxOptionsItem[];
    on?: IndexType;
    rowData?: any;
  }

  const props = withDefaults(defineProps<CSelectProps>(), {
    on: () => ({}),
    attrs: () => ({}),
  });
  const emit = defineEmits(['update:modelValue', 'input']);
  const { bindVal, attrsAll, onAll } = useFormComponentAttrs(props, emit);
</script>
