import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import type { CSSProperties, PropType } from 'vue'

import Copy from './Copy'
import Delete from './Delete'
import Selector from './Selector'

export default defineComponent({
  name: 'Helpers',
  props: {
    position: {
      type: String as PropType<'top' | 'bottom' | 'inner-top'>,
      default: 'top',
    },
  },
  setup(props) {
    const { activeWidget } = useWorkspaceComponent()

    const style = computed<CSSProperties>(() => {
      const position: CSSProperties = {}
      props.position === 'bottom'
        ? (position.top = '100%')
        : props.position === 'inner-top'
          ? ((position.top = '0'), (position.right = '1px'))
          : (position.bottom = '100%')
      return {
        position: 'absolute',
        right: 0,
        margin: '4px 0',
        zIndex: 10,
        userSelect: 'none',
        pointerEvents: 'all',
        ...position,
      }
    })

    return () => (
      <div style={unref(style)} class="flex">
        <Selector />
        {activeWidget.value.allowCopy && <Copy />}
        {activeWidget.value.allowDelete && <Delete />}
      </div>
    )
  },
})
