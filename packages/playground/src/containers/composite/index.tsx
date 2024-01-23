import { useAsideToggle } from '../../hooks'
import AsideToggleWidget from '../../widgets/aside-toggle-widget'
import { CompositePanelTabs } from './CompositePanelTabs'
import { CompositePanelTabContent } from './CompositePanelTabContent'
import './style.scss'

export const CompositePanel = defineComponent({
  name: 'CompositePanel',
  setup() {
    const { arrowDirection, clickAsideToggleWidget } = useAsideToggle('left', '300px', 300)

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
            arrow-direction={arrowDirection.value}
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
