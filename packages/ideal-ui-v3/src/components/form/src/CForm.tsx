import { defineComponent, h, useSlots, useAttrs, computed } from 'vue';
import { useFormSlots, useFormLayout, useFormItems, useFormMethods, useExpose } from '../hooks';
import { getTreeDataItem } from '@ideal-schema/shared';
import { isFunction } from '@ideal-schema/shared';
import { props } from './props';
import { VueDraggable } from 'vue-draggable-plus';
import FormItem from './CFormItem';
import type { FormItemConfigItem } from '@ideal-schema/ideal-ui-v3';

export default defineComponent({
  name: 'CForm',
  components: { FormItem, VueDraggable },
  props,
  emits: ['change', 'on-update-form-item', 'on-form-item-click'],
  setup(props, { emit }) {
    const slots = useSlots();
    const attrs = useAttrs();
    const { rowLayout, getColLayout } = useFormLayout(props);
    const { formatFormItems } = useFormItems(props);
    const { resetFields, validate, validateField, clearValidate } = useFormMethods();

    let tempData: any = null;

    const layoutClass = computed(() => {
      const config = props.formConfig.layout || {};
      return [
        'el-row',
        config.class,
        config.justify && 'c-justify-content-' + config.justify,
        config.items && 'c-align-items-' + config.items,
        config.content && 'c-align-content-' + config.content,
        config.direction && 'c-flex-direction-' + config.direction,
        config.wrap && 'c-flex-wrap-' + config.wrap,
        // config.justify === 'flex' && 'flex',
      ];
    });

    const handleStart = (a: any) => {
      // console.log(a, 'a');
      // tempData = getTreeDataItem(props.formItemConfig, a.clone.id.slice(12, a.clone.id.length));
      // emit('on-update-form-item', {});
      tempData = formatFormItems.value[a.oldIndex];
    };

    const handleEnd = (b: any) => {
      // console.log(b, 'b');
      emit('on-update-form-item', tempData, b.newIndex, b.oldIndex);
    };

    useExpose({
      resetFields,
      validate,
      validateField,
      clearValidate,
    });

    return () => {
      const { formModel, formConfig = {}, options } = props;
      const { draggable } = formConfig;
      return (
        <el-form
          ref="form"
          // v-on={attrs}
          {...{ model: formModel, ...formConfig }}
          // v-bind={formConfig}
        >
          {draggable ? (
            // <il-container
            //   {...rowLayout.value}
            //   // v-bind={rowLayout.value}
            // >
            <VueDraggable
              id={'tableProForm'}
              class={layoutClass.value}
              v-model={formatFormItems.value}
              sort={true}
              animation={200}
              filter=".not-drag"
              ghost-class="ghost"
              item-key="id"
              group="people"
              onStart={handleStart}
              onEnd={handleEnd}
            >
              {formatFormItems.value.map((element: any) => {
                return (
                  <il-col
                    v-show={element.hideUseVShow ? !element.hideUseVShow() : true}
                    {...getColLayout(element)}
                    id={'schema-field' + element.id}
                    key={element.id}
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      e.stopPropagation();
                      emit('on-form-item-click', e, element);
                    }}
                    // v-bind={getColLayout(col)}
                  >
                    {renderContent(element, slots) ? (
                      renderContent(element, slots)
                    ) : (
                      <FormItem
                        // v-on={attrs}
                        ref={'formItem' + 1}
                        col={element}
                        formModel={formModel}
                        options={options}
                        // v-slots={scopedSlots}
                        onChange={(obj) => emit('change', obj)}
                        {...attrs}
                        // {...col.formItem}
                      />
                    )}
                  </il-col>
                );
              })}
            </VueDraggable>
          ) : (
            // </il-container>
            <il-container
              {...rowLayout.value}
              // v-bind={rowLayout.value}
            >
              {formatFormItems.value.map((col: any, colIndex: number) => {
                const { scopedSlots } = useFormSlots(col, slots, props);
                return (
                  <il-col
                    v-show={col.hideUseVShow ? !col.hideUseVShow() : true}
                    key={col.id!}
                    {...getColLayout(col)}
                    // v-bind={getColLayout(col)}
                  >
                    {renderContent(col, slots) ? (
                      renderContent(col, slots)
                    ) : (
                      <FormItem
                        // v-on={attrs}
                        ref={'formItem' + colIndex}
                        col={col}
                        formModel={formModel}
                        options={options}
                        v-slots={scopedSlots}
                        onChange={(obj) => emit('change', obj)}
                        // {...col.formItem}
                      />
                    )}
                  </il-col>
                );
              })}
            </il-container>
          )}
        </el-form>
      );
    };
  },
});

const renderContent = (col: FormItemConfigItem, slots: IndexType) => {
  if (col.slot) {
    return slots[col.slot] && slots[col.slot]();
  }
  if (isFunction(col.render)) {
    return col.render(h);
  }
  return;
};
