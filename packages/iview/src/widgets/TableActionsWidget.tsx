import { uid } from '@ideal-schema/shared'
import { useWorkspaceStore } from '@ideal-schema/playground-store'
import { getInputFormItemTemplate } from '../utils'
import {
  tableColFormData,
  tableColTemplateOptionsConfig,
  tableColTemplateSchema,
} from '../schemas'
import './style.scss'

export default defineComponent({
  name: 'TableActionsWidget',
  setup(props, { slots }) {
    const workspaceStore = useWorkspaceStore()

    const workspaceComponentList = computed(() => workspaceStore.getWorkspaceComponentList)

    const ACTIONS = [
      {
        icon: 'i-plus',
        label: '添加表格项',
        click: () => {
          const prop = uid()
          const tableCol = {
            name: 'tableCol',
            prop,
            label: 'title',
            title: '表格项',
            id: uid(),
            componentSchema: tableColTemplateSchema,
            componentOptionsConfig: tableColTemplateOptionsConfig,
            componentFormData: reactive({
              ...tableColFormData,
              field: prop,
              label: 'title',
            }),
            activeCollapseItems: ['column'],
            allowCopy: true,
            allowDelete: true,
          }
          let lastIndex = 0
          const columns = workspaceComponentList.value[0].schema.columns!
          columns.forEach((item: TableCol, index: number) => {
            if (item.id && lastIndex < index)
              lastIndex = index
          })
          if (!columns[lastIndex + 1]) {
            columns[lastIndex + 1] = tableCol
          }
          else {
            columns[lastIndex + 1] = {
              ...columns[lastIndex + 1],
              ...tableCol,
            }
          }
          workspaceStore.updateComponentList([
            {
              ...workspaceComponentList.value[0],
              schema: {
                ...workspaceComponentList.value[0].schema,
                cellClassName: ({ columnIndex }: { columnIndex: number }) => {
                  if (columns[columnIndex])
                    return `schema-field${columns[columnIndex].id}`

                  return ''
                },
                columns,
              },
            },
          ])
        },
      },
      {
        icon: 'i-plus',
        label: '添加表单项',
        click: () => {
          let lastIndex = 0
          const { newFormItem } = getInputFormItemTemplate()
          const columns = workspaceComponentList.value[0].schema.columns!
          columns.forEach((item: TableCol, index: number) => {
            if (item.search && lastIndex < index)
              lastIndex = index
          })
          if (!columns[lastIndex + 1]) {
            columns[lastIndex + 1] = {
              search: newFormItem,
            }
          }
          else {
            columns[lastIndex + 1].search = newFormItem
          }
          workspaceStore.updateComponentList([
            {
              ...workspaceComponentList.value[0],
              schema: {
                ...workspaceComponentList.value[0].schema,
                // formModel: {
                //   ...workspaceComponentList.value[0].schema.formModel,
                //   [prop]: '',
                // },
              },
            },
          ])
        },
      },
    ]
    return () => {
      return (
        <div>
          {slots.default && slots.default()}
          <div class="table-pro-actions__container">
            <el-divider border-style="dashed">
              <div class="flex">
                {ACTIONS.map((item, index) => {
                  return (
                    <>
                      <span class="table-pro-actions__text" onClick={() => item.click()}>
                        <el-icon size={10}>
                          <i-plus />
                        </el-icon>
                        {item.label}
                      </span>
                      {index !== ACTIONS.length - 1 && <el-divider direction="vertical" />}
                    </>
                  )
                })}
              </div>
            </el-divider>
          </div>
        </div>
      )
    }
  },
})
