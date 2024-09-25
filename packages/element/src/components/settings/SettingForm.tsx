import { useWorkspaceComponent, useWorkspaceForm } from '@ideal-schema/playground-store'
import { formTemplateOptionsConfig, formTemplateSchema } from '../../schemas'
import CrudFormItemSettingForm from './CrudFormItemSettingForm'
import CrudSettingForm from './CrudSettingForm'
import CrudTableColumnSettingForm from './CrudTableColumnSettingForm'
import FormItemSettingForm from './FormItemSettingForm'
import './style.scss'

export default defineComponent({
  name: 'SettingForm',
  setup() {
    const { curOperateComponent, workspaceComponentList } = useWorkspaceComponent()
    const { formConfig: workspaceFormConfig, setFormConfig } = useWorkspaceForm()

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
      scrollToError: false,
      requireAsteriskPosition: 'left',
      column: 1,
    })

    const handleMiddleFormChange = (data: { value: any, field: any }) => {
      setFormConfig({ ...workspaceFormConfig.value, [data.field]: data.value })
    }

    return () => {
      return null
      // if (!curOperateComponent.value.id && workspaceComponentList.value?.[0]?.name === 'crud')
      //   return null

      // if (!curOperateComponent.value.id) {
      //   return (
      //     <div class="form-content">
      //       <z-form
      //         options={formTemplateOptionsConfig}
      //         v-model={formTemplateModel.value}
      //         {...formConfig}
      //         columns={formTemplateSchema}
      //         onChange={handleMiddleFormChange}
      //       />
      //     </div>
      //   )
      // }

      // if (curOperateComponent.value.name === 'tableCol')
      //   return <CrudTableColumnSettingForm />

      // if (curOperateComponent.value.name === 'crud')
      //   return <CrudSettingForm />

      // if (
      //   workspaceComponentList.value
      //   && workspaceComponentList.value.length
      //   && workspaceComponentList.value[0].name === 'crud'
      // )
      //   return <CrudFormItemSettingForm />

      // return <FormItemSettingForm />
    }
  },
})
