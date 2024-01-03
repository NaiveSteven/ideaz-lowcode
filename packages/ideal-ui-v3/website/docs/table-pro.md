---
title: TablePro 表单表格
tag: Data
---

## TablePro 表单表格

> 在 c-form 和 c-table-plus 基础上再度封装，配置更简单的同时，达到统一化、规范化

**注意事项：**

- 内置`el-card`，内置重置、查询按钮，两个按钮固定在最后一个栅格末尾
- 筛选表单`layout`固定为`{ xs: 24, sm: 12, md: 12, lg: 8, xl: 8 }`
- 表单`formConfig`默认为`{ labelWidth: 90px, labelPosition: 'right', size: 'small' }`
- 具体详细配置可参照`c-table`和`c-form`组件文档

### 常规使用

> 只需在`tableCols`中配置`formItemProps`，即可达到`c-table-plus`和`c-form`两个组件的效果

> 所有配置只需写在`config`中即可

- `@reset`重置的事件
- `@search`查询的事件
- `@refresh`翻页的事件，参数`{ page, page_size }`
- `pagination`不传则默认没有分页
- `formItemProps`用法和`c-form`组件中`formItemConfig`用法一样，但此处的`prop`和`label`非必填，默认取表格项的`prop`和`label`

::: demo

```html
<template>
  <il-table-pro
    :config="config"
    @reset="getData"
    @search="getData"
    @refresh="handlePaginationChange"
  />
</template>
<script lang="ts" setup>
  const config = reactive({
    loading: false,
    data: [],
    formModel: {
      name: '',
      address: '',
      date: [],
    },
    pagination: {
      page: 1,
      page_size: 20,
      total: 0,
    },
    formOptions: {
      address: [
        {
          label: '南京',
          value: 1,
        },
        {
          label: '无锡',
          value: 2,
        },
      ],
    },
    tableCols: [
      {
        prop: 'name',
        label: '姓名',
        formItemProps: {
          type: 'input',
          prop: 'name',
          formItem: { label: '通知单名称' },
          attrs: {
            clearable: true,
            placeholder: '请输入姓名',
          },
        },
      },
      {
        prop: 'address',
        label: '地址',
        formItemProps: {
          type: 'select',
          attrs: {
            clearable: true,
            placeholder: '请输入地址',
          },
        },
      },
      {
        prop: 'date',
        label: '日期',
        // formItemProps: {
        //   type: 'datepicker',
        //   attrs: {
        //     clearable: true,
        //     placeholder: '请输入日期',
        //   },
        // },
      },
    ],
  });

  const getData = () => {
    config.loading = true;
    setTimeout(() => {
      config.data = [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          select: '1',
          username: 'username1',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          select: '2',
          username: 'username2',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          select: '3',
          username: 'username3',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          select: '4',
          username: 'username4',
        },
      ];
      config.loading = false;
    }, 1000);
  };
  const handlePaginationChange = (val: { page: number; page_size: number }) => {
    config.pagination.page = val.page;
    config.pagination.page_size = val.page_size;
    getData();
  };
  getData();
</script>
```

:::

### 支持 slot

> 不仅支持所有 element 自带的插槽（表格项插槽、表格头插槽），还支持按钮插槽、表单筛选项插槽

- `topLeft`表格顶部左侧插槽
- `topRight`表格顶部右侧插槽
- `formItemProps`配置`slot`，即可实现筛选表单项自定义
- 表格项配置`slot`，即可实现表格项自定义
- 表格项配置`headerSlot`，即可实现自定义表格头内容

::: demo

```html
<template>
  <il-table-pro ref="cTablePro" :config="config" @reset="getData" @search="getData">
    <template #topLeft>
      <el-button type="primary" size="small">新增</el-button>
    </template>
    <template #topRight>
      <el-button type="primary" size="small">右侧插槽</el-button>
    </template>
    <template #tableColTest="{ row }">
      <span>{{ row.name + row.address }}</span>
    </template>
    <template #formTest>
      <el-form-item label="插槽" prop="slot">
        <el-input
          v-model="config.formModel.slot"
          style="width: 100%"
          placeholder="请输入内容"
          clearable
        />
      </el-form-item>
    </template>
  </il-table-pro>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';

  const config = reactive({
    loading: false,
    data: [],
    formModel: {
      name: '',
      slot: '',
      date: [],
    },
    tableCols: [
      {
        prop: 'name',
        label: '姓名',
        formItemProps: {
          type: 'input',
          prop: 'name',
          formItem: { label: '通知单名称' },
          attrs: {
            clearable: true,
            placeholder: '请输入姓名',
          },
        },
      },
      {
        prop: 'address',
        label: '地址',
      },
      {
        prop: 'date',
        label: '日期',
        formItemProps: {
          type: 'datepicker',
          attrs: {
            clearable: true,
            placeholder: '请输入日期',
          },
        },
      },
      {
        label: '插槽',
        slot: 'tableColTest',
        formItemProps: {
          slot: 'formTest',
        },
      },
    ],
  });

  const getData = () => {
    config.loading = true;
    setTimeout(() => {
      config.data = [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          select: '1',
          username: 'username1',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          select: '2',
          username: 'username2',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          select: '3',
          username: 'username3',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          select: '4',
          username: 'username4',
        },
      ];
      config.loading = false;
    }, 1000);
  };

  getData();
</script>
```

:::

### type 使用

> 所有 element 自带的 type 都支持，（用法和 c-table 一模一样）

- 表格项配置`type: 'expand', slot: 'expand'`时，即可实现展开行功能
- 表格项配置`type: 'index'`，即可实现索引列
- 表格项配置`type: 'selection'`，即可实现多选
- 不光有以上三种`element-plus`自带的`type`，还有`button`、`input`、`switch`、`select`、`datepicker`、`txt`，具体使用可参考`c-form`组件文档

::: demo

```html
<template>
  <il-table-pro ref="tablePlus" :config="config">
    <template #expand="{ row }">
      <span>用户名: {{ row.username }}</span>
    </template>
  </il-table-pro>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';

  const config = reactive({
    loading: false,
    data: [],
    rowKey: setRowKey,
    tableCols: [
      {
        type: 'expand',
        slot: 'expand',
      },
      {
        type: 'selection',
        reserveSelection: true,
      },
      {
        type: 'index',
        label: '索引',
      },
      {
        prop: 'name',
        label: '姓名',
      },
      {
        prop: 'address',
        label: '地址',
      },
      {
        prop: 'date',
        label: '日期',
      },
      {
        type: 'button',
        label: '操作1',
        btnList: [
          {
            label: '按钮1',
            type: 'primary',
            size: 'small',
            isDisabled: (row: RowData) => Number(row.select) === 1,
          },
        ],
      },
      {
        type: 'button',
        label: '操作2',
        btnList: [
          {
            label: '按钮3',
            type: 'primary',
            size: 'small',
            click: (row: RowData, index: number) => console.log(row, index),
          },
          {
            hide: () => true,
            label: '按钮4',
            type: 'default',
            size: 'small',
          },
        ],
      },
    ],
  });

  const getData = () => {
    config.loading = true;
    setTimeout(() => {
      config.data = [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          select: '1',
          username: 'username1',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          select: '2',
          username: 'username2',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          select: '3',
          username: 'username3',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          select: '4',
          username: 'username4',
        },
      ];
      config.loading = false;
    }, 1000);
  };

  function setRowKey(row: RowData) {
    return row.select;
  }

  getData();
</script>
```

:::

### 带有操作的表格

如果我们想要将该列配置为按钮，则只需给表格项配置传入`type: 'button'`，接着配置`btnList`这个数组即可

- `hide`不传默认为`false`，返回值为`true`或值为`true`时，隐藏该按钮
- `click`按钮点击回调函数，参数为`row, index`
- 如果想修改按钮`type`、`size`等属性，直接放入`btnList`数组中的对象即可

::: demo

```html
<template>
  <il-table-pro ref="tablePlus" :config="config" />
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';

  const config = reactive({
    loading: false,
    data: [],
    tableCols: [
      {
        prop: 'name',
        label: '姓名',
      },
      {
        prop: 'address',
        label: '地址',
      },
      {
        prop: 'date',
        label: '日期',
      },
      {
        type: 'button',
        label: '操作1',
        btnList: [
          {
            label: '按钮1',
            type: 'primary',
            size: 'small',
          },
          {
            label: '按钮2',
            type: 'default',
            size: 'small',
          },
        ],
      },
      {
        type: 'button',
        label: '操作2',
        btnList: [
          {
            label: '按钮3',
            type: 'primary',
            size: 'small',
            click: (row: RowData, index: number) => console.log(row, index),
          },
          {
            hide: () => true,
            label: '按钮4',
            type: 'default',
            size: 'small',
          },
        ],
      },
    ],
  });

  const getData = () => {
    config.loading = true;
    setTimeout(() => {
      config.data = [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          select: '1',
          username: 'username1',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          select: '2',
          username: 'username2',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          select: '3',
          username: 'username3',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          select: '4',
          username: 'username4',
        },
      ];
      config.loading = false;
    }, 1000);
  };

  getData();
</script>
```

:::

### 方法调用

> 只需给`il-table-pro`组件添加`ref`，即可参照`element-plus`官方文档`Api`调用`el-form`和`el-table`组件方法

- `Event`直接绑定在`il-table-pro`组件上即可

::: demo

```html
<template>
  <il-table-pro
    ref="cTableProRef"
    :config="config"
    @reset="getData"
    @search="handleSearch"
    @validate="handleFormValidate"
    @selection-change="handleSelectionChange"
  >
    <template #topRight>
      <el-button type="primary" size="small" @click="handleClear">清空选中</el-button>
    </template>
  </il-table-pro>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';

  const cTableProRef = ref();
  const selectedTableData = ref([]);
  const config = reactive({
    loading: false,
    rowKey: setRowKey,
    pagination: {
      page_size: 100,
      page: 1,
      total: 4,
      layout: 'total, sizes, prev, pager, next, jumper',
    },
    data: [],
    formOptions: {
      select: [
        {
          label: '选择1',
          value: '1',
        },
        {
          label: '选择2',
          value: '2',
        },
      ],
    },
    formModel: {
      name: '',
      date: [],
      username: '',
      select: '',
    },
    formConfig: {
      labelWidth: '60px',
      size: 'small',
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      },
    },
    tableCols: [
      {
        type: 'selection',
        reserveSelection: true,
      },
      {
        prop: 'name',
        label: '姓名',
        formItemProps: {
          type: 'input',
          prop: 'name',
          formItem: { label: '姓名' },
          attrs: {
            clearable: true,
            placeholder: '请输入姓名',
          },
        },
      },
      {
        prop: 'date',
        label: '日期',
        formItemProps: {
          type: 'el-date-picker',
          attrs: {
            type: 'daterange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            clearable: true,
            placeholder: '请输入日期',
          },
        },
      },
      {
        type: 'select',
        prop: 'select',
        label: '选择框',
        minWidth: '180px',
        isDisabled: setRowDisabled,
        options: [
          {
            label: '选择1',
            value: '1',
          },
          {
            label: '选择2',
            value: '2',
          },
          {
            label: '选择3',
            value: '3',
          },
          {
            label: '选择4',
            value: '4',
          },
        ],
        attrs: {
          clearable: true,
          placeholder: '请选择',
        },
        on: {
          change: (row: RowData) => console.log(row, 'select change tableCol'),
        },
        formItemProps: {
          type: 'select',
          attrs: {
            clearable: true,
            placeholder: '请选择',
          },
          on: {
            change: (value: string) => console.log(value, 'select change formItem'),
          },
        },
      },
      {
        type: 'input',
        prop: 'username',
        label: '输入框',
        minWidth: '180px',
        isDisabled: setRowDisabled,
        attrs: {
          clearable: true,
          placeholder: 'nihaoa',
        },
        on: {
          input: (row: RowData) => console.log(row, 'row tableCol'),
        },
        formItemProps: {
          type: 'input',
          attrs: {
            clearable: true,
            placeholder: 'nihaoa',
          },
          on: {
            input: (value: string) => console.log(value, 'value formItem'),
          },
        },
      },
    ],
  });

  const getData = () => {
    config.loading = true;
    setTimeout(() => {
      config.data = [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          select: '1',
          username: 'username1',
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          select: '2',
          username: 'username2',
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          select: '3',
          username: 'username3',
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          select: '4',
          username: 'username4',
        },
      ];
      config.loading = false;
    }, 1000);
  };

  const handleSearch = () => {
    cTableProRef.value.validate((val) => {
      if (val) {
        console.log(config.formModel, 'pass validate');
      } else {
        console.log('please input');
      }
    });
  };
  const handleFormValidate = (val: string) => {
    console.log(val, 'handleFormValidate');
  };
  const handleSelectionChange = (data: RowData[]) => {
    selectedTableData.value = data;
    console.log(data, 'handleSelectionChange');
  };
  const handleClear = () => {
    cTableProRef.value.clearSelection();
  };

  function setRowKey(row: RowData) {
    return row.id;
  }

  function setRowDisabled(row: RowData) {
    const item = selectedTableData.value.find((item) => Number(item.id) === Number(row.id));
    return !item;
  }

  getData();
</script>
```

:::

### 扩展的 Attributes

:::tip

这里仅展示常用的，其余 attribute 请查阅 c-table-plus 组件文档或 element-plus 文档

:::

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| tableCols | Table-column 的配置 | object | — | — |
| formLayout | 筛选表单布局 | boolean | — | { xs: 24, sm: 12, md: 12, lg: 8, xl: 8 } |
| pagination | 分页配置（不传则不展示分页） | object | — | { page: 1, page_size: 0, total: 0, [propName: string]: any } |
| formConfig | 筛选表单配置 | object | — | { labelWidth: 90px, labelPosition:'right', size: 'small' } |
| formOptions | 筛选表单部分组件（如 select）需要的源数据 | object | — | — |
| formModel | 筛选表单的数据 | object | — | — |
| data | 表格数据 | array | — | — |

### Table 扩展的 Event

| 事件名  | 说明                                           | 参数                |
| :------ | :--------------------------------------------- | :------------------ |
| refresh | pagination 中的 page 或 page_size 改变时会触发 | { page, page_size } |
| reset   | 点击筛选表单重置按钮触发                       | —                   |
| search  | 点击筛选表单查询触发                           | —                   |
