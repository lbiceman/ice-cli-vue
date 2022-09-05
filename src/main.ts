import App from "./App.vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { message } from "ant-design-vue";

message.config({
	top: `80px`,
	duration: 2,
	maxCount: 3
});

const iceApp = createApp(App);

iceApp.use(createPinia());
iceApp.use(Antd);
iceApp.use(router);
iceApp.mount("#app");
