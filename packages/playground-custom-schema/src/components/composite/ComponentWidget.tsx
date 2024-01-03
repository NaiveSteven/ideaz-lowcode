import { defineComponent, computed, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import { uid } from '@ideal-schema/shared';
import { DEFAULT_COMPONENT_TEMPLATES } from '../../source';
import { useWorkspaceStore, useGlobalSettingStore } from '@ideal-schema/playground-store';
import {
  getInputFormItemTemplate,
  getSelectFormItemTemplate,
  getMultipleSelectFormItemTemplate,
  getDatepickerFormItemTemplate,
  getSlotFormItemTemplate,
} from '../../utils';
import mitt from '@ideal-schema/playground-event';
import ComponentList from './ComponentList';
import { cloneDeep } from 'lodash-es';

export default defineComponent({
  name: 'ComponentWidget',
  setup() {
    const workspaceStore = useWorkspaceStore();
    const globalSettingStore = useGlobalSettingStore();

    const workspaceComponentType = computed(() => globalSettingStore.getWorkspaceComponentType);
    const workspaceComponentList = computed(() => workspaceStore.getWorkspaceComponentList);

    const templateObj = {
      输入框: getInputFormItemTemplate,
      选择框: getSelectFormItemTemplate,
      多选框: getMultipleSelectFormItemTemplate,
      日期范围: getDatepickerFormItemTemplate,
      插槽: getSlotFormItemTemplate,
    };

    const clickExpandComponentItem = (
      expandComponentItem: WorkspaceComponentItem,
      index: number,
      toId: string
    ) => {
      // 表单表格表单项拖拽
      if (toId === 'tableProForm') {
        if (
          expandComponentItem.title === '输入框' ||
          expandComponentItem.title === '选择框' ||
          expandComponentItem.title === '多选框' ||
          expandComponentItem.title === '日期范围' ||
          expandComponentItem.title === '插槽'
        ) {
          const tableProConfig = workspaceStore.getWorkspaceComponentList[0];
          const schema = tableProConfig.schema;
          let tableCols: TableCol[] = [];
          const formItems: FormItemConfigItem[] = [];
          const { newFormItem, prop } =
            templateObj[expandComponentItem.title as keyof typeof templateObj]();

          if (schema.tableCols && schema.tableCols.length) {
            const newArr = cloneDeep(schema.tableCols);
            newArr.forEach((item: TableCol) => {
              if (item.formItemProps) {
                formItems.push(item.formItemProps);
              }
            });
            formItems.splice(index, 0, newFormItem);
            tableCols = newArr.map((item: TableCol, index: number) => {
              if (formItems[index]) {
                item.formItemProps = formItems[index];
              }
              return item;
            });

            const formOptions = { ...tableProConfig.schema.formOptions };
            if (expandComponentItem.title === '选择框') {
              formOptions[prop] = [{ label: '标签', value: '1', key: uid() }];
            }
            workspaceStore.updateComponentList([
              {
                ...tableProConfig,
                schema: {
                  ...tableProConfig.schema,
                  formModel: {
                    ...workspaceComponentList.value[0].schema.formModel,
                    [prop]: expandComponentItem.title === '日期范围' ? [] : '',
                  },
                  tableCols,
                  formOptions,
                },
              },
            ]);
            workspaceStore.updateCurOperateComponent(newFormItem);
          }
        } else {
          ElMessage.warning('不支持的表单项类型');
        }
        return;
      }
      // 表单表格
      if (expandComponentItem.name === 'tablePro') {
        const componentItem = {
          ...expandComponentItem,
          id: uid(),
          pid: toId,
          schema: {
            ...expandComponentItem.schema,
          },
        };
        workspaceStore.updateComponentList([]);
        workspaceStore.pushComponentItem(componentItem, index, toId);
        workspaceStore.updateCurOperateComponent(componentItem);
        globalSettingStore.updateWorkspaceComponentType('tablePro');
        nextTick(() => {
          mitt.emit('drag-end');
        });
        return;
      } else {
        // workspace里面是表单表格，在其他地方拖入表单，则清空表单表格
        if (workspaceComponentType.value === 'tablePro') {
          workspaceStore.updateComponentList([]);
          workspaceStore.updateCurOperateComponent({} as WorkspaceComponentItem);
        }
        globalSettingStore.updateWorkspaceComponentType('form');
      }
      // 表单
      if (!expandComponentItem.templates || !Array.isArray(expandComponentItem.templates)) {
        const componentItem = {
          ...expandComponentItem,
          id: uid(),
          pid: toId,
          schema: {
            ...expandComponentItem.schema,
          },
        };
        workspaceStore.pushComponentItem(componentItem, index, toId);
        workspaceStore.updateCurOperateComponent(componentItem);
        // 模板
      } else if (Array.isArray(expandComponentItem.templates)) {
        workspaceStore.updateComponentList(cloneDeep(expandComponentItem.templates!));
        workspaceStore.updateCurOperateComponent({} as WorkspaceComponentItem);
      }
      nextTick(() => {
        mitt.emit('drag-end');
      });
    };

    return () => (
      <div class="w-full h-full">
        <ComponentList
          component-list={DEFAULT_COMPONENT_TEMPLATES}
          onClick-component-item={clickExpandComponentItem}
        />
      </div>
    );
  },
});
