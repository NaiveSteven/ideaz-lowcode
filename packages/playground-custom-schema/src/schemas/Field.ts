export const fieldTemplateSchema = (
  opts: { defaultType: string; defaultAttrs?: IndexType; required?: boolean } = {
    defaultType: 'input',
    defaultAttrs: {},
    required: true,
  }
) => {
  const arr: FormItemConfigItem[] = [
    {
      type: 'input',
      prop: 'prop',
      formItem: { label: '字段名' },
      attrs: {
        placeholder: '请输入字段名',
      },
    },
    {
      type: opts.defaultType,
      prop: 'default',
      formItem: { label: '默认值' },
      attrs: {
        placeholder: '请输入默认值',
        ...opts.defaultAttrs,
      },
    },
  ];
  if (opts.required) {
    return arr.concat([
      {
        type: 'el-switch',
        prop: 'required',
        formItem: { label: '必填' },
      },
    ]);
  }
  return arr;
};
