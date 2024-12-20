import { CopyPageCodeWidget, CopySchemaCodeWidget, CopyTsxCodeWidget } from '@ideal-schema/playground-demi'
import BoardWH from './BoardWH'
import Clear from './Clear'
import Commands from './Commands'
import ScreenPixel from './ScreenPixel'
import './style.scss'
import View from './View'

export default defineComponent({
  name: 'DesignToolsWidget',
  props: {
    pixelType: {
      type: String as PropType<'pc' | 'mobile' | 'pad'>,
    },
    viewType: {
      type: String as PropType<'json' | 'design' | 'play' | 'page' | 'tsx'>,
    },
  },
  emits: ['clickPixel', 'clickView'],
  setup(props, { emit }) {
    return () => (
      <div class="design-tools">
        <div class="flex justify-between">
          <Commands class="mr-2" />
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
            onClickView={(value: 'json' | 'design' | 'play' | 'page' | 'tsx') => emit('clickView', value)}
          />
          <div class="design-tools-end">
            <CopySchemaCodeWidget />
            <CopyTsxCodeWidget />
            <CopyPageCodeWidget />
            <Clear />
          </div>
        </div>
      </div>
    )
  },
})
