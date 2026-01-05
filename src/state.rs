use std::sync::{Arc, Mutex};
use crate::models::BlogPost;

pub type Db = Arc<Mutex<Vec<BlogPost>>>;
