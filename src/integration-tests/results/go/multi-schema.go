type StringDoaGddGA string
type OneOfStringDoaGddGAStringDoaGddGABERs71N5 struct {


	StringDoaGddGA *StringDoaGddGA
	StringDoaGddGA *StringDoaGddGA
}
func (t OneOfStringDoaGddGAStringDoaGddGABERs71N5) MarshalJSON() ([]byte, error) {
	if t.StringDoaGddGA != nil {
		return json.Marshal(t.StringDoaGddGA)
	}

	return json.Marshal(t.StringDoaGddGA)
}

func (t *OneOfStringDoaGddGAStringDoaGddGABERs71N5) UnmarshalJSON(bytes []byte) error {
	var err error

	try0 := StringDoaGddGA{}
	err = json.Unmarshal(bytes, &try0)
	if err == nil {
		t.StringDoaGddGA = &try0
		return nil
}
	try1 := StringDoaGddGA{}
	err = json.Unmarshal(bytes, &try1)
	if err != nil {
		return err
	}
	t.StringDoaGddGA = &try1
	return nil
}

// a bunch of pets
type Pets []OneOfStringDoaGddGAStringDoaGddGABERs71N5
// simplest test case
type StringLxWtMXSJ string
type Man interface{}
// Generated! Represents an alias to any of the provided schemas
type AnyOfPetsStringLxWtMXSJMan struct {
	Pets           *Pets
	StringLxWtMXSJ *StringLxWtMXSJ
	Man            *Man
}
func (t AnyOfPetsStringLxWtMXSJMan) MarshalJSON() ([]byte, error) {
	if t.Pets != nil {
		return json.Marshal(t.Pets)
	}
	return json.Marshal(t.StringLxWtMXSJ)
}

func (t *AnyOfPetsStringLxWtMXSJMan) UnmarshalJSON(data []byte) error {
	var first byte
	if len(data) > 1 {
		first = data[0]
	}
	if first == '[' {
		var parsed = StringLxWtMXSJ{}
		if err := json.Unmarshal(data, &parsed); err != nil {
			return err
		}
		t.StringLxWtMXSJ = &parsed
		return nil
	}
	var single Pets
	if err := json.Unmarshal(data, &single); err != nil {
		return err
	}
	t.Pets = &single
	return nil
}