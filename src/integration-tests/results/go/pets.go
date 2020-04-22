type Man interface{}
type Bear interface{}
type Pig interface{}
type OneOfBearManPigRIVnq1Ij struct {
	Man  *Man
	Bear *Bear
	Pig  *Pig
}
// UnmarshalJSON implements the json Unmarshaler interface.
// This implementation DOES NOT assert that ONE AND ONLY ONE
// of the simple properties is satisfied; it lazily uses the first one that is satisfied.
// Ergo, it will not return an error if more than one property is valid.
func (o *OneOfBearManPigRIVnq1Ij) UnmarshalJSON(bytes []byte) error {

	var myMan Man
	if err := json.Unmarshal(bytes, &myMan); err == nil {
		o.Man = &myMan
		return nil
	}

	var myBear Bear
	if err := json.Unmarshal(bytes, &myBear); err == nil {
		o.Bear = &myBear
		return nil
	}

	var myPig Pig
	if err := json.Unmarshal(bytes, &myPig); err == nil {
		o.Pig = &myPig
		return nil
	}

	return errors.New("failed to unmarshal one of the object properties")
}
func (o OneOfBearManPigRIVnq1Ij) MarshalJSON() ([]byte, error) {

	if o.Man != nil {
		return json.Marshal(o.Man)
	}
	if o.Bear != nil {
		return json.Marshal(o.Bear)
	}
	if o.Pig != nil {
		return json.Marshal(o.Pig)
	}

	return nil, errors.New("failed to marshal any one of the object properties")
}
// a bunch of pets
type Pets []OneOfBearManPigRIVnq1Ij