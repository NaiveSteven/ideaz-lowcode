import { getSchemaData } from '@ideal-schema/playground-demi'
import { useFormTemplateCode } from './useFormTemplateCode'

export function useFormDialogCode() {
  const { columns, options, formData, formConfig } = getSchemaData()
  const { getTemplateCode } = useFormTemplateCode('dialog')

  return `
    ${getTemplateCode(columns)}

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

    </script>`
}
