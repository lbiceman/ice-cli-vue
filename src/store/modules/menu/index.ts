/**
 * author: libing
 * git: https://github.com/lbiceman
 * email: lbiceman@126.com
 */
import { defineStore } from "pinia";

export interface Menu {
	id: string;
	name?: string;
	url?: string;
	icon?: string;
	children?: Menu[];
}

export interface MenuStoreState {
	menus: Menu[];
}

export interface MenuStoreActions {
	setMenus: (list: Menu[]) => void;
}

export interface MenuStoreGetters<T = MenuStoreState> {
	getMenus: (state: T) => Menu[];
	[key: string]: any;
}

export const useMenuStore = defineStore<string, MenuStoreState, MenuStoreGetters, MenuStoreActions>(
	"menu",
	{
		state: () => ({
			menus: [
				{
					id: "1",
					name: "首页",
					url: "/index",
					icon: "index.ico",
					children: []
				}
			]
		}),

		getters: {
			getMenus: (state: MenuStoreState) => state.menus
		},

		actions: {
			setMenus(this: MenuStoreState, list: Menu[]) {
				this.menus = list;
			}
		}
	}
);
