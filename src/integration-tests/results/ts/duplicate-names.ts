export type Foo = string;
export type Baz = boolean;
export interface ObjectOfBazX101YId8 {
  ripslip?: Baz;
  [k: string]: any;
}
/**
 *
 * array of strings is all...
 *
 */
export type UnorderedSetOfFooz1UBFn8B = Foo[];
export type Bar = number;
export type BunchaNumbers = [Bar];
export type OneOfStuff = UnorderedSetOfFooz1UBFn8B | BunchaNumbers;
/**
 *
 * Generated! Represents an alias to any of the provided schemas
 *
 */
export type AnyOfFooFooObjectOfBazX101YId8OneOfStuffBar = Foo | ObjectOfBazX101YId8 | OneOfStuff | Bar;
