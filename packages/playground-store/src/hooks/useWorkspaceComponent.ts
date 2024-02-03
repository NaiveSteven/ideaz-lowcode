import { useWorkspaceStore } from '../modules/workspace'

export function useWorkspaceComponent() {
  const workspaceStore = useWorkspaceStore()

  const workspaceComponentList = computed(() => workspaceStore.workspaceComponentList)
  const curOperateComponent = computed(() => workspaceStore.curOperateComponent)
  const viewType = computed(() => workspaceStore.viewType)
  const boardHeight = computed(() => workspaceStore.boardHeight)
  const boardWidth = computed(() => workspaceStore.boardWidth)
  const originBoardHeight = computed(() => workspaceStore.originBoardHeight)
  const originBoardWidth = computed(() => workspaceStore.originBoardWidth)

  return {
    workspaceComponentList,
    curOperateComponent,
    viewType,
    boardHeight,
    boardWidth,
    originBoardHeight,
    originBoardWidth,
    pushComponentItem: workspaceStore.pushComponentItem,
    updateComponentItem: workspaceStore.updateComponentItem,
    deleteComponentItem: workspaceStore.deleteComponentItem,
    copyComponentItem: workspaceStore.copyComponentItem,
    updateComponentList: workspaceStore.updateComponentList,
    clearWorkspaceComponentList: workspaceStore.clearWorkspaceComponentList,
    updateCurOperateComponent: workspaceStore.updateCurOperateComponent,
    updateViewType: workspaceStore.updateViewType,
    updateBoardWH: workspaceStore.updateBoardWH,
    updateOriginBoardWH: workspaceStore.updateOriginBoardWH,
  }
}
