import { computed, defineComponent, reactive } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useWorkspaceStore } from '@ideal-schema/playground-store'
import { uid } from '@ideal-schema/shared'
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
    const workspaceStore = useWorkspaceStore()

    const formConfig = reactive({
      labelPosition: 'left',
      labelWidth: '120px',
      // size: 'default',
      colon: false,
    })

    const curOperateComponent = computed(() => workspaceStore.getCurOperateComponent)

    const updateData = (
      form: WorkspaceComponentItem,
      schema: Schema,
      changeData: FormChangeData,
    ) => {
      const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
      let columns: TableCol[] = []
      if (schema.columns && schema.columns.length) {
        columns = schema.columns.map((cur: TableCol) => {
          if (cur.formItemProps && cur.formItemProps.id === form.id) {
            return {
              ...cur,
              formItemProps: form,
            }
          }
          return cur
        })
        workspaceStore.updateComponentList([
          {
            ...tableProConfig,
            schema: {
              ...schema,
              searchFormData: {
                ...schema.searchFormData,
                [changeData.formData.prop]: changeData.formData.default,
              },
              columns,
            },
          },
        ])
      }
      workspaceStore.updateCurOperateComponent(form)
    }

    const handleFieldFormDataChange = (obj: FormChangeData) => {
      const item = {
        ...curOperateComponent.value,
        prop: obj.formData.prop,
      }
      const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
      const schema = tableProConfig.schema
      updateData(item, schema, obj)
    }

    const handleFormDataChange = (obj: FormChangeData) => {
      if (obj.field === 'componentType' && curOperateComponent.value.type !== obj.value) {
        if (obj.value === 'select') {
          const item = {
            ...curOperateComponent.value,
            type: 'select',
            attrs: {
              ...SelectCrudFormData,
            },
            templateSchema: [
              {
                type: 'select',
                prop: 'componentType',
                formItem: {
                  label: '组件类别',
                },
              },
              ...cloneDeep(selectCrudSchema),
            ],
            templateFormData: reactive({
              ...SelectCrudFormData,
              componentType: 'select',
            }),
            templateOptionsConfig: {
              componentType: FORM_COMPONENT_TYPE,
            },
          }
          const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
          const schema = {
            ...tableProConfig.schema,
            searchFormData: {
              ...tableProConfig.schema.searchFormData,
              [obj.field]: obj.value,
            },
            formOptions: {
              ...tableProConfig.schema.options,
              [obj.field]: [{ label: '标签', value: '1', key: uid() }],
            },
          }
          updateData(item, schema, obj)
        }
        if (obj.value === 'multipleSelect') {
          const item = {
            ...curOperateComponent.value,
            type: 'select',
            attrs: {
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
          const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
          const schema = {
            ...tableProConfig.schema,
            searchFormData: {
              ...tableProConfig.schema.searchFormData,
              [obj.field]: obj.value,
            },
            formOptions: {
              ...tableProConfig.schema.options,
              [obj.field]: [{ label: '标签', value: '1', key: uid() }],
            },
          }
          updateData(item, schema, obj)
        }
        if (obj.value === 'input') {
          const item = {
            ...curOperateComponent.value,
            type: 'input',
            attrs: reactive({
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
          const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
          const schema = tableProConfig.schema
          updateData(item, schema, obj)
        }
        if (obj.value === 'datepicker') {
          const item = {
            ...curOperateComponent.value,
            type: 'datepicker',
            attrs: reactive({
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
          const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
          const schema = {
            ...tableProConfig.schema,
            searchFormData: {
              ...tableProConfig.schema.searchFormData,
              [obj.field]: obj.value,
            },
          }
          updateData(item, schema, obj)
        }
        if (obj.value === 'slot') {
          const item = {
            ...curOperateComponent.value,
            type: 'placeholder-block',
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
                field: 'prop',
                label: '字段名',
              },
              {
                component: 'input',
                field: 'slot',
                label: '插槽名',
              },
            ],
          }
          const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
          const schema = {
            ...tableProConfig.schema,
            searchFormData: {
              ...tableProConfig.schema.searchFormData,
              [obj.field]: obj.value,
            },
          }
          updateData(item, schema, obj)
        }
      }
      else {
        const item = {
          ...curOperateComponent.value,
          attrs: {
            ...curOperateComponent.value.attrs,
            ...obj.formData,
          },
        }
        const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
        const schema = tableProConfig.schema
        updateData(item, schema, obj)
      }
    }

    const handleFormItemFormDataChange = (obj: FormChangeData) => {
      const item = {
        ...curOperateComponent.value,
        formItem: { ...obj.formData },
      }
      const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
      const schema = tableProConfig.schema
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
            && Array.isArray(curOperateComponent.value.formItemTemplateSchema)
              ? (
                <el-collapse-item title="容器属性" name="formItem">
                  <z-form
                    v-model={curOperateComponent.value.formItemFormData}
                    {...formConfig}
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