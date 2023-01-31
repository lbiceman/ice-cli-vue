import type { RouteRecordRaw } from "vue-router";
import { specialRouters } from "./special";
import { indexRouters } from "./index/index";
import { loginRoutes } from "./login";
import { adminRoutes } from "./admin";
import { homeRoutes } from "./home";
import { exampleRoutes } from "./example";

const layoutRouters: RouteRecordRaw[] = [
	{
		path: "/",
		component: () => import("@/views/layout/index.vue"),
		// 这里放layout的子集路由
		children: [...indexRouters, ...adminRoutes, ...homeRoutes, ...exampleRoutes]
	}
];

export const routes: RouteRecordRaw[] = [
	// 这里放和layout同级别的路由
	...specialRouters,
	...layoutRouters,
	...loginRoutes,
	{
		path: "/:pathMatch(.*)",
		redirect: "/404"
	}
];
