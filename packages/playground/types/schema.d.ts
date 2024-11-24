declare interface Schema {
  id?: string
  name?: string
  pid?: string
  title?: string
  description?: string
  hide?: boolean | ((rootFormData: IndexType) => boolean)
  component?: string
  componentProps?: {
    style?: any
    [propName: string]: any
  }
  // crud
  columns?: TableCol[]
  data?: any
  cellClassName?: string | ((obj: { columnIndex: number }) => void)
  searchFormData?: IndexType
  formData?: IndexType
  options?: IndexType
  pagination?: Pagination
  tableDecorator?: IndexType
  formDecorator?: IndexType
  rowKey?: string | (() => string)
  defaultExpand?: boolean
  formConfig?: IndexType
  // form
  fieldProps?: IndexType
  field?: string
  formItemProps?: IndexType
  label?: string
  required?: boolean
  form?: IndexType
  search?: IndexType
  collapsed?: boolean
  action?: boolean
  headerRowClassName?: string
  draggable?: any
  size?: 'default' | 'small' | 'large'
  children?: Schema[]
}
