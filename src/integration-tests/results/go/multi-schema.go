type StringDoaGddGA string
type OneOfStringDoaGddGAStringDoaGddGABERs71N5 struct {
	StringDoaGddGA *StringDoaGddGA
	StringDoaGddGA *StringDoaGddGA
}
func (a *OneOfStringDoaGddGAStringDoaGddGABERs71N5) UnmarshalJSON(bytes []byte) error {
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
		if c, ok := i.(*StringDoaGddGA); ok {
			a.StringDoaGddGA = c
		} else if c, ok := i.(*StringDoaGddGA); ok {
			a.StringDoaGddGA = c
		} else {
			return errors.New("unknown anyOf type")
		}
	}
	return nil
}
func (a OneOfStringDoaGddGAStringDoaGddGABERs71N5) MarshalJSON() ([]byte, error) {
	// Marshaling should always return an array.
	out := []interface{}{}
		if a.StringDoaGddGA != nil {
		out = append(out, a.StringDoaGddGA)
	}
	if a.StringDoaGddGA != nil {
		out = append(out, a.StringDoaGddGA)
	}
	return json.Marshal(out)
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
func (a *AnyOfPetsStringLxWtMXSJMan) UnmarshalJSON(bytes []byte) error {
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
		if c, ok := i.(*Pets); ok {
			a.Pets = c
		} else if c, ok := i.(*StringLxWtMXSJ); ok {
			a.StringLxWtMXSJ = c
		} else if c, ok := i.(*Man); ok {
			a.Man = c
		} else {
			return errors.New("unknown anyOf type")
		}
	}
	return nil
}
func (a AnyOfPetsStringLxWtMXSJMan) MarshalJSON() ([]byte, error) {
	// Marshaling should always return an array.
	out := []interface{}{}
		if a.Pets != nil {
		out = append(out, a.Pets)
	}
	if a.StringLxWtMXSJ != nil {
		out = append(out, a.StringLxWtMXSJ)
	}
	if a.Man != nil {
		out = append(out, a.Man)
	}
	return json.Marshal(out)
}