<script setup lang="ts">
  import { WorkspaceComponentList } from '@ideal-schema/playground-demi';
  import { useWorkspaceStoreMethods, useMiddleFormStoreData, useWorkspaceStoreData } from '@/hooks';

  const { workspaceComponentList: list, curOperateComponent } = useWorkspaceStoreData();
  const { rootSchema, formData, formConfig } = useMiddleFormStoreData();
  const { pushComponentItem, updateCurOperateComponent } = useWorkspaceStoreMethods();

  const handleAddComponentItem = (item: WorkspaceComponentItem, index: number, toId: string) => {
    pushComponentItem(item, index, toId);
  };

  const handleUpdateCurOperateComponent = (item: WorkspaceComponentItem) => {
    updateCurOperateComponent(item);
  };

  const clickPcBoard = () => {
    updateCurOperateComponent({} as WorkspaceComponentItem);
  };
</script>

<template>
  <div id="view-port" class="view-port" @click="clickPcBoard">
    <div v-if="curOperateComponent.name === 'tablePro'">
      <WorkspaceComponentList
        :workspace-component-list="list"
        :cur-operate-component="curOperateComponent"
        :root-schema="rootSchema"
        :form-data="formData"
        @on-update-cur-operate="handleUpdateCurOperateComponent"
        @on-add-item="handleAddComponentItem"
      />
    </div>
    <el-form v-else :form-model="formData" v-bind="formConfig" class="h-full">
      <WorkspaceComponentList
        :workspace-component-list="list"
        :cur-operate-component="curOperateComponent"
        :root-schema="rootSchema"
        :form-data="formData"
        @on-update-cur-operate="handleUpdateCurOperateComponent"
        @on-add-item="handleAddComponentItem"
      />
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
  .view-port {
    position: relative;
    overflow: overlay;
    width: 100%;
    height: 100%;
    min-height: 100px;
    opacity: 1;
    outline: none;
    box-sizing: border-box;
  }
</style>
