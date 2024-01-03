import { useReduceJsonSchema } from '@ideal-schema/playground-demi';
import { useMockTableData } from './useMockTableData';
import { useTableProTemplateCode } from './useTableProTemplateCode';

export const useVue3TableProDialogCode = () => {
  const { getTableProTemplateCode } = useTableProTemplateCode();

  const { config } = useReduceJsonSchema('code', 'tablePro');
  const { getTableData } = useMockTableData();

  return {
    code: `
      <template>
        <el-dialog v-model="visible" title="标题" width="620px">
          ${getTableProTemplateCode(config.tableCols)}
          <template #footer>
            <el-button size="default" @click="visible = false">取 消</el-button>
            <el-button type="primary" size="default" @click="visible = false"
              >确 定</el-button
            >
          </template>
        </el-dialog>
      </template>


      <script lang='ts' setup>
        import { reactive, ref, watch, nextTick } from 'vue';

        const props = withDefaults(
          defineProps<{
            modelValue: boolean;
          }>(),
          {
            modelValue: false,
          }
        );
        const emit = defineEmits(['update:modelValue']);
        const visible = ref(false);
        const config = reactive(${JSON.stringify({
          formDecorator: { name: 'div' },
          tableDecorator: { name: 'div' },
          ...config,
        })});
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
              page_size: 10,
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
      </script>`,
    getTableProTemplateCode,
  };
};
