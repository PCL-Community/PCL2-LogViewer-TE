import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// Element Plus
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";

app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

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
setInterval(checkMaximized, 200);
