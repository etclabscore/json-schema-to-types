extern crate serde_json;

pub type Foo = String;
pub type Baz = bool;
#[derive(Serialize, Deserialize)]
pub struct ObjectOfBazX101YId8 {
    pub(crate) ripslip: Option<Baz>,
}
/// UnorderedSetOfFooz1UBFn8B
///
/// array of strings is all...
///
pub type UnorderedSetOfFooz1UBFn8B = Vec<Foo>;
pub type Bar = i64;
pub type BunchaNumbers = (Bar);
#[derive(Serialize, Deserialize)]
pub enum OneOfStuff {
    UnorderedSetOfFooz1UBFn8B,
    BunchaNumbers
}
#[derive(Serialize, Deserialize)]
pub enum AnyOfFooFooObjectOfBazX101YId8OneOfStuffBar {
    Foo,
    ObjectOfBazX101YId8,
    OneOfStuff,
    Bar
}
