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
    const { updateComponentList, pushComponentItem, updateCurOperateComponent, workspaceComponentList } = useWorkspaceComponent()
    const { workspaceComponentType, updateWorkspaceComponentType } = useGlobalSetting()

    const templateObj = {
      输入框: getInputFormItemTemplate,
      选择框: getSelectFormItemTemplate,
      多选框: getMultipleSelectFormItemTemplate,
      日期范围: getDatepickerFormItemTemplate,
      插槽: getSlotFormItemTemplate,
    }

    const clickExpandComponentItem = (
      expandComponentItem: WorkspaceComponentItem,
      index: number,
      toId: string,
    ) => {
      // 表单表格表单项拖拽
      if (workspaceComponentType.value === 'crud' && toId) {
        if (
          expandComponentItem.title === '输入框'
          || expandComponentItem.title === '选择框'
          || expandComponentItem.title === '多选框'
          || expandComponentItem.title === '日期范围'
          || expandComponentItem.title === '插槽'
        ) {
          const tableProConfig = workspaceComponentList.value[0]
          const schema = tableProConfig.schema
          let tableCols: TableCol[] = []
          const formItems: FormItemConfigItem[] = []
          const { newFormItem, prop }
            = templateObj[expandComponentItem.title as keyof typeof templateObj]()

          if (schema.columns && schema.columns.length) {
            const newArr = cloneDeep(schema.columns)
            newArr.forEach((item: TableCol) => {
              if (item.search)
                formItems.push(item.search)
            })
            formItems.splice(index, 0, newFormItem)
            tableCols = newArr.map((item: TableCol, index: number) => {
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
                  ...workspaceComponentList.value[0].schema.formData,
                  [prop]: expandComponentItem.title === '日期范围' ? [] : '',
                },
                columns: tableCols,
                options: formOptions,
              },
            }
            updateComponentList([
              i,
            ])
            updateCurOperateComponent(newFormItem)
          }
        }
        else {
          ElMessage.warning('不支持的表单项类型')
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
        updateComponentList([], '清空组件')
        pushComponentItem(componentItem, index, toId)
        updateCurOperateComponent(componentItem)
        updateWorkspaceComponentType('crud')
        return
      }
      else {
        // workspace里面是表单表格，在其他地方拖入表单，则清空表单表格
        if (workspaceComponentType.value === 'crud') {
          updateComponentList([], '清空组件')
          updateCurOperateComponent({} as WorkspaceComponentItem)
        }
        updateWorkspaceComponentType('form')
      }
      // 表单
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
              columns: arrayFormColumns ? arrayFormColumns.map((item: WorkspaceComponentItem) => ({ ...item, id: uid() })) : undefined,
            },
          },
        }
        pushComponentItem(componentItem, index, toId)
        updateCurOperateComponent(componentItem)
        // 模板
      }
      else if (Array.isArray(expandComponentItem.templates)) {
        updateComponentList(cloneDeep(expandComponentItem.templates!), '添加组件')
        updateCurOperateComponent({} as WorkspaceComponentItem)
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
