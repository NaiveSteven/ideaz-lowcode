import './style.scss'

export const Header = defineComponent({
  name: 'Header',
  setup() {
    return () => (
      <div class="header">
        <div class="logo">
        </div>
        <div class="header--actions">
          <notify />
        </div>
      </div>
    )
  },
})
