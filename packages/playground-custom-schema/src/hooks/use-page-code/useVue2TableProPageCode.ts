import { useReduceJsonSchema } from '@ideal-schema/playground-demi';
import { useMockTableData } from './useMockTableData';
import { useTableProTemplateCode } from './useTableProTemplateCode';

export const useVue2TableProCode = () => {
  const { getTableProTemplateCode } = useTableProTemplateCode();
  const { config } = useReduceJsonSchema('code', 'tablePro');
  const { getTableData } = useMockTableData();

  return `
    <template>
      ${getTableProTemplateCode(config.tableCols)}
    </template>

    <script>
    export default {
      data() {
        return {
          config: ${JSON.stringify(config)},
          tableData: ${JSON.stringify(getTableData())}
        }
      },
      mounted() {
        this.getTableData();
      },
      methods: {
        async getTableData() {
          this.config.loading = true;
          try {
            ${
              config.hasOwnProperty('formModel')
                ? `const params = {
              ...this.config.pagination,
              ...this.config.formModel
            }`
                : `const params = {
              ...this.config.pagination,
            }`
            }
            await this.delay(200);
            this.config.data = this.tableData;
          } catch (error) {
            console.log(error, 'getTableData error');
          }
          this.config.loading = false;
        },
        handlePaginationChange(val) {
          this.config.pagination.page = val.page;
          this.config.pagination.page_size = val.page_size;
          this.getTableData();
        },
        handleSearch() {
          this.config.pagination.page = 1;
          this.getTableData();
        },
        delay(time) {
          return new Promise(function (resolve) {
            setTimeout(resolve, time);
          });
        }
      }
    }
    </script>`;
};
