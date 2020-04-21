type Man interface{}
type Bear interface{}
type Pig interface{}
type OneOfBearManPigRIVnq1Ij struct {
	Man  *Man
	Bear *Bear
	Pig  *Pig
}
func (a *OneOfBearManPigRIVnq1Ij) UnmarshalJSON(bytes []byte) error {
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
		if c, ok := i.(*Man); ok {
			a.Man = c
		} else if c, ok := i.(*Bear); ok {
			a.Bear = c
		} else if c, ok := i.(*Pig); ok {
			a.Pig = c
		} else {
			return errors.New("unknown anyOf type")
		}
	}
	return nil
}
func (a OneOfBearManPigRIVnq1Ij) MarshalJSON() ([]byte, error) {
	// Marshaling should always return an array.
	out := []interface{}{}
		if a.Man != nil {
		out = append(out, a.Man)
	}
	if a.Bear != nil {
		out = append(out, a.Bear)
	}
	if a.Pig != nil {
		out = append(out, a.Pig)
	}
	return json.Marshal(out)
}
// a bunch of pets
type Pets []OneOfBearManPigRIVnq1Ij