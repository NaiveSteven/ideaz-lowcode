import { parseElementSchema } from '@ideal-schema/playground-parser'
import { getComponentListItem, useGlobalSetting, useWorkspaceComponent, useWorkspaceForm } from '@ideal-schema/playground-store'
import { cloneDeep, set } from 'lodash-es'
import { useCol } from '@ideaz/element'
import { VueDraggable } from 'vue-draggable-plus'
import { ElMessage } from 'element-plus'
import mitt from '../../event'
import TableActionsWidget from '../../widgets/TableActionsWidget'
import './style.scss'

export default defineComponent({
  name: 'WorkspaceComponent',
  emits: ['on-add-item', 'on-update-cur-operate'],
  props: {
    widgets: {
      type: Array as PropType<Widget[]>,
      default: () => [],
    },
    activeWidget: {
      type: Object as PropType<Widget>,
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
    const { activeWidget, widgets, updateActiveWidget, updateWidgets, simulatorType } = useWorkspaceComponent()
    const { workspaceWidgetType } = useGlobalSetting()
    const { formConfig } = useWorkspaceForm()

    let tempData: any = null
    let isUpdateKey = true

    const tableKey = ref(new Date().valueOf())

    onMounted(() => {
      mitt.on('form-item-click', (({ event, id }: { id: string, event: PointerEvent }) => {
        event?.stopPropagation()
        event?.preventDefault()
        if (props.activeWidget.id === id)
          return
        let item: Widget = {} as Widget
        widgets.value[0]?.schema?.columns?.forEach((col) => {
          if (col.search?.formItemProps?.id === `schema-field${id}`)
            item = { ...col.search }
        })
        emit('on-update-cur-operate', item)
      }) as () => void)
    })

    onBeforeUnmount(() => {
      mitt.off('form-item-click')
    })

    watch(() => activeWidget.value, () => {
      // if (val.name === 'crud' && old.name === 'crud' && val.schema.collapsed !== old.schema.collapsed)
      if (isUpdateKey)
        tableKey.value = new Date().valueOf()

      isUpdateKey = true
    })

    const handleMouseEvent = (e: MouseEvent) => {
      if (simulatorType.value === 'pad')
        e.stopPropagation()
    }

    const clickItem = (e: MouseEvent, item: Widget) => {
      e.preventDefault()
      e.stopPropagation()
      if (props.activeWidget.id === item.id)
        return
      emit('on-update-cur-operate', item)
    }

    const start = (a: any) => {
      tempData = props.widgets[a.oldIndex]
    }

    const end = (draggableEvent: any) => {
      const list = [...widgets.value]
      // normal form to array form
      if (!Array.from(draggableEvent.from.classList).includes('array-form') && Array.from(draggableEvent.to.classList).includes('array-form')) {
        const key = getKey(Array.from(draggableEvent.to.classList))
        // const normalItemIndex = list.findIndex(item => item.id === tempData.id)
        const arrayItem = getArrayItem(key)
        // console.log(widgets.value, 'widgets')
        // debugger
        const cols = arrayItem.schema.fieldProps?.columns
        // list.splice(normalItemIndex, 1)
        cols.splice(draggableEvent.newIndex, 0, tempData)
        updateWidgets(list, '排序更改')
        // console.log(arrayItem, cols, list, widgets.value, 'handleArrayFormEndhandleArrayFormEnd')
        tableKey.value = new Date().valueOf()
      }
      if (workspaceWidgetType.value === 'form')
        emit('on-update-cur-operate', tempData)
    }

    const setClassName = ({ columnIndex }: any) => {
      const columns
        = props.widgets[0].schema.columns?.filter(item => item.prop) || []
      if (columns[columnIndex])
        return `schema-field${columns[columnIndex].id}`
    }

    const handleTableColClick = (column: any, event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      if (column.className === 'inline-column-operation') {
        ElMessage.warning('内置操作列暂无法被拖拽排序，如想自定义操作列，请将配置项内置操作关闭')
        return
      }
      const columnIndex = column.getColumnIndex()
      const columns
        = widgets.value[0].schema.columns?.filter(item => item.prop)
        || []
      const tableCol = columns[columnIndex]
      updateActiveWidget(tableCol as Widget)
    }

    const handleUpdateFormItem = ({ columns, dragEvent }: { columns: Widget[], dragEvent: any }) => {
      console.log(columns, dragEvent, 'columns')
      const oldIndex = dragEvent.oldIndex
      const newIndex = dragEvent.newIndex
      const data = columns[newIndex]
      // console.log(columns,newIndex,'asdf')
      // if (!data.id) {
      //   emit('on-update-cur-operate', {})
      //   return
      // }
      const config = widgets.value[0]
      const schema = config.schema
      // let cols: TableCol[] = []
      if (schema.columns && schema.columns.length) {
        const newArr = [...schema.columns]
        const newFormItem = { ...schema.columns[oldIndex].search }
        const oldFormItem = { ...schema.columns[newIndex].search }
        newArr[newIndex].search = newFormItem
        newArr[oldIndex].search = oldFormItem
        // cols = newArr
        // updateWidgets([
        //   {
        //     ...config,
        //     schema: {
        //       ...config.schema,
        //       columns: cols,
        //     },
        //   },
        // ])
        updateActiveWidget(data)
      }
    }

    const handleUpdateTableColumn = (
      data: Widget,
      newIndex: number,
      oldIndex: number,
    ) => {
      const tableProConfig = widgets.value[0]
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
        updateWidgets([
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
        updateActiveWidget(data)
        tableKey.value = new Date().valueOf()
      }
    }

    const handleFormItemClick = (data: Widget) => {
      updateActiveWidget(data)
    }

    const handleFormItemMousedown = async (data: Widget) => {
      isUpdateKey = false
      updateActiveWidget(data)
    }

    function getArrayItem(key: string) {
      let data: Widget = {} as Widget
      widgets.value.forEach((item) => {
        if (item.id === key)
          data = item

        if (item.schema.fieldProps?.columns?.length && !data) {
          item.schema.fieldProps?.columns.forEach((item: Widget) => {
            if (item.id === key)
              data = item
          })
        }
      })
      return data
    }

    function getKey(classList: string[]) {
      const str = classList.find(item => item.includes('schema-field')) || ''
      return str.split('-')[2]
    }

    const handleArrayFormEnd = (formItem: Widget, draggableEvent: any) => {
      const list = [...widgets.value]
      // array form to array form
      if (Array.from(draggableEvent.from.classList).includes('array-form') && Array.from(draggableEvent.to.classList).includes('array-form')) {
        const toKey = getKey(Array.from(draggableEvent.to.classList))
        const fromKey = getKey(Array.from(draggableEvent.from.classList))
        const { data: toData, parentData: toParentData } = getComponentListItem(toKey, widgets.value)
        const { data: fromData, parentData: fromParentData } = getComponentListItem(fromKey, widgets.value)
        const toFormItem = toParentData || toData
        const fromFormItem = fromParentData || fromData
        const toCols = [...toFormItem.schema.fieldProps?.columns]
        const fromCols = [...fromFormItem.schema.fieldProps?.columns]
        const item = fromCols[draggableEvent.oldIndex]
        fromCols.splice(draggableEvent.oldIndex, 1)
        // inline array form drag
        if (fromKey === toKey) {
          fromCols.splice(draggableEvent.newIndex, 0, item)
        }
        else {
          toCols.splice(draggableEvent.newIndex, 0, item)
          const toIndex = list.findIndex(item => item.id === toFormItem.id)
          list.splice(toIndex, 1, set(toFormItem, 'schema.fieldProps.columns', toCols))
        }
        const fromIndex = list.findIndex(item => item.id === fromFormItem.id)
        list.splice(fromIndex, 1, set(fromFormItem, 'schema.fieldProps.columns', fromCols))
        updateWidgets(list, '排序更改')
      }
      // array from to normal form
      if (Array.from(draggableEvent.from.classList).includes('array-form') && !Array.from(draggableEvent.to.classList).includes('array-form')) {
        const key = getKey(Array.from(draggableEvent.item.classList))
        const index = list.findIndex(item => item.id === formItem.id)
        const cols = [...formItem.schema.fieldProps?.columns]
        const colIndex = cols.findIndex(item => item.id === key)
        cols.splice(colIndex, 1)
        list.splice(index, 1, set(formItem, 'schema.fieldProps.columns', cols))
        updateWidgets(list, '排序更改')
      }
      tableKey.value = new Date().valueOf()
    }

    return () => {
      const { formData, options } = parseElementSchema()
      return (
        <VueDraggable
          modelValue={props.widgets}
          class={['dragArea list-group h-full w-full', formConfig.value.column > 1 && 'multiple-layout']}
          animation={200}
          group="people"
          filter=".not-drag"
          ghostClass={workspaceWidgetType.value !== 'crud' && 'ghost'}
          item-key="id"
          onUpdate:modelValue={(val: any) => updateWidgets(val, '排序更改')}
          onStart={start}
          onEnd={end}
          key={tableKey.value}
        >
          {props.widgets.map((formItem: Widget) => {
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
                {workspaceWidgetType.value === 'crud'
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
                        onOn-form-item-click={(e: MouseEvent, data: Widget) => clickItem(e, data)}
                        onCell-click={({ }, column: any, { }, event: MouseEvent) => handleTableColClick(column, event)}
                        onHeader-click={(column: any, event: MouseEvent) => handleTableColClick(column, event)}
                      />
                    </TableActionsWidget>
                    )
                  : (
                    <z-form-item
                      formConfig={{ ...formConfig.value, draggable: false }}
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
                      onArray-form-draggable-end={(draggableEvent: any) => handleArrayFormEnd(formItem, draggableEvent)}
                      onUpdate:columns={handleUpdateFormItem}
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
