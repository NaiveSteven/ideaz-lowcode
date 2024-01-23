<script setup lang="ts">
import { ViewPort } from '@ideal-schema/playground-demi'
import { useWorkspaceStore } from '@ideal-schema/playground-store'
import DesignToolsWidget from '../../widgets/design-tools-widget'
import Selection from '../../widgets/aux-tool-widget/Selection'
import PcSimulatorWidget from '../../widgets/simulator-widget/PcSimulatorWidget'
import MobileSimulatorWidget from '../../widgets/simulator-widget/MobileSimulatorWidget'
import ViewWidget from '../../widgets/view-widget'
import { useAsideToggle } from '../../hooks'
import mitt from '../../event'

const simulatorType = ref<'pc' | 'mobile'>('pc')

const { clickAsideToggleWidget } = useAsideToggle('left', '300px', 300, 'right')
const workspaceStore = useWorkspaceStore()
const viewType = computed(() => workspaceStore.getViewType)

function handleClickView(value: 'json' | 'design' | 'play') {
  workspaceStore.updateViewType(value)
  clickAsideToggleWidget(value === 'design' ? 'right' : undefined)
  mitt.emit('aside-toggle', value === 'design' ? 'show' : 'hide')
}
</script>

<template>
  <div class="workspace-panel">
    <DesignToolsWidget
      :pixel-type="simulatorType"
      :view-type="viewType"
      @click-pixel="(value: 'pc' | 'mobile') => simulatorType = value"
      @click-view="handleClickView"
    />
    <component :is="simulatorType === 'pc' ? PcSimulatorWidget : MobileSimulatorWidget">
      <Selection v-if="viewType === 'design'" />
      <ViewPort v-if="viewType === 'design'" />
      <ViewWidget v-else :view-type="viewType" />
    </component>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
