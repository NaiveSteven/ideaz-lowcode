import { getSchemaData } from '@ideal-schema/playground-demi'
import { useCol } from '@ideaz/element'
import { cloneDeep } from 'lodash-es'
import { VueDraggable } from 'vue-draggable-plus'
// import { getSchemaData } from '@ideal-schema/playground-demi'
import { useGlobalSetting, useWorkspaceComponent, useWorkspaceForm } from '@ideal-schema/playground-store'
import mitt from '../../event'
import TableActionsWidget from '../../widgets/TableActionsWidget'
import './style.scss'

export default defineComponent({
  name: 'WorkspaceComponent',
  emits: ['on-add-item', 'on-update-cur-operate'],
  props: {
    workspaceComponentList: {
      type: Array as PropType<WorkspaceComponentItem[]>,
      default: () => [],
    },
    curOperateComponent: {
      type: Object as PropType<WorkspaceComponentItem>,
      default: () => ({}),
    },
    formData: {
      type: Object as PropType<IndexType>,
      default: () => ({}),
    },
    needFlex: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    needVueDraggable: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup(props, { emit }) {
    const { curOperateComponent, workspaceComponentList, updateCurOperateComponent, updateComponentList, simulatorType } = useWorkspaceComponent()
    const { workspaceComponentType } = useGlobalSetting()
    const { formConfig } = useWorkspaceForm()

    let tempData: any = null

    const tableKey = ref(new Date().valueOf())

    onMounted(() => {
      mitt.on('form-item-click', (({ event, id }: { id: string, event: PointerEvent }) => {
        event?.stopPropagation()
        event?.preventDefault()
        if (props.curOperateComponent.id === id)
          return
        let item: any = {}
        workspaceComponentList.value[0]?.schema?.columns?.forEach((col) => {
          if (col.search?.formItemProps?.id === `schema-field${id}`)
            item = { ...col.search }
        })
        emit('on-update-cur-operate', item)
      }) as () => void)
    })

    onBeforeUnmount(() => {
      mitt.off('form-item-click')
    })

    watch(() => curOperateComponent.value, (val, old) => {
      if (val.name === 'crud' && old.name === 'crud' && val.schema.collapsed !== old.schema.collapsed) {
        tableKey.value = new Date().valueOf()
      }
    })

    const handleMouseEvent = (e: MouseEvent) => {
      if (simulatorType.value === 'pad') {
        e.stopPropagation()
      }
    }

    const clickItem = (e: MouseEvent, item: WorkspaceComponentItem) => {
      e.preventDefault()
      e.stopPropagation()
      if (props.curOperateComponent.id === item.id)
        return
      emit('on-update-cur-operate', item)
    }

    const start = (a: { oldIndex: number }) => {
      tempData = props.workspaceComponentList[a.oldIndex]
    }

    const end = (a: { to: { id: string }, newIndex: number }) => {
      if (workspaceComponentType.value === 'form') {
        emit('on-update-cur-operate', tempData)
      }
    }


    const setClassName = ({ columnIndex }: any) => {
      const columns
        = props.workspaceComponentList[0].schema.columns?.filter(item => item.prop) || []
      if (columns[columnIndex])
        return `schema-field${columns[columnIndex].id}`
    }

    const handleTableColClick = (column: any, event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      const columnIndex = column.getColumnIndex()
      const columns
        = workspaceComponentList.value[0].schema.columns?.filter(item => item.prop)
        || []
      const tableCol = columns[columnIndex]
      updateCurOperateComponent(tableCol as WorkspaceComponentItem)
    }

    const handleUpdateFormItem = ({ columns, dragEvent }: { columns: WorkspaceComponentItem[], dragEvent: any }) => {
      const oldIndex = dragEvent.oldIndex
      const newIndex = dragEvent.newIndex
      const data = columns[newIndex]
      // console.log(columns,newIndex,'asdf')
      // if (!data.id) {
      //   emit('on-update-cur-operate', {})
      //   return
      // }
      const config = workspaceComponentList.value[0]
      const schema = config.schema
      let cols: TableCol[] = []
      if (schema.columns && schema.columns.length) {
        const newArr = [...schema.columns]
        const newFormItem = { ...schema.columns[oldIndex].search }
        const oldFormItem = { ...schema.columns[newIndex].search }
        newArr[newIndex].search = newFormItem
        newArr[oldIndex].search = oldFormItem
        cols = newArr
        // updateComponentList([
        //   {
        //     ...config,
        //     schema: {
        //       ...config.schema,
        //       columns: cols,
        //     },
        //   },
        // ])
        updateCurOperateComponent(data)
      }
    }

    const handleUpdateTableColumn = (
      data: WorkspaceComponentItem,
      newIndex: number,
      oldIndex: number,
    ) => {
      const tableProConfig = workspaceComponentList.value[0]
      const schema = tableProConfig.schema
      if (schema.columns && schema.columns.length) {
        const filterColumns = cloneDeep(schema.columns.filter(item => item.prop))
        const filterFormItems = schema.columns.filter(item => item.search)

        const newTableCol = { ...filterColumns[oldIndex] }
        const oldTableCol = { ...filterColumns[newIndex] }
        filterColumns[newIndex] = newTableCol
        filterColumns[oldIndex] = oldTableCol
        if (filterColumns.length >= filterFormItems.length) {
          filterColumns.forEach((item, index) => {
            delete item.search
            if (filterFormItems[index])
              item.search = filterFormItems[index].search
          })
        }
        else {
          filterFormItems.forEach((item, index) => {
            if (!filterColumns[index])
              filterColumns[index] = {}

            filterColumns[index].search = filterFormItems[index].search
          })
        }
        updateComponentList([
          {
            ...tableProConfig,
            schema: {
              ...tableProConfig.schema,
              columns: [...filterColumns],
              cellClassName: ({ columnIndex }: any) => {
                return `schema-field${filterColumns[columnIndex].id}`
              },
            },
          },
        ])
        updateCurOperateComponent(data)
        tableKey.value = new Date().valueOf()
      }
    }

    return () => {
      const { formData, options } = getSchemaData()
      return (
        <VueDraggable
          modelValue={props.workspaceComponentList}
          class={["dragArea list-group h-full w-full", formConfig.value.column > 1 && 'multiple-layout']}
          animation={200}
          group="people"
          filter=".not-drag"
          item-key="id"
          onUpdate:modelValue={(val: any) => updateComponentList(val)}
          onStart={start}
          onEnd={end}
        >
          {props.workspaceComponentList.map((formItem: WorkspaceComponentItem) => {
            const { colKls, colStyle } = useCol(formConfig.value as any, formItem.schema as any)
            return (
              <div
                id={`schema-field${formItem.id}`}
                key={formItem.id}
                class={["w-full", colKls.value, 'form-item-schema-container']}
                style={{ ...colStyle.value, marginBottom: '22px' }}
                onClick={(e: MouseEvent) => clickItem(e, formItem)}
                onMousedown={handleMouseEvent}
                onMouseup={handleMouseEvent}
              >
                {workspaceComponentType.value === 'crud'
                  ? (
                    <TableActionsWidget>
                      <z-crud
                        id={formItem.id}
                        key={tableKey.value}
                        class="tablePro"
                        {...{ ...formItem.schema, cellClassName: setClassName }}
                        style={{ zIndex: 1 }}
                        pid={formItem.children ? formItem.id : ''}
                        onUpdate:columns={handleUpdateFormItem}
                        onDrag-column-end={handleUpdateTableColumn}
                        onOn-form-item-click={(e: MouseEvent, data: WorkspaceComponentItem) => clickItem(e, data)}
                        onCell-click={({ }, column: any, { }, event: MouseEvent) => handleTableColClick(column, event)}
                        onHeader-click={(column: any, event: MouseEvent) => handleTableColClick(column, event)}
                      />
                    </TableActionsWidget>
                  )
                  : (
                    <z-form-item
                      formConfig={formConfig.value}
                      id={formItem.id}
                      key={formItem.schema.id}
                      modelValue={formData}
                      options={options}
                      style={{ zIndex: 1 }}
                      col={formItem.schema}
                      class={formItem.schema.title === 'Col' ? ['not-drag'] : ''}
                    />
                  )}
              </div>
            )
          })}
        </VueDraggable>
      )
    }
  },
})
