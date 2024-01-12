import { defineStore } from 'pinia'
import { uid } from '@ideal-schema/shared'

interface MiddleFormState {
  formConfig: IndexType
  formData: IndexType
  schemas: Schema
}

export const useMiddleFormStore = defineStore({
  id: 'middle-form',
  state: (): MiddleFormState => ({
    formConfig: {
      labelPosition: 'right',
      labelWidth: '100px',
    },
    formData: {},
    schemas: {
      type: 'object',
      id: uid(),
      properties: {},
    },
  }),
  getters: {
    getFormConfig(): IndexType {
      return this.formConfig
    },
    getFormData(): IndexType {
      return this.formData
    },
  },
  actions: {
    setFormConfig(obj: any) {
      this.formConfig = obj
    },
  },
})
