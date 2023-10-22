import { createPinia } from "pinia";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import "./index.css";
import './assets/scss/index.scss'

import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
const app = createApp(App);

app.use(Antd);
app.use(pinia);
app.use(router);

app.mount("#app");
