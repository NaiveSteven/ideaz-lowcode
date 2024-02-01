export default defineComponent({
  name: 'ScreenPixel',
  props: {
    value: {
      type: String as PropType<'pc' | 'mobile' | 'pad'>,
      default: 'pc',
    },
  },
  emits: ['clickPixel'],
  setup(props, { emit }) {
    return () => (
      <el-button-group size="small" type="default">
        <el-button disabled={props.value === 'pc'} onClick={() => emit('clickPixel', 'pc')}>
          <el-tooltip effect="light" content="客户端" placement="top" showAfter={500}>
            <el-icon>
              <i-data-board />
            </el-icon>
          </el-tooltip>
        </el-button>
        <el-button disabled={props.value === 'mobile'} onClick={() => emit('clickPixel', 'mobile')}>
          <el-tooltip effect="light" content="移动端" placement="top" showAfter={500}>
            <el-icon>
              <i-iphone />
            </el-icon>
          </el-tooltip>
        </el-button>
        <el-button disabled={props.value === 'pad'} onClick={() => emit('clickPixel', 'pad')}>
          <el-tooltip effect="light" content="平板端" placement="top" showAfter={500}>
            <el-icon>
              <i-monitor />
            </el-icon>
          </el-tooltip>
        </el-button>
      </el-button-group>
    )
  },
})
