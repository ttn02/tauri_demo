use tauri::{AppHandle, Manager};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_upload::init())
        .plugin(tauri_plugin_stronghold::Builder::new(|pass| todo!()).build())
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            let _ = app
                .get_webview_window("main")
                .expect("no main window")
                .set_focus();
            println!(
                "Another instance was opened with args: {:?}, cwd: {:?}",
                argv, cwd
            );
        }))
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            let _ = app
                .get_webview_window("main")
                .expect("no main window")
                .set_focus();
            println!(
                "Another instance was opened with args: {:?}, cwd: {:?}",
                argv, cwd
            );
        }))
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
