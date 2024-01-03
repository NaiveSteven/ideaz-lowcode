import { defineStore } from 'pinia';
import { uid } from '@ideal-schema/shared';
import { getTreeDataItem, changeDataId } from '../utils/index';
import { isEqual, cloneDeep } from 'lodash-es';
import mitt from '@ideal-schema/playground-event';
import { useMiddleFormStore } from './middleForm';
import { useGlobalSettingStore } from './globalSetting';

interface WorkspaceState {
  workspaceComponentList: WorkspaceComponentItem[];
  curOperateComponent: WorkspaceComponentItem;
  viewType: ViewType;
}

type ViewType = 'json' | 'design' | 'play';

export const useWorkspaceStore = defineStore({
  id: 'workspace',
  state: (): WorkspaceState => ({
    // 显示在workspace的组件列表
    workspaceComponentList: [],

    // 当前在workspace操作的组件
    curOperateComponent: {} as WorkspaceComponentItem,
    viewType: 'design',
  }),
  getters: {
    getWorkspaceComponentList(): WorkspaceComponentItem[] {
      return this.workspaceComponentList;
    },
    getCurOperateComponent(): WorkspaceComponentItem {
      return this.curOperateComponent;
    },
    getViewType(): ViewType {
      return this.viewType;
    },
  },
  actions: {
    pushComponentItem(componentItem: WorkspaceComponentItem, index: number, toId: string) {
      // mitt.emit('drag-start');
      const middleFormStore = useMiddleFormStore();
      if (!toId) {
        this.workspaceComponentList.splice(index, 0, componentItem);
        middleFormStore.addSchema(componentItem);
      } else {
        const item = getTreeDataItem(this.workspaceComponentList, toId);
        item.children.splice(index, 0, componentItem);
        middleFormStore.addSchema(componentItem, item.schema.id);
      }

      // state.workspaceComponentList.push(data.componentItem);
      // console.log(this.workspaceComponentList, 'vuex中的workspaceComponentList');
      // mitt.emit('drag-end');
    },
    updateComponentItem(componentItem: WorkspaceComponentItem) {
      let index = -1;
      let isSame = false;
      if (componentItem.pid) {
        const itemParent = getTreeDataItem(
          this.workspaceComponentList,
          componentItem.pid as string
        );
        index = itemParent.children.findIndex(
          (item: WorkspaceComponentItem) => item.id === componentItem.id
        );
        if (index > -1) {
          isSame = isEqual(itemParent.children[index], componentItem);
          if (!isSame) {
            // console.log(
            //   this.workspaceComponentList,
            //   'emitthis.workspaceComponentListthis.workspaceComponentListthis.workspaceComponentList'
            // );
            // mitt.emit('attribute-start', '属性变更');
          }
          itemParent.children.splice(index, 1, componentItem);
        }
      } else {
        index = this.workspaceComponentList.findIndex((item: any) => item.id === componentItem.id);
        isSame = isEqual(this.workspaceComponentList[index], componentItem);
        // console.log(
        //   JSON.stringify(this.workspaceComponentList[index]),
        //   JSON.stringify(componentItem)
        // );
        // debugger;
        if (!isSame) {
          // mitt.emit('attribute-start', {
          //   data: cloneDeep(this.workspaceComponentList),
          //   type: '属性变更',
          // });
          // debugger;
        }
        if (index > -1) {
          // if (!isSame) mitt.emit('attribute-end');

          this.workspaceComponentList.splice(index, 1, componentItem);
          // debugger;
        }
      }
      const middleFormStore = useMiddleFormStore();
      middleFormStore.updateSchema(componentItem);
      // if (!isSame) mitt.emit('attribute-end', cloneDeep(this.workspaceComponentList));
      // debugger;
    },
    // 删除componentItem，同时删除schemas中的某一项
    deleteComponentItem(componentItem: WorkspaceComponentItem) {
      const middleFormStore = useMiddleFormStore();
      mitt.emit('drag-start', '删除组件');
      mitt.emit('drag-end');
      let index = -1;
      if (componentItem.pid) {
        const itemParent = getTreeDataItem(
          this.workspaceComponentList,
          componentItem.pid as string
        );
        index = itemParent.children.findIndex(
          (item: WorkspaceComponentItem) => item.id === componentItem.id
        );
        if (index > -1) {
          itemParent.children.splice(index, 1);
          middleFormStore.delSchema(componentItem);
        }
      } else {
        const globalSettingStore = useGlobalSettingStore();
        const workspaceComponentType = globalSettingStore.getWorkspaceComponentType;
        // 表单部分
        if (workspaceComponentType === 'form') {
          index = this.workspaceComponentList.findIndex((item) => item.id === componentItem.id);
          if (index > -1) {
            this.workspaceComponentList.splice(index, 1);
            middleFormStore.delSchema(componentItem);
          }
          // 表单表格
        } else {
          // 表单项
          const tableCols = this.workspaceComponentList[0].schema.tableCols || [];
          if (componentItem.name === 'tableForm') {
            tableCols.forEach((item: any) => {
              if (item.formItemProps && item.formItemProps.id === componentItem.id) {
                delete item.formItemProps;
              }
            });
          }
          if (componentItem.name === 'tablePro') {
            this.workspaceComponentList = [];
          }
          if (componentItem.name === 'tableCol') {
            const index = tableCols.findIndex((item: any) => item.id === componentItem.id);
            const tableCol = cloneDeep(tableCols[index]);
            if (tableCol.formItemProps) {
              tableCols[index] = {
                formItemProps: tableCol.formItemProps,
              };
            } else {
              tableCols.splice(index, 1);
            }
            // const filterTableCols = cloneDeep(tableCols.filter((item) => item.prop));
            // const filterFormItems = tableCols.filter((item) => item.formItemProps);
            // if (filterTableCols.length >= filterFormItems.length) {
            //   filterTableCols.forEach((item, index) => {
            //     delete item.formItemProps;
            //     if (filterFormItems[index]) {
            //       item.formItemProps = filterFormItems[index].formItemProps;
            //     }
            //   });
            // } else {
            //   filterFormItems.forEach((item, index) => {
            //     if (!filterTableCols[index]) {
            //       filterTableCols[index] = {};
            //     }
            //     filterTableCols[index].formItemProps = filterFormItems[index].formItemProps;
            //   });
            // }
            this.workspaceComponentList[0].schema.tableCols = tableCols;
          }
        }
      }
    },
    copyComponentItem(componentItem: WorkspaceComponentItem) {
      const newComponentItem = changeDataId([{ ...componentItem, id: uid() }]);
      mitt.emit('drag-start', '复制组件');
      mitt.emit('drag-end');
      if (componentItem.pid) {
        const itemParent = getTreeDataItem(
          this.workspaceComponentList,
          componentItem.pid as string
        );
        itemParent.children.push(newComponentItem[0]);
      } else {
        const globalSettingStore = useGlobalSettingStore();
        const workspaceComponentType = globalSettingStore.getWorkspaceComponentType;
        // 表单部分
        if (workspaceComponentType === 'form') {
          this.workspaceComponentList.push(newComponentItem[0]);
          // 表单表格
        } else {
          // 表单项
          if (componentItem.name === 'tableForm') {
            let lastIndex = 0;
            const newFormItem = { ...componentItem, id: uid() };
            const tableCols = this.workspaceComponentList[0].schema.tableCols || [];
            tableCols.forEach((item: any, index: number) => {
              if (item.formItemProps && lastIndex < index) {
                lastIndex = index;
              }
            });
            if (!tableCols[lastIndex + 1]) {
              tableCols[lastIndex + 1] = {
                formItemProps: newFormItem,
              };
            } else {
              tableCols[lastIndex + 1].formItemProps = newFormItem;
            }
            this.curOperateComponent = newFormItem;
          }
          // 表格项
          if (componentItem.name === 'tableCol') {
            const newTableCol = { ...componentItem, id: uid() };
            delete newTableCol.formItemProps;
            const tableCols = this.workspaceComponentList[0].schema.tableCols!.concat([
              newTableCol,
            ]);
            this.workspaceComponentList = [
              {
                ...this.workspaceComponentList[0],
                schema: {
                  ...this.workspaceComponentList[0].schema,
                  tableCols,
                  cellClassName: ({ columnIndex }: any) => {
                    return 'schema-field' + tableCols[columnIndex].id;
                  },
                },
              },
            ];
            this.curOperateComponent = newTableCol;
          }
        }
      }
    },
    updateComponentList(components: WorkspaceComponentItem[]) {
      // const middleFormStore = useMiddleFormStore();
      this.workspaceComponentList = components;
      // middleFormStore.updateSchemas(components);
    },
    clearWorkspaceComponentList() {
      const middleFormStore = useMiddleFormStore();
      this.workspaceComponentList = [];
      middleFormStore.clearSchemas();
    },
    updateCurOperateComponent(curOperateComponent: WorkspaceComponentItem) {
      this.curOperateComponent = curOperateComponent;
      // debugger;
      // console.log(this.curOperateComponent, 'vuex中的curOperateComponent');
    },
    updateViewType(type: ViewType) {
      this.viewType = type;
    },
  },
});
