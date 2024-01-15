import { getSchemaData } from '@ideal-schema/playground-demi'
import { useFormTemplateCode } from './useFormTemplateCode'

export function useFormPageCode() {
  const { columns, options, formData, formConfig } = getSchemaData()
  const { getTemplateCode } = useFormTemplateCode('page')

  return `
    ${getTemplateCode(columns)}

    <script lang='ts' setup>
      import { ref } from 'vue';

      const columns = ref(${JSON.stringify(columns)})
      const formData = ref(${JSON.stringify(formData)})
      const formConfig = ${JSON.stringify(formConfig)}
      const options = ${JSON.stringify(options)}

    </script>`
}
