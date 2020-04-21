type Skip bool
// abc 123
//
// --- Default ---
//
// 123
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
type Swicker float64
const (
	SwickerEnum0 Swicker = 123
	SwickerEnum1 Swicker = 321
)
type Slicker int64
const (
	SlickerEnum0 Slicker = 123
	SlickerEnum1 Slicker = 321
)
type Splinter []interface{}
type Skibb interface{}
type Skibbidippy []Bop
type Bopskippity string
type Floopdidoop struct {
	Fooberdoober *Bop         `json:"fooberdoober"`
	Gibbledybits *Bopskippity `json:"gibbledybits,omitempty"`
}
type Skiperydippery struct {
	Fooberdoober *Bop         `json:"fooberdoober,omitempty"`
	Gibbledybits *Bopskippity `json:"gibbledybits,omitempty"`
}
type Doppler map[string]interface{}
type Gorbelchov float64
type Bonkiedonky struct {
	Shopper     *Doppler    `json:"shopper,omitempty"`
	Badmirputin *Gorbelchov `json:"badmirputin,omitempty"`
}
type Justworkalready map[string]interface{}
type Zip int64
type Nullgasm interface{}
type Skorpionuts struct {
	Skip     *Skip
	Zip      *Zip
	Nullgasm *Nullgasm
}
func (a *Skorpionuts) UnmarshalJSON(bytes []byte) error {
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
		if c, ok := i.(*Skip); ok {
			a.Skip = c
		} else if c, ok := i.(*Zip); ok {
			a.Zip = c
		} else if c, ok := i.(*Nullgasm); ok {
			a.Nullgasm = c
		} else {
			return errors.New("unknown anyOf type")
		}
	}
	return nil
}
func (a Skorpionuts) MarshalJSON() ([]byte, error) {
	// Marshaling should always return an array.
	out := []interface{}{}
		if a.Skip != nil {
		out = append(out, a.Skip)
	}
	if a.Zip != nil {
		out = append(out, a.Zip)
	}
	if a.Nullgasm != nil {
		out = append(out, a.Nullgasm)
	}
	return json.Marshal(out)
}
type Chikypoops struct {
	Skip *Skip
	Zip  *Zip
}
func (a *Chikypoops) UnmarshalJSON(bytes []byte) error {
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
		if c, ok := i.(*Skip); ok {
			a.Skip = c
		} else if c, ok := i.(*Zip); ok {
			a.Zip = c
		} else {
			return errors.New("unknown anyOf type")
		}
	}
	return nil
}
func (a Chikypoops) MarshalJSON() ([]byte, error) {
	// Marshaling should always return an array.
	out := []interface{}{}
		if a.Skip != nil {
		out = append(out, a.Skip)
	}
	if a.Zip != nil {
		out = append(out, a.Zip)
	}
	return json.Marshal(out)
}
type BippyskippyBoppy struct {
	Bool           *Skip            `json:"bool,omitempty"`
	Int            *Bip             `json:"int,omitempty"`
	Number         *Bipper          `json:"number,omitempty"`
	String         *Bop             `json:"string,omitempty"`
	StringEnum     *Bopper          `json:"stringEnum,omitempty"`
	NumbericalEnum *Swicker         `json:"numbericalEnum,omitempty"`
	IntegerEnum    *Slicker         `json:"integerEnum,omitempty"`
	UntypedArray   *Splinter        `json:"untypedArray,omitempty"`
	OrderedArray   *Skibbidippy     `json:"orderedArray,omitempty"`
	UnorderedArray *Skibbidippy     `json:"unorderedArray,omitempty"`
	Object         *Floopdidoop     `json:"object,omitempty"`
	AllOf          *Justworkalready `json:"allOf,omitempty"`
	AnyOf          *Skorpionuts     `json:"anyOf,omitempty"`
	OneOf          *Chikypoops      `json:"oneOf,omitempty"`
}