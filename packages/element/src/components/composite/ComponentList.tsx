import { uid } from '@ideal-schema/shared'
import { cloneDeep } from 'lodash-es'
import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import { Fragment } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import './style.scss'

export default defineComponent({
  name: 'ComponentList',
  components: { VueDraggable },
  props: {
    componentList: {
      type: Array as PropType<ExpandTemplateItem[]>,
      default: () => [],
    },
  },
  emits: ['click-component-item'],
  setup(props, { emit }) {
    const { workspaceComponentList, updateComponentList, updateCurOperateComponent } = useWorkspaceComponent()

    let tempData: any = null

    const activeCollapseItems = ref(['基础组件', '高阶组件'])

    const log = (obj: { item: { innerText: string } }) => {
      props.componentList.forEach((item) => {
        item.components.forEach((cur) => {
          if (cur.title === obj.item.innerText) {
            tempData = {
              ...cloneDeep(cur),
              id: uid(),
            }
          }
        })
      })
    }

    const onEnd = (obj: { to: { id: string }, from: {}, newIndex: number }) => {
      if (obj.to !== obj.from) {
        if (Array.from(obj.to.classList).includes('array-form')) {
          const key = getKey(Array.from(obj.to.classList))
          const arrayItem = getArrayItem(key)
          const cols = arrayItem.schema.fieldProps?.columns
          const item = { ...tempData, id: uid() }
          cols.splice(obj.newIndex, 0, item)
          updateCurOperateComponent(item)
          // updateComponentList(workspaceComponentList.value)
        }
        else {
          emit('click-component-item', tempData, obj.newIndex, obj.to.id)
        }
      }
    }

    function getArrayItem(key) {
      let data = null
      workspaceComponentList.value.forEach((item) => {
        if (item.id === key)
          data = item

        if (item.schema.fieldProps?.columns?.length && !data) {
          item.schema.fieldProps?.columns.forEach((item) => {
            if (item.id === key)
              data = item
          })
        }
      })
      return data
    }

    function getKey(classList) {
      const str = classList.find(item => item.includes('schema-field'))
      return str.split('-')[2]
    }

    const clone = () => { }

    return () => (
      <el-collapse v-model={activeCollapseItems.value}>
        {props.componentList.map(component => (
          <Fragment>
            <el-collapse-item title={component.collapseTitle} name={component.collapseTitle}>
              <div class="content-wrapper">
                <VueDraggable
                  class="dragArea"
                  ghost-class="nihao"
                  chosen-class="chosen"
                  v-model={component.components}
                  group={{ name: 'people', pull: 'clone', put: false }}
                  clone={clone}
                  sort={false}
                  item-key="icon"
                  onChoose={log}
                  onEnd={onEnd}
                >
                  {component.components.map((element) => {
                    return (
                      <div class="list-item">
                        <span class="list-item-icon">
                          <el-icon size="20">{h(resolveComponent(element.icon))}</el-icon>
                        </span>
                        <span class="list-item-text">{element.title}</span>
                      </div>
                    )
                  })}
                </VueDraggable>
              </div>
            </el-collapse-item>
          </Fragment>
        ))}
      </el-collapse>
    )
  },
})
