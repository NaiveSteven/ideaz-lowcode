import { computed, useAttrs } from 'vue';
import { useComponentMethods } from '../use-component-methods';
import { IndexType } from '@ideal-schema/ideal-ui-v3';

// export type IndexOptions = { [propName: string]: OptionsItem[] };

// export interface IndexType {
//   [propName: string]: any;
// }

// export interface OptionsItem {
//   label: string;
//   value: string | number;
//   disabled?: boolean;
// }

// export interface CFormProps {
//   modelValue: any;
//   prop?: string;
//   attrs?: IndexType;
//   options?: OptionsItem[];
//   on?: IndexType;
//   rowData?: any;
// }

export type EmitType = (event: any, ...args: any[]) => void;

export const useFormComponentAttrs = (props: Record<any, any>, emit: EmitType) => {
  const { blur, focus, change, input, clear, visibleChange, removeTag } =
    useComponentMethods(props);
  const obj = {
    blur,
    focus,
    change,
    input,
    clear,
    visibleChange,
    removeTag,
  };
  const attrs = useAttrs();

  const bindVal = computed({
    get: () => props.modelValue,
    set: (val) => {
      emit('input', val);
      emit('update:modelValue', val);
    },
  });
  const onAll = computed(() => {
    const newOn = {} as IndexType;
    if (props.on) {
      Object.keys(props.on).forEach((item) => {
        newOn[item] = obj[item as keyof typeof obj] || function () {};
      });
    }
    return newOn;
  });
  const attrsAll = computed(() => {
    return { ...attrs, ...props.attrs };
  });

  return { bindVal, attrsAll, onAll };
};
