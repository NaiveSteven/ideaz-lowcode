import { getCurrentInstance } from 'vue';
import type { ComponentInternalInstance } from 'vue';

export const useRadioColumnMethods = () => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance;

  const clearSelection = () => {
    const radioColumn = ctx!.$refs.radioColumn as { clearSelection?: () => void };
    if (radioColumn && radioColumn.clearSelection) {
      radioColumn.clearSelection();
    }
  };

  const toggleRadioSelection = (row: any) => {
    const radioColumn = ctx!.$refs.radioColumn as {
      clearSelection?: () => void;
      toggleRadioSelection: (data: any) => void;
    };
    if (radioColumn && radioColumn.clearSelection) {
      radioColumn.toggleRadioSelection(row);
    }
  };

  return { clearSelection, toggleRadioSelection };
};
