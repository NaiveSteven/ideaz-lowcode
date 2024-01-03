import { computed } from 'vue';
import { useGlobalSettingStore } from '@ideal-schema/playground-store';

export const useGlobalSetting = () => {
  const globalSettingStore = useGlobalSettingStore();

  const version = computed(() => globalSettingStore.getVersion);

  return {
    version,
    updateVersion: globalSettingStore.updateVersion,
  };
};
