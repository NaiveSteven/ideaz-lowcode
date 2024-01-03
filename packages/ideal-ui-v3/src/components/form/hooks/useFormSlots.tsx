import { h } from 'vue';
import { isFunction } from '@ideal-schema/shared';
import FormItemLabel from '../src/FormItemLabel';

export const useFormSlots = (col: IndexType, slots: IndexType, props: Record<any, any>) => {
  const scopedSlots: IndexType = {};
  const { formConfig } = props;

  scopedSlots[col.frontSlot || 'label'] = () => {
    if (col.frontSlot && slots[col.frontSlot]) {
      return slots[col.frontSlot]();
    }
    if (col.formItem && isFunction(col.formItem.label)) {
      return col.formItem.label(h);
    }
    return (
      <FormItemLabel
        {...{
          ...col.formItem,
          colon: Object.prototype.hasOwnProperty.call(col.formItem || {}, 'colon')
            ? col.formItem.colon
            : formConfig.colon,
        }}
      />
    );
  };

  if (col.rearSlot && slots[col.rearSlot]) {
    scopedSlots[col.rearSlot] = () => slots[col.rearSlot]();
  }

  return { scopedSlots };
};
