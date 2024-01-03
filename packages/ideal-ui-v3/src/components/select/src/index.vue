<template>
  <el-select v-model="bindVal" v-bind="attrsAll" v-on="onAll">
    <el-option
      v-for="(option, idx) in props.options"
      :key="`${option.value}_${idx}`"
      :label="option.label"
      :value="option.value"
      :disabled="option.disabled"
    />
  </el-select>
</template>
<script lang="ts" setup>
  import { useFormComponentAttrs } from '@ideal-schema/ideal-ui-v3';
  import type { OptionsItem, IndexType } from '@ideal-schema/ideal-ui-v3';

  interface CSelectProps {
    modelValue: any;
    prop?: string;
    attrs?: IndexType;
    options?: OptionsItem[];
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
