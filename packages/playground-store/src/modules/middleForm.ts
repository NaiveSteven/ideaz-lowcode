import { defineStore } from 'pinia';
import { uid } from '@ideal-schema/shared';

interface MiddleFormState {
  formConfig: IndexType;
  formData: IndexType;
  schemas: Schema;
}

export const useMiddleFormStore = defineStore({
  id: 'middle-form',
  state: (): MiddleFormState => ({
    formConfig: {
      labelPosition: 'right',
      labelWidth: '100px',
    },
    // formConfig: {},
    formData: {},
    schemas: {
      type: 'object',
      id: uid(),
      properties: {},
    },
  }),
  getters: {
    getFormConfig(): IndexType {
      return this.formConfig;
    },
    getFormData(): IndexType {
      return this.formData;
    },
    getSchemas(): Schema {
      return this.schemas;
    },
  },
  actions: {
    addSchema(componentItem: WorkspaceComponentItem, toSchemaId?: string) {
      this.delSchema(componentItem);
      // this.schemas = getSchemaByComponentItem(this.schemas, componentItem, toSchemaId);
      // this.formData = getDefaultFormState(this.schemas, this.formData, this.schemas);
      // console.log(this.schemas, this.formData, 'vuex中的schemas和formData');
    },
    delSchema(component: WorkspaceComponentItem) {
      // this.schemas = delJsonSchemaItem(this.schemas, component.schema.id as string);
    },
    updateSchema(component: WorkspaceComponentItem) {
      const schema = component.schema;
      // const trueSchema = getSchemaByComponentItem(component.schema, component);
      // this.schemas = replaceSchemaItem(this.schemas, schema.id as string, trueSchema);
      // this.formData = getDefaultFormState(this.schemas, {}, this.schemas);
    },
    clearSchemas() {
      this.schemas = { type: 'object', id: this.schemas.id, properties: {} };
      // this.formConfig = getDefaultFormState(formTemplateSchema, {}, formTemplateSchema);
    },
    updateSchemas(components: WorkspaceComponentItem[]) {
      this.clearSchemas();
      components.forEach((item) => {
        this.addSchema(item);
      });
    },
    setFormConfig(obj: any) {
      this.formConfig = obj;
    },
  },
});
