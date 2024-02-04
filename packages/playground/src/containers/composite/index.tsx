import { useAsideToggle } from '../../hooks'
import AsideToggleWidget from '../../widgets/aside-toggle-widget'
import { CompositePanelTabContent } from './CompositePanelTabContent'
import { CompositePanelTabs } from './CompositePanelTabs'
import './style.scss'

export const CompositePanel = defineComponent({
  name: 'CompositePanel',
  setup() {
    const { compositeArrowDirection, clickAsideToggleWidget } = useAsideToggle('left', '300px', 300)

    // mitt.on('left-aside-toggle', ((val: 'show' | 'hide') => {
    //   const direction = val === 'show' ? 'left' : 'right'
    //   if (arrowDirection.value === direction) return
    //   clickAsideToggleWidget()
    // }) as () => void)

    // onBeforeUnmount(() => {
    //   mitt.off('left-aside-toggle')
    // })

    const currentTabPane = ref('component')
    const currentTabPaneInfo = ref({
      key: 'component',
      title: '组件',
      icon: 'i-setting',
    })

    return () => (
      <div class="composite-panel">
        <CompositePanelTabs
          v-model={currentTabPane.value}
          v-model:currentTabPaneInfo={currentTabPaneInfo.value}
        />
        <div ref="content" class="composite-panel-tabs-content">
          <AsideToggleWidget
            right="-11px"
            arrow-direction={compositeArrowDirection.value}
            onClick={() => clickAsideToggleWidget()}
          />
          <CompositePanelTabContent
            currentTabPane={currentTabPane.value}
            currentTabPaneInfo={currentTabPaneInfo.value}
          />
        </div>
      </div>
    )
  },
})
