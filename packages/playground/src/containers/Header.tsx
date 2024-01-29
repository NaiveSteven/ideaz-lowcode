import './style.scss'

export const Header = defineComponent({
  name: 'Header',
  setup() {
    return () => (
      <div class="header">
        <div></div>
        <div class="header--actions">
        </div>
      </div>
    )
  },
})
