import { defineComponent, PropType, h, resolveComponent } from 'vue';
import './style.scss';

export default defineComponent({
  name: 'ComponentListItem',
  props: {
    componentListItem: {
      type: Object as PropType<WorkspaceComponentItem>,
      default: () => ({}),
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const clickItem = (e: MouseEvent) => {
      e.preventDefault();
      emit('click', props.componentListItem);
    };
    return () => (
      <div class="list-item" onClick={clickItem}>
        <span class="list-item-icon">
          <el-icon size="20">{h(resolveComponent(props.componentListItem.icon))}</el-icon>
        </span>
        <span class="list-item-text">{props.componentListItem.label}</span>
      </div>
    );
  },
});
