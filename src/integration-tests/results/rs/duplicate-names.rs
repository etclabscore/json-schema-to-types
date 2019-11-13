extern crate serde_json;

pub type StringDoaGddGA = String;
pub type BooleanVyG3AETh = bool;
#[derive(Serialize, Deserialize)]
pub struct ObjectOfBooleanVyG3AETh5PX0GXMY {
    pub(crate) ripslip: Option<BooleanVyG3AETh>,
}
/// UnorderedSetOfStringDoaGddGAmrf5BlCm
///
/// array of strings is all...
///
pub type UnorderedSetOfStringDoaGddGAmrf5BlCm = Vec<StringDoaGddGA>;
pub type IntegerXZTmW7Mv = i64;
pub type BunchaNumbers = (IntegerXZTmW7Mv);
#[derive(Serialize, Deserialize)]
pub enum OneOfStuff {
    UnorderedSetOfStringDoaGddGAmrf5BlCm,
    BunchaNumbers
}
