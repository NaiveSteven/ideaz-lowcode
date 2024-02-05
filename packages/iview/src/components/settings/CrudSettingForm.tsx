import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import { cloneDeep } from 'lodash-es'
import './style.scss'

export default defineComponent({
  name: 'CrudSettingForm',
  setup() {
    const { curOperateComponent, workspaceComponentList, updateCurOperateComponent, updateComponentList } = useWorkspaceComponent()

    const formConfig = reactive({
      labelPosition: 'left',
      labelWidth: '120px',
      colon: false,
    })

    const handleFormConfigChange = (obj: FormChangeData) => {
      const crud = workspaceComponentList.value[0]
      const schema = {
        ...crud.schema,
        search: {
          ...crud.schema.search,
          ...obj.formData,
        },
      }
      if (obj.formData.collapsed)
        schema.collapsed = true

      else
        schema.collapsed = false

      updateCurOperateComponent({
        ...crud,
        fieldFormData: reactive({
          ...curOperateComponent.value.fieldFormData,
          ...obj.formData
        }),
        schema,
      })
      updateComponentList([
        {
          ...crud,
          schema,
        },
      ])
    }

    const handleTableConfigChange = (obj: FormChangeData) => {
      const crud = workspaceComponentList.value[0]
      const schema = cloneDeep(crud.schema)
      if (obj.formData.pagination === false) {
        delete schema.pagination
      }
      else {
        schema.pagination = {
          page: 1,
          pageSize: 10,
          total: 0,
        }
      }

      if (obj.formData.tableDecorator !== 'el-card') {
        schema.tableDecorator = {
          name: obj.value,
        }
      }
      else {
        delete schema.tableDecorator
      }

      if (obj.formData.formDecorator !== 'el-card') {
        schema.formDecorator = {
          name: obj.value,
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

      schema.size = obj.formData.size

      updateComponentList([
        {
          ...crud,
          componentFormData: {
            ...crud.componentFormData,
            ...obj.formData,
          },
          schema,
        },
      ])
      updateCurOperateComponent({
        ...crud,
        componentFormData: {
          ...crud.componentFormData,
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
              <z-form
                v-model={curOperateComponent.value.fieldFormData}
                {...formConfig}
                key={curOperateComponent.value.id}
                columns={curOperateComponent.value.fieldSchema}
                onChange={handleFormConfigChange}
              />
            </el-collapse-item>
            <el-collapse-item title="表格属性" name="table">
              <z-form
                v-model={curOperateComponent.value.componentFormData}
                {...formConfig}
                key={curOperateComponent.value.id}
                columns={curOperateComponent.value.componentSchema}
                options={curOperateComponent.value.componentOptionsConfig}
                onChange={handleTableConfigChange}
              />
            </el-collapse-item>
          </el-collapse>
        </div>
      )
    }
  },
})
