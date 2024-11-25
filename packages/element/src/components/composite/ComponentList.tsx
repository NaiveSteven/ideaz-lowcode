import { uid } from '@ideal-schema/shared'
import { cloneDeep } from 'lodash-es'
import { useGlobalSetting, useWorkspaceComponent } from '@ideal-schema/playground-store'
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
    const { widgets, updateActiveWidget } = useWorkspaceComponent()
    const { workspaceWidgetType } = useGlobalSetting()

    let tempData: any = null

    const activeCollapseItems = ref(['基础组件', '高阶组件'])

    const log = (obj: { item: { innerText: string } }) => {
      props.componentList.forEach((item) => {
        item.components.forEach((cur) => {
          // eslint-disable-next-line unicorn/prefer-dom-node-text-content
          if (cur.title === obj.item.innerText) {
            tempData = {
              ...cloneDeep(cur),
              id: uid(),
            }
          }
        })
      })
    }

    const onEnd = (obj: any) => {
      if (obj.to !== obj.from) {
        if (Array.from(obj.to.classList).includes('array-form')) {
          const key = getKey(Array.from(obj.to.classList))
          const arrayItem = getArrayItem(key)
          const cols = arrayItem.schema.fieldProps?.columns
          const item = { ...tempData, id: uid() }
          cols.splice(obj.newIndex, 0, item)
          updateActiveWidget(item)
          // updateWidgets(widgets.value)
        }
        else {
          emit('click-component-item', tempData, obj.newIndex, obj.to.id)
        }
      }
    }

    function getArrayItem(key: string) {
      let data: Widget | null = null
      widgets.value.forEach((item) => {
        if (item.id === key)
          data = item

        if (item.schema.fieldProps?.columns?.length && !data) {
          item.schema.fieldProps?.columns.forEach((item: Widget) => {
            if (item.id === key)
              data = item
          })
        }
      })
      return data
    }

    function getKey(classList: string[]) {
      const str = classList.find(item => item.includes('schema-field'))!
      return str.split('-')[2]
    }

    const clone = () => { }

    return () => (
      <el-collapse v-model={activeCollapseItems.value}>
        {props.componentList.map(component => (
          <Fragment>
            <el-collapse-item title={component.collapseTitle} name={component.collapseTitle}>
              {component.collapseTitle === '基础组件' && workspaceWidgetType.value === 'crud' && <el-alert title="表单筛选暂时只支持输入框、单选框、多选框、日期范围和插槽拖拽" type="warning" />}
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
                          {element.icon.startsWith('i-') ? <el-icon size="20">{h(resolveComponent(element.icon))}</el-icon> : <el-icon size="20"><i class={[element.icon, 'iconfont']}></i></el-icon>}
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
