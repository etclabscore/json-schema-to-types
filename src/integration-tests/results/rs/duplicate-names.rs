extern crate serde_json;

pub type StringWxzVcTo3 = String;
pub type BooleanQg3XFxa5 = bool;
#[derive(Serialize, Deserialize)]
pub struct ObjectOfBooleanQg3XFxa5U126EkTS {
    pub(crate) ripslip: BooleanQg3XFxa5,
}
/// UnorderedSetOfStringWxzVcTo3YX5DSLJx
///
/// array of strings is all...
///
pub type UnorderedSetOfStringWxzVcTo3YX5DSLJx = Vec<StringWxzVcTo3>;
pub type IntegerBxA6IlE2 = i64;
pub type BunchaNumbers = (IntegerBxA6IlE2);
#[derive(Serialize, Deserialize)]
pub enum OneOfStuff {
    UnorderedSetOfStringWxzVcTo3YX5DSLJx,
    BunchaNumbers
}
