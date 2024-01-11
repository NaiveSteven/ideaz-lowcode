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
  // custom schema
  attrs?: IndexType
  formItem?: IndexType
  prop?: string
  // table pro
  tableCols?: TableCol[]
  data?: any
  cellClassName?: string | ((obj: { columnIndex: number }) => string)
  formModel?: IndexType
  formOptions?: IndexType
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
}
