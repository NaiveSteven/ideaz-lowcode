import { computed, defineComponent, reactive } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useWorkspaceStore } from '@ideal-schema/playground-store'
import './style.scss'

export default defineComponent({
  name: 'TableProSettingForm',
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

    const handleFormConfigChange = (obj: FormChangeData) => {
      const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
      const schema = {
        ...tableProConfig.schema,
        formConfig: {
          ...tableProConfig.schema.formConfig,
          ...obj.formData,
        },
      }
      workspaceStore.updateCurOperateComponent({
        ...tableProConfig,
        schema,
      })
      workspaceStore.updateComponentList([
        {
          ...tableProConfig,
          schema,
        },
      ])
    }

    const handleTableConfigChange = (obj: FormChangeData) => {
      const tableProConfig = workspaceStore.getWorkspaceComponentList[0]
      const schema = cloneDeep(tableProConfig.schema)
      if (obj.formData.pagination === false) {
        delete schema.pagination
      }
      else {
        schema.pagination = {
          page: 1,
          page_size: 10,
          total: 0,
        }
      }
      if (obj.formData.tableDecorator !== 'el-card') {
        schema.tableDecorator = {
          name: obj.val,
        }
      }
      else {
        delete schema.tableDecorator
      }
      if (obj.formData.formDecorator !== 'el-card') {
        schema.formDecorator = {
          name: obj.val,
        }
      }
      else {
        delete schema.formDecorator
      }
      if (obj.formData.rowKey !== 'id') {
        schema.rowKey = obj.formData.rowKey
      }
      else {
        // delete schema.rowKey;
      }
      if (obj.formData.defaultExpand)
        schema.defaultExpand = true

      else
        delete schema.defaultExpand

      workspaceStore.updateComponentList([
        {
          ...tableProConfig,
          templateFormData: {
            ...tableProConfig.templateFormData,
            ...obj.formData,
          },
          schema,
        },
      ])
      workspaceStore.updateCurOperateComponent({
        ...tableProConfig,
        templateFormData: {
          ...tableProConfig.templateFormData,
          ...obj.formData,
        },
        schema,
      })
    }

    return () => {
      return (
        <div class="form-content">
          <el-collapse v-model={curOperateComponent.value.activeCollapseItems}>
            <el-collapse-item title="表单属性" name="form">
              <il-form
                layout={layout}
                formModel={curOperateComponent.value.fieldFormData}
                form-config={formConfig}
                formItemConfig={curOperateComponent.value.fieldSchema}
                onChange={handleFormConfigChange}
              />
            </el-collapse-item>
            <el-collapse-item title="表格属性" name="table">
              <il-form
                layout={layout}
                formModel={curOperateComponent.value.templateFormData}
                form-config={formConfig}
                formItemConfig={curOperateComponent.value.templateSchema}
                options={curOperateComponent.value.templateOptionsConfig}
                onChange={handleTableConfigChange}
              />
            </el-collapse-item>
          </el-collapse>
        </div>
      )
    }
  },
})
