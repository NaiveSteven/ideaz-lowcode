import { cloneDeep } from 'lodash-es'
import { useWorkspaceStore } from '@ideal-schema/playground-store'
import './style.scss'

export default defineComponent({
  name: 'FormItemSettingForm',
  setup() {
    const workspaceStore = useWorkspaceStore()

    const formConfig = reactive({
      labelPosition: 'left',
      labelWidth: '120px',
      // size: 'default',
      colon: false,
    })

    const curOperateComponent = computed(() => workspaceStore.getCurOperateComponent)

    const handleFormDataChange = (obj: FormChangeData) => {
      const cloneObj = cloneDeep(obj)
      let item = {} as WorkspaceComponentItem
      if (curOperateComponent.value && curOperateComponent.value.id) {
        item = {
          ...curOperateComponent.value,
          componentFormData: cloneObj.formData,
          fieldOptionsConfig: {
            default:
              cloneObj.field === 'options'
                ? obj.formData.options
                : curOperateComponent.value.fieldOptionsConfig?.default || [],
          },
          schema: {
            ...curOperateComponent.value.schema,
            fieldProps: {
              ...curOperateComponent.value.schema?.fieldProps,
              ...cloneObj.formData,
            },
          },
        }
      }
      workspaceStore.updateCurOperateComponent(item)
      workspaceStore.updateComponentItem(item)
    }

    const handleFormItemFormDataChange = (obj: FormChangeData) => {
      const cloneObj = cloneDeep(obj)
      let item = {} as WorkspaceComponentItem
      if (curOperateComponent.value && curOperateComponent.value.id) {
        item = {
          ...curOperateComponent.value,
          formItemFormData: cloneObj.formData,
          schema: {
            ...curOperateComponent.value.schema,
            ...cloneObj.formData,
          },
        }
      }
      workspaceStore.updateCurOperateComponent(item)
      workspaceStore.updateComponentItem(item)
    }

    const handleFieldFormDataChange = (obj: FormChangeData) => {
      const cloneObj = cloneDeep(obj)
      let o = {} as WorkspaceComponentItem
      if (curOperateComponent.value && curOperateComponent.value.id) {
        o = {
          ...curOperateComponent.value,
          fieldFormData: reactive({
            ...curOperateComponent.value.fieldFormData,
          }),
          componentFormData: reactive({
            ...curOperateComponent.value.componentFormData,
            [cloneObj.formData.field]: cloneObj.formData.default,
          }),
          schema: {
            ...curOperateComponent.value.schema,
            required: !!cloneObj.formData.required,
            field: cloneObj.formData.field,
          },
        }
      }
      workspaceStore.updateCurOperateComponent(cloneDeep(o))
      workspaceStore.updateComponentItem(cloneDeep(o))
    }

    return () => {
      return (
        <div class="form-content">
          <el-collapse v-model={curOperateComponent.value.activeCollapseItems}>
            <el-collapse-item title="字段属性" name="field">
              <z-form
                v-model={curOperateComponent.value.fieldFormData}
                {...formConfig}
                key={curOperateComponent.value.id}
                columns={curOperateComponent.value.fieldSchema}
                options={curOperateComponent.value.fieldOptionsConfig}
                onChange={handleFieldFormDataChange}
              />
            </el-collapse-item>
            {curOperateComponent.value.componentSchema
            && curOperateComponent.value.componentSchema?.length
              ? (
                <el-collapse-item title="组件属性" name="component">
                  <z-form
                    key={curOperateComponent.value.id}
                    v-model={curOperateComponent.value.componentFormData}
                    {...formConfig}
                    columns={curOperateComponent.value.componentSchema}
                    options={curOperateComponent.value.componentOptionsConfig}
                    onChange={handleFormDataChange}
                  />
                </el-collapse-item>
                )
              : null}
            {curOperateComponent.value.formItemTemplateSchema
            && Array.isArray(curOperateComponent.value.formItemTemplateSchema) && (
              <el-collapse-item title="容器属性" name="formItem">
                <z-form
                  v-model={curOperateComponent.value.formItemFormData}
                  {...formConfig}
                  key={curOperateComponent.value.id}
                  columns={curOperateComponent.value.formItemTemplateSchema}
                  options={curOperateComponent.value.formItemOptionsConfig}
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
