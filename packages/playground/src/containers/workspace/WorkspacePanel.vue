<script setup lang="ts">
  import { ref, computed } from 'vue';
  import DesignToolsWidget from '@/widgets/design-tools-widget';
  import Selection from '@/widgets/aux-tool-widget/Selection';
  import PcSimulatorWidget from '@/widgets/simulator-widget/PcSimulatorWidget';
  import MobileSimulatorWidget from '@/widgets/simulator-widget/MobileSimulatorWidget';
  import ViewWidget from '@/widgets/view-widget';
  import ViewPort from './ViewPort.vue';
  import { useAsideToggle } from '@/hooks';
  import { useWorkspaceStore } from '@ideal-schema/playground-store';
  import mitt from '@ideal-schema/playground-event';

  const simulatorType = ref<'pc' | 'mobile'>('pc');

  const { clickAsideToggleWidget } = useAsideToggle('left', '300px', 300, 'right');
  const workspaceStore = useWorkspaceStore();
  const curOperateComponent = computed(() => workspaceStore.getCurOperateComponent);
  const componentList = computed(() => workspaceStore.getWorkspaceComponentList);
  const viewType = computed(() => workspaceStore.getViewType);

  const handleClickView = (value: 'json' | 'design' | 'play') => {
    workspaceStore.updateViewType(value);
    clickAsideToggleWidget(value === 'design' ? 'right' : undefined);
    mitt.emit('aside-toggle', value === 'design' ? 'show' : 'hide');
  };
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
    display: flex;
    overflow: hidden;
    padding: 4px;
    background-color: #eee;
    flex-grow: 1;
    flex-direction: column;
    box-sizing: border-box;
  }
</style>
