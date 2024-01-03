import { defineComponent, ref, h, computed, resolveComponent, watch } from 'vue';
import { isString, isBoolean, isNumber, isArray } from '@ideal-schema/shared';
import type { PropType } from 'vue';

interface IPolyType {
  tip: string;
  icon: string;
  component: string;
  type: string;
  componentProps?: IndexType;
  toChangeValue: any;
}

export default defineComponent({
  name: 'PolyInput',
  props: {
    modelValue: {
      type: [Number, String, Boolean, Array],
      default: '',
    },
    polyTypes: {
      type: Array as PropType<IPolyType[]>,
      default: () => [],
    },
  },
  emits: ['input', 'change'],
  setup(props, { emit }) {
    const currentIndex = ref(0);

    const current = computed(() => props.polyTypes[currentIndex.value]);

    const getType = (val: any) => {
      if (isNumber(val)) {
        return 'number';
      }
      if (isBoolean(val)) {
        return 'boolean';
      }
      if (isString(val)) {
        return 'string';
      }
      if (isArray(val)) {
        return 'array';
      }
      return 'string';
    };

    watch(
      () => props.modelValue,
      () => {
        const type = getType(props.modelValue);
        const index = props.polyTypes.findIndex((item) => item.type === type);
        currentIndex.value = index;
      },
      { immediate: true }
    );

    const handleChangeCurrent = () => {
      const len = props.polyTypes.length;
      if (currentIndex.value < len - 1) {
        ++currentIndex.value;
        emit('input', current.value.toChangeValue);
        return;
      }
      if (currentIndex.value === len - 1) {
        currentIndex.value = 0;
        emit('input', current.value.toChangeValue);
        return;
      }
    };

    return () => (
      <div class="flex">
        {h(resolveComponent(current.value.component), {
          modelValue: props.modelValue,
          ...current.value.componentProps,
          class: 'mr-1',
          onInput: (val: string) => emit('input', val),
          onChange: (val: string) => emit('change', val),
        })}
        <el-tooltip effect="dark" content={current.value.tip} showAfter={500} placement="top">
          <el-button type="default" size="small" onClick={handleChangeCurrent}>
            {/* <el-icon>{h(resolveComponent(current.value.icon))}</el-icon> */}
            {current.value.icon}
          </el-button>
        </el-tooltip>
      </div>
    );
  },
});
