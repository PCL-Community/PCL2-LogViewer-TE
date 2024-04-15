import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";

const app = createApp(App);
app.use(ArcoVue);
app.mount("#app");

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
if (darkThemeMq.matches) {
    document.body.setAttribute("arco-theme", "dark");
} else {
    document.body.removeAttribute("arco-theme");
}
darkThemeMq.addListener((e) => {
    if (e.matches) {
        document.body.setAttribute("arco-theme", "dark");
    } else {
        document.body.removeAttribute("arco-theme");
    }
});
