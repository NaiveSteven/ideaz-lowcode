import type { PropType } from 'vue'
import { computed, defineComponent, h, ref, resolveComponent, watch } from 'vue'
import { promiseTimeout } from '@vueuse/core'
import { ComponentWidget } from '@ideal-schema/playground-demi'
import { useWorkspaceStoreData } from '@/hooks'
import { Drawer } from '@/containers'
import ComponentTreeWidget from '@/widgets/component-tree-widget'
import './style.scss'
import type { CompositeTab } from '@/constants'

export const CompositePanelTabContent = defineComponent({
  name: 'CompositePanelTabContent',
  components: { ComponentWidget, ComponentTreeWidget },
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
    const { curOperateComponent } = useWorkspaceStoreData()

    const widgetKey = ref('key')

    const componentName = computed(() => {
      if (props.currentTabPane === 'component')
        return 'ComponentWidget'

      return 'ComponentTreeWidget'
    })

    watch(
      () => curOperateComponent.value,
      async (newVal, oldVal) => {
        if (newVal.id !== oldVal.id) {
          await promiseTimeout(0)
          widgetKey.value = String(new Date().valueOf())
        }
      },
    )

    return () => (
      <Drawer title={props.currentTabPaneInfo.title}>
        {componentName.value === 'ComponentTreeWidget'
          ? h(resolveComponent(componentName.value), { key: widgetKey.value })
          : h(resolveComponent(componentName.value))}
      </Drawer>
    )
  },
})
