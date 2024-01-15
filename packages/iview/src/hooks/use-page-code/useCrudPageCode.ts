import { getSchemaData } from '@ideal-schema/playground-demi'
import { useMockTableData } from './useMockTableData'
import { useCrudTemplateCode } from './useCrudTemplateCode'

export function useCrudPageCode() {
  const { getCrudTemplateCode } = useCrudTemplateCode()

  const { config } = getSchemaData('code', 'crud')
  const { getTableData } = useMockTableData()

  return {
    code: `
      <template>
        ${getCrudTemplateCode(config.columns)}
      </template>

      <script lang='ts' setup>
        import { reactive, ref } from 'vue';

        const config = reactive(${JSON.stringify(config)});
        const searchFormData = ref(${JSON.stringify(config.searchFormData)});
        const tableData = ${JSON.stringify(getTableData())};

        const getTableData = async () => {
          config.loading = true;
          try {
            const params = {
              ...config.pagination,
              ...searchFormData.value,
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
