/**
 * author: libing
 * git: https://github.com/lbiceman
 * email: lbiceman@126.com
 */
import { defineStore } from "pinia";

export interface Menu {
	id?: string;
	name?: string;
	url?: string;
	icon?: string;
	children?: Menu[];
}

export interface MenuStoreState {
	collapsed: boolean;
	menus: Menu[];
}

export interface MenuStoreActions {
	setMenus: (list: Menu[]) => void;
	updateCollapsed: (status: boolean) => void;
}

export interface MenuStoreGetters<T = MenuStoreState> {
	getCollapsed: (state: T) => boolean;
	getMenus: (state: T) => Menu[];
	[key: string]: any;
}

export const useMenuStore = defineStore<string, MenuStoreState, MenuStoreGetters, MenuStoreActions>("menu", {
	state: () => ({
		collapsed: false, // 是否展开  true 缩小  false 展开
		menus: [
			{
				id: "1",
				name: "首页",
				url: "/index",
				icon: "HomeOutlined"
			},
			{
				id: "2",
				name: "特殊页",
				url: "/404",
				icon: "WarningOutlined"
			},
			{
				id: "9",
				name: "系统管理",
				url: "/admin",
				icon: "OrderedListOutlined",
				children: [
					{
						id: "90",
						name: "角色管理",
						url: "/admin/role"
					},
					{
						id: "91",
						name: "用户管理",
						url: "/admin/user"
					},
					{
						id: "92",
						name: "菜单管理",
						url: "/admin/menu"
					}
				]
			}
		]
	}),

	getters: {
		getMenus: (state: MenuStoreState) => state.menus,
		getCollapsed: (state: MenuStoreState) => state.collapsed
	},

	actions: {
		setMenus(this: MenuStoreState, list: Menu[]) {
			this.menus = list;
		},
		updateCollapsed(this: MenuStoreState, status: boolean) {
			this.collapsed = status;
		}
	}
});
