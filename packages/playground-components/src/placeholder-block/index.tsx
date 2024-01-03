import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PlaceholderBlock',
  setup() {
    return () => (
      <div
        style={{
          border: '1px dashed #aaa',
          height: '60px',
          width: '100%',
          backgroundColor: '#f0f0f0',
        }}
      ></div>
    );
  },
});
