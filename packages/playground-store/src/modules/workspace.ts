import { undoManager } from '@ideal-schema/playground-undo'
import { uid } from '@ideal-schema/shared'
import { cloneDeep } from 'lodash-es'
import { defineStore } from 'pinia'
import mitt from '../../../iview/src/event'
import { changeDataId, getTreeDataItem } from '../utils/index'
import { useGlobalSettingStore } from './globalSetting'

interface WorkspaceState {
  workspaceComponentList: WorkspaceComponentItem[]
  curOperateComponent: WorkspaceComponentItem
  viewType: ViewType
  boardWidth: number
  boardHeight: number
  originBoardWidth: number
  originBoardHeight: number
  simulatorType: SimulatorType
}

type ViewType = 'json' | 'design' | 'play'
type SimulatorType = 'pc' | 'mobile' | 'pad'

export const useWorkspaceStore = defineStore({
  id: 'workspace',
  state: (): WorkspaceState => ({
    workspaceComponentList: [],
    curOperateComponent: {} as WorkspaceComponentItem,
    viewType: 'design',
    boardWidth: 0,
    boardHeight: 0,
    originBoardHeight: 0,
    originBoardWidth: 0,
    simulatorType: 'pc',
  }),
  getters: {
    getWorkspaceComponentList(): WorkspaceComponentItem[] {
      return this.workspaceComponentList
    },
    getCurOperateComponent(): WorkspaceComponentItem {
      return this.curOperateComponent
    },
    getViewType(): ViewType {
      return this.viewType
    },
    getBoardWidth(): number {
      return this.boardWidth
    },
    getBoardHeight(): number {
      return this.boardHeight
    },
    getSimulatorType(): SimulatorType {
      return this.simulatorType
    },
  },
  actions: {
    pushComponentItem(componentItem: WorkspaceComponentItem, index: number, toId: string) {
      const lastComponentList = cloneDeep(this.workspaceComponentList)
      if (!toId) {
        this.workspaceComponentList.splice(index, 0, componentItem)
      }
      else {
        const item = getTreeDataItem(this.workspaceComponentList, toId)
        item.children.splice(index, 0, componentItem)
      }
      const newComponentList = cloneDeep(this.workspaceComponentList)

      undoManager.add({
        undo: () => { this.workspaceComponentList = cloneDeep(lastComponentList); this.curOperateComponent = {} as WorkspaceComponentItem },
        redo: () => { this.workspaceComponentList = cloneDeep(newComponentList); this.curOperateComponent = {} as WorkspaceComponentItem },
      })
    },
    updateComponentItem(componentItem: WorkspaceComponentItem) {
      const lastComponentList = cloneDeep(this.workspaceComponentList)
      let index = -1
      if (componentItem.pid) {
        const itemParent = getTreeDataItem(
          this.workspaceComponentList,
          componentItem.pid as string,
        )
        index = itemParent.children.findIndex(
          (item: WorkspaceComponentItem) => item.id === componentItem.id,
        )
        if (index > -1)
          itemParent.children.splice(index, 1, componentItem)
      }
      else {
        index = this.workspaceComponentList.findIndex((item: any) => item.id === componentItem.id)
        if (index > -1)
          this.workspaceComponentList.splice(index, 1, componentItem)
      }
      const newComponentList = cloneDeep(this.workspaceComponentList)
      undoManager.add({
        undo: () => { this.workspaceComponentList = cloneDeep(lastComponentList); this.curOperateComponent = {} as WorkspaceComponentItem },
        redo: () => { this.workspaceComponentList = cloneDeep(newComponentList); this.curOperateComponent = {} as WorkspaceComponentItem },
      })
    },
    deleteComponentItem(componentItem: WorkspaceComponentItem) {
      let index = -1
      if (componentItem.pid) {
        const itemParent = getTreeDataItem(
          this.workspaceComponentList,
          componentItem.pid as string,
        )
        index = itemParent.children.findIndex(
          (item: WorkspaceComponentItem) => item.id === componentItem.id,
        )
        if (index > -1)
          itemParent.children.splice(index, 1)
      }
      else {
        const globalSettingStore = useGlobalSettingStore()
        const workspaceComponentType = globalSettingStore.getWorkspaceComponentType
        // 表单部分
        if (workspaceComponentType === 'form') {
          index = this.workspaceComponentList.findIndex(item => item.id === componentItem.id)
          if (index > -1)
            this.workspaceComponentList.splice(index, 1)

          // 表单表格
        }
        else {
          // 表单项
          const columns = this.workspaceComponentList[0].schema.columns || []
          if (componentItem.name === 'tableForm') {
            columns.forEach((item) => {
              if (item.search && item.search.id === componentItem.id)
                delete item.search
            })
          }
          if (componentItem.name === 'crud')
            this.workspaceComponentList = []

          if (componentItem.name === 'tableCol') {
            const index = columns.findIndex(item => item.id === componentItem.id)
            const tableCol = cloneDeep(columns[index])
            if (tableCol.search) {
              columns[index] = {
                search: tableCol.search,
              }
            }
            else {
              columns.splice(index, 1)
            }
            this.workspaceComponentList[0].schema.columns = columns
          }
        }
      }
    },
    copyComponentItem(componentItem: WorkspaceComponentItem) {
      const newComponentItem = changeDataId([{ ...componentItem, id: uid() }])
      if (componentItem.pid) {
        const itemParent = getTreeDataItem(
          this.workspaceComponentList,
          componentItem.pid as string,
        )
        itemParent.children.push(newComponentItem[0])
      }
      else {
        const globalSettingStore = useGlobalSettingStore()
        const workspaceComponentType = globalSettingStore.getWorkspaceComponentType
        // 表单部分
        if (workspaceComponentType === 'form') {
          this.workspaceComponentList.push(newComponentItem[0])
          // 表单表格
        }
        else {
          // 表单项
          if (componentItem.name === 'tableForm') {
            let lastIndex = 0
            const formItemId = uid()
            const newFormItem = {
              ...componentItem,
              id: formItemId,
              formItemProps: {
                ...componentItem.formItemProps,
                id: `schema-field${formItemId}`,
                onClick: (e: PointerEvent) => { mitt.emit('form-item-click', { event: e, id: formItemId }) },
              },
            }
            const columns = this.workspaceComponentList[0].schema.columns || []
            columns.forEach((item, index: number) => {
              if (item.search && lastIndex < index)
                lastIndex = index
            })
            if (!columns[lastIndex + 1]) {
              columns[lastIndex + 1] = {
                search: newFormItem,
              }
            }
            else {
              columns[lastIndex + 1].search = newFormItem
            }
            this.curOperateComponent = newFormItem
          }
          // 表格项
          if (componentItem.name === 'tableCol') {
            const newTableCol = { ...componentItem, id: uid() }
            delete newTableCol.search
            const columns = this.workspaceComponentList[0].schema.columns?.concat([
              newTableCol,
            ])
            this.workspaceComponentList = [
              {
                ...this.workspaceComponentList[0],
                schema: {
                  ...this.workspaceComponentList[0].schema,
                  columns,
                  cellClassName: ({ columnIndex }: any) => {
                    return `schema-field${columns?.[columnIndex].id}`
                  },
                },
              },
            ]
            this.curOperateComponent = newTableCol
          }
        }
      }
    },
    updateComponentList(components: WorkspaceComponentItem[]) {
      const lastComponentList = cloneDeep(this.workspaceComponentList)
      this.workspaceComponentList = components
      const newComponentList = cloneDeep(this.workspaceComponentList)
      undoManager.add({
        undo: () => { this.workspaceComponentList = cloneDeep(lastComponentList); this.curOperateComponent = {} as WorkspaceComponentItem },
        redo: () => { this.workspaceComponentList = cloneDeep(newComponentList); this.curOperateComponent = {} as WorkspaceComponentItem },
      })
    },
    clearWorkspaceComponentList() {
      this.workspaceComponentList = []
    },
    updateCurOperateComponent(curOperateComponent: WorkspaceComponentItem) {
      this.curOperateComponent = curOperateComponent
    },
    updateViewType(type: ViewType) {
      this.viewType = type
    },
    updateBoardWH(width: number, height: number) {
      this.boardHeight = height
      this.boardWidth = width
    },
    updateOriginBoardWH(width: number, height: number) {
      this.originBoardHeight = height
      this.originBoardWidth = width
    },
    updateSimulatorType(type: SimulatorType) {
      this.simulatorType = type
    },
  },
})
