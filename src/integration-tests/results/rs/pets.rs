extern crate serde_json;

/// Pets
///
/// a bunch of pets
///
pub type Pets = Vec<OneOfBearManPigSb42HoGS>;
pub type Bear = serde_json::Value;
pub type Man = serde_json::Value;
pub type Pig = serde_json::Value;
#[derive(Serialize, Deserialize)]
pub enum OneOfBearManPigSb42HoGS {
    Bear,
    Man,
    Pig
}
