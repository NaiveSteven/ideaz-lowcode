<template>
  <el-form-item
    :prop="col.prop"
    v-bind="{ ...col.formItem, ...attrs }"
    class="c-form-item c-w-full"
    :class="[...classList]"
  >
    <component
      :is="getComponentName(col.type)"
      v-if="col.prop"
      ref="component"
      v-model="formModel[col.prop]"
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
    <div v-if="(col.formItem && col.formItem.extra) || attrs.extra" class="c-form-item__extra">
      {{ col.formItem?.extra || attrs.extra }}
    </div>
  </el-form-item>
</template>

<script lang="ts" setup>
  import { useAttrs, computed } from 'vue';
  import FormItemLabel from './FormItemLabel.vue';
  import type { IndexType, IndexOptions, FormItemConfigItem } from '@ideal-schema/ideal-ui-v3';

  interface CFormItemContentProps {
    formModel?: IndexType;
    options?: IndexOptions;
    col?: FormItemConfigItem;
    colLayout?: IndexType;
    // rowLayout?: IndexType;
    formConfig?: IndexType;
  }

  const props = withDefaults(defineProps<CFormItemContentProps>(), {
    formModel: () => ({}),
    options: () => ({}),
    col: () => ({}),
    // rowLayout: () => ({}),
    colLayout: () => ({}),
    formConfig: () => ({ colon: true }),
  });

  const attrs = useAttrs();

  const classList = computed(() => {
    const ret: string[] = [];
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const attrs = props.colLayout ? props.colLayout : {};
    sizes.forEach((size) => {
      if (typeof attrs[size] === 'number') {
        ret.push(`el-col-${size}-${attrs[size]}`);
      } else if (typeof attrs[size] === 'object') {
        const sizeProps = attrs[size] as any;
        Object.keys(sizeProps).forEach((prop) => {
          ret.push(
            prop !== 'span'
              ? `el-col-${size}-${prop}-${sizeProps[prop]}`
              : `el-col-${size}-${sizeProps[prop]}`
          );
        });
      }
    });

    return ret;
  });

  // const myClass = computed(() => {
  //   const rowLayout = props.rowLayout ? props.rowLayout : {};
  //   return [
  //     rowLayout.justify && 'c-justify-content-' + rowLayout.justify,
  //     rowLayout.items && 'c-align-items-' + rowLayout.items,
  //     rowLayout.content && 'c-align-content-' + rowLayout.content,
  //     rowLayout.direction && 'c-flex-direction-' + rowLayout.direction,
  //     rowLayout.wrap && 'c-flex-wrap-' + rowLayout.wrap,
  //   ];
  // });

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
