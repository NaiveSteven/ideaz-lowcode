<script setup lang="ts">
import { CompositePanel, Header, Settings, WorkspacePanel } from '../containers'
import { useDriver } from '../hooks'

const { startDriver } = useDriver()

onMounted(() => {
  setTimeout(() => {
    startDriver()
  }, 201)
})
</script>

<template>
  <div class="root">
    <Header />
    <div class="main-panel">
      <CompositePanel />
      <WorkspacePanel />
      <Settings />
    </div>
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
