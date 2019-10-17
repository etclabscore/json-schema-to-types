pub type pets = Vec<oneOf_Bear_Man_Pig_sb42HoGS>;
pub type Bear = serde_json::Value;
pub type Man = serde_json::Value;
pub type Pig = serde_json::Value;
#[derive(Serialize, Deserialize)]
pub enum oneOf_Bear_Man_Pig_sb42HoGS {
    Bear,
    Man,
    Pig
}
