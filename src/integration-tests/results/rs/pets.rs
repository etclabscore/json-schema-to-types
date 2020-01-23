use serde::{Serialize, Deserialize};
use std::collections::HashMap;
extern crate serde_json;

pub type Man = serde_json::Value;
pub type Bear = serde_json::Value;
pub type Pig = serde_json::Value;
#[derive(Serialize, Deserialize)]
pub enum OneOfBearManPigRIVnq1Ij {
    Man,
    Bear,
    Pig
}
/// Pets
///
/// a bunch of pets
///
pub type Pets = Vec<OneOfBearManPigRIVnq1Ij>;
