import { ListItem, messageData, notifyData, todoData } from './data'
import NotifyList from "./NotifyList"
import './style.scss'

type TabName = "通知" | "更新" | "计划"

interface DataItem {
  name: TabName
  type: "primary" | "success" | "warning" | "danger" | "info"
  list: ListItem[]
}

export default defineComponent({
  name: 'Notify',
  setup() {
    const badgeValue = computed(() => {
      return data.value.reduce((sum, item) => sum + item.list.length, 0)
    })
    const badgeMax = 99
    const popoverWidth = 350
    const activeName = ref<TabName>("通知")
    const data = ref<DataItem[]>([
      {
        name: "通知",
        type: "primary",
        list: notifyData
      },
      {
        name: "更新",
        type: "danger",
        list: messageData
      },
      {
        name: "计划",
        type: "warning",
        list: todoData
      }
    ])

    return () => {
      return <div class="notify">
        <el-popover placement="bottom" width={popoverWidth} trigger="click" v-slots={{
          reference: () => <el-badge v-model={badgeValue.value} max={badgeMax} hidden={badgeValue.value === 0}>
            <el-tooltip effect="dark" content="消息通知" placement="bottom">
              <el-icon size={20} class="cursor-pointer" >
                <i-bell />
              </el-icon>
            </el-tooltip>
          </el-badge>
        }}>
          <el-tabs v-model={activeName.value} class="demo-tabs" stretch>
            {
              data.value.map((item, index) => {
                return <el-tab-pane name={item.name} key={index} v-slots={{
                  label: () => <>
                    {item.name}
                    <el-badge value={item.list.length} max={badgeMax} type={item.type} />
                  </>
                }}>
                  <el-scrollbar height="400px">
                    <NotifyList list={item.list} />
                  </el-scrollbar>
                </el-tab-pane>
              })
            }
          </el-tabs>
        </el-popover>
      </div >
    }
  }
})
