import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import type { Command } from '@ideal-schema/playground-undo'
import { commands, index as currentIndex } from '@ideal-schema/playground-undo'
import { formatTime } from '@ideal-schema/shared'
import { ElMessage } from 'element-plus'
import './style.scss'

const time = new Date()
export default defineComponent({
  name: 'HistoryWidget',
  setup() {
    const { viewType, updateComponentList, updateCurOperateComponent } = useWorkspaceComponent()

    const historyList = computed<Command[]>(() => {
      const lack: Command[] = [
        {
          message: '缺省态',
          time,
          redo: () => {
            updateComponentList([])
          },
          undo: () => {},
        },
      ]
      return lack.concat(commands.value)
    })

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
      updateCurOperateComponent({} as WorkspaceComponentItem)
    }

    return () => (
      <div class="history">
        {historyList.value.map((item, index) => (
          <div
            class={['history__item', index === currentIndex.value + 1 && 'history__item--active']}
            onClick={() => handleClick(index - 1, item)}
          >
            <div class="history__item--title">{item.message}</div>
            <div class="history__item--timestamp">{formatTime(item.time?.valueOf(), 'ymd hms')}</div>
          </div>
        ))}
      </div>
    )
  },
})
