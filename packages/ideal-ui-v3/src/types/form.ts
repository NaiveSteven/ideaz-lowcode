import { IndexType } from './common';

export interface FormItemConfigItem {
  type?: string | (() => string);
  prop?: string;
  formItem?: IndexType;
  attrs?: IndexType;
  hide?: () => boolean;
  hideUseVShow?: () => boolean;
  on?: IndexType;
  slot?: string;
  colGrid?: IndexType;
  render?: any;
}
