import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElCard } from 'element-plus'
import { useFormSize, useNamespace } from '../../../hooks'

export default defineComponent({
  name: 'ZOperationCard',
  props: {
    showAdd: {
      type: Boolean,
      default: true,
    },
    showDelete: {
      type: Boolean,
      default: true,
    },
    action: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['add', 'delete'],
  setup(props, { slots, emit }) {
    const ns = useNamespace('array-form')
    const size = useFormSize()

    const getOperation = () => {
      // if (isFunction(slots.action))
      //   return slots.action({ index: props.contentIndex })

      // if (isFunction(props.action))
      //   return props.action({ index: props.contentIndex })
      if (!props.action)
        return
      return (
        <>
          {props.showAdd && (
            <ElButton
              type="primary"
              icon={Plus}
              circle
              class={ns.be('operation', `add--${size.value}`)}
              size={size.value === 'small' ? 'small' : 'default'}
              onClick={() => emit('add')}
            />
          )}
          {props.showDelete && (
            <ElButton
              type="danger"
              icon={Delete}
              circle
              class={ns.be('operation', `delete--${size.value}`)}
              size={size.value === 'small' ? 'small' : 'default'}
              onClick={() => emit('delete')}
            />
          )}
        </>
      )
    }

    return () => {
      return (
        <ElCard shadow="never" class={ns.b('item-card')}>
          {slots.default?.()}
          {getOperation()}
        </ElCard>
      )
    }
  },
})
