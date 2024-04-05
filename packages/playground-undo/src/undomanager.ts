function removeFromTo(array: any, from: number, to: number) {
  array.splice(
    from,
    !to ||
      1 +
        to -
        from +
        (!((to < 0) ^ (from >= 0)) && (to < 0 || -1) * array.length),
  );
  return array.length;
}

export let UndoManager = function () {
  let commands: any = [],
    index = -1,
    limit = 0,
    isExecuting = false,
    callback: any;

  /**
   * Executes a single command.
   * @property {object} command        - Command
   * @property {function} command.undo - Undo function
   * @property {function} command.redo - Redo function
   * @property {string} action         - "undo" or "redo"
   */
  function execute(command: any, action: 'undo' | 'redo') {
    if (!command || typeof command[action] !== 'function') {
      return this;
    }
    isExecuting = true;

    command[action]();

    isExecuting = false;
    return this;
  }

  return {
    /**
     * Adds a command to the queue.
     * @property {object} command           - Command
     * @property {function} command.undo    - Undo function
     * @property {function} command.redo    - Redo function
     * @property {string} [command.groupId] - Optional group id
     */
    add: function (command: any) {
      if (isExecuting) {
        return this;
      }
      // if we are here after having called undo,
      // invalidate items higher on the stack
      commands.splice(index + 1, commands.length - index);
      commands.push(command);

      // if limit is set, remove items from the start
      if (limit && commands.length > limit) {
        removeFromTo(commands, 0, -(limit + 1));
      }

      // set the current index to the end
      index = commands.length - 1;
      if (callback) {
        callback();
      }
      return this;
    },

    /**
     * Pass a function to be called on undo and redo actions.
     * @property {function} callbackFunc - Callback function
     */
    setCallback: function (callbackFunc: any) {
      callback = callbackFunc;
    },

    /**
     * Performs undo: call the undo function at the current index and decrease the index by 1.
     */
    undo: function () {
      let command = commands[index];
      if (!command) {
        return this;
      }

      const groupId = command.groupId;
      while (command.groupId === groupId) {
        execute(command, 'undo');
        index -= 1;
        command = commands[index];
        if (!command || !command.groupId) break;
      }

      if (callback) {
        callback();
      }
      return this;
    },

    /**
     * Performs redo: call the redo function at the next index and increase the index by 1.
     */
    redo: function () {
      let command = commands[index + 1];
      if (!command) {
        return this;
      }

      const groupId = command.groupId;
      while (command.groupId === groupId) {
        execute(command, 'redo');
        index += 1;
        command = commands[index + 1];
        if (!command || !command.groupId) break;
      }

      if (callback) {
        callback();
      }
      return this;
    },

    /**
     * Clears the memory, losing all stored states. Resets the index.
     */
    clear: function () {
      let prev_size = commands.length;

      commands = [];
      index = -1;

      if (callback && prev_size > 0) {
        callback();
      }
    },

    /**
     * Tests if any undo actions exist.
     * @returns {boolean}
     */
    hasUndo: function () {
      return index !== -1;
    },

    /**
     * Tests if any redo actions exist.
     * @returns {boolean}
     */
    hasRedo: function () {
      return index < commands.length - 1;
    },

    /**
     * Returns the list of queued commands.
     * @param {string} [groupId] - Optionally filter commands by group ID
     * @returns {array}
     */
    getCommands: function (groupId: string) {
      return groupId ? commands.filter((c: any) => c.groupId === groupId) : commands;
    },

    /**
     * Returns the index of the actions list.
     * @returns {number}
     */
    getIndex: function () {
      return index;
    },

    /**
     * Sets the maximum number of undo steps. Default: 0 (unlimited).
     * @property {number} max - Maximum number of undo steps
     */
    setLimit: function (max: number) {
      limit = max;
    },
  };
};
