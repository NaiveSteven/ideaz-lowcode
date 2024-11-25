import { useGlobalSetting, useWorkspaceComponent } from '@ideal-schema/playground-store'
import { uid } from '@ideal-schema/shared'
import { cloneDeep } from 'lodash-es'
import { ElMessage } from 'element-plus'
import { DEFAULT_COMPONENT_TEMPLATES } from '../../materials'
import {
  getDatepickerFormItemTemplate,
  getInputFormItemTemplate,
  getMultipleSelectFormItemTemplate,
  getSelectFormItemTemplate,
  getSlotFormItemTemplate,
} from '../../utils'
import ComponentList from './ComponentList'

export default defineComponent({
  name: 'ComponentWidget',
  setup() {
    const { updateWidgets, pushWidget, updateActiveWidget, widgets } = useWorkspaceComponent()
    const { workspaceWidgetType, updateWorkspaceComponentType } = useGlobalSetting()

    const templateObj = {
      输入框: getInputFormItemTemplate,
      选择框: getSelectFormItemTemplate,
      多选框: getMultipleSelectFormItemTemplate,
      日期范围: getDatepickerFormItemTemplate,
      插槽: getSlotFormItemTemplate,
    }

    const clickExpandComponentItem = (
      expandComponentItem: Widget,
      index: number,
      toId: string,
    ) => {
      if (workspaceWidgetType.value === 'crud' && toId) {
        if (
          expandComponentItem.title === '输入框'
          || expandComponentItem.title === '选择框'
          || expandComponentItem.title === '多选框'
          || expandComponentItem.title === '日期范围'
          || expandComponentItem.title === '插槽'
        ) {
          const tableProConfig = widgets.value[0]
          const schema = tableProConfig.schema
          let tableCols: CrudColumnWidget[] = []
          const formItems: FormItemWidget[] = []
          const { newFormItem, prop }
            = templateObj[expandComponentItem.title as keyof typeof templateObj]()

          if (schema.columns && schema.columns.length) {
            const newArr = cloneDeep(schema.columns)
            newArr.forEach((item: CrudColumnWidget) => {
              if (item.search)
                formItems.push(item.search)
            })
            formItems.splice(index, 0, newFormItem)
            tableCols = newArr.map((item: CrudColumnWidget, index: number) => {
              if (formItems[index])
                item.search = formItems[index]

              return item
            })

            const formOptions = { ...tableProConfig.schema.options }
            if (expandComponentItem.title === '选择框')
              formOptions[prop] = [{ label: '标签', value: '1', key: uid() }]

            const i = {
              ...tableProConfig,
              schema: {
                ...tableProConfig.schema,
                formData: {
                  ...widgets.value[0].schema.formData,
                  [prop]: expandComponentItem.title === '日期范围' ? [] : '',
                },
                columns: tableCols,
                options: formOptions,
              },
            }
            updateWidgets([
              i,
            ])
            updateActiveWidget(newFormItem)
          }
        }
        else {
          ElMessage.warning('暂不支持的表单项类型')
        }
        return
      }
      if (expandComponentItem.name === 'crud') {
        const componentItem = {
          ...expandComponentItem,
          id: uid(),
          pid: toId,
          schema: {
            ...expandComponentItem.schema,
          },
        }
        updateWidgets([], '清空组件')
        pushWidget(componentItem, index, toId)
        updateActiveWidget(componentItem)
        updateWorkspaceComponentType('crud')
        return
      }
      else {
        if (workspaceWidgetType.value === 'crud') {
          updateWidgets([], '清空组件')
          updateActiveWidget({} as Widget)
        }
        updateWorkspaceComponentType('form')
      }
      if (!expandComponentItem.templates || !Array.isArray(expandComponentItem.templates)) {
        const arrayFormColumns = expandComponentItem.schema?.fieldProps?.columns
        const componentItem = {
          ...expandComponentItem,
          id: uid(),
          pid: toId,
          schema: {
            ...expandComponentItem.schema,
            fieldProps: {
              ...expandComponentItem.schema?.fieldProps,
              columns: arrayFormColumns ? arrayFormColumns.map((item: Widget) => ({ ...item, id: uid() })) : undefined,
            },
          },
        }
        pushWidget(componentItem, index, toId)
        updateActiveWidget(componentItem)
      }
      else if (Array.isArray(expandComponentItem.templates)) {
        updateWidgets(cloneDeep(expandComponentItem.templates!), '添加组件')
        updateActiveWidget({} as Widget)
      }
    }

    return () => (
      <div class="h-full w-full">
        <ComponentList
          component-list={DEFAULT_COMPONENT_TEMPLATES}
          onClick-component-item={clickExpandComponentItem}
        />
      </div>
    )
  },
})
