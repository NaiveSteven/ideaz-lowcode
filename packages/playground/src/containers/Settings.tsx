import { onBeforeUnmount, defineComponent } from 'vue';
import AsideToggleWidget from '@/widgets/aside-toggle-widget';
import SettingBreadcrumbWidget from '@/widgets/setting-breadcrumb-widget';
import { Drawer } from '@/containers';
import { SettingForm } from '@ideal-schema/playground-demi';
import { useAsideToggle } from '@/hooks';
import mitt from '@ideal-schema/playground-event';
import './style.scss';

export const Settings = defineComponent({
  name: 'Settings',
  setup() {
    const { arrowDirection, clickAsideToggleWidget } = useAsideToggle('right', '300px', 300);

    mitt.on('aside-toggle', ((val: 'show' | 'hide') => {
      arrowDirection.value = val && val === 'show' ? 'right' : 'left';
    }) as () => void);

    onBeforeUnmount(() => {
      mitt.off('aside-toggle');
    });

    return () => (
      <div id="settings-panel" ref="content" class="settings-panel">
        <AsideToggleWidget
          left={arrowDirection.value === 'right' ? '-11px' : '-22px'}
          arrow-direction={arrowDirection.value}
          onClick={clickAsideToggleWidget}
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
    );
  },
});
