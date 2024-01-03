import { isObject } from './is';

// 合并对象数据
export function mergeObjects(obj1: any, obj2: any, concatArrays = false) {
  // Recursively merge deeply nested objects.
  const preAcc = { ...obj1 }; // Prevent mutation of source object.
  if (!isObject(obj2)) return preAcc;

  return Object.keys(obj2).reduce((acc, key) => {
    const left = obj1 ? obj1[key] : {};
    const right = obj2[key];
    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeObjects(left, right, concatArrays);
    } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
      acc[key] = left.concat(right);
    } else {
      acc[key] = right;
    }
    return acc;
  }, preAcc);
}
