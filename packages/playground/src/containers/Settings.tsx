import { SettingForm } from '@ideal-schema/playground-demi'
import { Drawer } from '../containers'
import { useAsideToggle } from '../hooks'
import AsideToggleWidget from '../widgets/aside-toggle-widget'
import SettingBreadcrumbWidget from '../widgets/setting-breadcrumb-widget'
import './style.scss'

export const Settings = defineComponent({
  name: 'Settings',
  setup() {
    const { settingArrowDirection, clickAsideToggleWidget } = useAsideToggle('right', '300px', 300)

    return () => (
      <div id="settings-panel" ref="content" class="settings-panel">
        <AsideToggleWidget
          left={settingArrowDirection.value === 'right' ? '-11px' : '-22px'}
          arrow-direction={settingArrowDirection.value}
          onClick={() => clickAsideToggleWidget()}
        />
        <div class="panel">
          <div></div>
          <Drawer title="属性配置">
            <div class="wrapper">
              <SettingBreadcrumbWidget />
              <SettingForm />
            </div>
          </Drawer>
        </div>
      </div>
    )
  },
})
