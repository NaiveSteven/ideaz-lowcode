import { defineComponent } from 'vue';
import { computed } from 'vue';
import { cloneDeep } from 'lodash-es';
import { useGlobalSettingStore } from '@ideal-schema/playground-store';
import { useWorkspaceStoreMethods, useWorkspaceStoreData } from '@/hooks';
import { getPids, getTreeDataItem } from '@/utils/index';
import './style.scss';

interface TitleItem {
  title: string;
  id?: string;
}

export default defineComponent({
  name: 'DesignToolsWidget',
  setup() {
    const globalSettingStore = useGlobalSettingStore();

    const workspaceComponentType = computed(() => globalSettingStore.getWorkspaceComponentType);
    const { curOperateComponent, workspaceComponentList } = useWorkspaceStoreData();
    const { updateCurOperateComponent } = useWorkspaceStoreMethods();

    const selectors = computed(() => {
      return getPids(workspaceComponentList.value, curOperateComponent.value);
    });

    const tableProSelectors = computed(() => {
      const pageTitle = [{ title: '页面', id: '' }];
      const tableProTitle = pageTitle.concat([
        { title: '表单表格', id: workspaceComponentList?.value[0]?.id },
      ]);
      if (curOperateComponent.value.name === 'tablePro') {
        return tableProTitle;
      }
      if (curOperateComponent.value.name === 'tableCol') {
        return tableProTitle.concat([{ title: '表格项', id: curOperateComponent.value.id }]);
      }
      if (curOperateComponent.value.name === 'tableForm') {
        return tableProTitle.concat([{ title: '表单项', id: curOperateComponent.value.id }]);
      }
      return pageTitle;
    });

    const titleList = computed<TitleItem[]>(() => {
      const formTitle: IndexType = [{ title: '表单' }];
      if (workspaceComponentType.value === 'form') {
        if (curOperateComponent.value.id) {
          return formTitle.concat(cloneDeep(selectors.value).reverse());
        } else {
          return formTitle;
        }
      } else {
        return tableProSelectors.value;
      }
    });

    const handleClickTitle = (item: TitleItem) => {
      if (item.title === '表单') {
        updateCurOperateComponent({} as WorkspaceComponentItem);
      } else {
        const cur = getTreeDataItem(workspaceComponentList.value, item.id as string);
        updateCurOperateComponent(cur);
      }
    };

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
        <span v-show={index !== titleList.value.length - 1} class="mx-1 light">
          /
        </span>
      </>
    );

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
    );
  },
});
