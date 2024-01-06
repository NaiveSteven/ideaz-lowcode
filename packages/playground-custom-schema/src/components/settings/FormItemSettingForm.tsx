import { computed, defineComponent, reactive } from 'vue'
import { cloneDeep } from 'lodash-es'
import { isObject } from '@ideal-schema/shared'
import { useMiddleFormStore, useWorkspaceStore } from '@ideal-schema/playground-store'
import './style.scss'

export default defineComponent({
  name: 'FormItemSettingForm',
  setup() {
    const workspaceStore = useWorkspaceStore()
    const middleFormStore = useMiddleFormStore()

    const workspaceFormConfig = computed(() => middleFormStore.getFormConfig)

    const formConfig = reactive({
      labelPosition: 'left',
      labelWidth: '120px',
      // size: 'default',
      colon: false,
    })

    const curOperateComponent = computed(() => workspaceStore.getCurOperateComponent)

    const handleFormDataChange = (obj: FormChangeData) => {
      const cloneObj = cloneDeep(obj)
      let o = {} as WorkspaceComponentItem
      if (curOperateComponent.value && curOperateComponent.value.id) {
        o = {
          ...curOperateComponent.value,
          templateFormData: cloneObj.formData,
          fieldOptionsConfig: {
            default:
              cloneObj.prop === 'options'
                ? obj.formData.options
                : curOperateComponent.value.fieldOptionsConfig!.default || [],
          },
          schema: {
            ...curOperateComponent.value.schema,
            attrs: {
              ...curOperateComponent.value.schema!.attrs,
              ...cloneObj.formData,
            },
          },
        }
      }
      workspaceStore.updateCurOperateComponent(o)
      workspaceStore.updateComponentItem(o)
    }

    const handleFormItemFormDataChange = (obj: FormChangeData) => {
      const cloneObj = cloneDeep(obj)
      let o = {} as WorkspaceComponentItem
      if (curOperateComponent.value && curOperateComponent.value.id) {
        o = {
          ...curOperateComponent.value,
          formItemFormData: cloneObj.formData,
          schema: {
            ...curOperateComponent.value.schema,
            formItem: {
              ...curOperateComponent.value.schema!.formItem,
              ...cloneObj.formData,
            },
          },
        }
      }
      workspaceStore.updateCurOperateComponent(o)
      workspaceStore.updateComponentItem(o)
    }

    const handleFieldFormDataChange = (obj: FormChangeData) => {
      const cloneObj = cloneDeep(obj)
      let o = {} as WorkspaceComponentItem
      if (curOperateComponent.value && curOperateComponent.value.id) {
        const formConfig = { ...workspaceFormConfig.value }
        if (obj.formData.required) {
          if (isObject(formConfig.rules)) {
            formConfig.rules[obj.formData.prop] = [
              {
                required: true,
                message: `请输入${curOperateComponent.value.formItemFormData!.label}`,
                trigger: 'blur',
              },
            ]
          }
          else {
            formConfig.rules = {
              [obj.formData.prop]: [
                {
                  required: true,
                  message: `请输入${curOperateComponent.value.formItemFormData!.label}`,
                  trigger: 'blur',
                },
              ],
            }
          }
          middleFormStore.setFormConfig(formConfig)
        }
        else {
          if (isObject(formConfig.rules)) {
            delete formConfig.rules[obj.formData.prop]
            middleFormStore.setFormConfig(formConfig)
          }
        }
        o = {
          ...curOperateComponent.value,
          fieldFormData: reactive({
            ...curOperateComponent.value.fieldFormData,
            // [cloneObj['formData']['prop']]: cloneObj.formData.default,
          }),
          templateFormData: reactive({
            ...curOperateComponent.value.templateFormData,
            [cloneObj.formData.prop]: cloneObj.formData.default,
          }),
          schema: {
            ...curOperateComponent.value.schema,
            prop: cloneObj.formData.prop,
          },
        }
      }
      workspaceStore.updateCurOperateComponent(cloneDeep(o))
      workspaceStore.updateComponentItem(cloneDeep(o))
    }

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
    }

    return () => {
      return (
        <div class="form-content">
          <el-collapse v-model={curOperateComponent.value.activeCollapseItems}>
            <el-collapse-item title="字段属性" name="field">
              <il-form
                layout={layout}
                formModel={curOperateComponent.value.fieldFormData}
                form-config={formConfig}
                formItemConfig={curOperateComponent.value.fieldSchema}
                options={curOperateComponent.value.fieldOptionsConfig}
                onChange={handleFieldFormDataChange}
              />
            </el-collapse-item>
            {curOperateComponent.value.templateSchema
            && curOperateComponent.value.templateSchema!.length
              ? (
                <el-collapse-item title="组件属性" name="component">
                  <il-form
                    key={curOperateComponent.value.id}
                    layout={layout}
                    formModel={curOperateComponent.value.templateFormData}
                    form-config={formConfig}
                    formItemConfig={curOperateComponent.value.templateSchema}
                    options={curOperateComponent.value.templateOptionsConfig}
                    onChange={handleFormDataChange}
                  />
                </el-collapse-item>
                )
              : null}
            {curOperateComponent.value.formItemTemplateSchema
            && curOperateComponent.value.formItemTemplateSchema?.length && (
              <el-collapse-item title="容器属性" name="formItem">
                <il-form
                  layout={layout}
                  formModel={curOperateComponent.value.formItemFormData}
                  form-config={formConfig}
                  formItemConfig={curOperateComponent.value.formItemTemplateSchema}
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
