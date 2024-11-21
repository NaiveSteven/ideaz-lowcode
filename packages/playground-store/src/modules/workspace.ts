import { undoManager } from '@ideal-schema/playground-undo'
import { uid } from '@ideal-schema/shared'
import { cloneDeep } from 'lodash-es'
import { defineStore } from 'pinia'
import mitt from '../../../element/src/event'
import { changeDataId, getComponentListItem, getTreeDataItem } from '../utils/index'
import { useGlobalSettingStore } from './globalSetting'

interface WorkspaceState {
  widgets: WorkspaceComponentItem[]
  activeWidget: WorkspaceComponentItem
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
    widgets: [],
    activeWidget: {} as WorkspaceComponentItem,
    viewType: 'design',
    boardWidth: 0,
    boardHeight: 0,
    originBoardHeight: 0,
    originBoardWidth: 0,
    simulatorType: 'pc',
  }),
  getters: {
    getWidgets(): WorkspaceComponentItem[] {
      return this.widgets
    },
    getActiveWidget(): WorkspaceComponentItem {
      return this.activeWidget
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
    pushWidget(componentItem: WorkspaceComponentItem, index: number, toId: string) {
      this.addHistory(() => {
        if (!toId) {
          this.widgets.splice(index, 0, componentItem)
        }
        else {
          const item = getTreeDataItem(this.widgets, toId)
          item.children.splice(index, 0, componentItem)
        }
      }, { message: '添加组件', time: new Date() })
    },
    updateWidget(componentItem: WorkspaceComponentItem) {
      this.addHistory(() => {
        let index = -1
        if (componentItem.pid) {
          const itemParent = getTreeDataItem(
            this.widgets,
            componentItem.pid as string,
          )
          index = itemParent.children.findIndex(
            (item: WorkspaceComponentItem) => item.id === componentItem.id,
          )
          if (index > -1)
            itemParent.children.splice(index, 1, componentItem)
        }
        else {
          index = this.widgets.findIndex((item: any) => item.id === componentItem.id)
          if (index > -1) {
            this.widgets.splice(index, 1, componentItem)
          }
          else {
            // array form
            const { parentData } = getComponentListItem(componentItem.id, this.widgets)
            const cols = [...parentData.schema?.fieldProps?.columns]
            const colsIndex = cols.findIndex(item => item.id === componentItem.id)
            if (colsIndex > -1) {
              parentData.schema?.fieldProps?.columns.splice(colsIndex, 1, componentItem)
              this.updateWidget(parentData)
            }
          }
        }
      }, { message: '属性更改', time: new Date() })
    },
    deleteWidget(componentItem: WorkspaceComponentItem) {
      this.addHistory(() => {
        let index = -1
        if (componentItem.pid) {
          const itemParent = getTreeDataItem(
            this.widgets,
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
          const workspaceWidgetType = globalSettingStore.getWorkspaceWidgetType
          // 表单部分
          if (workspaceWidgetType === 'form') {
            index = this.widgets.findIndex(item => item.id === componentItem.id)
            if (index > -1) {
              this.widgets.splice(index, 1)
            }
            else {
              // array form
              const { parentData } = getComponentListItem(componentItem.id, this.widgets)
              const cols = [...parentData.schema?.fieldProps?.columns]
              const colsIndex = cols.findIndex(item => item.id === componentItem.id)
              cols.splice(colsIndex, 1)
              if (colsIndex > -1) {
                parentData.schema.fieldProps!.columns = cols
                this.updateWidget(parentData)
              }
            }
          }
          // 表单表格
          else {
            // 表单项
            const columns = this.widgets[0].schema.columns || []
            if (componentItem.name === 'tableForm') {
              columns.forEach((item) => {
                if (item.search && item.search.id === componentItem.id)
                  delete item.search
              })
            }
            if (componentItem.name === 'crud')
              this.widgets = []

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
              this.widgets[0].schema.columns = columns
            }
          }
        }
      }, { message: '删除组件', time: new Date() })
    },
    copyWidget(componentItem: WorkspaceComponentItem) {
      this.addHistory(() => {
        const newComponentItem = changeDataId([{ ...componentItem, id: uid() }])
        if (componentItem.pid) {
          const itemParent = getTreeDataItem(
            this.widgets,
            componentItem.pid as string,
          )
          itemParent.children.push(newComponentItem[0])
        }
        else {
          const globalSettingStore = useGlobalSettingStore()
          const workspaceWidgetType = globalSettingStore.getWorkspaceWidgetType
          // 表单部分
          if (workspaceWidgetType === 'form') {
            const index = this.widgets.findIndex((item: any) => item.id === componentItem.id)
            if (index > -1) {
              this.widgets.push(newComponentItem[0])
            }
            else {
              // array form
              const { parentData } = getComponentListItem(componentItem.id, this.widgets)
              const cols = [...parentData.schema?.fieldProps?.columns, newComponentItem[0]]
              const colsIndex = cols.findIndex(item => item.id === componentItem.id)
              if (colsIndex > -1) {
                parentData.schema.fieldProps!.columns = cols
                this.updateWidget(parentData)
              }
            }
          }
          // 表单表格
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
              const columns = this.widgets[0].schema.columns || []
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
              this.activeWidget = newFormItem
            }
            // 表格项
            if (componentItem.name === 'tableCol') {
              const newTableCol = { ...componentItem, id: uid() }
              delete newTableCol.search
              const columns = this.widgets[0].schema.columns?.concat([
                newTableCol,
              ])
              this.widgets = [
                {
                  ...this.widgets[0],
                  schema: {
                    ...this.widgets[0].schema,
                    columns,
                    cellClassName: ({ columnIndex }: any) => {
                      return `schema-field${columns?.[columnIndex].id}`
                    },
                  },
                },
              ]
              this.activeWidget = newTableCol
            }
          }
        }
      }, { message: '复制组件', time: new Date() })
    },
    updateWidgets(components: WorkspaceComponentItem[], message = '属性更改', isRecord = true) {
      if (isRecord)
        this.addHistory(() => { this.widgets = components }, { message, time: new Date() })

      else
        this.widgets = components
    },
    clearWorkspaceComponentList() {
      this.addHistory(() => { this.widgets = [] }, { message: '清空组件', time: new Date() })
    },
    updateActiveWidget(activeWidget: WorkspaceComponentItem) {
      this.activeWidget = activeWidget
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
    addHistory(callBack: () => void, props?: { message: string, time: Date }) {
      const lastComponentList = cloneDeep(this.widgets)
      callBack && callBack()
      const newComponentList = cloneDeep(this.widgets)
      undoManager.add({
        ...props,
        undo: () => { this.widgets = cloneDeep(lastComponentList); this.activeWidget = {} as WorkspaceComponentItem },
        redo: () => { this.widgets = cloneDeep(newComponentList); this.activeWidget = {} as WorkspaceComponentItem },
      })
    },
  },
})
