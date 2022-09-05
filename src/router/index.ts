import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routers";

const router = createRouter({
	routes,
	history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {
	next();
});

export default router;
