import { RouteRecordRaw } from "vue-router";

export const indexRouters: RouteRecordRaw[] = [
	{
		path: "/index",
		alias: "/",
		meta: {
			title: "首页"
		},
		component: () => import("@/views/index/index.vue")
	}
];
