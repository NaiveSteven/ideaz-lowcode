import { useGlobalSettingStore } from '@ideal-schema/playground-store'
import { getSchemaData } from '@ideal-schema/playground-demi'

export default defineComponent({
  name: 'PlayWidget',
  props: {
    viewType: {
      type: String as PropType<'json' | 'design' | 'play'>,
      default: 'design',
    },
  },
  setup() {
    const globalSettingStore = useGlobalSettingStore()
    const workspaceComponentType = computed(() => globalSettingStore.getWorkspaceComponentType)
    const formData = ref({})
    const columns = ref<any>([])
    const tableConfig = ref({})

    onMounted(() => {
      if (workspaceComponentType.value === 'form') {
        const { formData: data, columns: formItems } = getSchemaData('preview')
        formData.value = { ...data }
        columns.value = [...formItems]
      }
      else {
        const { config, columns: cols } = getSchemaData('preview', 'crud')
        formData.value = { ...config.searchFormData }
        columns.value = [...cols]
        tableConfig.value = config
      }
    })

    return () => {
      if (workspaceComponentType.value === 'form') {
        const { formConfig, options } = getSchemaData('preview')

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
