type Man interface{}
type Bear interface{}
type Pig interface{}
type OneOfBearManPigRIVnq1Ij struct {



	Man  *Man
	Bear *Bear
	Pig  *Pig
}
func (t OneOfBearManPigRIVnq1Ij) MarshalJSON() ([]byte, error) {
	if t.Man != nil {
		return json.Marshal(t.Man)
	}
	
	if t.Bear != nil {
		return json.Marshal(t.Bear)
	}

	return json.Marshal(t.Pig)
}

func (t *OneOfBearManPigRIVnq1Ij) UnmarshalJSON(bytes []byte) error {
	var err error

	try0 := Man{}
	err = json.Unmarshal(bytes, &try0)
	if err == nil {
		t.Man = &try0
		return nil
}	

	try1 := Bear{}
	err = json.Unmarshal(bytes, &try1)
	if err == nil {
		t.Bear = &try1
		return nil
}
	try2 := Pig{}
	err = json.Unmarshal(bytes, &try2)
	if err != nil {
		return err
	}
	t.Pig = &try2
	return nil
}

// a bunch of pets
type Pets []OneOfBearManPigRIVnq1Ij