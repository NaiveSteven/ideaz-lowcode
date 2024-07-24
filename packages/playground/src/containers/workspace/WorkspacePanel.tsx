import { ViewPort } from '@ideal-schema/playground-demi'
import { useGlobalSetting, useWorkspaceComponent } from '@ideal-schema/playground-store'
import { useAsideToggle } from '../../hooks'
import Selection from '../../widgets/aux-tool-widget/Selection'
import DesignToolsWidget from '../../widgets/design-tools-widget'
import MobileSimulatorWidget from '../../widgets/simulator-widget/MobileSimulatorWidget'
import PadSimulatorWidget from '../../widgets/simulator-widget/PadSimulatorWidget'
import PcSimulatorWidget from '../../widgets/simulator-widget/PcSimulatorWidget'
import ViewWidget from '../../widgets/view-widget'

export default defineComponent({
  name: 'WorkspacePanel',
  setup() {
    const { compositeArrowDirection, settingArrowDirection } = useGlobalSetting()
    const { clickAsideToggleWidget: clickSettingAsideToggle } = useAsideToggle('right', '300px', 300)
    const { clickAsideToggleWidget: clickCompositeAsideToggle } = useAsideToggle('left', '300px', 300)
    const { viewType, updateViewType, simulatorType, updateSimulatorType } = useWorkspaceComponent()

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

    return () => {
      return (
        <div class="workspace-panel">
          <DesignToolsWidget
            pixel-type={simulatorType.value}
            view-type={viewType.value}
            onClickPixel={(value: 'pc' | 'mobile' | 'pad') => updateSimulatorType(value)}
            onClickView={handleClickView}
          />
          <simulatorWidget.value>
            {viewType.value === 'design' && <Selection />}
            {viewType.value === 'design' && <ViewPort />}
            {viewType.value !== 'design' && <ViewWidget view-type={viewType.value} />}
          </simulatorWidget.value>
        </div>
      )
    }
  },
})
