export interface CircularRefs {
  LeFoo?: CircularRefs;
  [k: string]: any;
}
