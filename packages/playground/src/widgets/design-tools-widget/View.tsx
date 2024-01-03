import { defineComponent, h, resolveComponent } from 'vue';
import type { PropType } from 'vue';

const VIEW_BUTTON_GROUPS = [
  {
    icon: 'i-brush',
    type: 'design',
    tooltip: '画板',
  },
  {
    icon: 'i-video-play',
    type: 'play',
    tooltip: '效果预览',
  },
  {
    icon: 'i-scale-to-original',
    type: 'json',
    tooltip: 'JSON预览',
  },
  {
    icon: 'i-tickets',
    type: 'page',
    tooltip: '页面代码预览',
  },
];

export default defineComponent({
  name: 'View',
  props: {
    value: {
      type: String as PropType<'json' | 'design' | 'play' | 'page'>,
      default: 'design',
    },
  },
  emits: ['clickView'],
  setup(props, { emit }) {
    return () => (
      <el-button-group size="small" type="default">
        {VIEW_BUTTON_GROUPS.map((item) => (
          <el-button
            disabled={props.value === item.type}
            onClick={() => emit('clickView', item.type)}
          >
            <el-tooltip effect="light" content={item.tooltip} placement="top" showAfter={500}>
              <el-icon>{h(resolveComponent(item.icon))}</el-icon>
            </el-tooltip>
          </el-button>
        ))}
      </el-button-group>
    );
  },
});
