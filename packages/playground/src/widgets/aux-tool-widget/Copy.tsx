import { defineComponent } from 'vue';
import { useWorkspaceStoreMethods, useWorkspaceStoreData } from '@/hooks';

export default defineComponent({
  name: 'Copy',
  setup() {
    const { curOperateComponent } = useWorkspaceStoreData();
    const { copyComponentItem } = useWorkspaceStoreMethods();

    const handleCopy = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      copyComponentItem(curOperateComponent.value);
    };

    return () => (
      <el-button type="primary" size="small" class="aux-button mr-1" onClick={handleCopy}>
        <el-icon>
          <i-document-copy />
        </el-icon>
      </el-button>
    );
  },
});
