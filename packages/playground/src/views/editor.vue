<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CompositePanel, Settings, WorkspacePanel } from '@/containers'
import TipDialogWidget from '@/widgets/tip-dialog-widget/index.vue'
import { useDriver } from '@/hooks'

const { startDriver, getIsNew } = useDriver()
const isShowTipDialog = ref(false)
const isUpdate = Number(
  sessionStorage.getItem('isUpdate') ? JSON.parse(sessionStorage.getItem('isUpdate')!) : 0,
)

if (!getIsNew() && !isUpdate)
  isShowTipDialog.value = true

onMounted(() => {
  setTimeout(() => {
    startDriver()
  }, 201)
})
</script>

<template>
  <div class="root">
    <div class="main-panel">
      <CompositePanel />
      <WorkspacePanel />
      <!-- <Settings /> -->
    </div>
    <TipDialogWidget v-model="isShowTipDialog" />
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 100%;

  .main-panel {
    position: relative;
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;

    .workspace-panel {
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      padding: 4px;
      overflow: hidden;
      background-color: #eee;
    }
  }
}
</style>
