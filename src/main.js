import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// Element Plus
import "element-plus/dist/index.css";

// Mount
app.mount("#app");

// Resize Sensor
import { appWindow } from "@tauri-apps/api/window";

const checkMaximized = () => {
    appWindow.isMaximized().then((payload) => {
        if (payload) {
            document.body.classList.add("maximized");
        } else {
            document.body.classList.remove("maximized");
        }
    });
};

checkMaximized();
setInterval(checkMaximized, 100);

// Disable Context Menu
document.addEventListener("contextmenu", (e) => e.preventDefault());