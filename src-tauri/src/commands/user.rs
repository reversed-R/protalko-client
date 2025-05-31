use crate::{
    commands::CommandError,
    models::{error_response::ErrorResponse, user_presentation::UserPresentation},
};

use tauri_plugin_http::reqwest;

#[tauri::command]
#[specta::specta]
pub fn post_user(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
#[specta::specta]
pub async fn get_user_by_id(id: String) -> Result<UserPresentation, CommandError> {
    let res = reqwest::get(format!("http://localhost:8080/users/{}", id)).await;

    match res {
        Ok(v) => {
            if v.status().is_success() {
                v.json::<UserPresentation>()
                    .await
                    .map_err(|_| CommandError::deserialize_error())
            } else {
                match v.json::<ErrorResponse>().await {
                    Ok(eres) => Err(CommandError::from(eres)),
                    Err(_) => Err(CommandError::deserialize_error()),
                }
            }
        }

        Err(e) => Err(CommandError::from(e)),
    }
}
