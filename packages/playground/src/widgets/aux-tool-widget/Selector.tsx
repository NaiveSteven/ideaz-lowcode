import { defineComponent, computed } from 'vue';
import { useWorkspaceStoreMethods, useWorkspaceStoreData, useInElement } from '@/hooks';
import { useGlobalSettingStore } from '@ideal-schema/playground-store';
import { getPids, getTreeDataItem } from '@/utils/index';

export default defineComponent({
  name: 'Selector',
  setup() {
    const globalSettingStore = useGlobalSettingStore();

    const workspaceComponentType = computed(() => globalSettingStore.getWorkspaceComponentType);
    const { curOperateComponent, workspaceComponentList } = useWorkspaceStoreData();
    const { updateCurOperateComponent } = useWorkspaceStoreMethods();
    const { isOutside, changeBtnStatus } = useInElement('selector-btn');

    const selectors = computed(() => {
      return getPids(workspaceComponentList.value, curOperateComponent.value);
    });

    const tableProSelectors = computed(() => {
      if (
        curOperateComponent.value.name === 'tableCol' ||
        curOperateComponent.value.name === 'tableForm'
      ) {
        return [
          {
            id: workspaceComponentList.value[0].id,
            title: '表单表格',
          },
        ];
      }
      return [];
    });

    const handleClickTitle = (item: { id: string; title: string }) => {
      changeBtnStatus(true);
      const clickData = getTreeDataItem(workspaceComponentList.value, item.id);
      updateCurOperateComponent(clickData);
    };

    const handleClickForm = () => {
      changeBtnStatus(true);
      updateCurOperateComponent({} as WorkspaceComponentItem);
    };

    const renderCurOperateSelector = () => (
      <el-button
        type="primary"
        size="small"
        v-show={curOperateComponent.value.id}
        class="aux-button w-full"
        onClick={() => handleClickTitle(curOperateComponent.value)}
      >
        <el-icon>
          <i-setting />
        </el-icon>
        <span>{curOperateComponent.value.title}</span>
      </el-button>
    );

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
      );
    };

    return () => (
      <div class="mr-1 relative" id="selector-btn">
        {renderCurOperateSelector()}
        {!isOutside.value && (
          <div style={{ position: 'absolute', top: '100%', left: 0 }} class="selector-menu">
            {workspaceComponentType.value === 'form'
              ? selectors.value
                  .slice(1, selectors.value.length)
                  .map((item: { id: string; title: string }) => {
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
                    );
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
                  );
                })}
            {renderFormSelector(
              selectors.value.length ? 'aux-button selector-menu mt-1' : 'aux-button selector-menu',
              !!curOperateComponent.value.id
            )}
          </div>
        )}
        {renderFormSelector('aux-button', !curOperateComponent.value.id)}
      </div>
    );
  },
});
