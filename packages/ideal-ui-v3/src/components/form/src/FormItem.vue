<template>
  <il-col v-bind="colLayout">
    <!-- 具体组件的配置项目 -->
    <el-form-item :prop="col.prop" v-bind="{ ...col.formItem, ...attrs }" class="c-form-item">
      <component
        :is="getComponentName(col.type)"
        v-if="col.prop"
        ref="component"
        v-model="formModel![col.prop]"
        :options="options ? options[col.prop] : {}"
        :prop="col.prop"
        v-bind="col.attrs"
        v-on="{ ...col.on }"
      />
      <slot v-else></slot>
      <template #label>
        <!-- {{ col.formItem.label }} -->
        <FormItemLabel :colon="formConfig.colon" v-bind="{ ...col.formItem, ...attrs }" />
      </template>
      <div v-if="col.formItem && col.formItem.extra" class="c-form-item__extra">
        {{ col.formItem.extra }}
      </div>
    </el-form-item>
  </il-col>
</template>

<script setup lang="ts">
  import { useAttrs } from 'vue';
  import FormItemLabel from './FormItemLabel.vue';
  import type { IndexType, IndexOptions, FormItemConfigItem } from '@ideal-schema/ideal-ui-v3';

  type CFormItemProps = {
    formModel?: IndexType;
    options?: IndexOptions;
    col?: FormItemConfigItem;
    colLayout?: IndexType;
    formConfig?: IndexType;
  };

  withDefaults(defineProps<CFormItemProps>(), {
    formConfig: () => ({}),
    col: () => ({}),
    formModel: () => ({}),
    colLayout: () => ({}),
  });

  const attrs = useAttrs();

  const getComponentName = (type: string | Function | undefined) => {
    const cNames = ['select', 'radio', 'checkbox'];
    const eleNames = ['input', 'datepicker', 'switch'];
    const propComponentName = typeof type === 'function' ? type() : type;

    if (cNames.indexOf(propComponentName) > -1) {
      return 'il-' + propComponentName;
    } else if (eleNames.indexOf(propComponentName) > -1) {
      if (propComponentName === 'datepicker') {
        return 'el-date-picker';
      }
      return 'el-' + propComponentName;
    } else {
      return propComponentName || 'unknown';
    }
  };
</script>
