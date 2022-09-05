import type { RouteRecordRaw } from "vue-router";
import { specialRouters } from "./special";
import { indexRouters } from "./index/index";

const layoutRouters: RouteRecordRaw[] = [
	{
		path: "/",
		component: () => import("@/views/layout/index.vue"),
		// 这里放layout的子集路由
		children: [...indexRouters]
	}
];

export const routes: RouteRecordRaw[] = [
	// 这里放和layout同级别的路由
	...specialRouters,
	...layoutRouters,
	{
		path: "/:pathMatch(.*)",
		redirect: "/404"
	}
];
