export const props = {
  layout: {
    // 关于el-row 的拓展
    type: Object,
    default: () => {
      return {
        rowLayout: {
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
  },
  formConfig: {
    type: Object,
    default: () => {},
  },
  formItemConfig: {
    // 表单的格局
    type: Array,
    default: () => [],
  },
  formModel: {
    // 绑定的value值
    type: Object,
    default: () => {},
  },
  options: {
    // 多选值绑定的陪选项目
    type: Object,
    default: () => {},
  },
  textConfig: {
    // 文本配置项
    type: Object,
    default: () => {},
  },
};
