import { CopyPageCodeWidget, CopySchemaCodeWidget } from '@ideal-schema/playground-demi'
import BoardWH from './BoardWH'
import Clear from './Clear'
import ScreenPixel from './ScreenPixel'
import View from './View'
import './style.scss'

export default defineComponent({
  name: 'DesignToolsWidget',
  props: {
    pixelType: {
      type: String as PropType<'pc' | 'mobile' | 'pad'>,
    },
    viewType: {
      type: String as PropType<'json' | 'design' | 'play'>,
    },
  },
  emits: ['clickPixel', 'clickView'],
  setup(props, { emit }) {
    return () => (
      <div class="design-tools">
        <div class="flex justify-between">
          <ScreenPixel
            class="mr-5"
            value={props.pixelType}
            onClickPixel={(value: 'pc' | 'mobile' | 'pad') => emit('clickPixel', value)}
          />
          {props.pixelType === 'pad' && <BoardWH />}
        </div>
        <div class="flex">
          <View
            value={props.viewType}
            class="mr-2"
            onClickView={(value: 'json' | 'design' | 'play') => emit('clickView', value)}
          />
          <div class="design-tools-end">
            <CopySchemaCodeWidget />
            <CopyPageCodeWidget />
            <Clear />
          </div>
        </div>
      </div>
    )
  },
})
