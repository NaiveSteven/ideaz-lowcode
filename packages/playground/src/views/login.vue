<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref<number>(0)
</script>

<template>
  <el-input v-model="count" class="mb-5" />
  <span class="text-blue-50">asfasf</span>
  <span class="text-lg text-blue-50">ideaz-element</span>
  <z-table />
</template>

<style lang="scss" scoped></style>
