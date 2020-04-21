type Foo string
type Baz bool
type ObjectOfBazX101YId8 struct {
	Ripslip *Baz `json:"ripslip,omitempty"`
}
// array of strings is all...
type UnorderedSetOfFooz1UBFn8B []Foo
type Bar int64
type BunchaNumbers (Bar)
type OneOfStuff struct {
	UnorderedSetOfFooz1UBFn8B *UnorderedSetOfFooz1UBFn8B
	BunchaNumbers             *BunchaNumbers
}
func (a *OneOfStuff) UnmarshalJSON(bytes []byte) error {
	// Unmarshaling should assume the input is an array.
	in := []interface{}{}
	if err := json.Unmarshal(bytes, &in); err != nil {
		return err
	}
	if len(in) == 0 {
		return nil
	}
	for _, i := range in {
		// This does not handle the case of duplicates in the incoming
		// array. Assuming that is not allowed by JSON schema spec.
		if c, ok := i.(*UnorderedSetOfFooz1UBFn8B); ok {
			a.UnorderedSetOfFooz1UBFn8B = c
		} else if c, ok := i.(*BunchaNumbers); ok {
			a.BunchaNumbers = c
		} else {
			return errors.New("unknown anyOf type")
		}
	}
	return nil
}
func (a OneOfStuff) MarshalJSON() ([]byte, error) {
	// Marshaling should always return an array.
	out := []interface{}{}
		if a.UnorderedSetOfFooz1UBFn8B != nil {
		out = append(out, a.UnorderedSetOfFooz1UBFn8B)
	}
	if a.BunchaNumbers != nil {
		out = append(out, a.BunchaNumbers)
	}
	return json.Marshal(out)
}
// Generated! Represents an alias to any of the provided schemas
type AnyOfFooFooObjectOfBazX101YId8OneOfStuffBar struct {
	Foo                 *Foo
	ObjectOfBazX101YId8 *ObjectOfBazX101YId8
	OneOfStuff          *OneOfStuff
	Bar                 *Bar
}
func (a *AnyOfFooFooObjectOfBazX101YId8OneOfStuffBar) UnmarshalJSON(bytes []byte) error {
	// Unmarshaling should assume the input is an array.
	in := []interface{}{}
	if err := json.Unmarshal(bytes, &in); err != nil {
		return err
	}
	if len(in) == 0 {
		return nil
	}
	for _, i := range in {
		// This does not handle the case of duplicates in the incoming
		// array. Assuming that is not allowed by JSON schema spec.
		if c, ok := i.(*Foo); ok {
			a.Foo = c
		} else if c, ok := i.(*ObjectOfBazX101YId8); ok {
			a.ObjectOfBazX101YId8 = c
		} else if c, ok := i.(*OneOfStuff); ok {
			a.OneOfStuff = c
		} else if c, ok := i.(*Bar); ok {
			a.Bar = c
		} else {
			return errors.New("unknown anyOf type")
		}
	}
	return nil
}
func (a AnyOfFooFooObjectOfBazX101YId8OneOfStuffBar) MarshalJSON() ([]byte, error) {
	// Marshaling should always return an array.
	out := []interface{}{}
		if a.Foo != nil {
		out = append(out, a.Foo)
	}
	if a.ObjectOfBazX101YId8 != nil {
		out = append(out, a.ObjectOfBazX101YId8)
	}
	if a.OneOfStuff != nil {
		out = append(out, a.OneOfStuff)
	}
	if a.Bar != nil {
		out = append(out, a.Bar)
	}
	return json.Marshal(out)
}