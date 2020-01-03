type Man interface{}
type Bear interface{}
type Pig interface{}
type OneOfBearManPigRIVnq1Ij struct {
	Man  *Man
	Bear *Bear
	Pig  *Pig
}
// a bunch of pets
type Pets []OneOfBearManPigRIVnq1Ij
