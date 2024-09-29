import { useGlobalSetting, useWorkspaceComponent } from '@ideal-schema/playground-store'
import { uid } from '@ideal-schema/shared'
import { cloneDeep } from 'lodash-es'
import { DEFAULT_COMPONENT_TEMPLATES } from '../../materials'
import ComponentList from './ComponentList'

export default defineComponent({
  name: 'ComponentWidget',
  setup() {
    const { updateComponentList, pushComponentItem, updateCurOperateComponent } = useWorkspaceComponent()
    const { workspaceComponentType, updateWorkspaceComponentType } = useGlobalSetting()

    const clickExpandComponentItem = (
      expandComponentItem: WorkspaceComponentItem,
      index: number,
      toId: string,
    ) => {
      if (expandComponentItem.name === 'crud') {
        const componentItem = {
          ...expandComponentItem,
          id: uid(),
          pid: toId,
          schema: {
            ...expandComponentItem.schema,
          },
        }
        updateComponentList([], '清空组件')
        pushComponentItem(componentItem, index, toId)
        updateCurOperateComponent(componentItem)
        updateWorkspaceComponentType('crud')
        return
      }
      else {
        // workspace里面是表单表格，在其他地方拖入表单，则清空表单表格
        if (workspaceComponentType.value === 'crud') {
          updateComponentList([], '清空组件')
          updateCurOperateComponent({} as WorkspaceComponentItem)
        }
        updateWorkspaceComponentType('form')
      }
      // 表单
      if (!expandComponentItem.templates || !Array.isArray(expandComponentItem.templates)) {
        const arrayFormColumns = expandComponentItem.schema?.fieldProps?.columns
        const componentItem = {
          ...expandComponentItem,
          id: uid(),
          pid: toId,
          schema: {
            ...expandComponentItem.schema,
            fieldProps: {
              ...expandComponentItem.schema?.fieldProps,
              columns: arrayFormColumns ? arrayFormColumns.map((item: WorkspaceComponentItem) => ({ ...item, id: uid() })) : undefined,
            },
          },
        }
        pushComponentItem(componentItem, index, toId)
        updateCurOperateComponent(componentItem)
        // 模板
      }
      else if (Array.isArray(expandComponentItem.templates)) {
        updateComponentList(cloneDeep(expandComponentItem.templates!), '添加组件')
        updateCurOperateComponent({} as WorkspaceComponentItem)
      }
    }

    return () => (
      <div class="h-full w-full">
        <ComponentList
          component-list={DEFAULT_COMPONENT_TEMPLATES}
          onClick-component-item={clickExpandComponentItem}
        />
      </div>
    )
  },
})
