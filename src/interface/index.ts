export interface Locales<T = any> {
  /** Chinese */
  // zh_CN: T;
  /** English */
  en_US: T;
  /** Persian */
  fa_IR: T;
}

export type Language = keyof Locales;

export interface PageData<T> {
  pageNum: number;
  pageSize: number;
  total: number;
  data: T[];
}
