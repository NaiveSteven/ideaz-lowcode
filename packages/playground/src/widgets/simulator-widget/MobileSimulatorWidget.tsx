import { defineComponent, useSlots } from 'vue';
import './style.scss';

export default defineComponent({
  name: 'MobileSimulatorWidget',
  setup() {
    const slots = useSlots();
    return () => (
      <div class="board">
        <div class="mobile-simulator">
          <div class="mobile-simulator-content">
            <div class="mobile-simulator-body">
              <div class="mobile-simulator-body-wrapper">
                <img src="https://img.alicdn.com/imgextra/i4/O1CN01ehfzMc1QPqY6HONTJ_!!6000000001969-55-tps-459-945.svg" />
                <div class="mobile-simulator-body-content">{slots.default && slots.default()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
