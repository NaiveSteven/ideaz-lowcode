import './style.scss'

export const Header = defineComponent({
  name: 'Header',
  setup() {
    const handleGithub = () => {
      window.open('')
    }

    const handleIdeaz = () => {
      window.open('https://naivesteven.github.io/ideaz-element/')
    }

    return () => (
      <div class="header">
        <div class="logo">
        </div>
        <div class="header--actions">
          <el-button size="default" class="mr-4" onClick={handleIdeaz}>
            <span class="text">Ideaz Element</span>
          </el-button>
          <el-button size="default" onClick={handleGithub}>
            <el-icon size="14"><i class={['icon-github', 'iconfont']}></i></el-icon>
            <span class="text">Github</span>
          </el-button>
          {/* <notify /> */}
        </div>
      </div>
    )
  },
})
