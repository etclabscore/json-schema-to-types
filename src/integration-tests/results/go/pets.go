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

	var myVar0 Man
	err = json.Unmarshal(bytes, &myVar0)
	if err == nil {
		t.Man = &myVar0
		return nil
}	

	var myVar1 Bear
	err = json.Unmarshal(bytes, &myVar1)
	if err == nil {
		t.Bear = &myVar1
		return nil
}
	var myVar2 Pig
	err = json.Unmarshal(bytes, &myVar2)
	if err != nil {
		return err
	}
	t.Pig = &myVar2
	return nil
}

// a bunch of pets
type Pets []OneOfBearManPigRIVnq1Ij