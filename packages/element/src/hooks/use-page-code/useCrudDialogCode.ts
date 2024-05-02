import { parseElementSchema } from '@ideal-schema/playground-parser'
import { useCrudTemplateCode } from './useCrudTemplateCode'
import { useMockTableData } from './useMockTableData'

export function useCrudDialogCode() {
  const { getCrudTemplateCode } = useCrudTemplateCode()

  const { config } = parseElementSchema('code', 'crud')
  const { getTableData } = useMockTableData()

  return {
    code: `
      <template>
        <el-dialog v-model="visible" title="标题" width="620px">
          ${getCrudTemplateCode(config.tableCols)}
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
      </script>`,
    getCrudTemplateCode,
  }
}