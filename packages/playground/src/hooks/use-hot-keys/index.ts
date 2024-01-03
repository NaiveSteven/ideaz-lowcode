import { watch, computed } from 'vue';
import { useMagicKeys } from '@vueuse/core';
import { ElMessage } from 'element-plus';
import { useWorkspaceStore } from '@ideal-schema/playground-store';

export const useHotKeys = (keyboard: string, callback: any) => {
  const keys = useMagicKeys();
  const shiftCtrlA = keys[keyboard];
  const workspaceStore = useWorkspaceStore();

  const viewType = computed(() => workspaceStore.getViewType);

  watch(shiftCtrlA, (v) => {
    if (viewType.value !== 'design' && v) {
      ElMessage({
        type: 'warning',
        message: '请在画布处执行该操作',
      });
      return;
    }
    if (v) callback();
  });
};
