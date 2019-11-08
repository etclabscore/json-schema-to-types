extern crate serde_json;

pub type StringWxzVcTo3 = String;
pub type BooleanQg3XFxa5 = bool;
#[derive(Serialize, Deserialize)]
pub struct ObjectOfBooleanQg3XFxa5GMZRBVXu {
    pub(crate) ripslip: Option<BooleanQg3XFxa5>,
}
/// UnorderedSetOfStringWxzVcTo34KPCMNDQ
///
/// array of strings is all...
///
pub type UnorderedSetOfStringWxzVcTo34KPCMNDQ = Vec<StringWxzVcTo3>;
pub type IntegerBxA6IlE2 = i64;
pub type BunchaNumbers = (IntegerBxA6IlE2);
#[derive(Serialize, Deserialize)]
pub enum OneOfStuff {
    UnorderedSetOfStringWxzVcTo34KPCMNDQ,
    BunchaNumbers
}
