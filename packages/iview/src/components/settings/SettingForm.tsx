import { useMiddleFormStore, useWorkspaceStore } from '@ideal-schema/playground-store'
import { formTemplateOptionsConfig, formTemplateSchema } from '../../schemas'
import FormItemSettingForm from './FormItemSettingForm'
import './style.scss'

export default defineComponent({
  name: 'SettingForm',
  setup() {
    const workspaceStore = useWorkspaceStore()
    const middleFormStore = useMiddleFormStore()

    const formConfig = reactive({
      labelPosition: 'left',
      labelWidth: '120px',
      // size: 'default',
      colon: false,
    })

    const formTemplateModel = reactive({
      background: 'page',
      labelPosition: 'right',
      labelWidth: '100px',
      size: 'default',
      colon: false,
      labelSuffix: '',
      disabled: false,
      hideRequiredAsterisk: false,
      showMessage: true,
      inlineMessage: false,
      statusIcon: false,
      validateOnRuleChange: true,
    })

    const curOperateComponent = computed(() => workspaceStore.getCurOperateComponent)
    const middleFormConfig = computed(() => middleFormStore.getFormConfig)

    const handleMiddleFormChange = (data: { value: any, field: any }) => {
      middleFormStore.setFormConfig({ ...middleFormConfig.value, [data.field]: data.value })
    }

    return () => {
      if (!curOperateComponent.value.id) {
        return (
          <div class="form-content">
            <z-form
              options={formTemplateOptionsConfig}
              v-model={formTemplateModel}
              {...formConfig}
              columns={formTemplateSchema}
              onChange={handleMiddleFormChange}
            />
          </div>
        )
      }
      return <FormItemSettingForm />
    }
  },
})
