import type { RouteRecordRaw } from "vue-router";

export const adminRoutes: RouteRecordRaw[] = [
	{
		path: "/admin",
		meta: { title: "系统管理" },
		redirect: "/admin/user",
		children: [
			{
				path: "/admin/user",
				meta: { title: "用户管理" },
				component: () => import("@/views/admin/user.vue")
			},
			{
				path: "/admin/role",
				meta: { title: "角色管理" },
				component: () => import("@/views/admin/role.vue")
			},
			{
				path: "/admin/menu",
				meta: { title: "菜单管理" },
				component: () => import("@/views/admin/menu.vue")
			}
		]
	}
];
