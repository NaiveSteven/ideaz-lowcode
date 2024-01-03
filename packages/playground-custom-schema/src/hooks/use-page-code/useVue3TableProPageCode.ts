import { useReduceJsonSchema } from '@ideal-schema/playground-demi';
import { useMockTableData } from './useMockTableData';
import { useTableProTemplateCode } from './useTableProTemplateCode';

export const useVue3TableProCode = () => {
  const { getTableProTemplateCode } = useTableProTemplateCode();

  const { config } = useReduceJsonSchema('code', 'tablePro');
  const { getTableData } = useMockTableData();

  return {
    code: `
      <template>
        ${getTableProTemplateCode(config.tableCols)}
      </template>

      <script lang='ts' setup>
        import { reactive } from 'vue';

        const config = reactive(${JSON.stringify(config)});

        const tableData = ${JSON.stringify(getTableData())};

        const getTableData = async () => {
          config.loading = true;
          try {
            ${
              config.hasOwnProperty('formModel')
                ? `const params = {
              ...config.pagination,
              ...config.formModel
            }`
                : `const params = {
              ...config.pagination,
            }`
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
          config.pagination.page_size = val.page_size;
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
    getTableProTemplateCode,
  };
};
