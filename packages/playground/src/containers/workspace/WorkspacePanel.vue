<script setup lang="ts">
import { ViewPort } from '@ideal-schema/playground-demi'
import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import mitt from '../../event'
import { useAsideToggle } from '../../hooks'
import Selection from '../../widgets/aux-tool-widget/Selection'
import DesignToolsWidget from '../../widgets/design-tools-widget'
import MobileSimulatorWidget from '../../widgets/simulator-widget/MobileSimulatorWidget'
import PadSimulatorWidget from '../../widgets/simulator-widget/PadSimulatorWidget'
import PcSimulatorWidget from '../../widgets/simulator-widget/PcSimulatorWidget'
import ViewWidget from '../../widgets/view-widget'

const simulatorType = ref<'pc' | 'mobile' | 'pad'>('pc')

const { clickAsideToggleWidget } = useAsideToggle('left', '300px', 300, 'right')
const { viewType, updateViewType } = useWorkspaceComponent()

function handleClickView(value: 'json' | 'design' | 'play') {
  updateViewType(value)
  clickAsideToggleWidget(value === 'design' ? 'right' : undefined)
  mitt.emit('right-aside-toggle', value === 'design' ? 'show' : 'hide')
  mitt.emit('left-aside-toggle', value === 'design' ? 'show' : 'hide')
}

const simulatorWidget = computed(() => {
  switch (simulatorType.value) {
    case 'pc':
      return PcSimulatorWidget
    case 'mobile':
      return MobileSimulatorWidget
    case 'pad':
      return PadSimulatorWidget
  }
})
</script>

<template>
  <div class="workspace-panel">
    <DesignToolsWidget
      :pixel-type="simulatorType"
      :view-type="viewType"
      @click-pixel="(value: 'pc' | 'mobile') => simulatorType = value"
      @click-view="handleClickView"
    />
    <component :is="simulatorWidget">
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
