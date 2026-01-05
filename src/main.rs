mod handlers;
mod models;
mod state;

use axum::{
    routing::{get},
    Router,
};
use state::Db;
use std::sync::{Arc, Mutex};
use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() {
    let db: Db = Arc::new(Mutex::new(Vec::new()));

    let app = Router::new()
        .route("/posts", get(handlers::get_posts).post(handlers::create_post))
        .route(
            "/posts/:id",
            get(handlers::get_post).delete(handlers::delete_post),
        )
        .with_state(db)
        .layer(CorsLayer::permissive());

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    println!("Server running at http://localhost:3000");
    axum::serve(listener, app).await.unwrap();
}
