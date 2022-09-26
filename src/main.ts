/**
 * author: libing
 * git: https://github.com/lbiceman
 * email: lbiceman@126.com
 */
import App from "./App.vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import router from "./router";
import { message } from "ant-design-vue";
import loading from "./directive/loading/index";
import { registerComponents } from "./componentRegister/index";
import "@/assets/style/reset.less";

message.config({
	top: `80px`,
	duration: 2,
	maxCount: 3
});

setTimeout(() => {
	message.success("test");
}, 2000);

const iceApp = createApp(App);

// 注册组件
/**
 * 用到的组件需要先去register/index文件里边注册
 * 然后再去register/css文件里边引入css
 *
 * 这样做是为了构建之后的依赖最小化
 */
registerComponents(iceApp);

// 屏蔽警告信息
// iceApp.config.warnHandler = () => null;

// 加载中...指令
iceApp.directive("loading", loading);

iceApp.use(createPinia());
iceApp.use(router);
iceApp.mount("#app");
