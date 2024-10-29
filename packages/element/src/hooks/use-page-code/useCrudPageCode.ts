import { parseElementSchema } from '@ideal-schema/playground-parser'
import { useCrudTemplateCode } from './useCrudTemplateCode'
import { useMockTableData } from './useMockTableData'
import { useCrudLogicCode } from './useCrudLogicCode'

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

        ${useCrudLogicCode()}
      </script>`,
    getCrudTemplateCode,
  }
}
