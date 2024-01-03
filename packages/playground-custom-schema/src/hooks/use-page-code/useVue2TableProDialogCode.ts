import { useReduceJsonSchema } from '@ideal-schema/playground-demi';
import { useMockTableData } from './useMockTableData';
import { useTableProTemplateCode } from './useTableProTemplateCode';

export const useVue2TableProDialogCode = () => {
  const { getTableProTemplateCode } = useTableProTemplateCode();
  const { config } = useReduceJsonSchema('code', 'tablePro');
  const { getTableData } = useMockTableData();

  return `
    <template>
      <c-dialog
        v-model="isShowDialog"
        title="标题"
        width="680px"
        @confirm="isShowDialog = false"
      >
        ${getTableProTemplateCode(config.tableCols)}
      </c-dialog>
    </template>

    <script>
    export default {
      props: {
        value: {
          type: Boolean,
          default: false
        }
      },
      data() {
        return {
          isShowDialog: false,
          isConfirmBtnLoading: false,
          config: ${JSON.stringify({
            formDecorator: { name: 'div' },
            tableDecorator: { name: 'div' },
            ...config,
          })},
          tableData: ${JSON.stringify(getTableData())}
        }
      },
      watch: {
        value(val) {
          this.isShowDialog = val
          if (val) {
            this.getTableData()
          } else {
            this.config.pagination = {
              page: 1,
              page_size: 10,
              total: 0
            }
            this.config.data = []
          }
        },
        isShowDialog(val) {
          this.$emit('input', val)
        }
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
