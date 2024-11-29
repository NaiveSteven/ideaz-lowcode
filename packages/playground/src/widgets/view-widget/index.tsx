import { JSONWidget, PageWidget, PlayWidget, TsxWidget } from '@ideal-schema/playground-demi'
import { parseElementSchema } from '@ideal-schema/playground-parser'
import './style.scss'

export default defineComponent({
  name: 'ViewWidget',
  components: {
    JSONWidget,
    PlayWidget,
    PageWidget,
    TsxWidget,
  },
  props: {
    viewType: {
      type: String as PropType<'json' | 'design' | 'play' | 'page'>,
      default: 'design',
    },
  },
  setup(props) {
    const getComponent = (viewType: string) => {
      if (viewType === 'json')
        return 'JSONWidget'
      if (viewType === 'play')
        return 'PlayWidget'
      if (viewType === 'tsx')
        return 'TsxWidget'
      return 'PageWidget'
    }

    const isArrayForm = computed(() => {
      const { formConfig } = parseElementSchema('preview')
      return formConfig.type === 'array' && props.viewType === 'play'
    })

    return () => <div class="view-widget" style={{ padding: isArrayForm.value ? '20px' : '' }}>{h(resolveComponent(getComponent(props.viewType)))}</div>
  },
})
