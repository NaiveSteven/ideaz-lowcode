export function useFormTemplateCode(type: 'page' | 'dialog') {
  const getFormSlotCode = (formItemConfigs: FormItemWidget[]) => {
    let str = ``
    formItemConfigs.forEach((item: FormItemWidget) => {
      if (item.slot) {
        str = str.length
          ? `${str
            }
        `
            + `<template #${item.slot}>
            <div>占位代码</div>
        </template>`
          : `${str
            }<template #${item.slot}>
        <div>占位代码</div>
    </template>`
      }
    })
    return str
  }

  const getTemplateContainerCode = () => {
    if (type === 'page')
      return ['<template>', '</template>']

    return [
      `<template>
        <el-dialog v-model="visible" title="标题" width="720px">`,
      `<template #footer>
            <el-button @click="visible = false" size="default">取 消</el-button>
            <el-button type="primary"  size="default" :loading="isConfirmBtnLoading" @click="handleValidate"
              >确 定</el-button
            >
          </template>
        </el-dialog>
      </template>`,
    ]
  }

  const isIncludesSlot = (columns: FormItemWidget[]) => {
    return columns.some((item: FormItemWidget) => item.slot)
  }

  const getTemplateCode = (columns: FormItemWidget[]) => {
    return !isIncludesSlot(columns)
      ? `
    ${getTemplateContainerCode()[0]}
      <z-form
        ref="formRef"
        v-bind="formConfig"
        v-model="formData"
        :options="options"
        :columns="columns"
      />
      ${getTemplateContainerCode()[1]}`
      : `${getTemplateContainerCode()[0]}
    <z-form
      ref="formRef"
      v-bind="formConfig"
      v-model="formData"
      :options="options"
      :columns="columns"
    >
      ${getFormSlotCode(columns)}
    </z-form>
  ${getTemplateContainerCode()[1]}`
  }

  return { getTemplateCode }
}
