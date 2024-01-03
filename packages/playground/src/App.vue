<template>
  <router-view />
</template>

<script lang="ts" setup>
  // import { useRouter } from 'vue-router';

  // const router = useRouter();

  const schemaMode = localStorage.getItem('schemaMode');
  const version = localStorage.getItem('version');

  if (!schemaMode && !version) {
    localStorage.setItem('schemaMode', JSON.stringify('customSchema'));
    localStorage.setItem('version', JSON.stringify('2'));
  }
</script>

<style></style>
