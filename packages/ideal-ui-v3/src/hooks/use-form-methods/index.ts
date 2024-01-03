import { getCurrentInstance } from 'vue';
import { ElForm } from 'element-plus';
import type { ComponentInternalInstance } from 'vue';
import type { validateCallback, validateFieldCallback } from '@ideal-schema/ideal-ui-v3';

// export type validateCallback = (isSuccess: boolean, field: object) => void;
// export type validateFieldCallback = (errorMessage: string) => void;

// export interface RowLayout {
//   type?: string;
//   justify?: string;
//   items?: string;
//   content?: string;
//   direction?: string;
//   wrap?: string;
// }
// export interface ColLayout {
//   xs?: number;
//   sm?: number;
//   md?: number;
//   lg?: number;
//   xl?: number;
// }
// export interface Layout {
//   rowLayout?: RowLayout;
//   colLayout?: ColLayout;
// }

// export interface FormItemConfigItem {
//   type?: string | (() => string);
//   prop?: string;
//   formItem?: IndexType;
//   attrs?: IndexType;
//   hide?: () => boolean;
//   hideUseVShow?: () => boolean;
//   on?: IndexType;
//   slot?: string;
//   colGrid?: IndexType;
// }

export const useFormMethods = () => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance;

  const validate = (callback: validateCallback) => {
    (ctx?.$refs.formRefs as typeof ElForm).validate(callback);
  };

  const validateField = (props: string[] | string, callback: validateFieldCallback) => {
    (ctx?.$refs.formRefs as typeof ElForm).validateField(props, callback);
  };

  const resetFields = () => {
    (ctx?.$refs.formRefs as typeof ElForm).resetFields();
  };

  const scrollToField = (prop: string) => {
    (ctx?.$refs.formRefs as typeof ElForm).scrollToField(prop);
  };

  const clearValidate = (props: string[] | string) => {
    (ctx?.$refs.formRefs as typeof ElForm).clearValidate(props);
  };

  return { validate, validateField, resetFields, scrollToField, clearValidate };
};
