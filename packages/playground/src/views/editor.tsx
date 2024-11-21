import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import { CompositePanel, Header, Settings, WorkspacePanel } from '../containers'
import { useDriver } from '../hooks'
import './style.scss'

export default defineComponent({
  name: 'Editor',
  setup() {
    const { startDriver } = useDriver()
    const { updateWidgets, addHistory } = useWorkspaceComponent()

    onMounted(() => {
      addHistory(() => { updateWidgets([], '', false) }, { message: '缺省态', time: new Date() })

      setTimeout(() => {
        startDriver()
      }, 201)
    })

    return () => {
      return (
        <div class="root">
          <Header />
          <div class="main-panel">
            <CompositePanel />
            <WorkspacePanel />
            <Settings />
          </div>
        </div>
      )
    }
  },
})
