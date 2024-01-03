<template>
  <span>
    {{ label }}
    <el-tooltip v-if="tooltip" effect="dark" :content="tooltip" placement="top">
      <el-icon v-if="tooltip" class="c-form-item-label__icon"><i-question-filled /></el-icon>
    </el-tooltip>
    {{ colon ? ':' : null }}
  </span>
</template>

<script setup lang="ts">
  type FormItemLabelProps = {
    tooltip?: string;
    label?: string;
    colon?: boolean;
  };

  withDefaults(defineProps<FormItemLabelProps>(), {
    tooltip: '',
    label: '',
    colon: true,
  });
</script>
