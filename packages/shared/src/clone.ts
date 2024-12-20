import { isFunction } from './is';
import { instOf } from './instanceof';
type Filter = (value: any, key: string) => boolean;

const NATIVE_KEYS = [
  ['Map', (map: any) => new Map(map)],
  ['WeakMap', (map: any) => new WeakMap(map)],
  ['WeakSet', (set: any) => new WeakSet(set)],
  ['Set', (set: any) => new Set(set)],
  ['Date', (date: any) => new Date(date)],
  'FileList',
  'File',
  'URL',
  'RegExp',
  [
    'Promise',
    (promise: Promise<any>) => new Promise((resolve, reject) => promise.then(resolve, reject)),
  ],
];

const isNativeObject = (values: any): any => {
  for (let i = 0; i < NATIVE_KEYS.length; i++) {
    const item = NATIVE_KEYS[i];
    if (Array.isArray(item) && item[0]) {
      if (instOf(values, item[0])) {
        return item[1] ? item[1] : item[0];
      }
    } else {
      if (instOf(values, item)) {
        return item;
      }
    }
  }
};

export const shallowClone = (values: any) => {
  let nativeClone: (values: any) => any;
  if (Array.isArray(values)) {
    return values.slice(0);
  } else if (isNativeObject(values)) {
    nativeClone = isNativeObject(values);
    return isFunction(nativeClone) ? nativeClone(values) : values;
  } else if (typeof values === 'object' && !!values) {
    return {
      ...values,
    };
  }
};

export const cloneDeep = (values: any, filter?: Filter): any => {
  let nativeClone: (values: any) => any;
  if (Array.isArray(values)) {
    return values.map((item) => cloneDeep(item, filter));
  } else if (isNativeObject(values)) {
    nativeClone = isNativeObject(values);
    return isFunction(nativeClone) ? nativeClone(values) : values;
  } else if (typeof values === 'object' && !!values) {
    if ('$$typeof' in values && '_owner' in values) {
      return values;
    }
    if (values._isAMomentObject) {
      return values;
    }
    if (values._isJSONSchemaObject) {
      return values;
    }

    if (isFunction(values.toJS)) {
      return values;
    }
    if (isFunction(values.toJSON)) {
      return values;
    }
    if (Object.getOwnPropertySymbols(values || {}).length) {
      return values;
    }
    const res: typeof values = {};
    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        if (filter && isFunction(filter)) {
          if (filter(values[key], key)) {
            res[key] = cloneDeep(values[key], filter);
          } else {
            res[key] = values[key];
          }
        } else {
          res[key] = cloneDeep(values[key], filter);
        }
      }
    }
    return res;
  } else {
    return values;
  }
};
