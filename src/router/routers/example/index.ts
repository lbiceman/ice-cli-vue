import { RouteRecordRaw } from "vue-router";

export const exampleRoutes: RouteRecordRaw[] = [
	{
		path: "/example/form",
		meta: {
			title: "form组件"
		},
		component: () => import("@/views/example/form/index.vue")
	},
	{
		path: "/example/table",
		meta: {
			title: "table组件"
		},
		component: () => import("@/views/example/table/index.vue")
	},
	{
		path: "/example/drawer",
		meta: {
			title: "drawer组件"
		},
		component: () => import("@/views/example/drawer/index.vue")
	},
	{
		path: "/example/echarts",
		meta: {
			title: "echarts组件"
		},
		component: () => import("@/views/example/echarts/index.vue")
	},
	{
		path: "/example/editor",
		meta: {
			title: "editor组件"
		},
		component: () => import("@/views/example/editor/index.vue")
	}
];
