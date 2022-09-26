import type { RouteRecordRaw } from "vue-router";

export const loginRoutes: RouteRecordRaw[] = [
	{
		path: "/login",
		meta: { title: "登录" },
		component: () => import("@/views/user/login.vue")
	}
];
