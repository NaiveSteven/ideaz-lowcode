import { IndexType, IndexOptions, Pagination } from './common';
import { FormItemConfigItem } from './form';
import { Layout } from './layout';
import { TableCol } from './table';

export interface TableProCol extends TableCol {
  formItemProps?: FormItemConfigItem;
}

export interface CTableProConfig {
  formLayout?: Layout;
  formConfig?: IndexType;
  formOptions?: IndexOptions;
  tableCols: TableProCol[];
  formModel?: IndexType;
  pagination?: Pagination;
  loading?: boolean;
  data: any;
  [propName: string]: any;
}
