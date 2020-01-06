export type Skip = boolean;
/**
 *
 * abc 123
 *
 * @default  123
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
export type Swicker = 123 | 321;
export type Slicker = 123 | 321;
export type Splinter = any[];
export type Skibb = any;
export type Skibbidippy = Bop[];
export type Bopskippity = string;
export interface Floopdidoop {
  fooberdoober: Bop;
  gibbledybits?: Bopskippity;
}
export interface Skiperydippery {
  fooberdoober?: Bop;
  gibbledybits?: Bopskippity;
}
export interface Doppler { [key: string]: any; }
export type Gorbelchov = number;
export interface Bonkiedonky {
  shopper?: Doppler;
  badmirputin?: Gorbelchov;
}
export type Justworkalready = Skiperydippery & Bonkiedonky;
export type Zip = number;
export type Nullgasm = null;
export type Skorpionuts = Skip | Zip | Nullgasm;
export type Chikypoops = Skip | Zip;
export interface BippyskippyBoppy {
  bool?: Skip;
  int?: Bip;
  number?: Bipper;
  string?: Bop;
  stringEnum?: Bopper;
  numbericalEnum?: Swicker;
  integerEnum?: Slicker;
  untypedArray?: Splinter;
  orderedArray?: Skibbidippy;
  unorderedArray?: Skibbidippy;
  object?: Floopdidoop;
  allOf?: Justworkalready;
  anyOf?: Skorpionuts;
  oneOf?: Chikypoops;
  [k: string]: any;
}
