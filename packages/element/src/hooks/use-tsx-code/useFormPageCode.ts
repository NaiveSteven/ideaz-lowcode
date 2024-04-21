import { parseElementSchema } from '@ideal-schema/playground-parser'
import { useFormRenderCode } from './useFormRenderCode'

export function useFormPageCode() {
  const { columns, options, formData, formConfig } = parseElementSchema()
  const { getRenderCode } = useFormRenderCode('page')

  return `
    import { ref, defineComponent } from 'vue';

    export default defineComponent({
      name: 'MyForm',
      props: {},
      setup() {
        const columns = ref(${JSON.stringify(columns)})
        const formData = ref(${JSON.stringify(formData)})
        const formConfig = ${JSON.stringify(formConfig)}
        const options = ${JSON.stringify(options)}

        return () => {
          return ${getRenderCode(columns)}
        }
      }
    })`
}
