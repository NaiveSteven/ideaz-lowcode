import { parseElementSchema } from '@ideal-schema/playground-parser'
import { useFormRenderCode } from './useFormRenderCode'

export function useFormDialogCode() {
  const { columns, options, formData, formConfig } = parseElementSchema()
  const { getRenderCode } = useFormRenderCode('dialog')

  return `
    import { ref, watch, nextTick, defineComponent } from 'vue';
    import { ElMessage } from 'element-plus';

    export default defineComponent({
      name: 'MyComponent',
      props: {
        modelValue: {
          type: Boolean,
          default: false
        }
      },
      emits: ['update:modelValue'],
      setup(props, { emit }) {
        const formRef = ref();
        const isConfirmBtnLoading = ref(false);
        const visible = ref(false);
        const formData = ref(${JSON.stringify(formData)})
        const formConfig = ${JSON.stringify(formConfig)}
        const options = ${JSON.stringify(options)}
        const columns = ${JSON.stringify(columns)}

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

          } else {
            formRef.value.resetFields();
          }
          emit('update:modelValue', newValue);
        }, { immediate: true });

        const handleSubmit = async () => {
          isConfirmBtnLoading.value = true;
          try {
            isConfirmBtnLoading.value = false;
            ElMessage.success('成功');
            visible.value = false;
          } catch (error) {
            console.log(error, 'getTableData error');
          }
          isConfirmBtnLoading.value = false;
        };

        const handleValidate = () => {
          formRef.value.validate((val) => {
            if(val) {
              handleSubmit();
            }
          })
        };

        const renderFooter = () => {
          return <>
            <el-button onClick={() => visible.value = false} size="default">取 消</el-button>
            <el-button type="primary"  size="default" loading={isConfirmBtnLoading.value} onClick={handleValidate}
              >确 定</el-button
            >
          </>
        };

        return () => {
          return (${getRenderCode(columns)})
        }
      }
    })`
}
