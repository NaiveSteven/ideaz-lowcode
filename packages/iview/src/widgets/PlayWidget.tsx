import { parseElementSchema } from '@ideal-schema/playground-parser'
import { useGlobalSetting } from '@ideal-schema/playground-store'

export default defineComponent({
  name: 'PlayWidget',
  props: {
    viewType: {
      type: String as PropType<'json' | 'design' | 'play'>,
      default: 'design',
    },
  },
  setup() {
    const { workspaceComponentType } = useGlobalSetting()
    const formData = ref({})
    const columns = ref<any>([])
    const tableConfig = ref({})

    onMounted(() => {
      if (workspaceComponentType.value === 'form') {
        const { formData: data, columns: formItems } = parseElementSchema('preview')
        formData.value = { ...data }
        columns.value = [...formItems]
      }
      else {
        const { config, columns: cols } = parseElementSchema('preview', 'crud')
        formData.value = { ...config.searchFormData }
        columns.value = [...cols]
        tableConfig.value = config
      }
    })

    return () => {
      if (workspaceComponentType.value === 'form') {
        const { formConfig, options } = parseElementSchema('preview')

        return (
          <z-form
            v-model={formData.value}
            {...formConfig}
            options={options}
            columns={columns.value}
          />
        )
      }
      return <z-crud class="crud__preview" columns={columns.value} {...tableConfig.value} v-model:formData={formData.value} />
    }
  },
})
