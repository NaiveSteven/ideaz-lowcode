import { getCurrentInstance } from 'vue';
import type { ComponentInternalInstance } from 'vue';
import { ElForm } from 'element-plus';

export const useFormMethods = () => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance;

  const resetFields = (...args: any) => {
    return (ctx!.$refs.form as typeof ElForm).resetFields(...args);
  };

  const validate = (...args: any) => {
    return (ctx!.$refs.form as typeof ElForm).validate(...args);
  };

  const validateField = (...args: any) => {
    return (ctx!.$refs.form as typeof ElForm).validateField(...args);
  };

  const clearValidate = (...args: any) => {
    return (ctx!.$refs.form as typeof ElForm).clearValidate(...args);
  };

  return { resetFields, validate, validateField, clearValidate };
};
