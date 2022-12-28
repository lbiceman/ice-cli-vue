import { RouteRecordRaw } from "vue-router";

export const homeRoutes: RouteRecordRaw[] = [
	{
		path: "/home",
		meta: {
			title: "主页"
		},
		component: () => import("@/views/home/index.vue")
	}
];
