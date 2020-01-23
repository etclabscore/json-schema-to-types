use serde::{Serialize, Deserialize};
use std::collections::HashMap;
extern crate serde_json;

#[derive(Serialize, Deserialize)]
pub struct CircularRefs {
    pub(crate) LeFoo: Option<CircularRefs>,
}
