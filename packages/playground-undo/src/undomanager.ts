import { useUndo } from '@ideal-schema/playground-store'
import { cloneDeep } from 'lodash-es'

function removeFromTo(array: any, from: number, to: number) {
  array.splice(
    from,
    !to
    || 1
    + to
    - from
    + (!((to < 0) ^ (from >= 0)) && (to < 0 || -1) * array.length),
  )
  return array.length
}

const UndoManager = function () {
  const { commands: queue, index: currentIndex, updateCommands, updateIndex } = useUndo()
  const commands = computed({
    get() {
      return queue.value
    },
    set(val: any) {
      updateCommands(val)
    },
  })

  const index = computed({
    get() {
      return currentIndex.value
    },
    set(val) {
      updateIndex(val)
    },
  })

  let limit = 0
  let isExecuting = false
  let callback: any

  /**
   * Executes a single command.
   * @property {object} command        - Command
   * @property {Function} command.undo - Undo function
   * @property {Function} command.redo - Redo function
   * @property {string} action         - "undo" or "redo"
   */
  function execute(command: any, action: 'undo' | 'redo') {
    if (!command || typeof command[action] !== 'function')
      return this

    isExecuting = true

    command[action]()

    isExecuting = false
    return this
  }

  return {
    /**
     * Adds a command to the queue.
     * @property {object} command           - Command
     * @property {Function} command.undo    - Undo function
     * @property {Function} command.redo    - Redo function
     * @property {string} [command.groupId] - Optional group id
     */
    add(command: any) {
      if (isExecuting)
        return this

      // if we are here after having called undo,
      // invalidate items higher on the stack
      const data = cloneDeep(commands.value)
      data.splice(index.value + 1, commands.value.length - index.value)
      data.push(command)
      commands.value = data

      // if limit is set, remove items from the start
      if (limit && commands.value.length > limit)
        removeFromTo(commands.value, 0, -(limit + 1))

      // set the current index to the end
      index.value = commands.value.length - 1
      if (callback)
        callback()

      return this
    },

    /**
     * Pass a function to be called on undo and redo actions.
     * @property {Function} callbackFunc - Callback function
     */
    setCallback(callbackFunc: any) {
      callback = callbackFunc
    },

    /**
     * Performs undo: call the undo function at the current index and decrease the index by 1.
     */
    undo() {
      let command = commands.value[index.value]
      if (!command)
        return this

      const groupId = command.groupId
      while (command.groupId === groupId) {
        execute(command, 'undo')
        index.value -= 1
        command = commands.value[index.value]
        if (!command || !command.groupId)
          break
      }

      if (callback)
        callback()

      return this
    },

    /**
     * Performs redo: call the redo function at the next index and increase the index by 1.
     */
    redo() {
      let command = commands.value[index.value + 1]
      if (!command)
        return this

      const groupId = command.groupId
      while (command.groupId === groupId) {
        execute(command, 'redo')
        index.value += 1
        command = commands.value[index.value + 1]
        if (!command || !command.groupId)
          break
      }

      if (callback)
        callback()

      return this
    },

    /**
     * Clears the memory, losing all stored states. Resets the index.
     */
    clear() {
      const prev_size = commands.value.length

      commands.value = []
      index.value = -1

      if (callback && prev_size > 0)
        callback()
    },

    /**
     * Tests if any undo actions exist.
     * @returns {boolean}
     */
    hasUndo() {
      return index.value !== -1
    },

    /**
     * Tests if any redo actions exist.
     * @returns {boolean}
     */
    hasRedo() {
      return index.value < commands.value.length - 1
    },

    /**
     * Returns the list of queued commands.
     * @param {string} [groupId] - Optionally filter commands by group ID
     * @returns {Array}
     */
    getCommands(groupId: string) {
      return groupId ? commands.value.filter((c: any) => c.groupId === groupId) : commands.value
    },

    /**
     * Returns the index of the actions list.
     * @returns {number}
     */
    getIndex() {
      return index.value
    },

    /**
     * Sets the maximum number of undo steps. Default: 0 (unlimited).
     * @property {number} max - Maximum number of undo steps
     */
    setLimit(max: number) {
      limit = max
    },
  }
}

export { UndoManager }
