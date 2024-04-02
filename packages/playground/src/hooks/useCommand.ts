import type { Queue } from '@ideal-schema/playground-store'
import { useHistory, useHistoryStore, useWorkspaceComponent } from '@ideal-schema/playground-store'
import { cloneDeep } from 'lodash-es'
import mitt from '../../../iview/src/event'
import { useHotKeys } from './useHotKeys'

export type execute = () => {}
export interface ExecuteReturn {
  historyType?: string
  redo: () => void
  undo?: () => void
}

export interface Command {
  name: string
  keyboard?: string
  pushQueue?: boolean
  init?: () => () => void
  execute: () => ExecuteReturn
  before?: WorkspaceComponentItem[] | null
  historyType?: string
  beforeAttribute?: WorkspaceComponentItem[] | null
}
export interface CommandState {
  commands: {
    [propName: string]: () => void
  }
  commandArray: Command[]
  destroyArray: Array<() => void>
}

export function useCommand() {
  const { updateComponentList, updateCurOperateComponent, workspaceComponentList } = useWorkspaceComponent()
  const historyStore = useHistoryStore()
  const { queue } = useHistory()

  const current = computed(() => historyStore.getCurrent)

  const state: CommandState = {
    commands: {},
    commandArray: [],
    destroyArray: [],
  }

  const registry = (command: Command) => {
    state.commandArray.push(command)
    state.commands[command.name] = () => {
      const { redo, undo, historyType } = command.execute()
      redo()
      if (!command.pushQueue)
        return
      if (queue.value.length > 0)
        historyStore.updateQueue(queue.value.slice(0, current.value + 1))

      historyStore.pushQueue({
        redo,
        undo,
        time: new Date(),
        historyType,
        current: current.value,
      } as Queue)
      historyStore.updateCurrent(current.value + 1)
    }
  }

  registry({
    name: 'redo',
    keyboard: 'Ctrl+Y',
    execute() {
      return {
        redo() {
          const item = queue.value[current.value + 1]
          if (item) {
            item.redo && item.redo()
            historyStore.updateCurrent(current.value + 1)
          }
          updateCurOperateComponent({} as WorkspaceComponentItem)
        },
      }
    },
  })

  registry({
    name: 'undo',
    keyboard: 'Ctrl+Z',
    execute() {
      return {
        redo() {
          if (current.value === -1)
            return
          const item = queue.value[current.value]
          if (item) {
            item.undo && item.undo()
            historyStore.updateCurrent(current.value - 1)
          }
          updateCurOperateComponent({} as WorkspaceComponentItem)
        },
      }
    },
  })

  registry({
    name: 'drag',
    pushQueue: true,
    init() {
      this.before = null
      this.historyType = ''
      const start = (type: string) => {
        this.before = cloneDeep(workspaceComponentList.value)
        this.historyType = type
      }
      const end = () => { state.commands.drag() }
      mitt.on('drag-start', start as (type: unknown) => void)
      mitt.on('drag-end', end)
      return () => {
        mitt.off('drag-start', start as (type: unknown) => void)
        mitt.off('drag-end', end)
      }
    },
    execute() {
      const before = cloneDeep(this.before) as WorkspaceComponentItem[]
      const after = cloneDeep(workspaceComponentList.value)
      return {
        historyType: this.historyType,
        redo: () => {
          updateComponentList(after)
        },
        undo: () => {
          updateComponentList(before)
        },
      }
    },
  })

  registry({
    name: 'attribute',
    pushQueue: true,
    init() {
      this.beforeAttribute = null
      this.historyType = ''
      const start = (
        // { data, type }: { data: WorkspaceComponentItem[], type: string }
      ) => {
        this.beforeAttribute = cloneDeep(workspaceComponentList.value)
        // this.historyType = type
      }
      const end = () => state.commands.attribute()
      mitt.on('attribute-start', start as (arg: unknown) => void)
      mitt.on('attribute-end', end)
      return () => {
        mitt.off('attribute-start', start as (arg: unknown) => void)
        mitt.off('attribute-end', end)
      }
    },
    execute() {
      const beforeAttribute = cloneDeep(this.beforeAttribute) as WorkspaceComponentItem[]
      const afterAttribute = cloneDeep(workspaceComponentList.value)

      return {
        historyType: this.historyType,
        redo() {
          updateComponentList(afterAttribute)
        },
        undo() {
          updateComponentList(beforeAttribute)
        },
      }
    },
  })

  // eslint-disable-next-line no-unused-expressions
  ~(() => {
    state.commandArray.forEach((command: Command) => {
      command.init && state.destroyArray.push(command.init())
      command.keyboard && useHotKeys(command.keyboard, state.commands[command.name])
    })
  })()

  onUnmounted(() => {
    state.destroyArray.forEach((fn: () => void) => fn && fn())
  })

  return state
}
