export function useFormRenderCode(type: 'page' | 'dialog') {
  const getFormSlotCode = (formItemConfigs: FormItemWidget[]) => {
    const slot: IndexType = {}
    formItemConfigs.forEach((item: FormItemWidget) => {
      if (item.slot)
        slot[item.slot] = `<div>占位代码</div>`
    })
    return slot
  }

  const getContainerCode = () => {
    if (type === 'page')
      return ['', '']

    return [
      `<el-dialog
          v-model={visible.value}
          title="标题"
          width="620px"
          v-slots={{ footer: renderFooter }}
        >`,
      `</el-dialog>`,
    ]
  }

  const isIncludesSlot = (columns: FormItemWidget[]) => {
    return columns.some((item: FormItemWidget) => item.slot)
  }

  const getRenderCode = (columns: FormItemWidget[]) => {
    if (type === 'page') {
      return !isIncludesSlot(columns)
        ? `<z-form
          ref={formRef}
          v-model={formData.value}
          {...formConfig}
          options={options}
          columns={columns.value}
        />`
        : `<z-form
        ref={formRef}
        v-model={formData.value}
        {...formConfig}
        options={options}
        columns={columns.value}
        v-slots={${JSON.stringify(getFormSlotCode(columns))}}
      />`
    }
    return !isIncludesSlot(columns)
      ? `
    ${getContainerCode()[0]}
      <z-form
        ref={formRef}
        v-model={formData.value}
        {...formConfig}
        options={options}
        columns={columns}
      />
      ${getContainerCode()[1]}`
      : `${getContainerCode()[0]}
    <z-form
      ref={formRef}
      v-model={formData.value}
      {...formConfig}
      options={options}
      columns={columns}
      v-slots={${JSON.stringify(getFormSlotCode(columns))}}
    />
  ${getContainerCode()[1]}`
  }

  return { getRenderCode }
}
