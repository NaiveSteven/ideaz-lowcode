---
title: Radio 单选框
tag: Form
---

## Radio 单选框

### 常规使用

- `el-radio-group`的属性和`event`直接绑定在`il-radio`组件上即可

::: demo

```html
<template>
  <il-radio v-model="val" size="large" :options="options" @change="handleChange" />
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const options = [
    {
      label: '单选框A',
      value: 1,
    },
    {
      label: '单选框B',
      value: 2,
    },
    {
      label: '单选框C',
      value: 3,
    },
  ];

  const val = ref(1);

  const handleChange = (value: number) => {
    console.log(value, 'handleChange');
  };
</script>
```

:::

### 特殊使用

- `el-radio`的属性和`event`直接绑定在`options`数组的对象中即可

::: demo

```html
<template>
  <il-radio v-model="val" :options="options" @change="handleChange" />
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const options = [
    {
      label: '单选框A',
      value: 1,
      disabled: true,
      size: 'small',
    },
    {
      label: '单选框B',
      value: 2,
      border: true,
      size: 'default',
    },
    {
      label: '单选框C',
      value: 3,
      size: 'large',
    },
  ];

  const val = ref(1);

  const handleChange = (value: number) => {
    console.log(value, 'handleChange');
  };
</script>
```

:::

- `RadioOptionsItem`接口继承了`Radio`属性和`Radio-button`属性，仅添加了`type`属性用来支持选择`el-radio`或`el-radio-button`
- `type`可选值为`radio | radio-button`

::: demo

```html
<template>
  <il-radio v-model="val" :options="options" @change="handleChange" />
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const options = [
    {
      label: '单选框A',
      value: 1,
      size: 'small',
      type: 'radio-button',
    },
    {
      label: '单选框B',
      value: 2,
      border: true,
      size: 'default',
      type: 'radio-button',
    },
    {
      label: '单选框C',
      value: 3,
      size: 'large',
      type: 'radio-button',
    },
  ];

  const val = ref(1);

  const handleChange = (value: number) => {
    console.log(value, 'handleChange');
  };
</script>
```

:::

### Radio 属性

> 直接绑定在`options`数组对象中

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | string / number / boolean | — | — |
| label | Radio 的 value | string / number / boolean | — | — |
| disabled | 是否禁用 | boolean | — | false |
| border | 是否显示边框 | boolean | — | false |
| size | Radio 的尺寸 | string | large / default /small | — |
| name | 原生 name 属性 | string | — | — |

### Radio-button 属性

> 直接绑定在`options`数组对象中

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | string / number / boolean | — | — |
| label | Radio 的 value | string / number / boolean | — | — |
| disabled | 是否禁用 | boolean | — | false |
| border | 是否显示边框 | boolean | — | false |
| size | Radio 的尺寸 | string | large / default /small | — |
| name | 原生 name 属性 | string | — | — |

### Radio-group 属性(直接绑定在`il-radio`组件上)

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | string / number / boolean | — | — |
| size | 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效 | string | medium / small / mini | — |
| disabled | 是否禁用 | boolean | — | false |
| text-color | 按钮形式的 Radio 激活时的文本颜色 | string | — | #ffffff |
| fill | 按钮形式的 Radio 激活时的填充色和边框色 | string | — | #409EFF |

### Radio-group 事件(直接绑定在`il-radio`组件上)

| 事件名称 | 说明                   | 回调参数              |
| -------- | ---------------------- | --------------------- |
| change   | 绑定值变化时触发的事件 | 选中的 Radio label 值 |
