import { defineComponent } from 'vue';
import { uid } from '@ideal-schema/shared';
import { VueDraggable } from 'vue-draggable-plus';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'OptionItemWidget',
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
      console.log(list, 'list');
      const len = list.length;
      list.push({ key: uid(), label: `标签${len + 1}`, value: len + 1 });
      emit('change', list);
      emit('input', list);
    };

    const handleDel = (index: number) => {
      const list = [...props.modelValue];
      list.splice(index, 1);
      emit('change', list);
      emit('input', list);
    };

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
                    modelValue={element.label}
                    onInput={(val: string) => handleInputChange({ ...element, label: val })}
                  />
                  <value-input
                    class="ml-1"
                    modelValue={element.value}
                    onChange={(val: string) => handleInputChange({ ...element, value: val })}
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
            新增选项
          </el-button>
        </div>
      );
    };
  },
});
