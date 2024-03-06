import { getSchemaData } from '@ideal-schema/playground-demi'
import { useFormRenderCode } from './useFormRenderCode'

export function useFormPageCode() {
  const { columns, options, formData, formConfig } = getSchemaData()
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
