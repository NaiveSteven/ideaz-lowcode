declare type SchemaType = 'object' | 'number' | 'integer' | 'array' | 'string' | 'boolean' | 'void'
declare interface Schema {
  id?: string
  name?: string
  root?: Schema
  pid?: string
  type?: SchemaType | string
  title?: string
  description?: string
  hide?: boolean | ((rootFormData: IndexType) => boolean)
  properties?: {
    [propName: string]: Schema
  }
  widget?: string
  component?: string
  componentProps?: {
    style?: any
    [propName: string]: any
  }
  // table pro
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
  draggable?: boolean
  size?: 'default' | 'small' | 'large'
}
