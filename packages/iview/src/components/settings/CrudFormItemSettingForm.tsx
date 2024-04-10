import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import { uid } from '@ideal-schema/shared'
import { cloneDeep, debounce } from 'lodash-es'
import { FORM_COMPONENT_TYPE } from '../../materials'
import {
  SelectCrudFormData,
  dateRangeCrudFormData,
  dateRangeCrudSchema,
  inputCrudFormData,
  inputCrudSchema,
  multipleSelectCrudFormData,
  multipleSelectCrudSchema,
  selectCrudSchema,
} from '../../schemas'
import './style.scss'

export default defineComponent({
  name: 'TableProFormItemSettingForm',
  setup() {
    const { curOperateComponent, workspaceComponentList, updateComponentList, updateCurOperateComponent } = useWorkspaceComponent()

    const formConfig = reactive({
      labelPosition: 'left',
      labelWidth: '120px',
      // size: 'default',
      colon: false,
    })

    const updateData = (
      form: WorkspaceComponentItem,
      schema: Schema,
      changeData: FormChangeData,
    ) => {
      const crud = workspaceComponentList.value[0]
      let columns: TableCol[] = []
      if (schema.columns && schema.columns.length) {
        columns = schema.columns.map((cur: TableCol) => {
          if (cur.search && cur.search.id === form.id) {
            return {
              ...cur,
              search: form,
            }
          }
          return cur
        })
        const updateWorkspaceComponentList = debounce(() => {
          updateComponentList([
            {
              ...crud,
              schema: {
                ...schema,
                formData: {
                  ...schema.formData,
                  [changeData.formData.field]: changeData.formData.default,
                },
                columns,
              },
            },
          ])
        }, 50)

        updateWorkspaceComponentList()
      }
      updateCurOperateComponent(form)
    }

    const handleFieldFormDataChange = (obj: FormChangeData) => {
      const item = {
        ...curOperateComponent.value,
        field: obj.formData.field,
        fieldFormData: obj.formData,
      }
      const crud = workspaceComponentList.value[0]
      const schema = crud.schema
      updateData(item, schema, obj)
    }

    const handleFormDataChange = (obj: FormChangeData) => {
      if (obj.field === 'componentType' && curOperateComponent.value.type !== obj.value) {
        if (obj.value === 'select') {
          const item = {
            ...curOperateComponent.value,
            component: 'select',
            fieldProps: {
              ...SelectCrudFormData,
            },
            componentSchema: [
              {
                component: 'select',
                field: 'componentType',
                label: '组件类别',
              },
              ...cloneDeep(selectCrudSchema),
            ],
            componentFormData: reactive({
              ...SelectCrudFormData,
              componentType: 'select',
            }),
            componentOptionsConfig: {
              componentType: FORM_COMPONENT_TYPE,
            },
          }
          const crud = workspaceComponentList.value[0]
          const schema = {
            ...crud.schema,
            searchFormData: {
              ...crud.schema.searchFormData,
              [obj.field]: obj.value,
            },
            options: {
              ...crud.schema.options,
              [obj.field]: [{ label: '标签', value: '1', key: uid() }],
            },
          }
          updateData(item, schema, obj)
        }
        if (obj.value === 'multipleSelect') {
          const item = {
            ...curOperateComponent.value,
            component: 'select',
            fieldProps: {
              ...multipleSelectCrudFormData,
              multiple: true,
            },
            componentSchema: [
              {
                component: 'select',
                field: 'componentType',
                label: '组件类别',
              },
              ...cloneDeep(multipleSelectCrudSchema),
            ],
            componentFormData: reactive({
              ...multipleSelectCrudFormData,
              componentType: 'multipleSelect',
            }),
            fieldFormData: reactive({
              ...curOperateComponent.value.fieldFormData,
              default: [],
            }),
            componentOptionsConfig: {
              componentType: FORM_COMPONENT_TYPE,
            },
          }
          const crud = workspaceComponentList.value[0]
          const schema = {
            ...crud.schema,
            searchFormData: {
              ...crud.schema.searchFormData,
              [obj.field]: obj.value,
            },
            options: {
              ...crud.schema.options,
              [obj.field]: [{ label: '标签', value: '1', key: uid() }],
            },
          }
          updateData(item, schema, obj)
        }
        if (obj.value === 'input') {
          const item = {
            ...curOperateComponent.value,
            component: 'input',
            fieldProps: reactive({
              ...inputCrudFormData,
            }),
            componentSchema: [
              {
                component: 'select',
                field: 'componentType',
                label: '组件类别',
              },
              ...cloneDeep(inputCrudSchema),
            ],
            componentFormData: reactive({
              ...inputCrudFormData,
              componentType: 'input',
            }),
            componentOptionsConfig: {
              componentType: FORM_COMPONENT_TYPE,
            },
          }
          const crud = workspaceComponentList.value[0]
          const schema = crud.schema
          updateData(item, schema, obj)
        }
        if (obj.value === 'datepicker') {
          const item = {
            ...curOperateComponent.value,
            component: 'datepicker',
            fieldProps: reactive({
              ...dateRangeCrudFormData,
              type: 'daterange',
            }),
            componentSchema: [
              {
                component: 'select',
                field: 'componentType',
                label: '组件类别',
              },
              ...cloneDeep(dateRangeCrudSchema),
            ],
            componentFormData: reactive({
              ...dateRangeCrudFormData,
              componentType: 'datepicker',
            }),
            fieldFormData: reactive({
              ...curOperateComponent.value.fieldFormData,
              default: [],
            }),
            componentOptionsConfig: {
              componentType: FORM_COMPONENT_TYPE,
            },
          }
          const crud = workspaceComponentList.value[0]
          const schema = {
            ...crud.schema,
            searchFormData: {
              ...crud.schema.searchFormData,
              [obj.field]: obj.value,
            },
          }
          updateData(item, schema, obj)
        }
        if (obj.value === 'slot') {
          const item = {
            ...curOperateComponent.value,
            component: 'placeholder-block',
            componentSchema: [
              {
                component: 'select',
                field: 'componentType',
                label: '组件类别',
              },
            ],
            componentFormData: reactive({
              componentType: 'slot',
            }),
            componentOptionsConfig: {
              componentType: FORM_COMPONENT_TYPE,
            },
            formItemFormData: {},
            formItemTemplateSchema: [],
            formItemOptionsConfig: {},
            fieldFormData: reactive({
              field: 'slot',
              slot: 'slot',
            }),
            fieldSchema: [
              {
                component: 'input',
                field: 'field',
                label: '字段名',
              },
              {
                component: 'input',
                field: 'slot',
                label: '插槽名',
              },
            ],
          }
          const crud = workspaceComponentList.value[0]
          const schema = {
            ...crud.schema,
            searchFormData: {
              ...crud.schema.searchFormData,
              [obj.field]: obj.value,
            },
          }
          updateData(item, schema, obj)
        }
      }
      else {
        const item = {
          ...curOperateComponent.value,
          fieldProps: {
            ...curOperateComponent.value.fieldProps,
            ...obj.formData,
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
          item.fieldProps!.options = [...options]
        }
        if (obj.field === 'alias.label') {
          const options = item.componentFormData?.options.map((item: OptionsItem) => {
            return {
              ...item,
              [obj.value]: item.label,
            }
          })
          item.componentFormData!.options = [...options]
          item.fieldProps!.options = [...options]
        }
        const crud = workspaceComponentList.value[0]
        const schema = crud.schema
        updateData(item, schema, obj)
      }
    }

    const handleFormItemFormDataChange = (obj: FormChangeData) => {
      const item = {
        ...curOperateComponent.value,
        formItemProps: { ...curOperateComponent.value.formItemProps, ...obj.formData },
      }
      const crud = workspaceComponentList.value[0]
      const schema = crud.schema
      updateData(item, schema, obj)
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
            && curOperateComponent.value.componentSchema!.length
              ? (
                <el-collapse-item title="组件属性" name="component">
                  <z-form
                    v-model={curOperateComponent.value.componentFormData}
                    {...formConfig}
                    key={curOperateComponent.value.id}
                    columns={curOperateComponent.value.componentSchema}
                    options={curOperateComponent.value.componentOptionsConfig}
                    onChange={handleFormDataChange}
                  />
                </el-collapse-item>
                )
              : null}
            {curOperateComponent.value.formItemTemplateSchema
            && Array.isArray(curOperateComponent.value.formItemTemplateSchema)
              ? (
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
                )
              : null}
          </el-collapse>
        </div>
      )
    }
  },
})
