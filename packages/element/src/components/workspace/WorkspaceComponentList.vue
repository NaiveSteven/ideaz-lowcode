<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { VueDraggable } from 'vue-draggable-plus';
  import { cloneDeep } from 'lodash-es';
  import { getSchemaData } from '@ideal-schema/playground-demi';
  // import { ObjectField, useForm } from '@ideal-schema/core';
  import { useMiddleFormStoreData } from '../../hooks';
  import { useWorkspaceStore, useGlobalSettingStore } from '@ideal-schema/playground-store';
  import TableActionsWidget from '../../widgets/TableActionsWidget';
  // import WorkspaceComponentItemWrapper from './WorkspaceComponentItemWrapper.vue';

  interface Props {
    workspaceComponentList: WorkspaceComponentItem[];
    curOperateComponent: WorkspaceComponentItem;
    rootSchema: Schema;
    formData: any;
    needFlex?: boolean;
    needVueDraggable?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    workspaceComponentList: () => [],
    curOperateComponent: () => ({} as WorkspaceComponentItem),
    rootSchema: () => ({} as Schema),
    formData: () => {},
    pid: '',
    needFlex: false,
    needVueDraggable: true,
  });
  const emit = defineEmits(['on-add-item', 'on-update-cur-operate']);

  const workspaceStore = useWorkspaceStore();
  const globalSettingStore = useGlobalSettingStore();
  const curOperateComponent = computed(() => workspaceStore.getCurOperateComponent);
  const workspaceComponentType = computed(() => globalSettingStore.getWorkspaceComponentType);
  const workspaceComponentList = computed(() => workspaceStore.getWorkspaceComponentList);
  const { formConfig } = useMiddleFormStoreData();

  let tempData: any = null;

  const tableKey = ref(new Date().valueOf());

  watch(
    () => curOperateComponent.value,
    () => {
      if (curOperateComponent.value.name === 'tableCol') {
        tableKey.value = new Date().valueOf();
      }
    }
  );

  const setClassName = ({ columnIndex }: any) => {
    const tableCols =
      workspaceComponentList.value[0].schema.tableCols?.filter((item) => item.prop) || [];
    if (tableCols[columnIndex]) {
      return 'schema-field' + tableCols[columnIndex].id;
    }
  };

  const clickItem = (e: MouseEvent, item: WorkspaceComponentItem) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.curOperateComponent.id === item.id) return;
    emit('on-update-cur-operate', item);
  };

  const start = (a: { oldIndex: number }) => {
    // schema-field
    // tempData = getTreeDataItem(
    //   props.workspaceComponentList,
    //   a.clone.id.slice(12, a.clone.id.length)
    // );
    tempData = props.workspaceComponentList[a.oldIndex];
    // emit('on-update-cur-operate', {});
  };
  const end = (a: { to: { id: string }; newIndex: number }) => {
    // const newData = props.workspaceComponentList[a.newIndex]
    // if ((!tempData.pid && !a.to.id) || tempData.pid === a.to.id) {
    //   emit('on-update-cur-operate', tempData);
    //   return;
    // }
    // tempData.pid = newData.id;
    // emit('on-add-item', tempData, a.newIndex, newData.id);
    emit('on-update-cur-operate', tempData);
  };
  const clone = () => {
    // console.log(obj, 'cloneDogcloneDogcloneDogcloneDogcloneDog');
    // return {
    //   ...obj,
    //   id: uuidv4(),
    // };
  };

  const handleTableColClick = (column: any, event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const columnIndex = column.getColumnIndex();
    const tableCols =
      workspaceStore.getWorkspaceComponentList[0].schema.tableCols?.filter((item) => item.prop) ||
      [];
    const tableCol = tableCols[columnIndex];
    workspaceStore.updateCurOperateComponent(tableCol as WorkspaceComponentItem);
  };

  const handleUpdateFormItem = (
    data: WorkspaceComponentItem,
    newIndex: number,
    oldIndex: number
  ) => {
    if (!data.id) {
      emit('on-update-cur-operate', {});
      return;
    }
    const tableProConfig = workspaceStore.getWorkspaceComponentList[0];
    const schema = tableProConfig.schema;
    let tableCols: TableCol[] = [];
    if (schema.tableCols && schema.tableCols.length) {
      const newArr = [...schema.tableCols];
      const newFormItem = { ...schema.tableCols[oldIndex].formItemProps };
      const oldFormItem = { ...schema.tableCols[newIndex].formItemProps };
      newArr[newIndex].formItemProps = newFormItem;
      newArr[oldIndex].formItemProps = oldFormItem;
      tableCols = newArr;
      workspaceStore.updateComponentList([
        {
          ...tableProConfig,
          schema: {
            ...tableProConfig.schema,
            tableCols,
          },
        },
      ]);
      workspaceStore.updateCurOperateComponent(data);
    }
  };

  const handleUpdateTableColumn = (
    data: WorkspaceComponentItem,
    newIndex: number,
    oldIndex: number
  ) => {
    const tableProConfig = workspaceStore.getWorkspaceComponentList[0];
    const schema = tableProConfig.schema;
    if (schema.tableCols && schema.tableCols.length) {
      const filterTableCols = cloneDeep(schema.tableCols.filter((item) => item.prop));
      const filterFormItems = schema.tableCols.filter((item) => item.formItemProps);
      // const formItems = filterTableCols.map((item: TableCol) => {
      //   return item.formItemProps;
      // });
      const newTableCol = { ...filterTableCols[oldIndex] };
      const oldTableCol = { ...filterTableCols[newIndex] };
      filterTableCols[newIndex] = newTableCol;
      filterTableCols[oldIndex] = oldTableCol;
      if (filterTableCols.length >= filterFormItems.length) {
        filterTableCols.forEach((item, index) => {
          delete item.formItemProps;
          if (filterFormItems[index]) {
            item.formItemProps = filterFormItems[index].formItemProps;
          }
        });
      } else {
        filterFormItems.forEach((item, index) => {
          if (!filterTableCols[index]) {
            filterTableCols[index] = {};
          }
          filterTableCols[index].formItemProps = filterFormItems[index].formItemProps;
        });
      }
      workspaceStore.updateComponentList([
        {
          ...tableProConfig,
          schema: {
            ...tableProConfig.schema,
            tableCols: [...filterTableCols],
            cellClassName: ({ columnIndex }: any) => {
              return 'schema-field' + filterTableCols[columnIndex].id;
            },
          },
        },
      ]);
      workspaceStore.updateCurOperateComponent(data);
      tableKey.value = new Date().valueOf();
    }
  };
</script>

<template>
  <VueDraggable
    :id="props.pid"
    :model-value="props.workspaceComponentList"
    class="dragArea list-group h-full"
    :class="needFlex ? ['flex', 'w-full'] : ''"
    :clone="clone"
    :animation="200"
    group="people"
    filter=".not-drag"
    item-key="id"
    @update:model-value="(val) => workspaceStore.updateComponentList(val)"
    @start="start"
    @end="end"
  >
    <div
      v-for="element in props.workspaceComponentList"
      :id="'schema-field' + element.id"
      :key="element.id"
      class="w-full"
      :style="{ marginBottom: '22px' }"
      @click="(e: MouseEvent) => clickItem(e, element)"
    >
      <TableActionsWidget v-if="workspaceComponentType === 'tablePro'">
        <il-table-pro
          :id="element.id"
          :key="tableKey"
          class="tablePro"
          :config="{ ...element.schema, cellClassName: setClassName }"
          :style="{ zIndex: 1 }"
          :pid="element.children ? element.id : ''"
          @on-update-form-item="handleUpdateFormItem"
          @on-update-table-column="handleUpdateTableColumn"
          @on-form-item-click="(e: MouseEvent, data: WorkspaceComponentItem) => clickItem(e, data)"
          @cell-click="({}, column: any,{}, event: MouseEvent) => handleTableColClick(column,event)"
          @header-click="(column: any, event: MouseEvent) => handleTableColClick(column,event)"
        />
      </TableActionsWidget>
      <il-form-item
        v-else
        v-bind="{ ...formConfig }"
        :id="element.id"
        :key="element.schema.id"
        :form-model="getSchemaData().formModel"
        :options="getSchemaData().optionsConfig"
        :style="{ zIndex: 1 }"
        :col="element.schema"
        :class="element.schema.title === 'Col' ? 'not-drag' : ''"
        :pid="element.children ? element.id : ''"
      />
    </div>
  </VueDraggable>
</template>

<style lang="scss" scoped>
  .workspace-ghost {
    overflow: hidden;
    padding: 0;
    height: 3px;
    font-size: 0;
    border: 2px solid #409eff;
    background: #409eff;
    content: '';
    box-sizing: border-box;
    outline-width: 0;
  }

  // ::v-deep(.el-form-item) {
  //   z-index: 1;
  //   margin-bottom: 0;
  // }

  // ::v-deep(.el-form-item__content) {
  //   line-height: 36px;
  // }

  // ::v-deep(.el-form-item__label) {
  //   line-height: 36px;
  // }
</style>
<style lang="scss">
  .tablePro {
    #tableProForm {
      .el-button + .el-button {
        margin-left: 12px !important;
      }
    }
  }
</style>
