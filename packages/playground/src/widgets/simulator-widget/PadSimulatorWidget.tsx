import './style.scss'

export default defineComponent({
  name: 'PadSimulatorWidget',
  setup() {
    const slots = useSlots()

    return () => (
      <div class="board">
        <drag-resize isActive={true}>{slots.default && slots.default()}</drag-resize>
      </div>
    )
  },
})
