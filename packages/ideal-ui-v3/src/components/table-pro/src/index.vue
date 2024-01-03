<template>
  <div>
    <el-card v-if="formItemConfig.length > 1" class="c-mb-4">
      <il-form
        ref="formRefs"
        :form-model="config.formModel ? config.formModel : {}"
        :form-config="formConfig"
        :form-item-config="formItemConfig"
        :options="config.formOptions"
        :layout="layout"
        v-bind="$attrs"
      >
        <template #button>
          <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
          <el-button type="default" size="small" @click="handleReset">重置</el-button>
          <toggle-button v-if="isShowToggleButton" v-model="toggleButtonType" />
        </template>
        <template
          v-for="(item, index) in (formItemConfig.slice(0,formItemConfig.length-1) as Array<{slot: string}>)"
          #[item.slot]
        >
          <slot v-if="item.slot" :key="index" :name="item.slot"></slot>
        </template>
      </il-form>
    </el-card>
    <el-card>
      <div
        v-if="slots.topLeft || slots.topRight"
        class="c-flex c-justify-content-space-between c-mb-4"
      >
        <div>
          <slot name="topLeft"></slot>
        </div>
        <slot name="topRight"></slot>
      </div>
      <il-table ref="cTableRefs" v-bind="attrsAll" @refresh="handlePaginationChange">
        <template v-for="(item, index) in config.tableCols" #[item.slot]="scope">
          <slot v-if="item.slot" :key="index" :row="scope.row" :name="item.slot"></slot>
        </template>
      </il-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, useSlots, useAttrs } from 'vue';
  import {
    useTableMethods,
    useFormMethods,
    useTableProFormItems,
  } from '@ideal-schema/ideal-ui-v3/hooks';
  import ToggleButton from './ToggleButton.vue';
  import type { CTableProConfig } from '@ideal-schema/ideal-ui-v3';

  interface CTableProProps {
    config: CTableProConfig;
  }
  const props = withDefaults(defineProps<CTableProProps>(), {
    config: () => ({ tableCols: [], data: [] }),
  });

  const emits = defineEmits(['search', 'refresh', 'reset']);

  const slots = useSlots();
  const attrs = useAttrs();

  const {
    setCurrentRow,
    toggleRowSelection,
    clearSelection,
    clearFilter,
    toggleAllSelection,
    toggleRowExpansion,
    clearSort,
    sort,
  } = useTableMethods();
  const { validate, validateField, resetFields, scrollToField, clearValidate } = useFormMethods();
  const { toggleButtonType, formItemConfig, isShowToggleButton } = useTableProFormItems(props);

  const cTableRefs = ref();
  const formRefs = ref();

  const layout = computed(() => {
    return {
      colLayout: {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 8,
        xl: 8,
      },
    };
  });

  const formConfig = computed(() => {
    return props.config.formConfig
      ? props.config.formConfig
      : {
          labelPosition: 'right',
          labelWidth: '90px',
          size: 'small',
        };
  });

  const attrsAll = computed(() => {
    return { ...attrs, ...props.config };
  });

  const handlePaginationChange = (val: { page: number; page_size: number }) => {
    emits('refresh', val);
  };

  const handleSearch = () => {
    emits('search');
  };

  const handleReset = () => {
    formRefs.value.resetFields();
    emits('reset');
  };

  defineExpose({
    setCurrentRow,
    toggleRowSelection,
    clearSelection,
    clearFilter,
    toggleAllSelection,
    toggleRowExpansion,
    clearSort,
    sort,

    validate,
    validateField,
    resetFields,
    scrollToField,
    clearValidate,
  });
</script>
