import { defineComponent, computed } from 'vue';
import { useTableColumnSlots, useRadioColumnMethods, useExpose } from '../hooks';
import RadioColumn from './RadioColumn.vue';

export default defineComponent({
  name: 'CTableColumn',
  components: { RadioColumn },
  props: {
    tableCol: {
      type: Object,
      default: () => ({}),
    },
    size: {
      type: String,
      default: 'small',
    },
    tableAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['radio-change'],
  setup(props, { emit, slots }) {
    const { clearSelection, toggleRadioSelection } = useRadioColumnMethods();
    const { scopedSlots } = useTableColumnSlots(props, slots);

    useExpose({
      clearSelection,
      toggleRadioSelection,
    });

    const attrsAll = computed(() => {
      return { align: 'center', ...props.tableCol };
    });

    return () => {
      const { tableCol, tableAttrs } = props;

      if (tableCol.type === 'radio') {
        return (
          <RadioColumn
            ref="radioColumn"
            tableCol={tableCol}
            tableAttrs={tableAttrs}
            onRadio-change={(row: any) => emit('radio-change', row)}
          />
        );
      }
      return <el-table-column {...attrsAll.value} v-slots={scopedSlots.value} />;
    };
  },
});
