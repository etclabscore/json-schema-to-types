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
func (t OneOfStuff) MarshalJSON() ([]byte, error) {
	if t.UnorderedSetOfFooz1UBFn8B != nil {
		return json.Marshal(t.UnorderedSetOfFooz1UBFn8B)
	}

	return json.Marshal(t.BunchaNumbers)
}

func (t *OneOfStuff) UnmarshalJSON(bytes []byte) error {
	var err error

	try0 := UnorderedSetOfFooz1UBFn8B{}
	err = json.Unmarshal(bytes, &try0)
	if err == nil {
		t.UnorderedSetOfFooz1UBFn8B = &try0
		return nil
}
	try1 := BunchaNumbers{}
	err = json.Unmarshal(bytes, &try1)
	if err != nil {
		return err
	}
	t.BunchaNumbers = &try1
	return nil
}

// Generated! Represents an alias to any of the provided schemas
type AnyOfFooFooObjectOfBazX101YId8OneOfStuffBar struct {
	Foo                 *Foo
	ObjectOfBazX101YId8 *ObjectOfBazX101YId8
	OneOfStuff          *OneOfStuff
	Bar                 *Bar
}
func (t AnyOfFooFooObjectOfBazX101YId8OneOfStuffBar) MarshalJSON() ([]byte, error) {
	if t.Foo != nil {
		return json.Marshal(t.Foo)
	}
	return json.Marshal(t.ObjectOfBazX101YId8)
}

func (t *AnyOfFooFooObjectOfBazX101YId8OneOfStuffBar) UnmarshalJSON(data []byte) error {
	var first byte
	if len(data) > 1 {
		first = data[0]
	}
	if first == '[' {
		var parsed = ObjectOfBazX101YId8{}
		if err := json.Unmarshal(data, &parsed); err != nil {
			return err
		}
		t.ObjectOfBazX101YId8 = &parsed
		return nil
	}
	var single Foo
	if err := json.Unmarshal(data, &single); err != nil {
		return err
	}
	t.Foo = &single
	return nil
}