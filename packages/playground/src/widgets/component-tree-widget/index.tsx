import { defineComponent, ref, computed, onMounted } from 'vue';
import { useWorkspaceStoreData, useWorkspaceStoreMethods } from '@/hooks';
import { useGlobalSettingStore } from '@ideal-schema/playground-store';
import type { ElTree } from 'element-plus';

export default defineComponent({
  name: 'ComponentTreeWidget',
  setup() {
    const globalSettingStore = useGlobalSettingStore();
    const { workspaceComponentList, curOperateComponent } = useWorkspaceStoreData();
    const { updateCurOperateComponent } = useWorkspaceStoreMethods();

    const workspaceComponentType = computed(() => globalSettingStore.getWorkspaceComponentType);

    const tree = ref<InstanceType<typeof ElTree>>();

    const treeData = computed(() => {
      if (workspaceComponentType.value === 'form') {
        return [{ label: '表单', id: 'form', children: workspaceComponentList.value }];
      }
      const formItemTree: any = [];
      const tableColTree: any = [];
      workspaceComponentList.value[0].schema.tableCols?.forEach((item) => {
        if (item.formItemProps) {
          formItemTree.push({
            ...item.formItemProps,
            label: item.formItemProps.formItem?.label || item.formItemProps.slot,
          });
        }
        tableColTree.push({
          ...item,
          label: item.label || item.slot,
        });
      });
      return [
        {
          label: '表单表格',
          id: workspaceComponentList.value[0].id,
          children: formItemTree.concat(tableColTree),
        },
      ];
    });

    onMounted(async () => {
      if (tree.value) {
        tree.value.setCurrentKey(curOperateComponent.value.id || 'form');
      }
    });

    const handleClick = (item: WorkspaceComponentItem) => {
      if (item.id === 'form') {
        updateCurOperateComponent({} as WorkspaceComponentItem);
        return;
      }
      updateCurOperateComponent(item);
    };

    const renderTreeDefault = ({ data }: { data: WorkspaceComponentItem }) => {
      return (
        <div class="text-xs w-full h-full flex items-center" onClick={() => handleClick(data)}>
          {data.label}
        </div>
      );
    };

    return () => (
      <el-tree
        ref={tree}
        nodeKey="id"
        data={treeData.value}
        defaultExpandAll={true}
        expandOnClickNode={false}
        highlightCurrent={true}
        v-slots={{ default: renderTreeDefault }}
      />
    );
  },
});
