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
      const data: WorkspaceComponentItem = {
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
        data.componentFormData!.slot = ''
      }
      if (obj.formData.type === 'default') {
        delete data.type
        delete data.buttons
      }
      if (obj.formData.type === 'button' && !data.buttons) {
        data.buttons = [
          {
            key: uid(),
            type: 'primary',
            link: true,
            label: '编辑',
          },
          {
            type: 'primary',
            link: true,
            label: '删除',
            key: uid(),
          },
        ]
        data.componentFormData!.buttons = data.buttons
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
              <z-form
                v-model={curOperateComponent.value.componentFormData}
                {...formConfig}
                key={curOperateComponent.value.id}
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
