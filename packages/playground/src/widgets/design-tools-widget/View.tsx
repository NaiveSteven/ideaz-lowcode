const VIEW_BUTTON_GROUPS = [
  {
    icon: 'icon-huaban',
    type: 'design',
    tooltip: '画板',
  },
  {
    icon: 'icon-var',
    type: 'json',
    tooltip: 'JSON预览',
  },
  {
    icon: 'icon-html',
    type: 'page',
    tooltip: 'Template代码预览',
  },
  {
    icon: 'icon-JSX',
    type: 'tsx',
    tooltip: 'TSX代码预览',
  },
  {
    icon: 'icon-shipin',
    type: 'play',
    tooltip: '效果预览',
  },
]

export default defineComponent({
  name: 'View',
  props: {
    value: {
      type: String as PropType<'json' | 'design' | 'play' | 'page' | 'tsx'>,
      default: 'design',
    },
  },
  emits: ['clickView'],
  setup(props, { emit }) {
    return () => (
      <el-button-group size="small" type="default">
        {VIEW_BUTTON_GROUPS.map(item => (
          <el-button
            disabled={props.value === item.type}
            onClick={() => emit('clickView', item.type)}
          >
            <el-tooltip effect="light" content={item.tooltip} placement="top" showAfter={500}>
              <el-icon>
                <i class={[item.icon, 'iconfont']}></i>
              </el-icon>
            </el-tooltip>
          </el-button>
        ))}
      </el-button-group>
    )
  },
})
