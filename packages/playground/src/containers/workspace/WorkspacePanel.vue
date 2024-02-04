<script setup lang="ts">
import { ViewPort } from '@ideal-schema/playground-demi'
import { useGlobalSetting, useWorkspaceComponent } from '@ideal-schema/playground-store'
import { useAsideToggle } from '../../hooks'
import Selection from '../../widgets/aux-tool-widget/Selection'
import DesignToolsWidget from '../../widgets/design-tools-widget'
import MobileSimulatorWidget from '../../widgets/simulator-widget/MobileSimulatorWidget'
import PadSimulatorWidget from '../../widgets/simulator-widget/PadSimulatorWidget'
import PcSimulatorWidget from '../../widgets/simulator-widget/PcSimulatorWidget'
import ViewWidget from '../../widgets/view-widget'

const simulatorType = ref<'pc' | 'mobile' | 'pad'>('pc')

const { compositeArrowDirection, settingArrowDirection } = useGlobalSetting()
const { clickAsideToggleWidget: clickSettingAsideToggle } = useAsideToggle('right', '300px', 300)
const { clickAsideToggleWidget: clickCompositeAsideToggle } = useAsideToggle('left', '300px', 300)
const { viewType, updateViewType } = useWorkspaceComponent()

function handleClickView(value: 'json' | 'design' | 'play') {
  updateViewType(value)
  const compositeDirection = value === 'design' ? 'left' : 'right'
  const settingDirection = value === 'design' ? 'right' : 'left'
  if (compositeArrowDirection.value !== compositeDirection)
    clickCompositeAsideToggle()
  if (settingArrowDirection.value !== settingDirection)
    clickSettingAsideToggle()
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
