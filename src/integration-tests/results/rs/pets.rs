extern crate serde_json;

/// Pets
///
/// a bunch of pets
///
pub type Pets = Vec<OneOfManBearPigDYW6G7UV>;
pub type Man = serde_json::Value;
pub type Bear = serde_json::Value;
pub type Pig = serde_json::Value;
#[derive(Serialize, Deserialize)]
pub enum OneOfManBearPigDYW6G7UV {
    Man,
    Bear,
    Pig
}
