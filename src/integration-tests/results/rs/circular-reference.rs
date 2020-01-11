extern crate serde_json;

#[derive(Serialize, Deserialize)]
pub struct CircularRefs {
    pub(crate) LeFoo: Option<CircularRefs>,
}
