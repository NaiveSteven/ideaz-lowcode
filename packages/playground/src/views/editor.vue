<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { WorkspacePanel } from '@/containers';
import { Settings, CompositePanel } from '@/containers';
import TipDialogWidget from '@/widgets/tip-dialog-widget/index.vue';
import { useDriver } from '@/hooks';

const { startDriver, getIsNew } = useDriver();
const isShowTipDialog = ref(false);
const isUpdate = Number(
  sessionStorage.getItem('isUpdate') ? JSON.parse(sessionStorage.getItem('isUpdate')!) : 0
);

if (!getIsNew() && !isUpdate) {
  isShowTipDialog.value = true;
}

onMounted(() => {
  setTimeout(() => {
    startDriver();
  }, 201);
});
</script>

<template>
  <div class="root">
    <div class="main-panel">
      <CompositePanel />
      <WorkspacePanel />
      <Settings />
    </div>
    <TipDialogWidget v-model="isShowTipDialog" />
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  flex-grow: 1;

  .main-panel {
    position: relative;
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 100%;
    min-height: 0;
    flex: 1;

    .workspace-panel {
      position: relative;
      display: flex;
      overflow: hidden;
      padding: 4px;
      background-color: #eee;
      flex-grow: 1;
      flex-direction: column;
      box-sizing: border-box;
    }
  }
}
</style>
