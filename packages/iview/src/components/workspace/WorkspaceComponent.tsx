import { VueDraggable } from 'vue-draggable-plus'
import { getSchemaData } from '@ideal-schema/playground-demi'

// import { getSchemaData } from '@ideal-schema/playground-demi'
import { useWorkspaceStore } from '@ideal-schema/playground-store'
import { useMiddleFormStoreData } from '../../hooks'
import './style.scss'

export default defineComponent({
  name: 'WorkspaceComponent',
  emits: ['on-add-item', 'on-update-cur-operate'],
  props: {
    workspaceComponentList: {
      type: Array as PropType<WorkspaceComponentItem[]>,
      default: () => [],
    },
    curOperateComponent: {
      type: Object as PropType<WorkspaceComponentItem>,
      default: () => ({}),
    },
    rootSchema: {
      type: Object as PropType<Schema>,
      default: () => ({}),
    },
    formData: {
      type: Object as PropType<IndexType>,
      default: () => ({}),
    },
    needFlex: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    needVueDraggable: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup(props, { emit }) {
    const workspaceStore = useWorkspaceStore()
    const curOperateComponent = computed(() => workspaceStore.getCurOperateComponent)
    const { formConfig } = useMiddleFormStoreData()

    let tempData: any = null

    const tableKey = ref(new Date().valueOf())

    watch(
      () => curOperateComponent.value,
      () => {
        if (curOperateComponent.value.name === 'tableCol')
          tableKey.value = new Date().valueOf()
      },
    )

    function clickItem(e: MouseEvent, item: WorkspaceComponentItem) {
      e.preventDefault()
      e.stopPropagation()
      if (props.curOperateComponent.id === item.id)
        return
      emit('on-update-cur-operate', item)
    }

    function start(a: { oldIndex: number }) {
      tempData = props.workspaceComponentList[a.oldIndex]
    }
    function end(a: { to: { id: string }, newIndex: number }) {
      emit('on-update-cur-operate', tempData)
    }

    return () => {
      const { formData, options } = getSchemaData()
      return (
        <VueDraggable
          modelValue={props.workspaceComponentList}
          class="dragArea list-group h-full"
          animation={200}
          group="people"
          filter=".not-drag"
          item-key="id"
          onUpdate:modelValue={(val: any) => workspaceStore.updateComponentList(val)}
          onStart={start}
          onEnd={end}
        >
          {props.workspaceComponentList.map((formItem: WorkspaceComponentItem) => {
            return (
              <div
                id={`schema-field${formItem.id}`}
                key={formItem.id}
                class="w-full"
                style={{ marginBottom: '22px' }}
                onClick={(e: MouseEvent) => clickItem(e, formItem)}
              >
                <z-form-item
                  formConfig={formConfig.value}
                  id={formItem.id}
                  key={formItem.schema.id}
                  modelValue={formData}
                  options={options}
                  style={{ zIndex: 1 }}
                  col={formItem.schema}
                  class={formItem.schema.title === 'Col' ? 'not-drag' : ''}
                />
              </div>
            )
          })}
        </VueDraggable>
      )
    }
  },
})
