type CircularRefs struct {
	LeFoo *CircularRefs `json:"LeFoo,omitempty"`
}
