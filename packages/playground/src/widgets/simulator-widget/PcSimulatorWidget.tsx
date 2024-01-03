import { defineComponent, useSlots } from 'vue';
import './style.scss';

export default defineComponent({
  name: 'PcSimulatorWidget',
  setup() {
    const slots = useSlots();

    return () => (
      <div class="board">
        <div class="pc-simulator">{slots.default && slots.default()}</div>
      </div>
    );
  },
});
