import { useWorkspaceStore } from '../modules/workspace'

export const useWorkspaceComponent = () => {
    const workspaceStore = useWorkspaceStore()

    const workspaceComponentList = computed(() => workspaceStore.workspaceComponentList)
    const curOperateComponent = computed(() => workspaceStore.curOperateComponent)
    const viewType = computed(() => workspaceStore.viewType)

  return {
    workspaceComponentList,
    curOperateComponent,
    viewType,
    pushComponentItem: workspaceStore.pushComponentItem,
    updateComponentItem: workspaceStore.updateComponentItem,
    deleteComponentItem: workspaceStore.deleteComponentItem,
    copyComponentItem: workspaceStore.copyComponentItem,
    updateComponentList: workspaceStore.updateComponentList,
    clearWorkspaceComponentList: workspaceStore.clearWorkspaceComponentList,
    updateCurOperateComponent: workspaceStore.updateCurOperateComponent,
    updateViewType: workspaceStore.updateViewType
  }
}
