import { parseElementSchema } from '@ideal-schema/playground-parser'
import { useGlobalSetting, useWorkspaceComponent, useWorkspaceForm } from '@ideal-schema/playground-store'
import { cloneDeep, get, set } from 'lodash-es'
import { useCol } from '@ideaz/element'
import { VueDraggable } from 'vue-draggable-plus'
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
    let isUpdateKey = true

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
      // if (val.name === 'crud' && old.name === 'crud' && val.schema.collapsed !== old.schema.collapsed)
      if (isUpdateKey)
        tableKey.value = new Date().valueOf()

      isUpdateKey = true
    })

    const handleMouseEvent = (e: MouseEvent) => {
      if (simulatorType.value === 'pad')
        e.stopPropagation()
    }

    const clickItem = (e: MouseEvent, item: WorkspaceComponentItem) => {
      e.preventDefault()
      e.stopPropagation()
      if (props.curOperateComponent.id === item.id)
        return
      emit('on-update-cur-operate', item)
    }

    const start = (a: { oldIndex: number }) => {
      // console.log(a, 'aaaaa')
      tempData = props.workspaceComponentList[a.oldIndex]
    }

    const end = (draggableEvent: { to: { id: string }, newIndex: number }) => {
      const list = [...workspaceComponentList.value]
      // normal form to array form
      if (!Array.from(draggableEvent.from.classList).includes('array-form') && Array.from(draggableEvent.to.classList).includes('array-form')) {
        const key = getKey(Array.from(draggableEvent.to.classList))
        // const normalItemIndex = list.findIndex(item => item.id === tempData.id)
        const arrayItem = getArrayItem(key)
        // console.log(workspaceComponentList.value, 'workspaceComponentList')
        // debugger
        const cols = arrayItem.schema.fieldProps?.columns
        // list.splice(normalItemIndex, 1)
        cols.splice(draggableEvent.newIndex, 0, tempData)
        updateComponentList(list)
        console.log(arrayItem, cols, list, workspaceComponentList.value, 'handleArrayFormEndhandleArrayFormEnd')
        tableKey.value = new Date().valueOf()
      }
      if (workspaceComponentType.value === 'form')
        emit('on-update-cur-operate', tempData)
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
        ], '排序更改')
        updateCurOperateComponent(data)
        tableKey.value = new Date().valueOf()
      }
    }

    // const changeColumnSort = (data, key, oldIndex, newIndex) => {
    //   const parent = get(data, key)
    //   const newCol = { ...parent[oldIndex] }
    //   const oldCol = { ...parent[newIndex] }
    //   parent[newIndex] = newCol
    //   parent[oldIndex] = oldCol
    // }

    const handleFormItemClick = (data) => {
      updateCurOperateComponent(data)
    }

    const handleFormItemMousedown = (data) => {
      isUpdateKey = false
      updateCurOperateComponent(data)
    }

    function getArrayItem(key) {
      let data = null
      workspaceComponentList.value.forEach((item) => {
        if (item.id === key)
          data = item

        if (item.schema.fieldProps?.columns?.length && !data) {
          item.schema.fieldProps?.columns.forEach((item) => {
            if (item.id === key)
              data = item
          })
        }
      })
      return data
    }

    function getKey(classList) {
      const str = classList.find(item => item.includes('schema-field'))
      return str.split('-')[2]
    }

    const handleArrayFormEnd = (formItem: any, draggableEvent: any, columns) => {
      // console.log(draggableEvent, columns, 'handleArrayFormEndhandleArrayFormEndhandleArrayFormEnd')
      const list = [...workspaceComponentList.value]
      // array form to array form
      if (Array.from(draggableEvent.from.classList).includes('array-form') && Array.from(draggableEvent.to.classList).includes('array-form')) {
        // const key = getKey(Array.from(draggableEvent.item.classList))
        // const item = getArrayItem(key)
        const cols = [...formItem.schema.fieldProps?.columns]
        const item = cols[draggableEvent.oldIndex]
        cols.splice(draggableEvent.oldIndex, 1)
        cols.splice(draggableEvent.newIndex, 0, item)
        const index = list.findIndex(item => item.id === formItem.id)
        list.splice(index, 1, set(formItem, 'schema.fieldProps.columns', cols))
        updateComponentList(list)
      }
      // array from to normal form
      if (Array.from(draggableEvent.from.classList).includes('array-form') && !Array.from(draggableEvent.to.classList).includes('array-form')) {
        const key = getKey(Array.from(draggableEvent.item.classList))
        // const item = getArrayItem(key)
        const index = list.findIndex(item => item.id === formItem.id)
        const cols = [...formItem.schema.fieldProps?.columns]
        const colIndex = cols.findIndex(item => item.id === key)
        cols.splice(colIndex, 1)
        list.splice(index, 1, set(formItem, 'schema.fieldProps.columns', cols))
        updateComponentList(list)
      }
      tableKey.value = new Date().valueOf()
    }

    return () => {
      const { formData, options } = parseElementSchema()
      return (
        <VueDraggable
          modelValue={props.workspaceComponentList}
          class={['dragArea list-group h-full w-full', formConfig.value.column > 1 && 'multiple-layout']}
          animation={200}
          group="people"
          filter=".not-drag"
          item-key="id"
          onUpdate:modelValue={(val: any) => updateComponentList(val, '排序更改')}
          onStart={start}
          onEnd={end}
          key={tableKey.value}
        >
          {props.workspaceComponentList.map((formItem: WorkspaceComponentItem) => {
            const { colKls, colStyle } = useCol(formConfig.value as any, formItem.schema as any)
            return (
              <div
                id={`schema-field${formItem.id}`}
                key={formItem.id}
                class={['w-full', colKls.value, 'form-item-schema-container']}
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
                      draggableId={formItem.id}
                      options={options}
                      style={{ zIndex: 1 }}
                      col={formItem.schema}
                      class={formItem.schema.title === 'Col' ? ['not-drag'] : ''}
                      onForm-item-click={handleFormItemClick}
                      onForm-item-mousedown={handleFormItemMousedown}
                      onArray-form-draggable-end={(...args) => handleArrayFormEnd(formItem, ...args)}
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
