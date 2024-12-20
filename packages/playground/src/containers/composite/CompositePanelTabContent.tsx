import { ComponentWidget } from '@ideal-schema/playground-demi'
import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import { promiseTimeout } from '@vueuse/core'
import type { CompositeTab } from '../../constants'
import { Drawer } from '../../containers'
import ComponentTreeWidget from '../../widgets/component-tree-widget'
import historyWidget from '../../widgets/history-widget'
import './style.scss'

export const CompositePanelTabContent = defineComponent({
  name: 'CompositePanelTabContent',
  components: { ComponentWidget, ComponentTreeWidget, historyWidget },
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
    const { activeWidget } = useWorkspaceComponent()

    const widgetKey = ref('key')

    const componentName = computed(() => {
      if (props.currentTabPane === 'component')
        return 'ComponentWidget'

      if (props.currentTabPane === 'history')
        return 'historyWidget'

      return 'ComponentTreeWidget'
    })

    watch(
      () => activeWidget.value,
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
