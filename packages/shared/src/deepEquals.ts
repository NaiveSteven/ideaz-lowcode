import { isArguments } from './is';

// 深度相等对比
export function deepEquals(a: any, b: any, ca: any = [], cb: any = []): any {
  // Partially extracted from node-deeper and adapted to exclude comparison
  // checks for functions.
  // https://github.com/othiym23/node-deeper
  if (a === b) {
    return true;
  }
  if (typeof a === 'function' || typeof b === 'function') {
    // Assume all functions are equivalent
    // see https://github.com/mozilla-services/react-jsonschema-form/issues/255
    return true;
  }
  if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }
  if (a === null || b === null) {
    return false;
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  if (a instanceof RegExp && b instanceof RegExp) {
    return (
      a.source === b.source &&
      a.global === b.global &&
      a.multiline === b.multiline &&
      a.lastIndex === b.lastIndex &&
      a.ignoreCase === b.ignoreCase
    );
  }
  if (isArguments(a) || isArguments(b)) {
    if (!(isArguments(a) && isArguments(b))) {
      return false;
    }
    const { slice } = Array.prototype;
    return deepEquals(slice.call(a), slice.call(b), ca, cb);
  }
  if (a.constructor !== b.constructor) {
    return false;
  }

  const ka = Object.keys(a);
  const kb = Object.keys(b);
  // don't bother with stack acrobatics if there's nothing there
  if (ka.length === 0 && kb.length === 0) {
    return true;
  }
  if (ka.length !== kb.length) {
    return false;
  }

  let cal = ca.length;
  // eslint-disable-next-line no-plusplus
  while (cal--) {
    if (ca[cal] === a) {
      return cb[cal] === b;
    }
  }
  ca.push(a);
  cb.push(b);

  ka.sort();
  kb.sort();
  // eslint-disable-next-line no-plusplus
  for (let j = ka.length - 1; j >= 0; j--) {
    if (ka[j] !== kb[j]) {
      return false;
    }
  }

  let key;
  // eslint-disable-next-line no-plusplus
  for (let k = ka.length - 1; k >= 0; k--) {
    key = ka[k];
    if (!deepEquals(a[key], b[key], ca, cb)) {
      return false;
    }
  }

  ca.pop();
  cb.pop();

  return true;
}
