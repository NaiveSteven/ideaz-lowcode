import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import type { Command } from '@ideal-schema/playground-undo'
import { commands, index as currentIndex } from '@ideal-schema/playground-undo'
import { formatTime } from '@ideal-schema/shared'
import { ElMessage } from 'element-plus'
import './style.scss'

export default defineComponent({
  name: 'HistoryWidget',
  setup() {
    const { viewType, updateActiveWidget } = useWorkspaceComponent()

    const handleClick = (current: number, data: Command) => {
      if (viewType.value !== 'design') {
        ElMessage({
          type: 'warning',
          message: '请在画布处执行该操作',
        })
        return
      }
      currentIndex.value = current
      data.redo()
      updateActiveWidget({} as WorkspaceComponentItem)
    }

    return () => (
      <div class="history">
        {commands.value.map((item, index) => (
          <div
            class={['history__item', index === currentIndex.value && 'history__item--active']}
            onClick={() => handleClick(index, item)}
          >
            <div class="history__item--title">{item.message}</div>
            <div class="history__item--timestamp">{formatTime(item.time?.valueOf(), 'ymd hms')}</div>
          </div>
        ))}
      </div>
    )
  },
})
