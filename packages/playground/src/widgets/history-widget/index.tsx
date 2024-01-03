import { defineComponent, computed } from 'vue';
import { useHistoryStore, useWorkspaceStore } from '@ideal-schema/playground-store';
import { formatTime } from '@ideal-schema/shared';
import { ElMessage } from 'element-plus';
import './style.scss';
import type { Queue } from '@ideal-schema/playground-store';

const time = new Date();

export default defineComponent({
  name: 'HistoryWidget',
  setup() {
    const historyStore = useHistoryStore();
    const workspaceStore = useWorkspaceStore();

    const viewType = computed(() => workspaceStore.getViewType);
    const queue = computed(() => historyStore.getQueue);
    const current = computed(() => historyStore.getCurrent);
    const historyList = computed<Queue[]>(() => {
      const lack = [
        {
          historyType: '缺省态',
          time,
          current: -1,
          after: [],
          before: [],
          redo: () => {},
          undo: () => {},
        },
      ] as Queue[];
      return lack.concat(queue.value);
    });

    const handleClick = (current: number, data: Queue) => {
      if (viewType.value !== 'design') {
        ElMessage({
          type: 'warning',
          message: '请在画布处执行该操作',
        });
        return;
      }
      historyStore.updateCurrent(current);
      workspaceStore.updateComponentList(data.after);
      workspaceStore.updateCurOperateComponent({} as WorkspaceComponentItem);
    };

    return () => (
      <div class="history">
        {historyList.value.map((item) => (
          <div
            class={['history__item', item.current === current.value && 'history__item--active']}
            onClick={() => handleClick(item.current, item)}
          >
            <div class="history__item--title">{item.historyType}</div>
            <div class="history__item--timestamp">{formatTime(item.time.valueOf(), 'ymd hms')}</div>
          </div>
        ))}
      </div>
    );
  },
});
