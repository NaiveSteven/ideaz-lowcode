import { CopyPageCodeWidget, CopySchemaCodeWidget } from '@ideal-schema/playground-demi'
import ScreenPixel from './ScreenPixel'
import Clear from './Clear'
import View from './View'
import './style.scss'

export default defineComponent({
  name: 'DesignToolsWidget',
  props: {
    pixelType: {
      type: String as PropType<'pc' | 'mobile'>,
    },
    viewType: {
      type: String as PropType<'json' | 'design' | 'play'>,
    },
  },
  emits: ['clickPixel', 'clickView'],
  setup(props, { emit }) {
    return () => (
      <div class="design-tools">
        <div>
          <ScreenPixel
            value={props.pixelType}
            onClickPixel={(value: 'pc' | 'mobile') => emit('clickPixel', value)}
          />
        </div>
        <div>
          <View
            value={props.viewType}
            class="mr-2"
            onClickView={(value: 'json' | 'design' | 'play') => emit('clickView', value)}
          />
          <CopySchemaCodeWidget />
          <CopyPageCodeWidget />
          <Clear />
        </div>
      </div>
    )
  },
})
