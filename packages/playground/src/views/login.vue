<script setup lang="ts">
  import { ref } from 'vue';

  defineProps<{ msg: string }>();

  const count = ref<Number>(0);
</script>

<template>
  <el-input v-model="count" class="mb-5" />
  <span class="text-blue-50">asfasf</span>
</template>

<style lang="scss" scoped></style>
