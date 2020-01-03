type Skip bool
// abc 123
//
// --- Example ---
//
// `123`
//
// --- Example ---
//
// `456`
//
// --- Example ---
//
// `789`
type Bip int64
type Bipper float64
type Bop float64
type Bopper string
const (
	BopperEnum0 Bopper = "asd"
	BopperEnum1 Bopper = "bca"
)
type Skibb interface{}
type Skibbidippy []Bop
type Bopskippity string
type Floopdidoop struct {
}
type Skiperydippery struct {
	Fooberdoober *Bop         `json:"fooberdoober,omitempty"`
	Gibbledybits *Bopskippity `json:"gibbledybits,omitempty"`
}
type Doppler string
type Gorbelchov float64
type Bonkiedonky struct {
	Shopper     *Doppler    `json:"shopper,omitempty"`
	Badmirputin *Gorbelchov `json:"badmirputin,omitempty"`
}
type Zip int64
type Skorpionuts struct {
	Skip *Skip
	Zip  *Zip
}
type Chikypoops struct {
	Skip *Skip
	Zip  *Zip
}
type BippyskippyBoppy struct {
	Bool           *Skip        `json:"bool,omitempty"`
	Int            *Bip         `json:"int,omitempty"`
	Number         *Bipper      `json:"number,omitempty"`
	String         *Bop         `json:"string,omitempty"`
	StringEnum     *Bopper      `json:"stringEnum,omitempty"`
	OrderedArray   *Skibbidippy `json:"orderedArray,omitempty"`
	UnorderedArray *Skibbidippy `json:"unorderedArray,omitempty"`
	Object         *Floopdidoop `json:"object,omitempty"`
	AllOf          *Floopdidoop `json:"allOf,omitempty"`
	AnyOf          *Skorpionuts `json:"anyOf,omitempty"`
	OneOf          *Chikypoops  `json:"oneOf,omitempty"`
}
