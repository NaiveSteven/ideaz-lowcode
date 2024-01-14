import { computed, defineComponent } from 'vue'
import { uid } from '@ideal-schema/shared'
import { useGlobalSettingStore, useWorkspaceStore } from '@ideal-schema/playground-store'
import { cloneDeep } from 'lodash-es'
import { DEFAULT_COMPONENT_TEMPLATES } from '../../materials'
import ComponentList from './ComponentList'

export default defineComponent({
  name: 'ComponentWidget',
  setup() {
    const workspaceStore = useWorkspaceStore()
    const globalSettingStore = useGlobalSettingStore()

    const workspaceComponentType = computed(() => globalSettingStore.getWorkspaceComponentType)

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
        workspaceStore.updateComponentList([])
        workspaceStore.pushComponentItem(componentItem, index, toId)
        workspaceStore.updateCurOperateComponent(componentItem)
        globalSettingStore.updateWorkspaceComponentType('crud')
        return
      }
      else {
        // workspace里面是表单表格，在其他地方拖入表单，则清空表单表格
        if (workspaceComponentType.value === 'crud') {
          workspaceStore.updateComponentList([])
          workspaceStore.updateCurOperateComponent({} as WorkspaceComponentItem)
        }
        globalSettingStore.updateWorkspaceComponentType('form')
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
        workspaceStore.pushComponentItem(componentItem, index, toId)
        workspaceStore.updateCurOperateComponent(componentItem)
        // 模板
      }
      else if (Array.isArray(expandComponentItem.templates)) {
        workspaceStore.updateComponentList(cloneDeep(expandComponentItem.templates!))
        workspaceStore.updateCurOperateComponent({} as WorkspaceComponentItem)
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
