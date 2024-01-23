import { COMPOSITE_TABS } from '../../constants'
import type { CompositeTab } from '../../constants'

export const CompositePanelTabs = defineComponent({
  name: 'CompositePanelTabs',
  props: {
    modelValue: {
      type: String as PropType<string>,
      default: 'component',
    },
    currentTabPaneInfo: {
      type: Object as PropType<CompositeTab>,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue', 'update:currentTabPaneInfo'],
  setup(props, { emit }) {
    const clickTabPane = (item: CompositeTab) => {
      emit('update:modelValue', item.key)
      emit('update:currentTabPaneInfo', item)
    }

    return () => (
      <div class="composite-panel-tabs">
        {COMPOSITE_TABS.map(item => (
          <el-tooltip placement="right" content={item.title} showAfter={500} effect="dark">
            <div
              class={[
                'composite-panel-tabs-pane',
                props.modelValue === item.key && 'composite-panel-tabs-pane--active',
              ]}
              onClick={() => clickTabPane(item)}
            >
              {h(resolveComponent(item.icon), { width: '20px', height: '20px' })}
            </div>
          </el-tooltip>
        ))}
      </div>
    )
  },
})
