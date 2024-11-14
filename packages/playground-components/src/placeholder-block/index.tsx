export default defineComponent({
  name: 'PlaceholderBlock',
  setup() {
    return () => (
      <div
        style={{
          height: '30px',
          width: '100%',
          backgroundColor: '#f0f0f0',
        }}
      >
      </div>
    )
  },
})
