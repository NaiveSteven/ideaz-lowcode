import { useWorkspaceStore } from '../modules/workspace'

export function useWorkspaceComponent() {
  const workspaceStore = useWorkspaceStore()

  const workspaceComponentList = computed(() => workspaceStore.workspaceComponentList)
  const activeWidget = computed(() => workspaceStore.activeWidget)
  const viewType = computed(() => workspaceStore.viewType)
  const boardHeight = computed(() => workspaceStore.boardHeight)
  const boardWidth = computed(() => workspaceStore.boardWidth)
  const originBoardHeight = computed(() => workspaceStore.originBoardHeight)
  const originBoardWidth = computed(() => workspaceStore.originBoardWidth)
  const simulatorType = computed(() => workspaceStore.simulatorType)

  return {
    workspaceComponentList,
    activeWidget,
    viewType,
    boardHeight,
    boardWidth,
    originBoardHeight,
    originBoardWidth,
    simulatorType,
    addHistory: workspaceStore.addHistory,
    pushComponentItem: workspaceStore.pushComponentItem,
    updateComponentItem: workspaceStore.updateComponentItem,
    deleteComponentItem: workspaceStore.deleteComponentItem,
    copyComponentItem: workspaceStore.copyComponentItem,
    updateComponentList: workspaceStore.updateComponentList,
    clearWorkspaceComponentList: workspaceStore.clearWorkspaceComponentList,
    updateActiveWidget: workspaceStore.updateActiveWidget,
    updateViewType: workspaceStore.updateViewType,
    updateBoardWH: workspaceStore.updateBoardWH,
    updateOriginBoardWH: workspaceStore.updateOriginBoardWH,
    updateSimulatorType: workspaceStore.updateSimulatorType,
  }
}
