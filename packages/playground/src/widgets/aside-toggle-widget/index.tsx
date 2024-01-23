import { CSSProperties } from 'vue';
import './style.scss';

export default defineComponent({
  name: 'AsideToggleWidget',
  props: {
    arrowDirection: {
      type: String as PropType<'left' | 'right'>,
      default: 'right',
    },
    left: {
      type: String,
      default: '',
    },
    right: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const style = computed<CSSProperties>(() => {
      const obj: CSSProperties = {};
      if (props.left) {
        obj.left = props.left;
      }
      if (props.right) {
        obj.right = props.right;
      }
      return obj;
    });

    return () => (
      <div class="aside-toggle" style={style.value} onClick={() => emit('click')}>
        <el-icon>
          {props.arrowDirection === 'left' && <i-arrow-left />}
          {props.arrowDirection === 'right' && <i-arrow-right />}
        </el-icon>
      </div>
    );
  },
});
