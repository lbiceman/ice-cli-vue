import type { RouteRecordRaw } from "vue-router";

export const specialRouters: RouteRecordRaw[] = [
	{
		path: "/404",
		meta: { title: "页面找不到了" },
		component: () => import("@/views/special/404.vue")
	}
];
