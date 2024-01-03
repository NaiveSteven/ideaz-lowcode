import { useReduceJsonSchema } from '@ideal-schema/playground-demi';
import { useFormTemplateCode } from './useFormTemplateCode';

export const useFormPageCode = (version: number) => {
  const { formItemConfigs, formModel, formConfig, optionsConfig, layout } = useReduceJsonSchema();
  const { getTemplateCode } = useFormTemplateCode('page', version);

  if (version === 3) {
    return `
    ${getTemplateCode(formItemConfigs)}

    <script lang='ts' setup>
      import { ref } from 'vue';

      const formModel = ref(${JSON.stringify(formModel)})
      const formConfig = ${JSON.stringify(formConfig)}
      const optionsConfig = ${JSON.stringify(optionsConfig)}
      const formItemConfig = ${JSON.stringify(formItemConfigs)}
      const layout = ${JSON.stringify(layout)}

    </script>`;
  }

  return `
  ${getTemplateCode(formItemConfigs)}

  <script>
  export default {
    data() {
      return {
        formModel: ${JSON.stringify(formModel)},
        formConfig: ${JSON.stringify(formConfig)},
        optionsConfig: ${JSON.stringify(optionsConfig)},
        formItemConfig: ${JSON.stringify(formItemConfigs)},
        layout: ${JSON.stringify(layout)},
      }
    }
  }
  </script>`;
};
