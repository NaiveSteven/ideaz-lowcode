import { parseElementSchema } from '@ideal-schema/playground-parser'
import { useMockTableData } from '../use-page-code/useMockTableData'
import { useCrudLogicCode } from '../use-page-code/useCrudLogicCode'
import { useCrudRenderCode } from './useCrudRenderCode'

function commonApi() {}

export function useCrudPageCode() {
  const { getCrudRenderCode } = useCrudRenderCode()

  const { config, columns } = parseElementSchema('code', 'crud')
  const { getTableData } = useMockTableData()

  return {
    code: `
      import { reactive, ref, defineComponent } from 'vue';

      export default defineComponent({
        name: 'MyComponent',
        setup() {
          ${config.request
            ? `const config = reactive(${JSON.stringify({ loading: false, ...config, columns, searchApi: getTableData, deleteApi: commonApi, submitApi: commonApi })});`
            : `
            const config = reactive(${JSON.stringify({ loading: false, ...config, columns })});
            const tableData = ${JSON.stringify(getTableData())};
            `
          }

          ${useCrudLogicCode()}
          return () => {
            return ${getCrudRenderCode(config.columns, config)}
          }
        }
      })`,
    getCrudRenderCode,
  }
}
