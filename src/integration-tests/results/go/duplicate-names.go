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
// UnmarshalJSON implements the json Unmarshaler interface.
// This implementation DOES NOT assert that ONE AND ONLY ONE
// of the simple properties is satisfied; it lazily uses the first one that is satisfied.
// Ergo, it will not return an error if more than one property is valid.
func (o *OneOfStuff) UnmarshalJSON(bytes []byte) error {

	var myUnorderedSetOfFooz1UBFn8B UnorderedSetOfFooz1UBFn8B
	if err := json.Unmarshal(bytes, &myUnorderedSetOfFooz1UBFn8B); err == nil {
		o.UnorderedSetOfFooz1UBFn8B = &myUnorderedSetOfFooz1UBFn8B
		return nil
	}

	var myBunchaNumbers BunchaNumbers
	if err := json.Unmarshal(bytes, &myBunchaNumbers); err == nil {
		o.BunchaNumbers = &myBunchaNumbers
		return nil
	}

	return errors.New("failed to unmarshal one of the object properties")
}
func (o OneOfStuff) MarshalJSON() ([]byte, error) {

	if o.UnorderedSetOfFooz1UBFn8B != nil {
		return json.Marshal(o.UnorderedSetOfFooz1UBFn8B)
	}
	if o.BunchaNumbers != nil {
		return json.Marshal(o.BunchaNumbers)
	}

	return nil, errors.New("failed to marshal any one of the object properties")
}
// Generated! Represents an alias to any of the provided schemas
type AnyOfFooFooObjectOfBazX101YId8OneOfStuffBar struct {
	Foo                 *Foo
	ObjectOfBazX101YId8 *ObjectOfBazX101YId8
	OneOfStuff          *OneOfStuff
	Bar                 *Bar
}
func (a *AnyOfFooFooObjectOfBazX101YId8OneOfStuffBar) UnmarshalJSON(bytes []byte) error {
	var ok bool

	var myFoo Foo
	if err := json.Unmarshal(bytes, &myFoo); err == nil {
		ok = true
		a.Foo = &myFoo
	}

	var myObjectOfBazX101YId8 ObjectOfBazX101YId8
	if err := json.Unmarshal(bytes, &myObjectOfBazX101YId8); err == nil {
		ok = true
		a.ObjectOfBazX101YId8 = &myObjectOfBazX101YId8
	}

	var myOneOfStuff OneOfStuff
	if err := json.Unmarshal(bytes, &myOneOfStuff); err == nil {
		ok = true
		a.OneOfStuff = &myOneOfStuff
	}

	var myBar Bar
	if err := json.Unmarshal(bytes, &myBar); err == nil {
		ok = true
		a.Bar = &myBar
	}

	// Did unmarshal at least one of the simple objects.
	if ok {
		return nil
	}
	return errors.New("failed to unmarshal any of the object properties")
}