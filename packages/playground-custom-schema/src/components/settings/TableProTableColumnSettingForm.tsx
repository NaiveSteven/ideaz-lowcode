import { computed, reactive, defineComponent, nextTick } from 'vue';
import { cloneDeep } from 'lodash-es';
import { useWorkspaceStore } from '@ideal-schema/playground-store';
import { uid, isFunction } from '@ideal-schema/shared';
import mitt from '@ideal-schema/playground-event';
import { tableColTemplateSchema } from '../../schemas';
import './style.scss';

export default defineComponent({
  name: 'TableProTableColumnSettingForm',
  setup() {
    const workspaceStore = useWorkspaceStore();

    const formConfig = reactive({
      labelPosition: 'left',
      labelWidth: '120px',
      // size: 'default',
      colon: false,
    });

    const curOperateComponent = computed(() => workspaceStore.getCurOperateComponent);

    const layout = {
      rowLayout: {
        type: 'flex',
        justify: 'center',
      },
      colLayout: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 24,
      },
    };

    const handleColumnDataChange = (obj: FormChangeData) => {
      mitt.emit('attribute-start', {
        type: '表格项属性变更',
        data: cloneDeep(workspaceStore.getWorkspaceComponentList),
      });
      const tableProConfig = workspaceStore.getWorkspaceComponentList[0];
      const schema = tableProConfig.schema;
      let tableCols: TableCol[] = [];
      const data = {
        ...curOperateComponent.value,
        templateFormData: {
          ...curOperateComponent.value.templateFormData,
          ...obj.formData,
        },
        ...obj.formData,
      };
      if (obj.formData.type === 'slot') {
        data.templateSchema = (formData: IndexType) => [
          ...tableColTemplateSchema(formData),
          {
            type: 'input',
            prop: 'slot',
            formItem: { label: '插槽名' },
            hide: () => formData.type !== 'slot',
            attrs: {
              placeholder: '请输入插槽名',
            },
          },
        ];
      } else {
        data.templateFormData.slot = '';
      }
      if (obj.formData.type === 'default') {
        delete data.type;
        delete data.btnList;
      }
      if (obj.formData.type === 'button' && !data.btnList) {
        data.btnList = [
          {
            key: uid(),
            type: 'text',
            label: '编辑',
          },
          {
            type: 'text',
            label: '删除',
            key: uid(),
          },
        ];
        data.templateFormData.btnList = data.btnList;
      }
      tableCols = schema.tableCols!.map((item: TableCol) => {
        if (item.id === curOperateComponent.value.id) {
          return data;
        }
        return item;
      });
      workspaceStore.updateComponentList([
        {
          ...tableProConfig,
          schema: {
            ...schema,
            tableCols,
          },
        },
      ]);
      workspaceStore.updateCurOperateComponent(data);
      nextTick(() => {
        mitt.emit('attribute-end');
      });
    };

    return () => {
      return (
        <div class="form-content">
          <el-collapse v-model={curOperateComponent.value.activeCollapseItems}>
            <el-collapse-item title="列属性" name="column">
              <il-form
                layout={layout}
                formModel={curOperateComponent.value.templateFormData}
                form-config={formConfig}
                formItemConfig={
                  isFunction(curOperateComponent.value.templateSchema)
                    ? curOperateComponent.value.templateSchema(
                        curOperateComponent.value.templateFormData
                      )
                    : curOperateComponent.value.templateSchema
                }
                options={curOperateComponent.value.templateOptionsConfig}
                onChange={handleColumnDataChange}
              />
            </el-collapse-item>
          </el-collapse>
        </div>
      );
    };
  },
});
