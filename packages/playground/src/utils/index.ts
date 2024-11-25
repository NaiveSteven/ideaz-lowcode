import { uid } from '@ideal-schema/shared';
import { cloneDeep } from 'lodash-es';

// 删除json schema中的某一项
export const delJsonSchemaItem = (schemas: any, id: string) => {
  const flat = (schema: any, curId: string) => {
    Object.keys(schema.properties || {}).forEach((key) => {
      if (schema.properties[key].id === curId) {
        delete schema.properties[key];
      } else if (schema.properties[key] && schema.properties[key].properties) {
        flat(schema.properties[key], curId);
      }
    });
  };
  flat(schemas, id);
  return schemas;
};

export const replaceSchemaItem = (schemas: any, id: string, toSchema: Schema) => {
  const flat = (schema: any, curId: string) => {
    Object.keys(schema.properties || {}).forEach((key) => {
      if (schema.properties[key].id === curId) {
        // 处理name改变问题
        if (toSchema.name !== key && toSchema.name) {
          delete schema.properties[key];
          schema.properties[toSchema.name] = toSchema;
        } else {
          schema.properties[key] = toSchema;
        }
      } else if (schema.properties[key] && schema.properties[key].properties) {
        flat(schema.properties[key], curId);
      }
    });
  };
  flat(schemas, id);
  return schemas;
};

export const getSchemaItem = (schemas: any, id: string) => {
  let schemaItem: Schema = {} as Schema;
  const flat = (schema: any, curId: string) => {
    Object.keys(schema.properties || {}).forEach((key) => {
      if (schema.properties[key].id === curId) {
        schemaItem = schema.properties[key];
      } else if (schema.properties[key] && schema.properties[key].properties) {
        flat(schema.properties[key], curId);
      }
    });
  };
  flat(schemas, id);
  return schemaItem;
};

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

export const changeDataId = (list: any) => {
  const cloneList = cloneDeep(list);
  const flat = (arr: any) => {
    arr.forEach((item: any) => {
      if (item.id) item.id = uid();
      if (item.children && item.children.length) flat(item.children);
    });
  };
  flat(cloneList);
  return cloneList;
};

export const getPids = (list: Widget[], item: Widget) => {
  const arr: any = [];
  const flat = (data: Widget) => {
    if (data.pid) {
      // const index = arr.findIndex(curr => curr.id === )
      // arr.push({ id: item.id, title: item.title });
      const cur = getTreeDataItem(list, data.pid);
      arr.push({ id: data.id, title: data.title });
      flat(cur);
    } else {
      if (data.id) {
        arr.push({ id: data.id, title: data.title });
      }
    }
  };
  flat(item);
  return arr;
};

export const getSchemaByComponentItem = (
  toShm: Schema,
  component: Widget,
  toShmId?: string
) => {
  const toSchemaClone = cloneDeep(toShm);
  const componentClone = cloneDeep(component);

  const flat = (toSchema: Schema, componentItem: Widget, toSchemaId?: string) => {
    const schema = componentItem.schema;
    if (!toSchemaId) {
      if (schema.id !== toSchema.id) {
        (toSchema as any).properties[(schema.name || schema.id) as string] = schema;
      }
    } else {
      const schemaItem = getSchemaItem(toSchemaClone, toSchemaId);
      schemaItem.properties![(schema.name || schema.id) as keyof Schema] = schema;
    }
    if (componentItem.children && componentItem.children.length) {
      componentItem.children.forEach((item) => {
        flat(schema.id !== toSchema.id ? schema : toSchema, item, toSchemaId);
      });
    }
  };

  flat(toSchemaClone, componentClone, toShmId);

  return toSchemaClone;
};

export interface DefaultConfig {
  schemaType: 'formItemTemplateSchema' | 'fieldSchema';
  key: string;
  default?: any;
  type?: string;
}

export interface CompositeConfig {
  label?: string;
  title?: string;
  icon?: string;
}
