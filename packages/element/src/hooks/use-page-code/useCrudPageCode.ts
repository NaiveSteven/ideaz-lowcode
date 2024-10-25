import { parseElementSchema } from '@ideal-schema/playground-parser'
import { useCrudTemplateCode } from './useCrudTemplateCode'
import { useMockTableData } from './useMockTableData'

export function useCrudPageCode() {
  const { getCrudTemplateCode } = useCrudTemplateCode()

  const { config, columns } = parseElementSchema('code', 'crud')
  const { getTableData } = useMockTableData()

  return {
    code: `
      <template>
        ${getCrudTemplateCode(columns)}
      </template>

      <script lang='ts' setup>
        import { reactive, ref } from 'vue';

        const config = reactive(${JSON.stringify({ ...config, columns })});
        const tableData = ${JSON.stringify(getTableData())};

        const getTableData = async () => {
          config.loading = true;
          try {
            const params = {
              ...config.pagination,
              ...config.searchFormData,
            }
            await delay(200);
            config.data = tableData;
          } catch (error) {
            console.log(error, 'getTableData error');
          }
          config.loading = false;
        }

        const handlePaginationChange = (val) => {
          config.pagination.page = val.page;
          config.pagination.pageSize = val.pageSize;
          getTableData();
        }

        const handleSearch = () => {
          config.pagination.page = 1;
          getTableData();
        }

        function delay(time: number) {
          return new Promise(function (resolve) {
            setTimeout(resolve, time);
          });
        }

        getTableData();
      </script>`,
    getCrudTemplateCode,
  }
}
