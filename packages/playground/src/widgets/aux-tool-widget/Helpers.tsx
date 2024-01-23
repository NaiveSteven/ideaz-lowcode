import { CSSProperties } from 'vue';
import Copy from './Copy';
import Delete from './Delete';
import Selector from './Selector';
import { useWorkspaceStoreData } from '../../hooks';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'Helpers',
  props: {
    position: {
      type: String as PropType<'top' | 'bottom' | 'inner-top'>,
      default: 'top',
    },
  },
  setup(props) {
    const { curOperateComponent } = useWorkspaceStoreData();

    const style = computed<CSSProperties>(() => {
      const position: CSSProperties = {};
      props.position === 'bottom'
        ? (position.top = '100%')
        : props.position === 'inner-top'
          ? ((position.top = '0'), (position.right = '1px'))
          : (position.bottom = '100%');
      return {
        position: 'absolute',
        right: 0,
        margin: '4px 0',
        zIndex: 10,
        userSelect: 'none',
        pointerEvents: 'all',
        ...position,
      };
    });

    return () => (
      <div style={unref(style)} class="flex">
        <Selector />
        {curOperateComponent.value.allowCopy && <Copy />}
        {curOperateComponent.value.allowDelete && <Delete />}
      </div>
    );
  },
});
