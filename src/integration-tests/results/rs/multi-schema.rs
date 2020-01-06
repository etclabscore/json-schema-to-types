extern crate serde_json;

pub type StringDoaGddGA = String;
#[derive(Serialize, Deserialize)]
pub enum OneOfStringDoaGddGAStringDoaGddGABERs71N5 {
    StringDoaGddGA,
    StringDoaGddGA
}
/// Pets
///
/// a bunch of pets
///
pub type Pets = Vec<OneOfStringDoaGddGAStringDoaGddGABERs71N5>;
/// StringLxWtMXSJ
///
/// simplest test case
///
pub type StringLxWtMXSJ = String;
pub type Man = serde_json::Value;
#[derive(Serialize, Deserialize)]
pub enum AnyOfPetsStringLxWtMXSJMan {
    Pets,
    StringLxWtMXSJ,
    Man
}
