export function useFormTemplateCode(type: 'page' | 'dialog', version: number) {
  const getFormSlotCode = (formItemConfigs: FormItemConfigItem[]) => {
    let str = ``
    formItemConfigs.forEach((item: FormItemConfigItem) => {
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
        <el-dialog v-model="visible" title="标题" width="620px">`,
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

  const isIncludesSlot = (formItemConfigs: FormItemConfigItem[]) => {
    return formItemConfigs.some((item: FormItemConfigItem) => item.slot)
  }

  const getTemplateCode = (formItemConfigs: FormItemConfigItem[]) => {
    return !isIncludesSlot(formItemConfigs)
      ? `
    ${getTemplateContainerCode()[0]}
      <c-form
        ref="cFormRef"
        :form-model="formModel"
        :form-config="formConfig"
        :options="optionsConfig"
        :form-item-config="formItemConfig"
        :layout="layout"
      />
      ${getTemplateContainerCode()[1]}`
      : `${getTemplateContainerCode()[0]}
    <c-form
      ref="cFormRef"
      :form-model="formModel"
      :form-config="formConfig"
      :options="optionsConfig"
      :form-item-config="formItemConfig"
      :layout="layout"
    >
      ${getFormSlotCode(formItemConfigs)}
    </c-form>
  ${getTemplateContainerCode()[1]}`
  }

  return { getTemplateCode }
}
