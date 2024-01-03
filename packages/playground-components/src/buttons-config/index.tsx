import { defineComponent } from 'vue';
import { uid } from '@ideal-schema/shared';
import { VueDraggable } from 'vue-draggable-plus';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'ButtonsConfig',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Array as PropType<OptionsItem[]>,
      default: () => [],
    },
  },
  emits: ['change', 'input'],
  setup(props, { emit }) {
    const handleInputChange = (data: OptionsItem) => {
      const list = [...props.modelValue];
      const index = list.findIndex((item) => item.key === data.key);
      if (index > -1) {
        list.splice(index, 1, data);
      }
      emit('change', list);
      emit('input', list);
    };

    const handleAdd = () => {
      const list = [...props.modelValue];
      const len = list.length;
      list.push({ key: uid(), label: `按钮${len + 1}`, type: 'text' });
      emit('change', list);
      emit('input', list);
    };

    const handleDel = (index: number) => {
      const list = [...props.modelValue];
      list.splice(index, 1);
      emit('change', list);
      emit('input', list);
    };

    const BUTTON_TYPE_LIST = [
      {
        label: 'text',
        value: 'text',
      },
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
    ];

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
            onUpdate:modelValue={(val: OptionsItem[]) => emit('input', val)}
          >
            {props.modelValue.map((element, index) => {
              return (
                <div class={['flex', 'items-center', index !== 0 && 'mt-1']} key={element.value}>
                  <el-icon class="flex items-center mr-1 cursor-pointer">
                    <i-rank />
                  </el-icon>
                  <el-input
                    class="mr-1"
                    placeholder="label"
                    modelValue={element.label}
                    onInput={(val: string) => handleInputChange({ ...element, label: val })}
                  />
                  <il-select
                    placeholder="type"
                    modelValue={element.type}
                    onUpdate:modelValue={(val: string) =>
                      handleInputChange({ ...element, type: val })
                    }
                    options={BUTTON_TYPE_LIST}
                  />
                  <el-icon
                    style="color: #f56c6c"
                    class="cursor-pointer ml-2"
                    onClick={() => handleDel(index)}
                  >
                    <i-delete />
                  </el-icon>
                </div>
              );
            })}
          </VueDraggable>
          <el-button size="small" type="primary" class="mt-1 w-full" onClick={handleAdd}>
            <el-icon>
              <i-plus />
            </el-icon>
            新增按钮
          </el-button>
        </div>
      );
    };
  },
});
