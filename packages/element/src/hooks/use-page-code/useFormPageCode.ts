import { getSchemaData } from '@ideal-schema/playground-demi'
import { useFormTemplateCode } from './useFormTemplateCode'

export function useFormPageCode() {
  const { formItemConfigs, formModel, formConfig, optionsConfig, layout } = getSchemaData()
  const { getTemplateCode } = useFormTemplateCode('page')

  return `
    ${getTemplateCode(formItemConfigs)}

    <script lang='ts' setup>
      import { ref } from 'vue';

      const formModel = ref(${JSON.stringify(formModel)})
      const formConfig = ${JSON.stringify(formConfig)}
      const optionsConfig = ${JSON.stringify(optionsConfig)}
      const formItemConfig = ${JSON.stringify(formItemConfigs)}
      const layout = ${JSON.stringify(layout)}

    </script>`
}
