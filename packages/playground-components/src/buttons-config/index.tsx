import { uid } from '@ideal-schema/shared'
import { VueDraggable } from 'vue-draggable-plus'

export default defineComponent({
  name: 'ButtonsConfig',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Array as PropType<OptionsItem[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleInputChange = (data: OptionsItem) => {
      const list = [...props.modelValue]
      const index = list.findIndex(item => item.key === data.key)
      if (index > -1)
        list.splice(index, 1, data)

      emit('update:modelValue', list)
    }

    const handleAdd = () => {
      const list = [...props.modelValue]
      const len = list.length
      list.push({ key: uid(), label: `按钮${len + 1}`, type: 'primary', link: true })
      emit('update:modelValue', list)
    }

    const handleDel = (index: number) => {
      const list = [...props.modelValue]
      list.splice(index, 1)
      emit('update:modelValue', list)
    }

    const BUTTON_TYPE_LIST = [
      {
        label: 'primary',
        value: 'primary',
      },
      {
        label: 'success',
        value: 'success',
      },
      {
        label: 'warning',
        value: 'warning',
      },
      {
        label: 'danger',
        value: 'danger',
      },
      {
        label: 'info',
        value: 'info',
      },
    ]

    return () => {
      return (
        <div>
          <VueDraggable
            modelValue={props.modelValue}
            sort={true}
            animation={200}
            filter=".not-drag"
            ghost-class="ghost"
            item-key="key"
            onUpdate:modelValue={(val: OptionsItem[]) => emit('update:modelValue', val)}
          >
            {props.modelValue.map((element, index) => {
              return (
                <div class={['flex', 'items-center', index !== 0 && 'mt-1']} key={element.value}>
                  <el-icon class="mr-1 flex cursor-pointer items-center">
                    <i-rank />
                  </el-icon>
                  <el-input
                    class="mr-1"
                    placeholder="label"
                    modelValue={element.label}
                    onInput={(val: string) => handleInputChange({ ...element, label: val })}
                  />
                  <z-select
                    class="mr-1"
                    placeholder="type"
                    modelValue={element.type}
                    onUpdate:modelValue={(val: string) =>
                      handleInputChange({ ...element, type: val })}
                    options={BUTTON_TYPE_LIST}
                  />
                  <el-switch
                    modelValue={element.link}
                    inline-prompt
                    active-text="link"
                    inactive-text=""
                    onUpdate:modelValue={(val: boolean) =>
                      handleInputChange({ ...element, link: val })}
                  />
                  <el-icon
                    style="color: #f56c6c"
                    class="ml-2 cursor-pointer"
                    onClick={() => handleDel(index)}
                  >
                    <i-delete />
                  </el-icon>
                </div>
              )
            })}
          </VueDraggable>
          <el-button size="small" type="primary" class="mt-1 w-full" onClick={handleAdd}>
            <el-icon>
              <i-plus />
            </el-icon>
            新增按钮
          </el-button>
        </div>
      )
    }
  },
})
