import { ListItem } from "./data"

export default defineComponent({
  name: 'NotifyList',
  props: {
    list: {
      type: Array as PropType<ListItem[]>,
      default: () => []
    }
  },
  setup(props) {
    return () => {
      return <>
        {props.list.length === 0 ? <el-empty /> :
          props.list.map((item, index) => {
            return <el-card key={index} shadow="never" class="notify-card-container" v-slots={{
              header: () => <div class="card-header">
                <div>
                  <span>
                    <span class="card-title">{item.title}</span>
                    {item.extra && <el-tag type={item.status} effect="plain" size="small">{item.extra}</el-tag>}
                  </span>
                  <div class="card-time">{item.datetime}</div>
                </div>
                {item.avatar && <div class="card-avatar">
                  <img src={item.avatar} width={34} />
                </div>}
              </div>
            }}>
              <div class="card-body">
                {item.description ?? "No Data"}
              </div>
            </el-card>
          })
        }
      </>
    }
  }
})
