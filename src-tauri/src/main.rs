// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn minimize(window: tauri::Window) {
    window.minimize().expect("Failed to minimize window");
}

#[tauri::command]
fn maximize(window: tauri::Window) {
    if window.is_maximized().expect("Failed to check window state") {
        window.unmaximize().expect("Failed to unmaximize window");
    } else {
        window.maximize().expect("Failed to maximize window");
    }
}

#[tauri::command]
fn close(window: tauri::Window) {
    window.close().expect("Failed to close window");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![minimize, maximize, close])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
