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
    const { activeWidget, widgets, updateWidgets, updateActiveWidget } = useWorkspaceComponent<CrudColumnWidget>()

    const formConfig = reactive({
      labelPosition: 'left',
      labelWidth: '120px',
      colon: false,
    })

    const updateData = (
      form: WorkspaceComponentItem,
      schema: Schema,
      changeData: FormChangeData,
    ) => {
      const crud = widgets.value[0]
      let columns: TableCol[] = []
      if (schema.columns && schema.columns.length) {
        columns = schema.columns.map((cur: TableCol, index) => {
          if (cur.search && cur.search.id === form.id) {
            return {
              ...cur,
              search: form,
            }
          }
          return cur
        })
        const update = debounce(() => {
          updateWidgets([
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

        update()
      }
      updateActiveWidget(form)
    }

    const handleFieldFormDataChange = (obj: FormChangeData) => {
      const item = {
        ...activeWidget.value,
        field: obj.formData.field,
        fieldFormData: obj.formData,
      }
      const crud = widgets.value[0]
      const schema = crud.schema
      updateData(item, schema, obj)
    }

    const handleFormDataChange = (obj: FormChangeData) => {
      if (obj.field === 'componentType' && activeWidget.value.type !== obj.value) {
        if (obj.value === 'select') {
          const item = {
            ...activeWidget.value,
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
          const crud = widgets.value[0]
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
            ...activeWidget.value,
            component: 'select',
            fieldProps: {
              ...multipleSelectCrudFormData,
              multiple: true,
            },
            fieldOptionsConfig: {
              default: [
                { label: '标签1', value: '1', key: uid() },
                { label: '标签2', value: '2', key: uid() },
              ],
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
              ...activeWidget.value.fieldFormData,
              default: [],
            }),
            componentOptionsConfig: {
              componentType: FORM_COMPONENT_TYPE,
            },
          }
          const crud = widgets.value[0]
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
            ...activeWidget.value,
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
          const crud = widgets.value[0]
          const schema = crud.schema
          updateData(item, schema, obj)
        }
        if (obj.value === 'el-date-picker') {
          const item = {
            ...activeWidget.value,
            component: 'el-date-picker',
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
              componentType: 'el-date-picker',
            }),
            fieldFormData: reactive({
              ...activeWidget.value.fieldFormData,
              default: [],
            }),
            componentOptionsConfig: {
              componentType: FORM_COMPONENT_TYPE,
            },
          }
          const crud = widgets.value[0]
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
            ...activeWidget.value,
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
          const crud = widgets.value[0]
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
          ...activeWidget.value,
          fieldOptionsConfig: {
            default:
              obj.field === 'options'
                ? obj.formData.options
                : activeWidget.value.fieldOptionsConfig?.default || [],
          },
          fieldProps: {
            ...activeWidget.value.fieldProps,
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
        const crud = widgets.value[0]
        const schema = crud.schema
        updateData(item, schema, obj)
      }
    }

    const handleFormItemFormDataChange = (obj: FormChangeData) => {
      const item = {
        ...activeWidget.value,
        ...obj.formData,
      }
      const crud = widgets.value[0]
      const schema = crud.schema
      updateData(item, schema, obj)
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
            && activeWidget.value.componentSchema!.length
              ? (
                <el-collapse-item title="组件属性" name="component">
                  <z-form
                    v-model={activeWidget.value.componentFormData}
                    {...formConfig}
                    key={activeWidget.value.id}
                    columns={activeWidget.value.componentSchema}
                    options={activeWidget.value.componentOptionsConfig}
                    onChange={handleFormDataChange}
                  />
                </el-collapse-item>
                )
              : null}
            {activeWidget.value.formItemTemplateSchema
            && Array.isArray(activeWidget.value.formItemTemplateSchema)
              ? (
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
                )
              : null}
          </el-collapse>
        </div>
      )
    }
  },
})
