import { computed, defineComponent, reactive } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useWorkspaceStore } from '@ideal-schema/playground-store'
import { uid } from '@ideal-schema/shared'
import { FORM_COMPONENT_TYPE } from '../../source'
import {
  SelectTableProFormData,
  dateRangeTableProFormData,
  dateRangeTableProSchema,
  inputTableProFormData,
  inputTableProSchema,
  multipleSelectTableProFormData,
  multipleSelectTableProSchema,
  selectTableProSchema,
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

    const updateData = (
      form: WorkspaceComponentItem,
      schema: Schema,
      changeData: FormChangeData,
    ) => {
      const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
      let tableCols: TableCol[] = []
      if (schema.tableCols && schema.tableCols.length) {
        tableCols = schema.tableCols.map((cur: TableCol) => {
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
              formModel: {
                ...schema.formModel,
                [changeData.formData.prop]: changeData.formData.default,
              },
              tableCols,
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
      if (obj.prop === 'componentType' && curOperateComponent.value.type !== obj.val) {
        if (obj.val === 'select') {
          const item = {
            ...curOperateComponent.value,
            type: 'select',
            attrs: {
              ...SelectTableProFormData,
            },
            templateSchema: [
              {
                type: 'select',
                prop: 'componentType',
                formItem: {
                  label: '组件类别',
                },
              },
              ...cloneDeep(selectTableProSchema),
            ],
            templateFormData: reactive({
              ...SelectTableProFormData,
              componentType: 'select',
            }),
            templateOptionsConfig: {
              componentType: FORM_COMPONENT_TYPE,
            },
          }
          const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
          const schema = {
            ...tableProConfig.schema,
            formModel: {
              ...tableProConfig.schema.formModel,
              [obj.prop]: obj.val,
            },
            formOptions: {
              ...tableProConfig.schema.formOptions,
              [obj.prop]: [{ label: '标签', value: '1', key: uid() }],
            },
          }
          updateData(item, schema, obj)
        }
        if (obj.val === 'multipleSelect') {
          const item = {
            ...curOperateComponent.value,
            type: 'select',
            attrs: {
              ...multipleSelectTableProFormData,
              multiple: true,
            },
            templateSchema: [
              {
                type: 'select',
                prop: 'componentType',
                formItem: {
                  label: '组件类别',
                },
              },
              ...cloneDeep(multipleSelectTableProSchema),
            ],
            templateFormData: reactive({
              ...multipleSelectTableProFormData,
              componentType: 'multipleSelect',
            }),
            fieldFormData: reactive({
              ...curOperateComponent.value.fieldFormData,
              default: [],
            }),
            templateOptionsConfig: {
              componentType: FORM_COMPONENT_TYPE,
            },
          }
          const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
          const schema = {
            ...tableProConfig.schema,
            formModel: {
              ...tableProConfig.schema.formModel,
              [obj.prop]: obj.val,
            },
            formOptions: {
              ...tableProConfig.schema.formOptions,
              [obj.prop]: [{ label: '标签', value: '1', key: uid() }],
            },
          }
          updateData(item, schema, obj)
        }
        if (obj.val === 'input') {
          const item = {
            ...curOperateComponent.value,
            type: 'input',
            attrs: reactive({
              ...inputTableProFormData,
            }),
            templateSchema: [
              {
                type: 'select',
                prop: 'componentType',
                formItem: {
                  label: '组件类别',
                },
              },
              ...cloneDeep(inputTableProSchema),
            ],
            templateFormData: reactive({
              ...inputTableProFormData,
              componentType: 'input',
            }),
            templateOptionsConfig: {
              componentType: FORM_COMPONENT_TYPE,
            },
          }
          const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
          const schema = tableProConfig.schema
          updateData(item, schema, obj)
        }
        if (obj.val === 'datepicker') {
          const item = {
            ...curOperateComponent.value,
            type: 'datepicker',
            attrs: reactive({
              ...dateRangeTableProFormData,
              type: 'daterange',
            }),
            templateSchema: [
              {
                type: 'select',
                prop: 'componentType',
                formItem: {
                  label: '组件类别',
                },
              },
              ...cloneDeep(dateRangeTableProSchema),
            ],
            templateFormData: reactive({
              ...dateRangeTableProFormData,
              componentType: 'datepicker',
            }),
            fieldFormData: reactive({
              ...curOperateComponent.value.fieldFormData,
              default: [],
            }),
            templateOptionsConfig: {
              componentType: FORM_COMPONENT_TYPE,
            },
          }
          const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
          const schema = {
            ...tableProConfig.schema,
            formModel: {
              ...tableProConfig.schema.formModel,
              [obj.prop]: obj.val,
            },
          }
          updateData(item, schema, obj)
        }
        if (obj.val === 'slot') {
          const item = {
            ...curOperateComponent.value,
            type: 'placeholder-block',
            templateSchema: [
              {
                type: 'select',
                prop: 'componentType',
                formItem: {
                  label: '组件类别',
                },
              },
            ],
            templateFormData: reactive({
              componentType: 'slot',
            }),
            templateOptionsConfig: {
              componentType: FORM_COMPONENT_TYPE,
            },
            formItemFormData: {},
            formItemTemplateSchema: [],
            formItemOptionsConfig: {},
            fieldFormData: reactive({
              prop: 'slot',
              slot: 'slot',
            }),
            fieldSchema: [
              {
                type: 'input',
                prop: 'prop',
                formItem: { label: '字段名' },
                attrs: {
                  placeholder: '请输入字段名',
                },
              },
              {
                type: 'input',
                prop: 'slot',
                formItem: { label: '插槽名' },
                attrs: {
                  placeholder: '请输入插槽名',
                },
              },
            ],
          }
          const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
          const schema = {
            ...tableProConfig.schema,
            formModel: {
              ...tableProConfig.schema.formModel,
              [obj.prop]: obj.val,
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
            && curOperateComponent.value.formItemTemplateSchema?.length
              ? (
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
                )
              : null}
          </el-collapse>
        </div>
      )
    }
  },
})
