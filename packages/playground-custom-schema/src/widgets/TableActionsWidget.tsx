import { defineComponent, computed, reactive } from 'vue';
import { uid } from '@ideal-schema/shared';
import { useWorkspaceStore } from '@ideal-schema/playground-store';
import { getInputFormItemTemplate } from '../utils';
import {
  tableColTemplateSchema,
  tableColTemplateOptionsConfig,
  tableColFormData,
} from '../schemas';
import './style.scss';

export default defineComponent({
  name: 'TableActionsWidget',
  setup(props, { slots }) {
    const workspaceStore = useWorkspaceStore();

    const workspaceComponentList = computed(() => workspaceStore.getWorkspaceComponentList);

    const ACTIONS = [
      {
        icon: 'i-plus',
        label: '添加表格项',
        click: () => {
          const prop = uid();
          const tableCol = {
            name: 'tableCol',
            prop: prop,
            label: 'title',
            title: '表格项',
            id: uid(),
            templateSchema: tableColTemplateSchema,
            templateOptionsConfig: tableColTemplateOptionsConfig,
            templateFormData: reactive({
              ...tableColFormData,
              prop: prop,
              label: 'title',
            }),
            activeCollapseItems: ['column'],
            allowCopy: true,
            allowDelete: true,
          };
          let lastIndex = 0;
          const tableCols = workspaceComponentList.value[0].schema.tableCols!;
          tableCols.forEach((item: TableCol, index: number) => {
            if (item.id && lastIndex < index) {
              lastIndex = index;
            }
          });
          if (!tableCols[lastIndex + 1]) {
            tableCols[lastIndex + 1] = tableCol;
          } else {
            tableCols[lastIndex + 1] = {
              ...tableCols[lastIndex + 1],
              ...tableCol,
            };
          }
          workspaceStore.updateComponentList([
            {
              ...workspaceComponentList.value[0],
              schema: {
                ...workspaceComponentList.value[0].schema,
                cellClassName: ({ columnIndex }: { columnIndex: number }) => {
                  if (tableCols[columnIndex]) {
                    return 'schema-field' + tableCols[columnIndex].id;
                  }
                  return '';
                },
                tableCols,
              },
            },
          ]);
        },
      },
      {
        icon: 'i-plus',
        label: '添加表单项',
        click: () => {
          let lastIndex = 0;
          const { newFormItem, prop } = getInputFormItemTemplate();
          const tableCols = workspaceComponentList.value[0].schema.tableCols!;
          tableCols.forEach((item: TableCol, index: number) => {
            if (item.formItemProps && lastIndex < index) {
              lastIndex = index;
            }
          });
          if (!tableCols[lastIndex + 1]) {
            tableCols[lastIndex + 1] = {
              formItemProps: newFormItem,
            };
          } else {
            tableCols[lastIndex + 1].formItemProps = newFormItem;
          }
          workspaceStore.updateComponentList([
            {
              ...workspaceComponentList.value[0],
              schema: {
                ...workspaceComponentList.value[0].schema,
                formModel: {
                  ...workspaceComponentList.value[0].schema.formModel,
                  [prop]: '',
                },
              },
            },
          ]);
        },
      },
    ];
    return () => {
      return (
        <div>
          {slots.default && slots.default()}
          <div class="table-pro-actions__container">
            <el-divider border-style="dashed">
              <div class="flex">
                {ACTIONS.map((item, index) => {
                  return (
                    <>
                      <span class="table-pro-actions__text" onClick={() => item.click()}>
                        <el-icon size={10}>
                          <i-plus />
                        </el-icon>
                        {item.label}
                      </span>
                      {index !== ACTIONS.length - 1 && <el-divider direction="vertical" />}
                    </>
                  );
                })}
              </div>
            </el-divider>
          </div>
        </div>
      );
    };
  },
});
