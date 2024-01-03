declare type Recordable<T = any> = Record<string, T>;
declare type EmitType = (event: any, ...args: any[]) => void;
declare interface IndexType {
  [propName: string]: any;
}
