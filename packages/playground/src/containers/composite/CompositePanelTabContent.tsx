import { defineComponent, PropType, h, resolveComponent, computed, ref, watch } from 'vue';
import { promiseTimeout } from '@vueuse/core';
import { useWorkspaceStoreData } from '@/hooks';
import { useHistoryStore } from '@ideal-schema/playground-store';
import { Drawer } from '@/containers';
import HistoryWidget from '@/widgets/history-widget';
import ComponentTreeWidget from '@/widgets/component-tree-widget';
import { ComponentWidget } from '@ideal-schema/playground-demi';
import './style.scss';
import type { CompositeTab } from '@/constants';

export const CompositePanelTabContent = defineComponent({
  name: 'CompositePanelTabContent',
  components: { ComponentWidget, HistoryWidget, ComponentTreeWidget },
  props: {
    currentTabPane: {
      type: String as PropType<string>,
      default: 'component',
    },
    currentTabPaneInfo: {
      type: Object as PropType<CompositeTab>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { curOperateComponent } = useWorkspaceStoreData();
    const historyStore = useHistoryStore();

    const widgetKey = ref('key');

    const componentName = computed(() => {
      if (props.currentTabPane === 'component') {
        return 'ComponentWidget';
      }
      if (props.currentTabPane === 'history') {
        return 'HistoryWidget';
      }
      return 'ComponentTreeWidget';
    });

    watch(
      () => curOperateComponent.value,
      async (newVal, oldVal) => {
        if (newVal.id !== oldVal.id) {
          await promiseTimeout(0);
          widgetKey.value = String(new Date().valueOf());
        }
      }
    );

    watch(
      () => historyStore.current,
      async () => {
        await promiseTimeout(0);
        widgetKey.value = String(new Date().valueOf());
      }
    );

    return () => (
      <Drawer title={props.currentTabPaneInfo.title}>
        {componentName.value === 'ComponentTreeWidget'
          ? h(resolveComponent(componentName.value), { key: widgetKey.value })
          : h(resolveComponent(componentName.value))}
      </Drawer>
    );
  },
});
