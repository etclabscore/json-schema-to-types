export type Skip = boolean;
/**
 *
 * abc 123
 *
 * @example
 * `123`
 *
 * @example
 * `456`
 *
 * @example
 * `789`
 *
 */
export type Bip = number;
export type Bipper = number;
export type Bop = number;
export type Bopper = "asd" | "bca";
export type Skibb = any;
export type Skibbidippy = Bop[];
export type Bopskippity = string;
export type Floopdidoop = Skiperydippery & Bonkiedonky;
export interface Skiperydippery {
  fooberdoober?: Bop;
  gibbledybits?: Bopskippity;
  [k: string]: any;
}
export type Doppler = string;
export type Gorbelchov = number;
export interface Bonkiedonky {
  shopper?: Doppler;
  badmirputin?: Gorbelchov;
  [k: string]: any;
}
export type Zip = number;
export type Skorpionuts = Skip | Zip;
export type Chikypoops = Skip | Zip;
export interface BippyskippyBoppy {
  bool?: Skip;
  int?: Bip;
  number?: Bipper;
  string?: Bop;
  stringEnum?: Bopper;
  orderedArray?: Skibbidippy;
  unorderedArray?: Skibbidippy;
  object?: Floopdidoop;
  allOf?: Floopdidoop;
  anyOf?: Skorpionuts;
  oneOf?: Chikypoops;
  [k: string]: any;
}
