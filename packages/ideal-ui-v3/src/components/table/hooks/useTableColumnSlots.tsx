import { h, resolveComponent, shallowRef, watch } from 'vue';
import { isFunction } from '@ideal-schema/shared';
import { useTableColComponentName } from './useTableColComponentName';
import type { BtnItem } from '@ideal-schema/ideal-ui-v3';

export const useTableColumnSlots = (props: IndexType, slots: IndexType) => {
  const scopedSlots = shallowRef<IndexType>({});

  watch(
    () => props.tableCol,
    () => {
      const { tableCol = {}, size } = props;
      const { getComponentName, getDynamicComponentName } = useTableColComponentName(tableCol);
      const componentName = getComponentName(tableCol.type!);

      if (
        !['index', 'selection', 'expand', 'radio', undefined].includes(tableCol.type) ||
        tableCol.slot ||
        tableCol.render
      ) {
        scopedSlots.value.default = (scope: any) => {
          const { btnList = [] } = tableCol;
          if (tableCol.slot && slots[tableCol.slot]) {
            return slots[tableCol.slot]({ ...scope, index: scope.$index });
          }
          if (isFunction(tableCol.render)) {
            return tableCol.render(h, { ...scope, index: scope.$index });
          }
          if (tableCol.type === 'button') {
            return btnList.map((button: BtnItem) => {
              const buttonProps = { ...button, link: button.type === 'text' };
              if (buttonProps.type === 'text') {
                buttonProps.type = 'primary';
              }
              const isShowButton = button.whenShowCb
                ? button.whenShowCb(scope.row, scope.$index, scope.column)
                : true;
              if (isShowButton) {
                return (
                  <el-button
                    size={size}
                    disabled={
                      buttonProps.isDisabled &&
                      buttonProps.isDisabled(scope.row, scope.$index, scope.column)
                    }
                    // v-bind={button}
                    {...buttonProps}
                    onClick={
                      buttonProps.click
                        ? () => buttonProps.click!(scope.row, scope.$index, scope.column)
                        : () => {}
                    }
                  >
                    {buttonProps.label}
                  </el-button>
                );
              }
            });
          }
          return h(resolveComponent(componentName), {
            modelValue: scope.row[tableCol.prop],
            onInput: (val: any) => {
              scope.row[tableCol.prop] = val;
            },
            onChange: (val: any) => {
              scope.row[tableCol.prop] = val;
            },
            componentName: getDynamicComponentName(tableCol.type),
            on: tableCol.on,
            rowData: scope.row,
            size: size,
            options: tableCol.options,
            ...tableCol.attrs,
            disabled:
              tableCol.isDisabled && tableCol.isDisabled(scope.row, scope.$index, scope.column),
          });

          // <ComponentName.value
          //   // v-bind={tableCol.attrs}
          //   value={scope.row[tableCol.prop]}
          //   onInput={(val: any) => {
          //     scope.row[tableCol.prop] = val;
          //   }}
          //   componentName={getDynamicComponentName(tableCol.type)}
          //   evt={tableCol.on}
          //   rowData={scope.row}
          //   size={size}
          //   options={tableCol.options}
          //   {...tableCol.attrs}
          //   disabled={
          //     tableCol.isDisabled && tableCol.isDisabled(scope.row, scope.$index, scope.column)
          //   }
          // />
        };
      }

      if (tableCol.headerSlot && slots[tableCol.headerSlot]) {
        scopedSlots.value.header = (scope: any) =>
          slots[tableCol.headerSlot]({ ...scope, index: scope.$index });
      }
    },
    { immediate: true, deep: true }
  );

  return { scopedSlots };
};
