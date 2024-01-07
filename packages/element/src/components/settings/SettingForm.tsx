import { computed, reactive, defineComponent } from 'vue';
import { cloneDeep } from 'lodash-es';
import { useWorkspaceStore, useMiddleFormStore } from '@ideal-schema/playground-store';
import { formTemplateSchema, formTemplateOptionsConfig } from '../../schemas';
import FormItemSettingForm from './FormItemSettingForm';
import TableProFormItemSettingForm from './TableProFormItemSettingForm';
import TableProTableColumnSettingForm from './TableProTableColumnSettingForm';
import TableProSettingForm from './TableProSettingForm';
import './style.scss';

export default defineComponent({
  name: 'SettingForm',
  setup() {
    const workspaceStore = useWorkspaceStore();
    const middleFormStore = useMiddleFormStore();

    const formConfig = reactive({
      labelPosition: 'left',
      labelWidth: '120px',
      // size: 'default',
      colon: false,
    });

    const formTemplateModel = reactive({
      background: 'page',
      labelPosition: 'right',
      labelWidth: '100px',
      size: 'default',
      colon: false,
      labelSuffix: '',
      disabled: false,
      hideRequiredAsterisk: false,
      showMessage: true,
      inlineMessage: false,
      statusIcon: false,
      validateOnRuleChange: true,
    });

    const curOperateComponent = computed(() => workspaceStore.getCurOperateComponent);
    const componentList = computed(() => workspaceStore.getWorkspaceComponentList);
    const middleFormConfig = computed(() => middleFormStore.getFormConfig);

    const handleMiddleFormChange = (obj: { val: any; prop: string; formData: IndexType }) => {
      const cloneObj = cloneDeep(obj);
      middleFormStore.setFormConfig({ ...middleFormConfig.value, ...cloneObj.formData });
    };

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

    return () => {
      if (!curOperateComponent.value.id) {
        return (
          <div class="form-content">
            <il-form
              layout={layout}
              options={formTemplateOptionsConfig}
              formModel={formTemplateModel}
              form-config={formConfig}
              formItemConfig={formTemplateSchema}
              onChange={handleMiddleFormChange}
            />
          </div>
        );
      }
      if (curOperateComponent.value.name === 'tableCol') {
        return <TableProTableColumnSettingForm />;
      }
      if (curOperateComponent.value.name === 'tablePro') {
        return <TableProSettingForm />;
      }
      if (
        componentList.value &&
        componentList.value.length &&
        componentList.value[0].name === 'tablePro'
      ) {
        return <TableProFormItemSettingForm />;
      }
      return <FormItemSettingForm />;
    };
  },
});
