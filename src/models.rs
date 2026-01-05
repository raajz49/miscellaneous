use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize)]
pub struct BlogPost {
    pub id: Uuid,
    pub title: String,
    pub content: String,
}

#[derive(Debug, Clone, Deserialize)]
pub struct CreatePost {
    pub title: String,
    pub content: String,
}
