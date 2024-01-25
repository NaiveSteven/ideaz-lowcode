import './style.scss'
import { useRouter } from 'vue-router'

export const Header = defineComponent({
  name: 'Header',
  setup() {
    const router = useRouter()

    const handleChangeMode = () => {
      router.push({ name: 'setting' })
      // localStorage.removeItem('schemaMode');
      // localStorage.removeItem('version');
      // window.location.reload();
    }

    return () => (
      <div class="header">
        <div></div>
        <div class="header--actions">
          <el-button size="default" onClick={() => handleChangeMode()}>
            切换模式
          </el-button>
        </div>
      </div>
    )
  },
})
