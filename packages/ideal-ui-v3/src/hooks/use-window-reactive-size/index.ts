import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

export const useWindowReactiveSize = () => {
  const { width } = useWindowSize();
  const windowReactiveSize = computed(() => {
    if (width.value >= 1920) {
      return 'xl';
    }
    if (width.value >= 1200) {
      return 'lg';
    }
    if (width.value >= 992) {
      return 'md';
    }
    if (width.value >= 768) {
      return 'sm';
    }
    if (width.value < 768) {
      return 'xs';
    }
    return 'xs';
  });

  return { windowReactiveSize };
};
