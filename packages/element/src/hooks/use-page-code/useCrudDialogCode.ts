import { parseElementSchema } from '@ideal-schema/playground-parser'
import { useCrudTemplateCode } from './useCrudTemplateCode'
import { useMockTableData } from './useMockTableData'
import { useCrudLogicCode } from './useCrudLogicCode'

export function useCrudDialogCode() {
  const { getCrudTemplateCode } = useCrudTemplateCode()

  const { config, columns } = parseElementSchema('code', 'crud')
  const { getTableData } = useMockTableData()

  return {
    code: `
      <template>
        <el-dialog v-model="visible" title="标题" width="720px">
          ${getCrudTemplateCode(config.tableCols, config)}
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
          loading: false,
          ...config,
          columns,
        })});
        ${!config.request ? `const tableData = ${JSON.stringify(getTableData())};` : ''}

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
            ${!config.request ? `getTableData()` : ''}
          }
          emit('update:modelValue', newValue);
        }, { immediate: true });


        ${useCrudLogicCode()}
      </script>`,
    getCrudTemplateCode,
  }
}
