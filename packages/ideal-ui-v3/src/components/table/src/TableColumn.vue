<template>
  <el-table-column
    v-if="
      !['index', 'expand', 'selection', undefined].includes(props.tableCol.type) ||
      props.tableCol.slot
    "
    v-bind="attrsAll"
  >
    <!-- header slot -->
    <template v-if="tableCol.headerSlot" #header="scope">
      <slot :name="tableCol.headerSlot" :column="scope.column"></slot>
    </template>
    <template #default="scope">
      <!-- 支持自定义 -->
      <slot v-if="props.tableCol.slot" :name="props.tableCol.slot" :row="scope.row"></slot>
      <!-- 按钮单独处理 -->
      <template v-if="props.tableCol.type === 'button'">
        <template v-for="(btn, index) in props.tableCol.btnList || props.tableCol.buttons">
          <el-button
            v-if="getIsShowButton(btn, scope.row, scope.$index)"
            :key="index"
            :size="props.size"
            v-bind="btn"
            :disabled="getIsDisabled(btn, scope.row, scope.$index)"
            @click="btn.click && btn.click(scope.row, scope.$index)"
          >
            {{ btn.label }}
          </el-button>
        </template>
      </template>
      <!-- type除了selection、index、expand，还支持其他组件 -->
      <component
        :is="getComponentName(props.tableCol.type)"
        v-else
        v-model="scope.row[props.tableCol.prop]"
        :component-name="getDynamicComponentName(props.tableCol.type)"
        :on="props.tableCol.on"
        :size="size"
        :row-data="scope.row"
        :options="tableCol.options"
        v-bind="props.tableCol.attrs"
        :disabled="getIsDisabled(tableCol, scope.row, scope.$index)"
      />
    </template>
  </el-table-column>
  <el-table-column v-else v-bind="attrsAll">
    <!-- header slot -->
    <template v-if="tableCol.headerSlot" #header="scope">
      <slot :name="tableCol.headerSlot" :column="scope.column"></slot>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import type { OptionsItem, TableCol, BtnItem } from '@ideal-schema/ideal-ui-v3';

  interface CTableColumnProps {
    tableCol: TableCol;
    options?: OptionsItem[];
    size?: string;
  }
  const props = withDefaults(defineProps<CTableColumnProps>(), {
    tableCol: () => ({}),
  });
  const attrsAll = computed(() => {
    return props.tableCol.align ? { ...props.tableCol } : { ...props.tableCol, align: 'center' };
  });

  const getComponentName = (type: string | Function | undefined) => {
    const cNames = ['select'];
    const propComponentName = typeof type === 'function' ? type() : type;

    if (cNames.indexOf(propComponentName) > -1) {
      return 'il-' + propComponentName;
    } else {
      return 'c-dynamic-component';
    }
  };

  const getDynamicComponentName = (type: string | Function | undefined) => {
    const eleNames = ['input', 'datepicker', 'switch'];
    const propComponentName = typeof type === 'function' ? type() : type;

    if (eleNames.indexOf(propComponentName) > -1) {
      if (propComponentName === 'datepicker') {
        return 'el-date-picker';
      }
      return 'el-' + propComponentName;
    } else {
      return propComponentName || 'unknown';
    }
  };

  const getIsShowButton = (button: BtnItem, row: any, index: number) => {
    const keys = Object.keys(button);
    if (keys.indexOf('hide') > -1 || keys.indexOf('whenShowCb') > -1) {
      return typeof button['hide'] === 'boolean'
        ? !button['hide']
        : typeof button['hide'] === 'function'
        ? !(button['hide'] as (row: any, index: number) => boolean)(row, index)
        : typeof button['whenShowCb'] === 'boolean'
        ? button['whenShowCb']
        : typeof button['whenShowCb'] === 'function'
        ? (button['whenShowCb'] as (row: any, index: number) => boolean)(row, index)
        : true;
    }
    return true;
  };

  const getIsDisabled = (tableCol: TableCol | BtnItem, row: any, index: number) => {
    const keys = Object.keys(tableCol);
    if (keys.indexOf('disabled') > -1 || keys.indexOf('isDisabled') > -1) {
      return typeof tableCol['disabled'] === 'boolean'
        ? tableCol['disabled']
        : typeof tableCol['disabled'] === 'function'
        ? (tableCol['disabled'] as (row: any, index: number) => boolean)(row, index)
        : typeof tableCol['isDisabled'] === 'boolean'
        ? tableCol['isDisabled']
        : typeof tableCol['isDisabled'] === 'function'
        ? (tableCol['isDisabled'] as (row: any, index: number) => boolean)(row, index)
        : false;
    }
    return false;
  };
</script>
