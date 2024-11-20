import { useGlobalSetting, useWorkspaceComponent } from '@ideal-schema/playground-store'
import type { ElTree } from 'element-plus'

export default defineComponent({
  name: 'ComponentTreeWidget',
  setup() {
    const { workspaceComponentType } = useGlobalSetting()
    const { workspaceComponentList, activeWidget, updateActiveWidget } = useWorkspaceComponent()

    const tree = ref<InstanceType<typeof ElTree>>()

    const treeData = computed(() => {
      if (workspaceComponentType.value === 'form')
        return [{ title: '表单', id: 'form', children: workspaceComponentList.value }]

      const formItemTree: any = []
      const tableColTree: any = []
      workspaceComponentList.value[0].schema.columns?.forEach((item) => {
        if (item.search) {
          formItemTree.push({
            ...item.search,
            title: item.search.label || item.search.slot,
          })
        }
        tableColTree.push({
          ...item,
          title: item.label || item.slot,
        })
      })
      return [
        {
          title: '增删改查',
          id: workspaceComponentList.value[0].id,
          children: [
            {
              title: '筛选表单',
              children: formItemTree,
            },
            {
              title: '表格项',
              children: tableColTree,
            },
          ],
        },
      ]
    })

    onMounted(async () => {
      if (tree.value)
        tree.value.setCurrentKey(activeWidget.value.id || 'form')
    })

    const handleClick = (item: WorkspaceComponentItem) => {
      if (item.id === workspaceComponentList.value[0].id) {
        updateActiveWidget(workspaceComponentList.value[0])
        return
      }
      if (item.title === '筛选表单' || item.title === '表格项')
        return

      if (item.id === 'form') {
        updateActiveWidget({} as WorkspaceComponentItem)
        return
      }
      updateActiveWidget(item)
    }

    const renderTreeDefault = ({ data }: { data: WorkspaceComponentItem }) => {
      return (
        <div class="h-full w-full flex items-center text-xs" onClick={() => handleClick(data)}>
          {data.title}
        </div>
      )
    }

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
    )
  },
})
