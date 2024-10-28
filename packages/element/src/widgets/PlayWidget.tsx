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

    onMounted(() => {
      if (workspaceComponentType.value === 'form') {
        const { formData: data, columns: formItems } = parseElementSchema('preview')
        formData.value = { ...data }
        columns.value = [...formItems]
      }
      else {
        const { config } = parseElementSchema('preview', 'crud')
        formData.value = { ...config.searchFormData }
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
      const { config, columns: cols } = parseElementSchema('preview', 'crud')
      return <z-crud class="crud__preview" {...config} columns={cols} v-model:formData={formData.value} />
    }
  },
})
