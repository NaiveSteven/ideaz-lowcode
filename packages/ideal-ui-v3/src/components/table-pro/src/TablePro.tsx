import { defineComponent, useAttrs, h, resolveComponent } from 'vue';
import {
  useTableProDecorator,
  useTableProColumns,
  useTableProFormItems,
  useFormSlots,
  useFormConfig,
} from '../hooks';
import { useTableSlots, useTableMethods, useExpose } from '../../table/hooks';
import { useFormMethods } from '../../form/hooks';
import ToggleButton from './ToggleButton.vue';

export default defineComponent({
  name: 'CTablePro',
  components: { ToggleButton },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['search', 'reset'],
  setup(props, { slots, emit }) {
    const {
      formDecoratorName: FormDecoratorName,
      tableDecoratorName: TableDecoratorName,
      formDecoratorProps,
      tableDecoratorProps,
      formDecoratorEvents,
      tableDecoratorEvents,
    } = useTableProDecorator(props);
    const {
      setCurrentRow,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      clearSort,
      toggleRadioSelection,
      sort,
    } = useTableMethods();
    const { resetFields, validate, validateField, clearValidate } = useFormMethods();

    useExpose({
      setCurrentRow,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      clearSort,
      toggleRadioSelection,
      sort,
      resetFields,
      validate,
      validateField,
      clearValidate,
    });
    const { tableCols } = useTableProColumns(props);
    const { scopedSlots } = useTableSlots(tableCols, slots);
    const { isShowToggleButton, formItemConfig, toggleButtonType } = useTableProFormItems(props);
    const { scopedSlots: FormScopedSlots } = useFormSlots(formItemConfig, slots);
    const {
      formConfig,
      layout,
      handleSearch,
      handleReset,
      handleKeyDown,
      middleFormModel,
      isUseFormModelStorage,
    } = useFormConfig(props, emit);
    const attrs = useAttrs();

    return () => {
      const { config } = props;

      return (
        <div class="c-table-pro">
          {formItemConfig.value.length > 1 &&
            h(
              resolveComponent(FormDecoratorName.value),
              {
                class: 'mb-4',
                ...formDecoratorEvents.value,
                ...formDecoratorProps.value,
              },
              () => (
                <il-form
                  ref="form"
                  formModel={isUseFormModelStorage.value ? middleFormModel.value : config.formModel}
                  formConfig={formConfig.value}
                  formItemConfig={formItemConfig.value}
                  layout={layout.value}
                  nativeOnkeydown={(e: KeyboardEvent) => handleKeyDown(e)}
                  {...attrs}
                  v-slots={{
                    ...FormScopedSlots,
                    button: () => (
                      <>
                        {!slots.formOperation ? (
                          <div class="not-drag">
                            <el-button type="primary" size="small" onClick={handleSearch}>
                              查询
                            </el-button>
                            <el-button type="default" size="small" onClick={handleReset}>
                              重置
                            </el-button>
                          </div>
                        ) : (
                          slots.formOperation()
                        )}
                        {isShowToggleButton.value ? (
                          <ToggleButton
                            modelValue={toggleButtonType.value}
                            onUpdate:modelValue={(val: any) => (toggleButtonType.value = val)}
                          />
                        ) : null}
                      </>
                    ),
                  }}
                ></il-form>
              )
            )}
          {tableCols.value.length
            ? h(
                resolveComponent(TableDecoratorName.value),
                {
                  ...tableDecoratorEvents.value,
                  ...tableDecoratorProps.value,
                },
                () => (
                  <il-table
                    ref="cTableRefs"
                    {...{ ...attrs, ...config, tableCols: tableCols.value }}
                    v-slots={scopedSlots}
                    topRender={() =>
                      (slots.topLeft || slots.topRight) && (
                        <div class="flex justify-between">
                          <div>{slots.topLeft && slots.topLeft()}</div>
                          <div>{slots.topRight && slots.topRight()}</div>
                        </div>
                      )
                    }
                  />
                )
              )
            : null}
        </div>
      );
    };
  },
});
