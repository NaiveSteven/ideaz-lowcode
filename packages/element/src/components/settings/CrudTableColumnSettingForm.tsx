import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import { isFunction, uid } from '@ideal-schema/shared'
import { tableColTemplateSchema } from '../../schemas'
import './style.scss'

export default defineComponent({
  name: 'CrudTableColumnSettingForm',
  setup() {
    const { activeWidget, widgets, updateWidgets, updateActiveWidget } = useWorkspaceComponent()

    const formConfig = reactive({
      labelPosition: 'left',
      labelWidth: '120px',
      colon: false,
    })

    const handleColumnDataChange = (obj: FormChangeData) => {
      const crud = widgets.value[0]
      const schema = crud.schema
      let columns: TableCol[] = []
      const data: WorkspaceComponentItem = {
        ...activeWidget.value,
        componentFormData: {
          ...activeWidget.value.componentFormData,
          ...obj.formData,
        },
        ...obj.formData,
      }
      if (obj.formData.type === 'slot') {
        data.type = 'slot'
        data.componentSchema = (formData: IndexType) => [
          ...tableColTemplateSchema(formData),
          {
            component: 'input',
            field: 'slot',
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
        if (item.id === activeWidget.value.id)
          return data

        return item
      }) || []
      updateWidgets([
        {
          ...crud,
          schema: {
            ...schema,
            columns,
          },
        },
      ])
      updateActiveWidget(data)
    }

    return () => {
      return (
        <div class="form-content">
          <el-collapse v-model={activeWidget.value.activeCollapseItems}>
            <el-collapse-item title="列属性" name="column">
              <z-form
                v-model={activeWidget.value.componentFormData}
                {...formConfig}
                key={activeWidget.value.id}
                columns={
                  isFunction(activeWidget.value.componentSchema)
                    ? activeWidget.value.componentSchema(
                      activeWidget.value.componentFormData,
                    )
                    : activeWidget.value.componentSchema
                }
                options={activeWidget.value.componentOptionsConfig}
                onChange={handleColumnDataChange}
              />
            </el-collapse-item>
          </el-collapse>
        </div>
      )
    }
  },
})
