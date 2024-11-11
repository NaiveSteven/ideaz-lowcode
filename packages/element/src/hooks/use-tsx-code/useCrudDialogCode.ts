import { parseElementSchema } from '@ideal-schema/playground-parser'
import { useMockTableData } from '../use-page-code/useMockTableData'
import { useCrudLogicCode } from '../use-page-code/useCrudLogicCode'
import { useCrudRenderCode } from './useCrudRenderCode'

export function useCrudDialogCode() {
  const { getCrudRenderCode } = useCrudRenderCode()

  const { config, columns } = parseElementSchema('code', 'crud')
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
              ${getCrudRenderCode(config.tableCols, config)}
            </el-dialog>
          }
        }
      })`,
    getCrudRenderCode,
  }
}
