pub mod user;

use serde::{Deserialize, Serialize};
use tauri_plugin_http::reqwest;

use crate::models::error_response::ErrorResponse;

#[derive(Clone, Debug, PartialEq, Serialize, Deserialize, specta::Type)]
pub struct CommandError {
    message: String,
}

impl CommandError {
    pub fn deserialize_error() -> Self {
        Self {
            message: "command/deserialize".to_string(),
        }
    }
}

impl From<reqwest::Error> for CommandError {
    fn from(value: reqwest::Error) -> Self {
        Self {
            message: value.to_string(),
        }
    }
}

impl From<ErrorResponse> for CommandError {
    fn from(value: ErrorResponse) -> Self {
        Self {
            message: value.message,
        }
    }
}
