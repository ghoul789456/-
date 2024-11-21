import "./assets/less/main.less";
import { createApp } from "vue";
import storeInstance from "./stores";

import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import api from "./api/api";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(storeInstance);
app.use(router);
app.use(ElementPlus);
app.config.globalProperties.$api = api;
app.mount("#app");
