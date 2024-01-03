import { computed } from 'vue';
import { useGlobalSetting } from '@ideal-schema/playground-hooks';
import {
  useGlobalSettingStore,
  useWorkspaceStore,
  useMiddleFormStore,
} from '@ideal-schema/playground-store';
import { useVue3TableProCode } from './useVue3TableProPageCode';
import { useVue2TableProCode } from './useVue2TableProPageCode';
import { useFormDialogCode } from './useFormDialogCode';
import { useVue2TableProDialogCode } from './useVue2TableProDialogCode';
import { useVue3TableProDialogCode } from './useVue3TableProDialogCode';
import { useFormPageCode } from './useFormPageCode';

export const usePageCode = () => {
  const { version } = useGlobalSetting();
  const workspaceStore = useWorkspaceStore();
  const middleFormStore = useMiddleFormStore();
  const globalSettingStore = useGlobalSettingStore();
  const workspaceComponentType = computed(() => globalSettingStore.getWorkspaceComponentType);

  const componentList = computed(() => workspaceStore.getWorkspaceComponentList);
  const middleFormConfig = computed(() => middleFormStore.getFormConfig);

  const isDialog = computed(() => {
    if (workspaceComponentType.value === 'form') {
      return middleFormConfig.value.background === 'dialog';
    }
    return componentList.value[0]?.templateFormData?.background === 'dialog';
  });

  const getPageCode = () => {
    if (version.value === 2) {
      if (workspaceComponentType.value === 'form') {
        if (isDialog.value) return useFormDialogCode(version.value);
        return useFormPageCode(version.value);
      }
      if (workspaceComponentType.value === 'tablePro') {
        if (isDialog.value) return useVue2TableProDialogCode();
        return useVue2TableProCode();
      }
    }

    if (version.value === 3) {
      if (workspaceComponentType.value === 'form') {
        if (isDialog.value) return useFormDialogCode(version.value);
        return useFormPageCode(version.value);
      }
      const { code } = useVue3TableProCode();
      if (workspaceComponentType.value === 'tablePro') {
        if (isDialog.value) return useVue3TableProDialogCode().code;
        return code;
      }
    }

    return '';
  };

  return { getPageCode };
};
