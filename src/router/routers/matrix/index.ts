import type { RouteRecordRaw } from "vue-router";

export const matrixRoutes: RouteRecordRaw[] = [
	{
		path: "/matrix",
		meta: { title: "矩阵资产管理" },
		redirect: "/matrix/distributor",
		children: [
			{
				path: "/matrix/distributor",
				meta: { title: "经销商档案" },
				component: () => import("@/views/matrix/distributor/index.vue")
			},
			{
				path: "/matrix/account",
				meta: { title: "账号资产库" },
				component: () => import("@/views/matrix/account/index.vue")
			},
			{
				path: "/matrix/fans",
				meta: { title: "粉丝画像" },
				component: () => import("@/views/matrix/fans/index.vue")
			}
		]
	}
];
