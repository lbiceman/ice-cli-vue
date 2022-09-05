/**
 * author: libing
 * git: https://github.com/lbiceman
 * email: lbiceman@126.com
 */

/**
 * 这一块的TS约束参考作者--vyron
 * vyron: https://github.com/vfiee
 */
import { defineStore } from "pinia";

export interface User {
	id?: string;
	name?: string;
	level?: number;
	sex?: number;
	userId?: string;
	address?: string;
	phone?: string;
	token?: string;
}

export interface UserStoreState {
	user: User;
}

export interface UserSotreActions {
	setUser: (user: User) => void;
}

export interface UserStoreGetters<T = UserStoreState> {
	getUser: (state: T) => User;
	[key: string]: any;
}

export const useUserStore = defineStore<string, UserStoreState, UserStoreGetters, UserSotreActions>(
	"menu",
	{
		state: () => ({
			user: {
				id: "1",
				name: "lbiceman",
				level: 1,
				sex: 1,
				userId: "980818",
				address: "河南郑州",
				phone: "",
				token: "lbiceman"
			}
		}),

		getters: {
			getUser: (state: UserStoreState) => state.user
		},

		actions: {
			setUser(this: UserStoreState, list: User) {
				this.user = list;
			}
		}
	}
);
