import { isString, isFunction } from './is';
import { globalThisPolyfill } from './globalThisPolyfill';

export const instOf = (value: any, cls: any) => {
  if (isFunction(cls)) return value instanceof cls;
  if (isString(cls))
    return globalThisPolyfill[cls as any]
      ? value instanceof (globalThisPolyfill[cls as any] as any)
      : false;
  return false;
};
