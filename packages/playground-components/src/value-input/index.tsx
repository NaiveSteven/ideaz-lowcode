import { defineComponent, computed } from 'vue';
import type { PropType } from 'vue';
import PolyInput from '../poly-input';

export default defineComponent({
  name: 'ValueInput',
  props: {
    modelValue: {
      type: [Number, String, Boolean, Array],
      default: '',
    },
    arrayOptions: {
      type: Array as PropType<OptionsItem[]>,
      default: () => [],
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const polyTypes = computed(() => {
      return [
        {
          tip: '文本',
          icon: 'T',
          type: 'string',
          component: 'el-input',
          toChangeValue: 'default',
          componentProps: {
            style: {
              minWidth: '83px',
            },
          },
        },
        {
          tip: '数字',
          icon: 'N',
          type: 'number',
          component: 'el-input-number',
          componentProps: {
            controlsPosition: 'right',
            style: {
              minWidth: '83px',
            },
          },
          toChangeValue: 1,
        },
        {
          tip: '布尔',
          icon: 'B',
          type: 'boolean',
          component: 'il-select',
          componentProps: {
            style: {
              minWidth: '83px',
            },
            options: [
              {
                label: 'true',
                value: true,
              },
              {
                label: 'false',
                value: false,
              },
            ],
          },
          toChangeValue: true,
        },
        {
          tip: '数组',
          icon: 'A',
          type: 'array',
          component: 'il-select',
          componentProps: {
            multiple: true,
            options: props.arrayOptions,
            // collapseTags: true,
            style: {
              minWidth: '83px',
            },
          },
          toChangeValue: [],
        },
      ];
    });

    return () => (
      <PolyInput
        polyTypes={polyTypes.value}
        modelValue={props.modelValue}
        onInput={(val: string) => emit('change', val)}
        onChange={(val: string) => emit('change', val)}
      />
    );
  },
});
