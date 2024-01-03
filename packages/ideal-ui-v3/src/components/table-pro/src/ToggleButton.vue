<template>
  <div class="c-toggle__container" @click="handleClick">
    <el-button class="c-toggle__button" link type="primary" size="small">
      {{ text }}
      <el-icon :class="iconClass"><i-arrow-down /></el-icon>
    </el-button>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';

  const props = withDefaults(defineProps<{ modelValue: string }>(), {
    modelValue: 'expand',
  });

  const emits = defineEmits(['update:modelValue']);

  const text = computed(() => {
    return props.modelValue === 'expand' ? '展开' : '收起';
  });

  const iconClass = computed(() => {
    return {
      'c-toggle__icon': true,
      'c-icon__arrow': props.modelValue !== 'expand',
    };
  });

  const handleClick = () => {
    emits('update:modelValue', props.modelValue === 'expand' ? 'up' : 'expand');
  };
</script>
<style lang="scss">
  .c-toggle__container {
    .el-button--small {
      height: var(--el-button-size) !important;
    }
  }
</style>
