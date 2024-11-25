import { useGlobalSetting, useWorkspaceComponent } from '@ideal-schema/playground-store'
import { cloneDeep } from 'lodash-es'
import { getPids, getTreeDataItem } from '../../utils/index'
import './style.scss'

interface TitleItem {
  title: string
  id?: string
}

export default defineComponent({
  name: 'DesignToolsWidget',
  setup() {
    const { workspaceWidgetType } = useGlobalSetting()
    const { activeWidget, widgets, updateActiveWidget } = useWorkspaceComponent()

    const selectors = computed(() => {
      return getPids(widgets.value, activeWidget.value)
    })

    const tableProSelectors = computed(() => {
      const pageTitle = [{ title: '页面', id: '' }]
      const tableProTitle = pageTitle.concat([
        { title: '增删改查', id: widgets?.value[0]?.id },
      ])
      if (activeWidget.value.name === 'crud')
        return tableProTitle

      if (activeWidget.value.name === 'tableCol')
        return tableProTitle.concat([{ title: '表格项', id: activeWidget.value.id }])

      if (activeWidget.value.name === 'tableForm')
        return tableProTitle.concat([{ title: '表单项', id: activeWidget.value.id }])

      return pageTitle
    })

    const titleList = computed<TitleItem[]>(() => {
      const formTitle: IndexType = [{ title: '表单' }]
      if (workspaceWidgetType.value === 'form') {
        if (activeWidget.value.id)
          return formTitle.concat(cloneDeep(selectors.value).reverse())

        else
          return formTitle
      }
      else {
        return tableProSelectors.value
      }
    })

    const handleClickTitle = (item: TitleItem) => {
      if (item.title === '表单') {
        updateActiveWidget({} as Widget)
      }
      else {
        const cur = getTreeDataItem(widgets.value, item.id as string)
        updateActiveWidget(cur)
      }
    }

    const renderSpan = (item: TitleItem, index: number) => (
      <>
        <span
          class={
            index === titleList.value.length - 1
              ? ['dark', 'cursor-pointer']
              : ['light', 'cursor-pointer']
          }
          onClick={() => handleClickTitle(item)}
        >
          {item.title}
        </span>
        <span v-show={index !== titleList.value.length - 1} class="light mx-1">
          /
        </span>
      </>
    )

    return () => (
      <div class="breadcrumb">
        <div class="flex items-center">
          <el-icon
            class={titleList.value.length === 1 ? ['icon-class', 'dark'] : ['icon-class', 'light']}
          >
            <i-location-filled />
          </el-icon>
          {titleList.value.map((item, index) => renderSpan(item, index))}
        </div>
      </div>
    )
  },
})
