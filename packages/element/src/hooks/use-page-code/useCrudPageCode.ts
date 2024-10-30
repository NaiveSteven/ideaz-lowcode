import { parseElementSchema } from '@ideal-schema/playground-parser'
import { useCrudTemplateCode } from './useCrudTemplateCode'
import { useMockTableData } from './useMockTableData'
import { useCrudLogicCode } from './useCrudLogicCode'

function commonApi() {}

export function useCrudPageCode() {
  const { getCrudTemplateCode } = useCrudTemplateCode()

  const { config, columns } = parseElementSchema('code', 'crud')
  const { getTableData } = useMockTableData()

  return {
    code: `
      <template>
        ${getCrudTemplateCode(columns, config)}
      </template>

      <script lang='ts' setup>
        import { reactive, ref } from 'vue';

        ${config.request
          ? `const config = reactive(${JSON.stringify({ loading: false, ...config, columns, searchApi: getTableData, deleteApi: commonApi, submitApi: commonApi })});`
          : `
          const config = reactive(${JSON.stringify({ loading: false, ...config, columns })});
          const tableData = ${JSON.stringify(getTableData())};
          `
        }

        ${useCrudLogicCode()}
      </script>`,
    getCrudTemplateCode,
  }
}
