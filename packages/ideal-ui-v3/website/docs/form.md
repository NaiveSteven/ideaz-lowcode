---
title: Form 表单
tag: Form
---

## Form 表单

> il-form 是将所有的表单进行了一个整合，并且加上了一些响应式的处理

- `formModel` 存放的是所有双向绑定的值
- `formConfig` form 的配置
- `formItemConfig` formItem 的配置
- `layout` 布局配置

### 校验

所有表单的校验放在`formCofig`中`rules`配置中，实行三要素原则，即 `formModel`的数据、`formCofig`中`rules`配置和`formItemCofig`中 `prop` 一致

::: demo

```html
<template>
  <il-form
    ref="cFormRef"
    :form-model="formModel"
    :form-config="formConfig"
    :options="optionsConfig"
    :form-item-config="formItemConfig"
  />
  <el-button @click="submit" type="primary">提交</el-button>
  <el-button @click="reset">重置</el-button>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const cFormRef = ref();
  const formModel = ref({
    activeName: '',
    activeArea: '',
    activeTime: [],
  });

  const optionsConfig = {
    activeArea: [
      { label: '区域1', value: '1' },
      { label: '区域2', value: '2' },
    ],
  };

  const formConfig = {
    labelWidth: '100px',
    size: 'small',
    colon: false,
    rules: {
      activeName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
    },
  };

  const formItemConfig = [
    {
      type: 'input',
      prop: 'activeName',
      formItem: { label: '活动名称', tooltip: '活动名称', extra: '活动名称', colon: true },
      attrs: {
        placeholder: '请输入活动名称',
        clearable: true,
      },
      on: {
        input: () => {
          console.log(123);
        },
      },
    },
    {
      type: 'select',
      prop: 'activeArea',
      formItem: { label: '活动区域' },
      attrs: {
        placeholder: '请输入活动区域',
        clearable: true,
      },
    },
    {
      type: 'datepicker',
      prop: 'activeTime',
      formItem: { label: '活动时间' },
      attrs: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        format: 'MM-dd',
        valueFormat: 'MM-dd',
        clearable: true,
      },
    },
  ];

  const reset = () => {
    cFormRef.value.resetFields();
  };

  const submit = () => {
    cFormRef.value.validate((valid: boolean) => {
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  };
</script>
```

:::

### 支持 slot

当需要在表单中用到自定义组件时，可以在`formItemConfig`设置`slot`

- `slot` 自定义组件的插槽
- `frontSlot` formItem 组件 label 的插槽
- `rearSlot` formItem 组件错误消息的插槽

:::demo

```html
<template>
  <il-form
    ref="cFormRef"
    :form-model="formModel"
    :form-config="formConfig"
    :options="optionsConfig"
    :form-item-config="formItemConfig"
    :layout="layout"
  >
    <div slot="error" class="el-form-item__error">hhh</div>
    <span slot="nihao">11</span>
    <template #button>
      <el-form-item label="">
        <el-button style="width: 100%;" type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </template>
  </il-form>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  const cFormRef = ref();
  const formModel = ref({
    activeName: '',
    activeArea: '',
    activeInput: '',
  });

  const layout = {
    colLayout: {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
    },
  };

  const optionsConfig = {
    activeArea: [
      { label: '区域1', value: '1' },
      { label: '区域2', value: '2' },
    ],
  };

  const formConfig = {
    labelWidth: '80px',
    size: 'small',
    rules: {
      activeName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
    },
  };

  const formItemConfig = [
    {
      type: 'input',
      prop: 'activeName',
      formItem: { label: '活动名称' },
      rearSlot: 'error',
      frontSlot: 'nihao',
      attrs: {
        placeholder: '请输入活动名称',
        clearable: true,
      },
    },
    {
      type: 'select',
      prop: 'activeArea',
      formItem: { label: '活动区域' },
      attrs: {
        placeholder: '请输入活动区域',
        clearable: true,
      },
    },
    {
      type: 'input',
      prop: 'activeInput',
      formItem: { label: '输入框' },
      attrs: {
        placeholder: '请输入',
        clearable: true,
      },
    },
    {
      slot: 'button',
    },
  ];

  const submit = () => {
    cFormRef.value.validate((valid: boolean) => {
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  };
</script>
```

:::

### 布局

表单需要布局时，可以设置`layout`中的`rowLayout、colLayout`两个属性对象，支持 `flex` 和栅格布局充分利用 `flex` 和栅格布局可以实现任何你想要的布局

:::demo

```html
<template>
  <il-form
    ref="cFormRef"
    :form-model="formModel"
    :form-config="formConfig"
    :options="optionsConfig"
    :form-item-config="formItemConfig"
    :layout="layout"
  >
    <template #button>
      <el-form-item label="">
        <el-button style="width: 100%;" type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </template>
  </il-form>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  const cFormRef = ref();
  const formModel = ref({
    activeName: '',
    activeArea: '',
    activeInput: '',
  });

  const layout = {
    rowLayout: {
      type: 'flex',
      justify: 'center',
    },
    colLayout: {
      xs: 24,
      sm: 24,
      md: 16,
      lg: 16,
      xl: 16,
    },
  };

  const optionsConfig = {
    activeArea: [
      { label: '区域1', value: '1' },
      { label: '区域2', value: '2' },
    ],
  };

  const formConfig = {
    labelWidth: '80px',
    size: 'small',
    rules: {
      activeName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
    },
  };

  const formItemConfig = [
    {
      type: 'input',
      prop: 'activeName',
      formItem: { label: '活动名称' },
      attrs: {
        placeholder: '请输入活动名称',
        clearable: true,
      },
    },
    {
      type: 'select',
      prop: 'activeArea',
      formItem: { label: '活动区域' },
      attrs: {
        placeholder: '请输入活动区域',
        clearable: true,
      },
    },
    {
      type: 'input',
      prop: 'activeInput',
      formItem: { label: '输入框' },
      attrs: {
        placeholder: '请输入',
        clearable: true,
      },
    },
    {
      slot: 'button',
    },
  ];

  const submit = () => {
    cFormRef.value.validate((valid: boolean) => {
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  };
</script>
```

:::

单个定制化的布局可以使用传入`colGrid`对象，需要注意的是：`colGird`对象中没有传的属性，在`colLayout`中有，也会生效（优先采用`colGrid`中的属性）

::: demo

```html
<template>
  <il-form
    ref="cFormRef"
    :form-model="formModel"
    :form-config="formConfig"
    :options="optionsConfig"
    :layout="layout"
    :form-item-config="formItemConfig"
  >
    <template #button>
      <el-form-item label="">
        <el-button style="width: 100%;" type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </template>
  </il-form>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  const cFormRef = ref();
  const formModel = ref({
    activeName: '',
    activeArea: '',
    activeInput: '',
  });

  const layout = {
    colLayout: {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
    },
  };

  const optionsConfig = {
    activeArea: [
      { label: '区域1', value: '1' },
      { label: '区域2', value: '2' },
    ],
  };

  const formConfig = {
    labelWidth: '80px',
    size: 'small',
    rules: {
      activeName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
    },
  };

  const formItemConfig = [
    {
      type: 'input',
      prop: 'activeName',
      formItem: { label: '活动名称' },
      colGrid: { lg: 12 },
      attrs: {
        placeholder: '请输入活动名称',
        clearable: true,
      },
    },
    {
      type: 'select',
      prop: 'activeArea',
      formItem: { label: '活动区域' },
      colGrid: { lg: 12 },
      attrs: {
        placeholder: '请输入活动区域',
        clearable: true,
      },
    },
    {
      type: 'input',
      prop: 'activeInput',
      formItem: { label: '输入框' },
      colGrid: { lg: 12 },
      attrs: {
        placeholder: '请输入',
        clearable: true,
      },
    },
    {
      colGrid: { lg: 24 },
      slot: 'button',
    },
  ];

  const submit = () => {
    cFormRef.value.validate((valid: boolean) => {
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  };
</script>
```

:::

:::demo

```html
<template>
  <il-form
    ref="cFormRef"
    :form-model="formModel"
    :form-config="formConfig"
    :options="optionsConfig"
    :form-item-config="formItemConfig"
    :layout="layout"
  >
    <template #button>
      <el-form-item label="">
        <el-button style="width: 100%;" type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </template>
  </il-form>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  const cFormRef = ref();
  const formModel = ref({
    activeName: '',
    activeArea: '',
    activeInput: '',
  });

  const layout = {
    colLayout: {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
    },
  };

  const optionsConfig = {
    activeArea: [
      { label: '区域1', value: '1' },
      { label: '区域2', value: '2' },
    ],
  };

  const formConfig = {
    labelWidth: '80px',
    size: 'small',
    rules: {
      activeName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
    },
  };

  const formItemConfig = [
    {
      type: 'input',
      prop: 'activeName',
      formItem: { label: '活动名称' },
      colGrid: {
        lg: 18,
        xl: 18,
        offset: 3,
      },
      attrs: {
        placeholder: '请输入活动名称',
        clearable: true,
      },
    },
    {
      type: 'select',
      prop: 'activeArea',
      formItem: { label: '活动区域' },
      colGrid: {
        lg: 18,
        xl: 18,
        offset: 3,
      },
      attrs: {
        placeholder: '请输入活动区域',
        clearable: true,
      },
    },
    {
      type: 'input',
      prop: 'activeInput',
      formItem: { label: '输入框' },
      colGrid: {
        lg: 9,
        xl: 9,
        offset: 3,
      },
      attrs: {
        placeholder: '请输入',
        clearable: true,
      },
    },
    {
      colGrid: {
        lg: 9,
        xl: 9,
      },
      slot: 'button',
    },
  ];

  const submit = () => {
    cFormRef.value.validate((valid: boolean) => {
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  };
</script>
```

:::

### 全部的表单的 demo

我们支持的所有类型的 demo 试试看选择选择器，多选框会显示/隐藏

- `hide` 使用 `v-if` 实现显示/隐藏
- `hideUseVShow` 使用 `v-show` 实现显示/隐藏
- `type`支持分为以下几种：
  1. 组件库二次封装组件（`select`，`radio`，`checkbox`），`type`直接传入`select | radio | checkbox`
  2. 组件库未二次封装，**但为开发者使用方便，便于记忆及历史遗留问题等**（`datepicker`，`input`，`switch`），`type`直接传入`datepicker | input | switch`
  3. **如果打算使用`Rate`、`Slider`等`vue-bms-ui-v3`组件库未二次封装的组件，`type`请直接传入`el-rate`、`el-slider`等，组件库会使用`element-plus`内的组件**
  4. **如果打算使用项目内部全局注册组件，`type`直接传入组件名即可** ::: warning 如果`type`无法满足您的需求，请使用`slot` :::

:::demo

```html
<template>
  <il-form
    ref="cFormRef"
    :form-model="formModel"
    :form-config="formConfig"
    :options="optionsConfig"
    :form-item-config="formItemConfig"
    :layout="layout"
  >
    <template #button>
      <el-form-item label="">
        <el-button style="width: 100%;" type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </template>
  </il-form>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  const cFormRef = ref();
  const formModel = ref({
    input: '',
    select: '1',
    radio: '1',
    datepicker: '',
    checkbox: [],
    cascader: '',
  });

  const layout = {
    rowLayout: {
      type: 'flex',
      justify: 'center',
    },
    colLayout: {
      xs: 24,
      sm: 24,
      md: 16,
      lg: 16,
      xl: 16,
    },
  };

  const optionsConfig = {
    select: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' },
    ],
    radio: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
    ],
    checkbox: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
    ],
  };

  const formConfig = {
    labelWidth: '80px',
    size: 'small',
    rules: {
      activeName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
    },
  };

  const formItemConfig = [
    {
      type: 'input',
      prop: 'input',
      formItem: { label: '输入框' },
      hide: () => formModel.value.select === '2',
      attrs: {
        placeholder: '请输入',
      },
    },
    {
      type: 'select',
      prop: 'select',
      formItem: { label: '选择器' },
      attrs: {
        placeholder: '请选择',
        clearable: true,
      },
    },
    {
      type: 'radio',
      prop: 'radio',
      formItem: { label: '单选' },
    },
    {
      type: 'checkbox',
      prop: 'checkbox',
      formItem: { label: '多选' },
    },
    {
      type: 'el-date-picker',
      prop: 'datepicker',
      formItem: { label: '时间' },
      hideUseVShow: () => formModel.value.select === '3',
      attrs: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        // format: 'yyyy-MM-dd',
        // valueFormat: 'yyyy-MM-dd',
        clearable: true,
      },
    },
    {
      type: 'el-cascader',
      prop: 'cascader',
      formItem: { label: '级联选择器' },
      attrs: {
        placeholder: '请选择',
        options: [
          {
            value: 'basic',
            label: 'Basic',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
    },
    {
      slot: 'button',
    },
  ];

  const submit = () => {
    cFormRef.value.validate((valid: boolean) => {
      if (valid) {
        console.log(formModel.value, 'formModel value');
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  };
</script>
```

:::

### 属性

| 参数             | 说明                                           | 类型   | 可选值 | 默认值 |
| ---------------- | ---------------------------------------------- | ------ | ------ | ------ |
| layout           | 表单样式                                       | object | —      | —      |
| form-model       | 表单数据对象                                   | object | —      | —      |
| form-config      | 需要传给 el-from 的参数                        | object | —      | —      |
| options          | 需要遍历的数据对象（给下拉框，单选多选框使用） | object | —      | —      |
| form-item-config | 表单类型                                       | object | —      | —      |

### layout

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| rowLayout | 列的样式 | object | — | {gutter: 0,interval: 0,justify: 'start',direction: 'row'} |
| colLayout | 响应式布局 | object | — | {xs: 24,sm: 12,md: 12,lg: 12,xl: 12} |

### form-item-config

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 表单类型 | string | 1. select, radio, checkbox,<br>2. input, datepicker, switch,<br>3. 其余 element-plus 组件<br>4. **项目内部全局注册组件** | 必传 |
| prop | 表单的 key | string | — | — |
| formItem | 表单左侧的文案 | object | — | — |
| attrs | 传给该表单的值，参考 element-plus | object | — | — |
| on | 绑定的事件，参考 element-plus | object | — | — |
| rearSlot | 报错的插槽名 | string | — | — |
| frontSlot | 左侧文案的插槽名 | string | — | — |
| slot | 整个替换的插槽名 | string | — | — |
| colGrid | 当前项的栅格布局 | object | — | — |
| hide | 为 true 时隐藏该项（可以传一个方法） | boolean | — | — |
| hideUseVShow | 为 true 时隐藏该项（可以传一个方法） | boolean | — | — |

### 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- | --- |
| validate | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object)) |
| validateField | 对部分表单字段进行校验的方法 | Function(props: array | string, callback: Function(errorMessage: string)) |
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | — |
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果 | Function(props: array | string) |

### 事件

| 方法名   | 说明                   | 参数                                          |
| -------- | ---------------------- | --------------------------------------------- |
| validate | 任一表单项被校验后触发 | Function(callback: Function(boolean, object)) |
