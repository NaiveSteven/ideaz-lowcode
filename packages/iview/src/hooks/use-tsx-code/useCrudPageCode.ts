import { getSchemaData } from '@ideal-schema/playground-demi'
import { useMockTableData } from '../use-page-code/useMockTableData'
import { useCrudRenderCode } from './useCrudRenderCode'

export function useCrudPageCode() {
  const { getCrudRenderCode } = useCrudRenderCode()

  const { config, columns } = getSchemaData('code', 'crud')
  const { getTableData } = useMockTableData()

  return {
    code: `
      import { reactive, ref, defineComponent } from 'vue';

      export default defineComponent({
        name: 'MyComponent',
        setup() {
          const config = reactive(${JSON.stringify(config)});
          const searchFormData = ref(${JSON.stringify(config.searchFormData)});
          const tableData = ${JSON.stringify(getTableData())};
          const columns = ${JSON.stringify(columns)};

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

          return () => {
            return ${getCrudRenderCode(config.columns)}
          }
        }
      })`,
    getCrudRenderCode,
  }
}
