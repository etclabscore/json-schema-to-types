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
func (t Skorpionuts) MarshalJSON() ([]byte, error) {
	if t.Skip != nil {
		return json.Marshal(t.Skip)
	}
	return json.Marshal(t.Zip)
}

func (t *Skorpionuts) UnmarshalJSON(data []byte) error {
	var first byte
	if len(data) > 1 {
		first = data[0]
	}
	if first == '[' {
		var parsed Zip
		if err := json.Unmarshal(data, &parsed); err != nil {
			return err
		}
		t.Zip = &parsed
		return nil
	}
	var single Skip
	if err := json.Unmarshal(data, &single); err != nil {
		return err
	}
	t.Skip = &single
	return nil
}
type Chikypoops struct {
	Skip *Skip
	Zip  *Zip
}
func (t Chikypoops) MarshalJSON() ([]byte, error) {
	if t.Skip != nil {
		return json.Marshal(t.Skip)
	}
	return json.Marshal(t.Zip)
}

func (t *Chikypoops) UnmarshalJSON(data []byte) error {
	var first byte
	if len(data) > 1 {
		first = data[0]
	}
	if first == '[' {
		var parsed Zip
		if err := json.Unmarshal(data, &parsed); err != nil {
			return err
		}
		t.Zip = &parsed
		return nil
	}
	var single Skip
	if err := json.Unmarshal(data, &single); err != nil {
		return err
	}
	t.Skip = &single
	return nil
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