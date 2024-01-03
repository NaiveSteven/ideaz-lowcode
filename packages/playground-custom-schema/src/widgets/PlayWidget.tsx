import { defineComponent, PropType, reactive, computed } from 'vue';
import { useGlobalSettingStore } from '@ideal-schema/playground-store';
import { useReduceJsonSchema } from '@ideal-schema/playground-demi';

export default defineComponent({
  name: 'PlayWidget',
  props: {
    viewType: {
      type: String as PropType<'json' | 'design' | 'play'>,
      default: 'design',
    },
  },
  setup() {
    const globalSettingStore = useGlobalSettingStore();

    const workspaceComponentType = computed(() => globalSettingStore.getWorkspaceComponentType);

    const layout = {
      rowLayout: {
        type: 'flex',
        justify: 'center',
      },
      colLayout: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 24,
      },
    };

    return () => {
      if (workspaceComponentType.value === 'form') {
        const { formItemConfigs, formModel, formConfig, optionsConfig } =
          useReduceJsonSchema('preview');
        const formModelReactive = reactive(formModel);

        return (
          <il-form
            layout={layout}
            formModel={formModelReactive}
            form-config={formConfig}
            formItemConfig={formItemConfigs}
            options={optionsConfig}
          />
        );
      }
      const { config } = useReduceJsonSchema('preview', 'tablePro');
      return <il-table-pro class="table-pro__preview" config={config} />;
    };
  },
});
