<template>
  <div :class="myClass" :style="style">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { computed, provide } from 'vue';

  interface CContainerProps {
    tag?: string;
    gutter?: number;
    interval?: number;
    type?: string;
    justify?: string;
    items?: string;
    content?: string;
    direction?: string;
    wrap?: string;
    width?: string;
    height?: string;
  }

  const props = withDefaults(defineProps<CContainerProps>(), {
    tag: 'div',
    gutter: 0,
    interval: 0,
    type: 'normal',
    justify: 'normal',
    items: 'normal',
    content: 'normal',
    direction: 'row',
    wrap: 'wrap',
    width: 'auto',
    height: 'auto',
  });

  const gutter = computed(() => props.gutter);
  const interval = computed(() => props.interval);
  provide('IlContainer', {
    gutter,
    interval,
  });

  const style = computed(() => {
    const ret = {} as { marginLeft: string; marginRight: string };
    if (props.gutter) {
      ret.marginLeft = `-${props.gutter / 2}px`;
      ret.marginRight = ret.marginLeft;
    }
    return {
      ...ret,
      width: props.width,
      height: props.height,
    };
  });

  const myClass = computed(() => {
    return [
      'el-row',
      'c-justify-content-' + props.justify,
      'c-align-items-' + props.items,
      'c-align-content-' + props.content,
      'c-flex-direction-' + props.direction,
      'c-flex-wrap-' + props.wrap,
      { 'el-row--flex': props.type === 'flex' },
    ];
  });
</script>
