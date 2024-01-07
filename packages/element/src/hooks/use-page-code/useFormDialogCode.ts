import { getSchemaData } from '@ideal-schema/playground-demi'
import { useFormTemplateCode } from './useFormTemplateCode'

export function useFormDialogCode() {
  const { formItemConfigs, formModel, formConfig, optionsConfig, layout } = getSchemaData()
  const { getTemplateCode } = useFormTemplateCode('dialog')

  return `
    ${getTemplateCode(formItemConfigs)}

    <script lang='ts' setup>
      import { ref, watch, nextTick } from 'vue';
      import { ElMessage } from 'element-plus';

      const props = withDefaults(
        defineProps<{
          modelValue: boolean;
        }>(),
        {
          modelValue: false,
        }
      );
      const emit = defineEmits(['update:modelValue']);

      const cFormRef = ref();
      const isConfirmBtnLoading = ref(false);
      const visible = ref(false);
      const formModel = ref(${JSON.stringify(formModel)})
      const formConfig = ${JSON.stringify(formConfig)}
      const optionsConfig = ${JSON.stringify(optionsConfig)}
      const formItemConfig = ${JSON.stringify(formItemConfigs)}
      const layout = ${JSON.stringify(layout)}

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
          cFormRef.value.resetFields();
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
        cFormRef.value.validate((val) => {
          if(val) {
            handleSubmit();
          }
        })
      };

    </script>`
}
