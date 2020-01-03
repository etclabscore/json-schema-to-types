type Baz bool
type Foo string
// array of strings is all...
type UnorderedSetOfFooz1UBFn8B []Foo
type Bar int64
type BunchaNumbers (Bar)
type ObjectOfBazX101YId8 struct {
	Ripslip *Baz `json:"ripslip,omitempty"`
}
type OneOfStuff struct {
	UnorderedSetOfFooz1UBFn8B *UnorderedSetOfFooz1UBFn8B
	BunchaNumbers *BunchaNumbers
}
// Generated! Represents an alias to any of the provided schemas
type AnyOfFooFooObjectOfBazX101YId8OneOfStuffBar struct {
	Foo *Foo
	ObjectOfBazX101YId8 *ObjectOfBazX101YId8
	OneOfStuff *OneOfStuff
	Bar *Bar
}
