// import { withInstall } from '@vue-bms-ui-v3/utils/with-install';
import Select from './src/index.vue';
// import type { App, Plugin } from 'vue';

// export type SFCWithInstall<T> = T & Plugin;

// Select.install = (app: App) => {
//   app.component(Select.name as string, Select);
// };

// const _Select = Select as SFCWithInstall<typeof Select>;

// export default _Select;
// export const CSelect = _Select;

import type { App } from 'vue';

export default {
  install(app: App) {
    app.component('IlSelect', Select);
  },
};
