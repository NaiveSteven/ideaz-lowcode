import { getComponentListItem, useGlobalSetting, useWorkspaceComponent } from '@ideal-schema/playground-store'
import { useInElement } from '../../hooks'
import { getPids, getTreeDataItem } from '../../utils/index'

export default defineComponent({
  name: 'Selector',
  setup() {
    const { workspaceWidgetType } = useGlobalSetting()
    const { activeWidget, widgets, updateActiveWidget } = useWorkspaceComponent()
    const { isOutside, changeBtnStatus } = useInElement('selector-btn')

    const selectors = computed(() => {
      const { parentData } = getComponentListItem(activeWidget.value.id, widgets.value)
      return parentData ? [...getPids(widgets.value, activeWidget.value), parentData] : getPids(widgets.value, activeWidget.value)
    })

    const tableProSelectors = computed(() => {
      if (
        activeWidget.value.name === 'tableCol'
        || activeWidget.value.name === 'tableForm'
      ) {
        return [
          {
            id: widgets.value[0].id,
            title: '增删改查',
            icon: widgets.value[0].icon,
          },
        ]
      }

      return []
    })

    const handleClickTitle = (item: { id: string, title: string }) => {
      changeBtnStatus(true)
      const clickData = getTreeDataItem(widgets.value, item.id)
      updateActiveWidget(clickData)
    }

    const handleClickForm = () => {
      changeBtnStatus(true)
      updateActiveWidget({} as WorkspaceComponentItem)
    }

    const renderCurOperateSelector = () => (
      <el-button
        type="primary"
        size="small"
        v-show={activeWidget.value.id}
        class="aux-button w-full"
        onClick={() => handleClickTitle(activeWidget.value)}
      >
        <el-icon>
          <i class={[activeWidget.value.icon, 'iconfont']}></i>
        </el-icon>
        <span>{activeWidget.value.title}</span>
      </el-button>
    )

    const renderFormSelector = (cls: string, condition: boolean) => {
      return (
        <>
          {condition && (
            <el-button type="primary" size="small" class={cls} onClick={handleClickForm}>
              <el-icon>
                <i class={['icon-biaodan', 'iconfont']}></i>
              </el-icon>
              <span>{workspaceWidgetType.value === 'form' ? '表单' : '页面'}</span>
            </el-button>
          )}
        </>
      )
    }

    return () => (
      <div class="relative mr-1" id="selector-btn">
        {renderCurOperateSelector()}
        {!isOutside.value && (
          <div style={{ position: 'absolute', top: '100%', left: 0 }} class="selector-menu">
            {workspaceWidgetType.value === 'form'
              ? selectors.value
                .slice(1, selectors.value.length)
                .map((item: { id: string, title: string, icon: string }) => {
                  return (
                    <el-button
                      type="primary"
                      size="small"
                      class={['aux-button', 'mt-1']}
                      onClick={() => handleClickTitle(item)}
                    >
                      <el-icon>
                        <i class={[item.icon, 'iconfont']}></i>
                      </el-icon>
                      <span>{item.title}</span>
                    </el-button>
                  )
                })
              : tableProSelectors.value.map((item) => {
                return (
                  <el-button
                    type="primary"
                    size="small"
                    class={['aux-button', 'mt-1']}
                    onClick={() => handleClickTitle(item)}
                  >
                    <el-icon>
                      <i class={[item.icon, 'iconfont']}></i>
                    </el-icon>
                    <span>{item.title}</span>
                  </el-button>
                )
              })}
            {renderFormSelector(
              selectors.value.length ? 'aux-button selector-menu mt-1' : 'aux-button selector-menu',
              !!activeWidget.value.id,
            )}
          </div>
        )}
        {renderFormSelector('aux-button', !activeWidget.value.id)}
      </div>
    )
  },
})
