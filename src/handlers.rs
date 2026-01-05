use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use uuid::Uuid;

use crate::{models::{BlogPost, CreatePost}, state::Db};

// GET /posts - all posts
pub async fn get_posts(State(db): State<Db>) -> Json<Vec<BlogPost>> {
    let posts = db.lock().unwrap();
    Json(posts.clone())
}

// GET /posts/:id - single post by UUID
pub async fn get_post(
    Path(id): Path<Uuid>,
    State(db): State<Db>,
) -> Result<Json<BlogPost>, StatusCode> {
    let posts = db.lock().unwrap();
    posts
        .iter()
        .find(|p| p.id == id)
        .cloned()
        .map(Json)
        .ok_or(StatusCode::NOT_FOUND)
}

// POST /posts - create a new post
pub async fn create_post(
    State(db): State<Db>,
    Json(payload): Json<CreatePost>, // ⚠️ Change from BlogPost to CreatePost
) -> Json<BlogPost> {
    let mut posts = db.lock().unwrap();

    let post = BlogPost {
        id: Uuid::new_v4(),       // ⚡ Generate UUID here
        title: payload.title,
        content: payload.content,
    };

    posts.push(post.clone());
    Json(post) // Return the created post
}

// DELETE /posts/:id - delete a post
pub async fn delete_post(
    Path(id): Path<Uuid>,
    State(db): State<Db>,
) -> StatusCode {
    let mut posts = db.lock().unwrap();
    posts.retain(|p| p.id != id);
    StatusCode::NO_CONTENT
}
