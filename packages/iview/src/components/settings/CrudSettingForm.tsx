import { computed, defineComponent, reactive } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useWorkspaceStore } from '@ideal-schema/playground-store'
import './style.scss'

export default defineComponent({
  name: 'CrudSettingForm',
  setup() {
    const workspaceStore = useWorkspaceStore()

    const formConfig = reactive({
      labelPosition: 'left',
      labelWidth: '120px',
      colon: false,
    })

    const curOperateComponent = computed(() => workspaceStore.getCurOperateComponent)

    const handleFormConfigChange = (obj: FormChangeData) => {
      const crud = workspaceStore.getWorkspaceComponentList[0]
      const schema = {
        ...crud.schema,
        search: {
          ...crud.schema.search,
          ...obj.formData,
        },
      }
      workspaceStore.updateCurOperateComponent({
        ...crud,
        fieldFormData: reactive({
          ...curOperateComponent.value.fieldFormData,
        }),
        schema,
      })
      workspaceStore.updateComponentList([
        {
          ...crud,
          schema,
        },
      ])
    }

    const handleTableConfigChange = (obj: FormChangeData) => {
      const crud = workspaceStore.getWorkspaceComponentList[0]
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
      if (obj.formData.collapsed)
        schema.collapsed = true

      else
        schema.collapsed = false

      workspaceStore.updateComponentList([
        {
          ...crud,
          componentFormData: {
            ...crud.componentFormData,
            ...obj.formData,
          },
          schema,
        },
      ])
      workspaceStore.updateCurOperateComponent({
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
                columns={curOperateComponent.value.fieldSchema}
                onChange={handleFormConfigChange}
              />
            </el-collapse-item>
            <el-collapse-item title="表格属性" name="table">
              <z-form
                v-model={curOperateComponent.value.componentFormData}
                {...formConfig}
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
