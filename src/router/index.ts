import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routers";
import { useUserStore } from "@/store/index";

const whiteRoutes = ["/login"];

const router = createRouter({
	routes,
	history: createWebHashHistory()
});

export const initRouterBeforeEach = () => {
	router.beforeEach((to, from, next) => {
		if (whiteRoutes.includes(to.path)) next();
		else {
			const { getUser, setUser } = useUserStore();
			if (!getUser || !getUser.isLogin) {
				setUser(null);
				next("/login");
			} else next();
		}
	});
};

export default router;
