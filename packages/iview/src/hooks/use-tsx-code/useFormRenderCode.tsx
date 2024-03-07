export function useFormRenderCode(type: 'page' | 'dialog') {
  const getFormSlotCode = (formItemConfigs: FormItemConfigItem[]) => {
    const slot: IndexType = {}
    formItemConfigs.forEach((item: FormItemConfigItem) => {
      if (item.slot)
        slot[item.slot] = () => <div>占位代码</div>
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
          v-slots={{
            footer: () => {
              return <>
                <el-button onClick={() => visible.value = false}" size="default">取 消</el-button>
                <el-button type="primary"  size="default" loading={isConfirmBtnLoading.value} onClick={handleValidate}
                  >确 定</el-button
                >
              </>
            }
          }}
        >`,
      `</el-dialog>`,
    ]
  }

  const isIncludesSlot = (columns: FormItemConfigItem[]) => {
    return columns.some((item: FormItemConfigItem) => item.slot)
  }

  const getRenderCode = (columns: FormItemConfigItem[]) => {
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
        columns={columns.value}
      />
      ${getContainerCode()[1]}`
      : `${getContainerCode()[0]}
    <z-form
      ref={formRef}
      v-model={formData.value}
      {...formConfig}
      options={options}
      columns={columns.value}
      v-slots={${JSON.stringify(getFormSlotCode(columns))}}
    />
  ${getContainerCode()[1]}`
  }

  return { getRenderCode }
}
