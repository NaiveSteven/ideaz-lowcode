import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import { cloneDeep } from 'lodash-es'
import { DEFAULT_CRUD_OPERATION_COLUMN } from '../../template'
import './style.scss'

export default defineComponent({
  name: 'CrudSettingForm',
  setup() {
    const { activeWidget, widgets, updateActiveWidget, updateWidgets } = useWorkspaceComponent()

    const formConfig = reactive({
      labelPosition: 'left',
      labelWidth: '120px',
      colon: false,
    })

    const handleFormConfigChange = (obj: FormChangeData) => {
      const crud = widgets.value[0]
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

      const data = {
        ...crud,
        fieldFormData: reactive({
          ...activeWidget.value.fieldFormData,
          ...obj.formData,
        }),
        schema,
      }
      updateActiveWidget(data)
      updateWidgets([data])
    }

    const handleTableConfigChange = (obj: FormChangeData) => {
      const crud = widgets.value[0]
      const schema = cloneDeep(crud.schema)
      let columns = []
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

      if (obj.formData.action) {
        schema.action = true
      }
      else {
        schema.action = false
        if (obj.field === 'action' && obj.value === false) {
          const isOperation = schema.columns?.some(item => item.type === 'button')
          if (!isOperation)
            columns = [DEFAULT_CRUD_OPERATION_COLUMN] as any
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
      const cols = schema.columns?.concat(columns)
      const data = {
        ...crud,
        componentFormData: {
          ...crud.componentFormData,
          ...obj.formData,
        },
        schema: {
          ...schema,
          columns: cols,
        },
      }
      updateActiveWidget(data)
      updateWidgets([data])
    }

    return () => {
      return (
        <div class="form-content">
          <el-collapse v-model={activeWidget.value.activeCollapseItems}>
            <el-collapse-item title="表单属性" name="form">
              <z-form
                v-model={activeWidget.value.fieldFormData}
                {...formConfig}
                key={activeWidget.value.id}
                columns={activeWidget.value.fieldSchema}
                onChange={handleFormConfigChange}
              />
            </el-collapse-item>
            <el-collapse-item title="表格属性" name="table">
              <z-form
                v-model={activeWidget.value.componentFormData}
                {...formConfig}
                key={activeWidget.value.id}
                columns={activeWidget.value.componentSchema}
                options={activeWidget.value.componentOptionsConfig}
                onChange={handleTableConfigChange}
              />
            </el-collapse-item>
          </el-collapse>
        </div>
      )
    }
  },
})
