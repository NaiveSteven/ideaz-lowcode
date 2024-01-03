// 数组填充对象
export function fillObj(target: any, data: any) {
  // 简单复制 异常直接抛错
  try {
    if (typeof data === 'object') {
      return target.fill(null).map(() => JSON.parse(JSON.stringify(data)));
    }
  } catch (e) {
    // nothing ...
  }

  // 默认返回一个 undefined
  return undefined;
}
