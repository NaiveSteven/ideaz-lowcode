import type { PropType } from 'vue'
import { Fragment, defineComponent, ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { uid } from '@ideal-schema/shared'
import { VueDraggable } from 'vue-draggable-plus'
import ComponentListItem from './ComponentListItem'
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
    let tempData: any = null

    const activeCollapseItems = ref(['表单组件', '组件模板', '高阶组件'])

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
      if (obj.to !== obj.from)
        emit('click-component-item', tempData, obj.newIndex, obj.to.id)
    }

    const clone = () => {}

    const clickComponentItem = () => {}

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
                      <ComponentListItem
                        key={element.id}
                        component-list-item={element}
                        onClick={clickComponentItem}
                      />
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
