import { isObject } from '@ideal-schema/shared';

const COMMON_KEYS = ['class', 'style', 'key'];
const FORM_KEYS = ['rules', 'prop'];
const COL_KEYS = ['xs', 'sm', 'md', 'lg', 'xl'];

export const useSpecialAttributes = () => {
  const setTopLevelAttributes = (obj: IndexType) => {
    const attrs: IndexType = {};
    if (isObject(obj)) {
      ['style', 'class', 'key'].forEach((key) => {
        if (obj[key]) {
          attrs[key] = obj[key];
        }
      });
    }
    return attrs;
  };

  const setId = (obj: IndexType) => {
    if (isObject(obj) && obj.id) {
      return { id: obj.id };
    }
    return {};
  };

  const setAttributes = (obj: IndexType) => {
    if (isObject(obj)) {
      const attrs = { ...obj };
      // 删除不需要的属性，以免绑定到 Dom 元素上
      [FORM_KEYS, COMMON_KEYS, COL_KEYS].forEach((arr) => {
        arr.forEach((key) => {
          delete attrs[key];
        });
      });
      return attrs;
    }
    return {};
  };

  const setAllAttrs = (obj: IndexType) => {
    return {
      ...{ ...{ attrs: setAttributes(obj) } },
      ...{ ...setId(obj) },
      ...{ ...setTopLevelAttributes(obj) },
    };
  };

  return { setTopLevelAttributes, setId, setAttributes, setAllAttrs };
};
