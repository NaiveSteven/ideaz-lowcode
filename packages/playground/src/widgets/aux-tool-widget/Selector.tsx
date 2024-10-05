import { getComponentListItem, useGlobalSetting, useWorkspaceComponent } from '@ideal-schema/playground-store'
import { useInElement } from '../../hooks'
import { getPids, getTreeDataItem } from '../../utils/index'

export default defineComponent({
  name: 'Selector',
  setup() {
    const { workspaceComponentType } = useGlobalSetting()
    const { curOperateComponent, workspaceComponentList, updateCurOperateComponent } = useWorkspaceComponent()
    const { isOutside, changeBtnStatus } = useInElement('selector-btn')

    const selectors = computed(() => {
      const { parentData } = getComponentListItem(curOperateComponent.value.id, workspaceComponentList.value)
      return parentData ? [...getPids(workspaceComponentList.value, curOperateComponent.value), parentData] : getPids(workspaceComponentList.value, curOperateComponent.value)
    })

    const tableProSelectors = computed(() => {
      if (
        curOperateComponent.value.name === 'tableCol'
        || curOperateComponent.value.name === 'tableForm'
      ) {
        return [
          {
            id: workspaceComponentList.value[0].id,
            title: '增删改查',
            icon: workspaceComponentList.value[0].icon,
          },
        ]
      }

      return []
    })

    const handleClickTitle = (item: { id: string, title: string }) => {
      changeBtnStatus(true)
      const clickData = getTreeDataItem(workspaceComponentList.value, item.id)
      updateCurOperateComponent(clickData)
    }

    const handleClickForm = () => {
      changeBtnStatus(true)
      updateCurOperateComponent({} as WorkspaceComponentItem)
    }

    const renderCurOperateSelector = () => (
      <el-button
        type="primary"
        size="small"
        v-show={curOperateComponent.value.id}
        class="aux-button w-full"
        onClick={() => handleClickTitle(curOperateComponent.value)}
      >
        <el-icon>
          <i class={[curOperateComponent.value.icon, 'iconfont']}></i>
        </el-icon>
        <span>{curOperateComponent.value.title}</span>
      </el-button>
    )

    const renderFormSelector = (cls: string, condition: boolean) => {
      return (
        <>
          {condition && (
            <el-button type="primary" size="small" class={cls} onClick={handleClickForm}>
              <el-icon>
                <i-setting />
              </el-icon>
              <span>{workspaceComponentType.value === 'form' ? '表单' : '页面'}</span>
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
            {workspaceComponentType.value === 'form'
              ? selectors.value
                .slice(1, selectors.value.length)
                .map((item: { id: string, title: string }) => {
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
                      <i-setting />
                    </el-icon>
                    <span>{item.title}</span>
                  </el-button>
                )
              })}
            {renderFormSelector(
              selectors.value.length ? 'aux-button selector-menu mt-1' : 'aux-button selector-menu',
              !!curOperateComponent.value.id,
            )}
          </div>
        )}
        {renderFormSelector('aux-button', !curOperateComponent.value.id)}
      </div>
    )
  },
})
