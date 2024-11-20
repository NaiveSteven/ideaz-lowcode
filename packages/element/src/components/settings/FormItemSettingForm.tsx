import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import { cloneDeep } from 'lodash-es'
import {
  fieldTemplateSchema,
} from '../../schemas'
import './style.scss'

export default defineComponent({
  name: 'FormItemSettingForm',
  setup() {
    const { activeWidget, updateActiveWidget, updateComponentItem } = useWorkspaceComponent()

    const formConfig = reactive({
      labelPosition: 'left',
      labelWidth: '120px',
      // size: 'default',
      colon: false,
    })

    const handleFormDataChange = (obj: FormChangeData) => {
      const cloneObj = cloneDeep(obj)
      let item = {} as WorkspaceComponentItem
      if (activeWidget.value && activeWidget.value.id) {
        item = {
          ...activeWidget.value,
          componentFormData: cloneObj.formData,
          fieldOptionsConfig: {
            default:
              cloneObj.field === 'options'
                ? obj.formData.options
                : activeWidget.value.fieldOptionsConfig?.default || [],
          },
          schema: {
            ...activeWidget.value.schema,
            fieldProps: {
              ...activeWidget.value.schema?.fieldProps,
              ...cloneObj.formData,
            },
          },
        }
        if (obj.field === 'alias.value') {
          const options = item.componentFormData?.options.map((item: OptionsItem) => {
            return {
              ...item,
              [obj.value]: item.value,
            }
          })
          item.componentFormData!.options = [...options]
          item.schema.fieldProps!.options = [...options]
        }
        if (obj.field === 'alias.label') {
          const options = item.componentFormData?.options.map((item: OptionsItem) => {
            return {
              ...item,
              [obj.value]: item.label,
            }
          })
          item.componentFormData!.options = [...options]
          item.schema.fieldProps!.options = [...options]
        }
        if (obj.field === 'multiple' && obj.value) {
          const options = item.componentFormData?.options.map((item: OptionsItem) => {
            return {
              [item.fieldProps?.alias?.label || item.fieldsProps?.props?.label || 'label']: item.label,
              [item.fieldProps?.alias?.value || item.fieldsProps?.props?.value || 'value']: item.value,
            }
          })
          item.fieldSchema = fieldTemplateSchema({ defaultComponent: 'select', required: true, defaultProps: { multiple: true } })
          item.fieldFormData = reactive({
            ...item.fieldFormData,
            default: [],
          })
          item.componentFormData!.options = [...options]
          item.schema.fieldProps!.options = [...options]
        }
        if (obj.field === 'multiple' && !obj.value) {
          const options = item.componentFormData?.options.map((item: OptionsItem) => {
            return {
              [item.fieldProps?.alias?.label || item.fieldsProps?.props?.label || 'label']: item.label,
              [item.fieldProps?.alias?.value || item.fieldsProps?.props?.value || 'value']: item.value,
            }
          })
          item.fieldSchema = fieldTemplateSchema({ defaultComponent: 'select', required: true })
          item.fieldFormData = reactive({
            ...item.fieldFormData,
            default: '',
          })
          item.componentFormData!.options = [...options]
          item.schema.fieldProps!.options = [...options]
        }
      }
      updateActiveWidget(item)
      updateComponentItem(item)
    }

    const handleFormItemFormDataChange = (obj: FormChangeData) => {
      const cloneObj = cloneDeep(obj)
      let item = {} as WorkspaceComponentItem
      if (activeWidget.value && activeWidget.value.id) {
        item = {
          ...activeWidget.value,
          formItemFormData: cloneObj.formData,
          schema: {
            ...activeWidget.value.schema,
            ...cloneObj.formData,
          },
        }
      }
      updateActiveWidget(item)
      updateComponentItem(item)
    }

    const handleFieldFormDataChange = (obj: FormChangeData) => {
      const cloneObj = cloneDeep(obj)
      let o = {} as WorkspaceComponentItem
      if (activeWidget.value && activeWidget.value.id) {
        o = {
          ...activeWidget.value,
          fieldFormData: reactive({
            ...activeWidget.value.fieldFormData,
          }),
          componentFormData: reactive({
            ...activeWidget.value.componentFormData,
            // [cloneObj.formData.field]: cloneObj.formData.default,
          }),
          schema: {
            ...activeWidget.value.schema,
            required: !!cloneObj.formData.required,
            field: cloneObj.formData.field,
          },
        }
      }
      updateActiveWidget(cloneDeep(o))
      updateComponentItem(cloneDeep(o))
    }

    return () => {
      return (
        <div class="form-content">
          <el-collapse v-model={activeWidget.value.activeCollapseItems}>
            <el-collapse-item title="字段属性" name="field">
              <z-form
                v-model={activeWidget.value.fieldFormData}
                {...formConfig}
                key={activeWidget.value.id}
                columns={activeWidget.value.fieldSchema}
                options={activeWidget.value.fieldOptionsConfig}
                onChange={handleFieldFormDataChange}
              />
            </el-collapse-item>
            {activeWidget.value.componentSchema
            && activeWidget.value.componentSchema?.length
              ? (
                <el-collapse-item title="组件属性" name="component">
                  <z-form
                    key={activeWidget.value.id}
                    v-model={activeWidget.value.componentFormData}
                    {...formConfig}
                    columns={activeWidget.value.componentSchema}
                    options={activeWidget.value.componentOptionsConfig}
                    onChange={handleFormDataChange}
                  />
                </el-collapse-item>
                )
              : null}
            {activeWidget.value.formItemTemplateSchema
            && Array.isArray(activeWidget.value.formItemTemplateSchema) && (
              <el-collapse-item title="容器属性" name="formItem">
                <z-form
                  v-model={activeWidget.value.formItemFormData}
                  {...formConfig}
                  key={activeWidget.value.id}
                  columns={activeWidget.value.formItemTemplateSchema}
                  options={activeWidget.value.formItemOptionsConfig}
                  onChange={handleFormItemFormDataChange}
                />
              </el-collapse-item>
            )}
          </el-collapse>
        </div>
      )
    }
  },
})
