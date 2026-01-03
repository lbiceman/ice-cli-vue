import type { RouteRecordRaw } from "vue-router";

export const dashboardRoutes: RouteRecordRaw[] = [
	{
		path: "/dashboard",
		meta: { title: "数据大屏" },
		component: () => import("@/views/dashboard/index.vue"),
		redirect: "/dashboard/overview",
		children: [
			{
				path: "overview",
				meta: { title: "核心总览大屏" },
				component: () => import("@/views/dashboard/overview.vue")
			},
			{
				path: "content",
				meta: { title: "内容数据大屏" },
				component: () => import("@/views/dashboard/content.vue")
			},
			{
				path: "live",
				meta: { title: "直播数据大屏" },
				component: () => import("@/views/dashboard/live.vue")
			},
			{
				path: "fans",
				meta: { title: "粉丝数据大屏" },
				component: () => import("@/views/dashboard/fans.vue")
			},
			{
				path: "conversion",
				meta: { title: "线索与转化大屏" },
				component: () => import("@/views/dashboard/conversion.vue")
			},
			{
				path: "advertising",
				meta: { title: "投放数据大屏" },
				component: () => import("@/views/dashboard/advertising.vue")
			}
		]
	}
];
