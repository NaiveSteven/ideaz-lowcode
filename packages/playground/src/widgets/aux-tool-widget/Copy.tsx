import { useWorkspaceComponent } from '@ideal-schema/playground-store';

export default defineComponent({
  name: 'Copy',
  setup() {
    const { activeWidget, copyWidget } = useWorkspaceComponent();

    const handleCopy = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      copyWidget(activeWidget.value);
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
