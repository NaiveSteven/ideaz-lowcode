<template>
  <div :class="['el-col', classList]" :style="style">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { computed, inject } from 'vue';

  interface CColProps {
    span?: number;
    tag?: string;
    offset?: number;
    pull?: number;
    push?: number;
    xs?: number | object | string;
    sm?: number | object | string;
    md?: number | object | string;
    lg?: number | object | string;
    xl?: number | object | string;
  }

  const props = withDefaults(defineProps<CColProps>(), {
    span: 24,
    tag: 'div',
  });

  const { gutter, interval } = inject('IlContainer', {
    gutter: { value: 0 },
    interval: { value: 0 },
  });

  const style = computed(() => {
    if (gutter.value) {
      return {
        paddingLeft: gutter.value / 2 + 'px',
        paddingRight: gutter.value / 2 + 'px',
      };
    }
    if (interval.value) {
      return {
        paddingTop: gutter.value / 2 + 'px',
        paddingBottom: gutter.value / 2 + 'px',
      };
    }
    return {};
  });

  const classList = computed(() => {
    const ret: string[] = [];
    const pos = ['span', 'offset', 'pull', 'push'] as const;
    pos.forEach((prop) => {
      const size = props[prop];
      if (typeof size === 'number') {
        if (prop === 'span') ret.push(`el-col-${props[prop]}`);
        else if (size > 0) ret.push(`el-col-${prop}-${props[prop]}`);
      }
    });
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    sizes.forEach((size) => {
      if (typeof props[size] === 'number') {
        ret.push(`el-col-${size}-${props[size]}`);
      } else if (typeof props[size] === 'object') {
        const sizeProps = props[size] as any;
        Object.keys(sizeProps).forEach((prop) => {
          ret.push(
            prop !== 'span'
              ? `el-col-${size}-${prop}-${sizeProps[prop]}`
              : `el-col-${size}-${sizeProps[prop]}`
          );
        });
      }
    });
    // this is for the fix
    if (gutter.value) {
      ret.push('is-guttered');
    }

    return ret;
  });
</script>
