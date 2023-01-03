/**
 * author: libing
 * git: https://github.com/lbiceman
 * email: lbiceman@126.com
 */
import App from "./App.vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import router from "./router";
import loading from "./directive/loading/index";
import { registerComponents } from "./componentRegister/index";
import "@/config/index";
import "@/assets/style/reset.less";
import "@/assets/style/common.less";
import "@/assets/style/fonts.less";

const iceApp = createApp(App);

/**
 * 由于项目里边会用到component动态组件。
 * 使用  unplugin-vue-components/resolvers,unplugin-vue-components/vite（自动按需加载）会导致动态组件注册不上
 * 所以这里使用手动按需加载
 *
 * 用到的组件需要先去componentRegister/index文件里边注册
 * 然后再去componentRegister/css文件里边引入css
 */
registerComponents(iceApp);

// 屏蔽警告信息
// iceApp.config.warnHandler = () => null;

// 加载中...指令
iceApp.directive("loading", loading);

iceApp.use(createPinia());
iceApp.use(router);
iceApp.mount("#app");
