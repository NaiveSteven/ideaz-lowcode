import { getSchemaData } from '@ideal-schema/playground-demi'
import { useMockTableData } from '../use-page-code/useMockTableData'
import { useCrudRenderCode } from './useCrudRenderCode'

export function useCrudDialogCode() {
  const { getCrudRenderCode } = useCrudRenderCode()

  const { config } = getSchemaData('code', 'crud')
  const { getTableData } = useMockTableData()

  return {
    code: `
      import { reactive, ref, watch, nextTick, defineComponent } from 'vue';

      export default defineComponent({
        name: 'MyComponent',
        props: {
          modelValue: {
            type: Boolean,
            default: false
          }
        },
        emits: ['update:modelValue'],
        setup() {
          const visible = ref(false);
          const config = reactive(${JSON.stringify({
            formDecorator: { name: 'div' },
            tableDecorator: { name: 'div' },
            ...config,
          })});
          const searchFormData = ref(${JSON.stringify(config.searchFormData)});
          const tableData = ${JSON.stringify(getTableData())};

          watch(
            () => props.modelValue,
            (newValue) => {
              visible.value = newValue;
            },
            { immediate: true }
          );

          watch(visible, async (newValue) => {
            await nextTick();
            if (!newValue) {
              config.pagination = {
                page: 1,
                pageSize: 10,
                total: 0
              }
              config.data = []
            } else {
              getTableData()
            }
            emit('update:modelValue', newValue);
          }, { immediate: true });


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
          const renderFooter = () => {
            return <>
              <el-button size="default" onClick={() => visible.value = false}>取 消</el-button>
              <el-button type="primary" size="default" onClick={() => visible.value = false}
                >确 定</el-button
              >
            </>
          }

          return () => {
            return <el-dialog
                v-model={visible.value}
                title="标题"
                width="620px"
                v-slots={{ footer: renderFooter }}
              >
              ${getCrudRenderCode(config.tableCols)}
            </el-dialog>
          }
        }
      })`,
    getCrudRenderCode,
  }
}
