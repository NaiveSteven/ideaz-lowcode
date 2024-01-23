import './style.scss'

export const Drawer = defineComponent({
  name: 'Drawer',
  props: {
    title: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const slots = useSlots()

    return () => (
      <div class="drawer">
        <div class="drawer__header">
          <div class="drawer__header--title">{props.title}</div>
          <div class="drawer__header--action">{slots.action && slots.action()}</div>
        </div>
        <div class="drawer__body">{slots.default && slots.default()}</div>
      </div>
    )
  },
})
