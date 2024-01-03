export type IndexOptions = { [propName: string]: OptionsItem[] };

export interface IndexType {
  [propName: string]: any;
}

export interface OptionsItem {
  label: string;
  value: string | number;
  disabled?: boolean;
}
export type validateCallback = (isSuccess: boolean, field: object) => void;
export type validateFieldCallback = (errorMessage: string) => void;

export interface Pagination {
  page: number;
  page_size: number;
  total: number;
  [propName: string]: any;
}
