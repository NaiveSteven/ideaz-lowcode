import { useMiddleFormStore, useWorkspaceStore } from '@ideal-schema/playground-store'
import { formTemplateOptionsConfig, formTemplateSchema } from '../../schemas'
import FormItemSettingForm from './FormItemSettingForm'
import CrudFormItemSettingForm from './CrudFormItemSettingForm'
import CrudSettingForm from './CrudSettingForm'
import CrudTableColumnSettingForm from './CrudTableColumnSettingForm'
import './style.scss'

export default defineComponent({
  name: 'SettingForm',
  setup() {
    const workspaceStore = useWorkspaceStore()
    const middleFormStore = useMiddleFormStore()

    const formConfig = reactive({
      labelPosition: 'left',
      labelWidth: '120px',
      colon: false,
    })

    const formTemplateModel = ref({
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
    const componentList = computed(() => workspaceStore.getWorkspaceComponentList)

    const handleMiddleFormChange = (data: { value: any, field: any }) => {
      middleFormStore.setFormConfig({ ...middleFormConfig.value, [data.field]: data.value })
    }

    return () => {
      if (!curOperateComponent.value.id && componentList.value?.[0]?.name === 'crud')
        return null

      if (!curOperateComponent.value.id) {
        return (
          <div class="form-content">
            <z-form
              options={formTemplateOptionsConfig}
              v-model={formTemplateModel.value}
              {...formConfig}
              columns={formTemplateSchema}
              onChange={handleMiddleFormChange}
            />
          </div>
        )
      }

      if (curOperateComponent.value.name === 'tableCol')
        return <CrudTableColumnSettingForm />

      if (curOperateComponent.value.name === 'crud')
        return <CrudSettingForm />

      if (
        componentList.value
        && componentList.value.length
        && componentList.value[0].name === 'crud'
      )
        return <CrudFormItemSettingForm />

      return <FormItemSettingForm />
    }
  },
})
