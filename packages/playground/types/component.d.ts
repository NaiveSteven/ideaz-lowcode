declare interface CommonFormComponentProps {
  modelValue: any
  prop?: string
  attrs?: IndexType
  options?: OptionsItem[]
  on?: IndexType
  rowData?: any
}

declare type validateCallback = (isSuccess: boolean, field: object) => void
declare type validateFieldCallback = (errorMessage: string) => void
declare interface FormActionType {
  validate: (callback: validateCallback) => void
  validateField: (props: string[] | string, callback: validateFieldCallback) => void
  resetFields: () => void
  scrollToField: (prop: string) => void
  clearValidate: (props: string[] | string) => void
}
declare interface RowLayout {
  type?: string
  justify?: string
  items?: string
  content?: string
  direction?: string
  wrap?: string
}
declare interface ColLayout {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}
declare interface Layout {
  rowLayout?: RowLayout
  colLayout?: ColLayout
}

declare interface FormItemWidget extends WorkspaceComponentItem {
  icon?: string
  label?: string
  title?: string
  schema?: Schema
  id?: string
  type?: string | (() => string)
  prop?: string
  formItem?: IndexType
  attrs?: IndexType
  hide?: () => boolean
  hideUseVShow?: () => boolean
  on?: IndexType
  slot?: string
  colGrid?: IndexType
  render?: any
  fieldFormData?: IndexType
  templateFormData?: IndexType
  component?: string | (() => string)
  field?: string
  fieldProps?: IndexType
}

declare interface Pagination {
  page: number
  page_size?: number
  pageSize?: number
  total: number
  [propName: string]: any
}

// declare interface TableCol extends WorkspaceComponentItem {
//   // slot?: string;
//   // headerSlot?: string;
//   icon?: string
//   schema?: Schema
//   type?: string
//   buttons?: BtnItem[]
//   fieldProps?: {
//     [propName: string]: any
//   }
//   // on?: {
//   //   [propName: string]: any
//   // }
//   disabled?: ((row: any, index: number) => boolean) | boolean
//   options?: OptionsItem[]
//   [propName: string]: any
// }

declare interface WorkspaceComponentItem {
  id: string
  name?: string
  pid?: string
  formItemFormData?: IndexType
  formItemTemplateSchema?: Schema | Schema[]
  formItemOptionsConfig?: IndexType
  icon: string
  label?: string
  title: string
  schema: Schema
  componentFormData?: IndexType
  componentSchema?: Schema | Schema[] | any
  fieldFormData?: IndexType
  fieldSchema?: Schema | Schema[] | any
  fieldOptionsConfig?: IndexType
  componentOptionsConfig?: IndexType
  allowCopy?: boolean
  allowDelete?: boolean
  activeCollapseItems?: string[]
  children?: WorkspaceComponentItem[]
  templates?: WorkspaceComponentItem[]
}

declare interface CrudColumnWidget extends Partial<WorkspaceComponentItem> {
  formItemProps?: FormItemWidget
  fieldProps?: IndexType
  type?: string
  buttons?: BtnItem[]
  search?: IndexType
  disabled?: ((row: any, index: number) => boolean) | boolean
  options?: OptionsItem[]
  [propName: string]: any
}

declare interface ExpandTemplateItem {
  collapseTitle: string
  components: WorkspaceComponentItem[]
}

declare interface OptionsItem {
  label: string
  value?: any
  disabled?: boolean
  [propName: string]: any
}

declare interface FormChangeData {
  value: any
  field: string
  formData: IndexType
}
