---
title: Table 表格
tag: Data
---

## Table 表格

> 简单易用，脱离繁琐操作。基于 element-plus 原生 Api 扩展

### 常规使用

> 我们可以直接参照`element-plus`文档书写的属性，加在`il-table`组件上，即可实现你想要的功能

- `pagination`不传或`isPagination = false`则不展示分页
- `@refresh`翻页的事件，参数`{ page, page_size }`

::: demo

```html
<template>
  <il-table
    ref="cTableRef"
    :loading="loading"
    :table-cols="tableCols"
    :data="tableData"
    :pagination="pagination"
    @refresh="handlePaginationChange"
  />
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  interface RowData {
    date: string;
    name: string;
    address: string;
    select: string;
    username: string;
  }

  const pagination = ref({ page_size: 20, page: 1, total: 40 });
  const loading = ref(false);
  const tableData = ref<RowData[]>([]);

  const tableCols = [
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
  ];

  const getData = () => {
    loading.value = true;
    setTimeout(() => {
      tableData.value = [
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
      loading.value = false;
    }, 1000);
  };
  const handlePaginationChange = (val: { page: number; page_size: number }) => {
    pagination.value.page = val.page;
    pagination.value.page_size = val.page_size;
    getData();
  };

  getData();
</script>
```

:::

### 带有操作的表格

如果我们想要将该列配置为按钮，则只需给表格项配置传入`type: 'button'`，接着配置`buttons`这个数组即可

- `hide`不传默认为`false`，返回值为`true`或者值为`true`时，隐藏该按钮
- `disabled`不传默认为`false`，返回值为`true`或者值为`true`时，禁用该按钮
- `click`按钮点击回调函数，参数为`row, index`
- 如果想修改按钮`type`、`size`等属性，直接放入`buttons`数组中的对象即可

::: demo

```html
<template>
  <il-table ref="tablePlus" :loading="loading" :table-cols="tableCols" :data="tableData" />
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  interface RowData {
    date: string;
    name: string;
    address: string;
    select: string;
    username: string;
  }

  const loading = ref(false);
  const tableData = ref<RowData[]>([]);

  const tableCols = [
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
          isDisabled: (row: RowData) => Number(row.select) === 1,
        },
        {
          hide: () => true,
          label: '按钮4',
          type: 'default',
          size: 'small',
        },
      ],
    },
  ];

  const getData = () => {
    loading.value = true;
    setTimeout(() => {
      tableData.value = [
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
      loading.value = false;
    }, 1000);
  };

  getData();
</script>
```

:::

### slot 和 type 使用

> 所有 element 自带的插槽和 type 都支持

- 表格项配置`type: 'expand', slot: 'expand'`时，即可实现展开行功能
- 表格项配置`type: 'index'`，即可实现索引列
- 表格项配置`type: 'selection'`，即可实现多选
- 表格项配置`slot`，即可自定义表格列内容
- 表格项配置`headerSlot`，即可实现自定义表格头内容

::: demo

```html
<template>
  <il-table
    ref="cTableRef"
    :loading="loading"
    :table-cols="tableCols"
    :data="tableData"
    :pagination="pagination"
    :row-key="setRowKey"
  >
    <template #expand="{ row, index }">
      <span>用户名: {{ row.username }}</span>
      <span>index: {{ index }}</span>
    </template>
    <template #nihao="{ row, index }">
      <span>{{ row.username + index }}</span>
      <span>index: {{ index }}</span>
    </template>
    <template #nameHeaderSlot="{ index }">
      <span>自定义第二个头部{{ index }}</span>
    </template>
    <template #addressHeaderSlot="{ index }">
      <span>自定义第三个头部{{ index }}</span>
    </template>
    <template #name="{ row }">
      <span>姓名：{{ row.name }}</span>
    </template>
  </il-table>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  interface RowData {
    date: string;
    name: string;
    address: string;
    select: string;
    username: string;
  }

  const pagination = ref({ page_size: 20, page: 1, total: 20 });
  const loading = ref(false);
  const tableData = ref<RowData[]>([]);

  const tableCols = [
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
      slot: 'nihao',
      label: 'nihao',
    },
    {
      label: '姓名',
      headerSlot: 'nameHeaderSlot',
      slot: 'name',
    },
    {
      prop: 'address',
      label: '地址',
      headerSlot: 'addressHeaderSlot',
    },
    {
      prop: 'date',
      label: '日期',
    },
  ];

  const getData = () => {
    loading.value = true;
    setTimeout(() => {
      tableData.value = [
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
      loading.value = false;
    }, 1000);
  };

  const setRowKey = (row: RowData) => {
    return row.select;
  };

  getData();
</script>
```

:::

### 复杂案例

> 给`il-table-plus`组件添加`ref`，即可调用表格组件方法，具体方法请参考`element-plus`文档

- 配置`pagination`，按照`element-plus`文档`el-pagination`组件属性传入即可
- 表格项配置`type`不光有`element-plus`文档中的`expand`、`selection`、`index`，还可以传入`input、datepicker、switch、select、checkbox、radio` ::: warning 如果`type`无法满足您的需求，请使用`slot` :::

::: demo

```html
<template>
  <div>
    <div class="c-flex c-justify-content-flex-end">
      <el-button type="primary" @click="handleClear" size="small">清空选择</el-button>
    </div>
    <il-table
      ref="cTableRef"
      :data="tableData"
      :pagination="pagination"
      :loading="loading"
      :table-cols="tableCols"
      :row-key="setRowKey"
      @selection-change="handleSelectionChange"
      @refresh="handlePaginationChange"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  interface RowData {
    id: number;
    date: string;
    name: string;
    address: string;
    select: string;
    username: string;
  }

  const cTableRef = ref();
  const pagination = ref({
    page_size: 100,
    page: 1,
    total: 4,
    layout: 'total, sizes, prev, pager, next, jumper',
  });
  const loading = ref(false);
  const tableData = ref<RowData[]>([]);
  const selectedTableData = ref<RowData[]>([]);

  const tableCols = [
    {
      type: 'selection',
      reserveSelection: true,
    },
    {
      prop: 'name',
      label: '姓名',
      formatter: (row: RowData, column, cellValue: string, index: number) => {
        return cellValue + 'n11' + index;
      },
      width: '100px',
    },
    {
      prop: 'date',
      label: '日期',
      width: '100px',
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
        change: (row: RowData) => console.log(row, 'select change'),
      },
    },
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      minWidth: '180px',
      isDisabled: setRowDisabled,
      attrs: {
        clearable: true,
        placeholder: 'nihaoa',
      },
      on: {
        input: (row: RowData) => console.log(row, 'row'),
      },
    },
  ];

  const getData = () => {
    loading.value = true;
    setTimeout(() => {
      tableData.value = [
        {
          id: pagination.value.page,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          select: '1',
          username: 'username1',
        },
        {
          id: pagination.value.page + 10,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          select: '2',
          username: 'username2',
        },
        {
          id: pagination.value.page + 20,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          select: '3',
          username: 'username3',
        },
        {
          id: pagination.value.page + 30,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          select: '4',
          username: 'username4',
        },
      ];
      loading.value = false;
    }, 1000);
  };
  const setRowKey = (row: RowData) => {
    return row.id;
  };
  const handleSelectionChange = (selection: RowData[]) => {
    selectedTableData.value = selection;
  };
  const handlePaginationChange = (val: { page: number; page_size: number }) => {
    pagination.value.page = val.page;
    pagination.value.page_size = val.page_size;
    getData();
  };
  const handleClear = () => {
    cTableRef.value.clearSelection();
  };
  function setRowDisabled(row: RowData) {
    const item = selectedTableData.value.find((item) => Number(item.id) === Number(row.id));
    return !item;
  }
  getData();
</script>
```

:::

### Table 上扩展的 Attributes

:::tip

有些 Attributes 已经设置了默认配置

:::

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| tableCols | Table-column 的配置 | object | — | — |
| isPagination | 是否展示分页 | boolean | — | true |
| pagination | 分页配置 | object | — | { page: 1, page_size: 0, total: 0, [propName: string]: any } |
| size | Table 的尺寸 | string | mini / small / medium | mini |
| border | 是否带有纵向边框 | boolean | — | true |
| tableStatistics | 表格顶部数据统计 | array | — | — |
| statisticsCustomClass | 表格顶部数据统计自定义类名 | string | — | — |

### Table 扩展的 Event

| 事件名  | 说明                                           | 参数                |
| :------ | :--------------------------------------------- | :------------------ |
| refresh | pagination 中的 page 或 page_size 改变时会触发 | { page, page_size } |

### Table-column 上扩展的 Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| type | 对应列的类型 | string | selection/index/expand/button/input/switch/select/datepicker/radio/checkbox | - |
| headerSlot | 自定义表头的内容. 参数为 { column, index } | string | — | — |
| slot | 自定义列的内容，参数为 { row, index } | string | — | — |
| buttons | type 为 button 时，必传。可包含的属性包括 el-button 可传属性以及 click 方法、hide 是否展示方法 | array | — | — |
| attrs | type 为 input/switch/select/datepicker/radio/checkbox 可传，这几个组件的 attribute，可传参数详情可查看 element 文档 | object | 可传参数详情可查看 element 文档 | — |
| on | type 为 input/switch/select/datepicker/radio/checkbox 可传，这几个组件的 event，可传参数详情可查看 element 文档 | object | 可传参数详情可查看 element 文档 | — |
| options | select 等组件需要的数据 | array | — | — |
| disabled | 是否禁用 | function(row) / boolean | — | true |
