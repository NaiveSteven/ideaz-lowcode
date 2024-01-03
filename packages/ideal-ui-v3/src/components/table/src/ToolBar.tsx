import { defineComponent } from '@vue/composition-api';
// import draggable from 'vuedraggable';
import { useToolBarTableCols } from '../hooks';
import type { TableCol } from '@ideal-schema/ideal-ui-v3';

export default defineComponent({
  name: 'ToolBar',
  // components: {
  //   draggable,
  // },
  props: {
    formatTableCols: {
      type: Array,
      default: () => [],
    },
    sortTableCols: {
      type: Array,
      default: () => [],
    },
    middleTableCols: {
      type: Array,
      default: () => [],
    },
    originFormatTableCols: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: 'small',
    },
  },
  emits: ['columns-change', 'size-change', 'refresh', 'table-cols-change'],
  setup(props, { emit }) {
    const {
      checkAll,
      isIndeterminate,
      checkedTableCols,
      handleCheckAllChange,
      handleCheckedTableColsChange,
      handleReset,
      handleDataChange,
    } = useToolBarTableCols(props, emit);

    const TABLE_SIZE_LIST = [
      {
        label: '宽松',
        size: 'large',
      },
      {
        label: '中等',
        size: 'default',
      },
      {
        label: '紧凑',
        size: 'small',
      },
    ];

    const handleRefresh = () => {
      emit('refresh');
    };

    const handleCommand = (command: string) => {
      emit('size-change', command);
    };

    return () => {
      return (
        <div class="tool-bar">
          <el-tooltip class="item" effect="dark" content="刷新" placement="top" showAfter={500}>
            <el-icon size="18px" class="mr-12">
              <i-refresh-right class="el-icon-refresh-right" onClick={handleRefresh} />
            </el-icon>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="尺寸" placement="top" showAfter={500}>
            <el-dropdown
              onCommand={handleCommand}
              trigger="click"
              size="default"
              v-slots={{
                dropdown: () => (
                  <>
                    <el-dropdown-menu>
                      {TABLE_SIZE_LIST.map((item) => (
                        <el-dropdown-item
                          command={item.size}
                          class={props.size === item.size && 'density-dropdown__active'}
                        >
                          {item.label}
                        </el-dropdown-item>
                      ))}
                    </el-dropdown-menu>
                  </>
                ),
              }}
            >
              <el-icon class="mr-12">
                <i-d-caret />
              </el-icon>
            </el-dropdown>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="列设置" placement="top" showAfter={500}>
            <el-popover
              placement="bottom"
              width="150"
              trigger="click"
              v-slots={{
                reference: () => (
                  <el-icon>
                    <i-setting class="el-icon-setting" />
                  </el-icon>
                ),
              }}
            >
              <div class="column-popover__inner">
                <div class="column-popover__title">
                  <el-checkbox
                    modelValue={checkAll.value}
                    indeterminate={isIndeterminate.value}
                    onChange={handleCheckAllChange}
                    onUpdate:modelValue={(val: any) => {
                      checkAll.value = val;
                    }}
                  >
                    列展示
                  </el-checkbox>
                  <a onClick={handleReset} class="column-popover__reset">
                    重置
                  </a>
                </div>
                <div class="column-popover__content">
                  <el-checkbox-group
                    modelValue={checkedTableCols.value}
                    onUpdate:modelValue={(val: any) => {
                      checkedTableCols.value = val;
                    }}
                    onChange={handleCheckedTableColsChange}
                  >
                    {/* <draggable
                      modelValue={props.sortTableCols}
                      onInput={(data: TableCol[]) =>
                        handleDataChange(data, props.middleTableCols as TableCol[])
                      }
                      {...{
                        attrs: {
                          animation: 200,
                          ghostClass: 'column-popover-checkbox__drag--ghost',
                        },
                      }}
                    > */}
                    {/* <transition-group> */}
                    {(props.sortTableCols as TableCol[]).map((item: TableCol, index: number) => {
                      return (
                        <div key={index} class="column-popover-checkbox">
                          <el-checkbox label={item.__uid} key={index}>
                            {item.label || item.type}
                          </el-checkbox>
                          <i class="el-icon-rank" />
                        </div>
                      );
                    })}
                    {/* </transition-group> */}
                    {/* </draggable> */}
                  </el-checkbox-group>
                </div>
              </div>
            </el-popover>
          </el-tooltip>
        </div>
      );
    };
  },
});
