// 找到树结构当前项
export const getTreeDataItem = (list: any, id: string) => {
  let obj: any = {};
  const flat = (arr: any, curId: string) => {
    arr.forEach((item: any) => {
      if (item.id === curId) {
        obj = item;
      } else {
        if (item.children && item.children.length) {
          flat(item.children, curId);
        }
      }
    });
  };
  flat(list, id);
  return obj;
};
