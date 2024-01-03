<template>
  <el-form v-bind="formConfig" ref="formRefs" :model="formModel">
    <div class="c-form">
      <il-container class="c-form__row" v-bind="rowLayout">
        <template v-for="(col, colIndex) in formatedSchema" :key="colIndex">
          <il-form-item
            v-show="!!col.hideUseVShow ? !col.hideUseVShow() : true"
            :col="col"
            :col-layout="getColLayout(col)"
            :form-model="formModel"
            :form-config="formConfig"
            :options="options"
            v-on="attrs"
          >
            <template v-if="col.slot" #[col.slot!]>
              <slot v-if="col.slot" :name="col.slot"></slot>
            </template>
          </il-form-item>
        </template>
      </il-container>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
  import { cloneDeep } from 'lodash-es';
  import { computed, useAttrs } from 'vue';
  import { useFormMethods } from '@ideal-schema/ideal-ui-v3';
  import type {
    Layout,
    IndexType,
    IndexOptions,
    FormItemConfigItem,
  } from '@ideal-schema/ideal-ui-v3';
  import IlFormItem from './FormItem.vue';

  interface CFormProps {
    layout?: Layout;
    formConfig?: IndexType;
    formItemConfig?: FormItemConfigItem[];
    formModel: IndexType;
    options?: IndexOptions;
  }

  const attrs = useAttrs();

  const { validate, validateField, resetFields, scrollToField, clearValidate } = useFormMethods();

  const props = withDefaults(defineProps<CFormProps>(), {
    layout: () => {
      return {
        rowLayout: {
          type: 'flex',
          gutter: 0,
          interval: 0,
          justify: 'start',
          direction: 'row',
        },
        colLayout: {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 8,
        },
      };
    },
    formItemConfig: () => [],
    formModel: () => ({}),
  });

  const rowLayout = computed(() => {
    return props.layout.rowLayout
      ? props.layout.rowLayout
      : {
          gutter: 0,
          interval: 0,
          justify: 'start',
          type: 'flex',
          direction: 'row',
        };
  });

  const colLayout = computed(() => {
    return props.layout.colLayout
      ? props.layout.colLayout
      : {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 8,
        };
  });

  const formatedSchema = computed(() => {
    const _schema = cloneDeep(props.formItemConfig);
    return _schema.filter((item: FormItemConfigItem) => !isHide(item));
  });

  const getColLayout = (col: FormItemConfigItem) => {
    return { ...colLayout.value, ...col.colGrid };
  };

  function isHide(item: FormItemConfigItem) {
    return typeof item.hide === 'function' ? item.hide() : item.hide;
  }

  defineExpose({
    validate,
    validateField,
    resetFields,
    scrollToField,
    clearValidate,
  });
</script>
