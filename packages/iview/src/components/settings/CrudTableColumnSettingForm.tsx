import { computed, defineComponent, reactive } from 'vue'
import { useWorkspaceStore } from '@ideal-schema/playground-store'
import { isFunction, uid } from '@ideal-schema/shared'
import { tableColTemplateSchema } from '../../schemas'
import './style.scss'

export default defineComponent({
  name: 'CrudTableColumnSettingForm',
  setup() {
    const workspaceStore = useWorkspaceStore()

    const formConfig = reactive({
      labelPosition: 'left',
      labelWidth: '120px',
      colon: false,
    })

    const curOperateComponent = computed(() => workspaceStore.getCurOperateComponent)

    const handleColumnDataChange = (obj: FormChangeData) => {
      const crud = workspaceStore.getWorkspaceComponentList[0]
      const schema = crud.schema
      let columns: TableCol[] = []
      const data = {
        ...curOperateComponent.value,
        componentFormData: {
          ...curOperateComponent.value.componentFormData,
          ...obj.formData,
        },
        ...obj.formData,
      }
      if (obj.formData.type === 'slot') {
        data.componentSchema = (formData: IndexType) => [
          ...tableColTemplateSchema(formData),
          {
            type: 'input',
            prop: 'slot',
            label: '插槽名',
            hide: () => formData.type !== 'slot',
          },
        ]
      }
      else {
        data.componentFormData.slot = ''
      }
      if (obj.formData.type === 'default') {
        delete data.type
        delete data.btnList
      }
      if (obj.formData.type === 'button' && !data.btnList) {
        data.btnList = [
          {
            key: uid(),
            type: 'text',
            label: '编辑',
          },
          {
            type: 'text',
            label: '删除',
            key: uid(),
          },
        ]
        data.componentFormData.btnList = data.btnList
      }
      columns = schema.columns?.map((item: TableCol) => {
        if (item.id === curOperateComponent.value.id)
          return data

        return item
      }) || []
      workspaceStore.updateComponentList([
        {
          ...crud,
          schema: {
            ...schema,
            columns,
          },
        },
      ])
      workspaceStore.updateCurOperateComponent(data)
    }

    return () => {
      return (
        <div class="form-content">
          <el-collapse v-model={curOperateComponent.value.activeCollapseItems}>
            <el-collapse-item title="列属性" name="column">
              <il-form
                v-model={curOperateComponent.value.componentFormData}
                {...formConfig}
                columns={
                  isFunction(curOperateComponent.value.componentSchema)
                    ? curOperateComponent.value.componentSchema(
                      curOperateComponent.value.componentFormData,
                    )
                    : curOperateComponent.value.componentSchema
                }
                options={curOperateComponent.value.componentOptionsConfig}
                onChange={handleColumnDataChange}
              />
            </el-collapse-item>
          </el-collapse>
        </div>
      )
    }
  },
})
