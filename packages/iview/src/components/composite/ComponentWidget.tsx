import { useGlobalSetting, useWorkspaceComponent } from '@ideal-schema/playground-store'
import { uid } from '@ideal-schema/shared'
import { cloneDeep } from 'lodash-es'
import mitt from '../../event'
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
        updateComponentList([])
        mitt.emit('drag-end')
        pushComponentItem(componentItem, index, toId)
        updateCurOperateComponent(componentItem)
        updateWorkspaceComponentType('crud')
        return
      }
      else {
        // workspace里面是表单表格，在其他地方拖入表单，则清空表单表格
        if (workspaceComponentType.value === 'crud') {
          updateComponentList([])
          updateCurOperateComponent({} as WorkspaceComponentItem)
        }
        updateWorkspaceComponentType('form')
      }
      // 表单
      if (!expandComponentItem.templates || !Array.isArray(expandComponentItem.templates)) {
        const componentItem = {
          ...expandComponentItem,
          id: uid(),
          pid: toId,
          schema: {
            ...expandComponentItem.schema,
          },
        }
        mitt.emit('drag-end')
        pushComponentItem(componentItem, index, toId)
        updateCurOperateComponent(componentItem)
        // 模板
      }
      else if (Array.isArray(expandComponentItem.templates)) {
        updateComponentList(cloneDeep(expandComponentItem.templates!))
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
