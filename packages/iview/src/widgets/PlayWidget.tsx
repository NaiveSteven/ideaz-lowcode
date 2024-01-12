import type { PropType } from 'vue'
import { computed, defineComponent, reactive } from 'vue'
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

    return () => {
      if (workspaceComponentType.value === 'form') {
        // const { formItemConfigs, formModel, formConfig, optionsConfig }
        // = getSchemaData('preview')
        const formModelReactive = reactive({})

        return (
          <z-form
            v-model={formModelReactive}
          />
        )
      }
      const { config } = getSchemaData('preview', 'tablePro')
      return <il-table-pro class="table-pro__preview" config={config} />
    }
  },
})
