---
title: Checkbox 多选框
tag: Form
---

## Checkbox 多选框

### 常规使用

- `el-checkbox-group`的属性和`event`直接绑定在`il-checkbox`组件上即可

:::demo

```html
<template>
  <il-checkbox v-model="val" size="large" @change="handleChange" :options="options" />
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  const options = [
    {
      label: '复选款A',
      value: 1,
    },
    {
      label: '复选款B',
      value: 2,
    },
    {
      label: '复选框C',
      value: 3,
    },
  ];

  const val = ref([1]);

  const handleChange = (val) => {
    console.log(val, 'handleChange');
  };
</script>
```

:::

### 特殊使用

- `el-checkbox`的属性和`event`直接绑定在`options`数组的对象中即可

:::demo

```html
<template>
  <il-checkbox v-model="val" @change="handleChange" :options="options" />
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  const options = [
    {
      label: '复选款A',
      value: 1,
      disabled: true,
    },
    {
      label: '复选款B',
      value: 2,
      border: true,
    },
    {
      label: '复选框C',
      value: 3,
      size: 'large',
    },
  ];

  const val = ref([1]);

  const handleChange = (val) => {
    console.log(val, 'handleChange');
  };
</script>
```

:::

### Checkbox 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| label | 选中状态的值（只有在**checkbox-group**或者绑定对象类型为**array**时有效） | string / number / boolean | — | — |
| disabled | 是否禁用 | boolean | — | false |

### Checkbox-button 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| label | 选中状态的值（只有在 checkbox-group 或者绑定对象类型为 array 时有效） | string / number / boolean | — | — |
| true-label | 选中时的值 | string / number | — | — |
| false-label | 没有选中时的值 | string / number | — | — |
| disabled | 是否禁用 | boolean | — | false |
| name | 原生 name 属性 | string | — | — |
| checked | 当前是否勾选 | boolean | — | false |

### Checkbox-group 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| value / v-model | 绑定值 | array | — | — |
| size | 多选框组尺寸，仅对**按钮形式的 Checkbox **或**带有边框的 Checkbox** 有效 | string | medium / small / mini | — |
| disabled | 是否禁用 | boolean | — | false |
| min | 可被勾选的 checkbox 的最小数量 | number | — | — |
| max | 可被勾选的 checkbox 的最大数量 | number | — | — |
| text-color | 按钮形式的 Checkbox 激活时的文本颜色 | string | — | #ffffff |
| fill | 按钮形式的 Checkbox 激活时的填充色和边框色 | string | — | #409EFF |

### Checkbox-group 事件

| 事件名称 | 说明                     | 回调参数   |
| -------- | ------------------------ | ---------- |
| change   | 当绑定值变化时触发的事件 | 更新后的值 |
