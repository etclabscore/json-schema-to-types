type StringDoaGddGA string
type OneOfStringDoaGddGAStringDoaGddGABERs71N5 struct {
	StringDoaGddGA *StringDoaGddGA
	StringDoaGddGA *StringDoaGddGA
}
// UnmarshalJSON implements the json Unmarshaler interface.
// This implementation DOES NOT assert that ONE AND ONLY ONE
// of the simple properties is satisfied; it lazily uses the first one that is satisfied.
// Ergo, it will not return an error if more than one property is valid.
func (o *OneOfStringDoaGddGAStringDoaGddGABERs71N5) UnmarshalJSON(bytes []byte) error {

	var myStringDoaGddGA StringDoaGddGA
	if err := json.Unmarshal(bytes, &myStringDoaGddGA); err == nil {
		o.StringDoaGddGA = &myStringDoaGddGA
		return nil
	}

	var myStringDoaGddGA StringDoaGddGA
	if err := json.Unmarshal(bytes, &myStringDoaGddGA); err == nil {
		o.StringDoaGddGA = &myStringDoaGddGA
		return nil
	}

	return errors.New("failed to unmarshal one of the object properties")
}
func (o OneOfStringDoaGddGAStringDoaGddGABERs71N5) MarshalJSON() ([]byte, error) {

	if o.StringDoaGddGA != nil {
		return json.Marshal(o.StringDoaGddGA)
	}
	if o.StringDoaGddGA != nil {
		return json.Marshal(o.StringDoaGddGA)
	}

	return nil, errors.New("failed to marshal any one of the object properties")
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
	var ok bool

	var myPets Pets
	if err := json.Unmarshal(bytes, &myPets); err == nil {
		ok = true
		a.Pets = &myPets
	}

	var myStringLxWtMXSJ StringLxWtMXSJ
	if err := json.Unmarshal(bytes, &myStringLxWtMXSJ); err == nil {
		ok = true
		a.StringLxWtMXSJ = &myStringLxWtMXSJ
	}

	var myMan Man
	if err := json.Unmarshal(bytes, &myMan); err == nil {
		ok = true
		a.Man = &myMan
	}

	// Did unmarshal at least one of the simple objects.
	if ok {
		return nil
	}
	return errors.New("failed to unmarshal any of the object properties")
}