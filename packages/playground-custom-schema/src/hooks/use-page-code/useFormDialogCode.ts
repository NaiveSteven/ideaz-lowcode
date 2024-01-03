import { useReduceJsonSchema } from '@ideal-schema/playground-demi';
import { useFormTemplateCode } from './useFormTemplateCode';

export const useFormDialogCode = (version: number) => {
  const { formItemConfigs, formModel, formConfig, optionsConfig, layout } = useReduceJsonSchema();
  const { getTemplateCode } = useFormTemplateCode('dialog', version);

  if (version === 3) {
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

    </script>`;
  }

  return `
  ${getTemplateCode(formItemConfigs)}

  <script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      value(val) {
        this.isShowDialog = val
        if (val) {
          // show dialog to do
        } else {
          this.$refs.cFormRef.resetFields();
        }
      },
      isShowDialog(val) {
        this.$emit('input', val)
      }
    },
    data() {
      return {
        isShowDialog: false,
        isConfirmBtnLoading: false,
        formModel: ${JSON.stringify(formModel)},
        formConfig: ${JSON.stringify(formConfig)},
        optionsConfig: ${JSON.stringify(optionsConfig)},
        formItemConfig: ${JSON.stringify(formItemConfigs)},
        layout: ${JSON.stringify(layout)},
      }
    },
    methods: {
      async handleSubmit() {
        this.isConfirmBtnLoading = true;
        try {
          this.isConfirmBtnLoading = false;
          this.$message.success('成功');
          this.isShowDialog = false;
        } catch (error) {
          console.log(error, 'getTableData error');
        }
        this.isConfirmBtnLoading = false;
      },
      handleValidate() {
        this.$refs.cFormRef.validate((val) => {
          if(val) {
            this.handleSubmit();
          }
        })
      }
    }
  }
  </script>`;
};
