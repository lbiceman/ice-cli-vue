/**
 * author: libing
 * git: https://github.com/lbiceman
 * email: lbiceman@126.com
 */
import { defineStore } from "pinia";
import { getStorage, setStorage } from "@/utils/index";

export interface User {
	id?: string;
	name?: string;
	level?: number;
	sex?: number;
	userId?: string;
	address?: string;
	phone?: string;
	token?: string;
	isLogin?: boolean;
	avator?: string;
}

export interface UserStoreState {
	user: User | null;
}

export interface UserSotreActions {
	setUser: (user: User | null) => void;
}

export interface UserStoreGetters<T = UserStoreState> {
	getUser: (state: T) => User;
	isLogin: (state: T) => boolean | undefined;
	[key: string]: any;
}

export const useUserStore = defineStore<string, UserStoreState, UserStoreGetters, UserSotreActions>("user", {
	state: () => ({
		user: {}
	}),

	getters: {
		getUser: (state: UserStoreState) => {
			return state.user ? getStorage("userData") : state.user;
		},
		isLogin: (state: UserStoreState) => state.user?.isLogin
	},

	actions: {
		setUser(this: UserStoreState, data: User | null) {
			if (data) data.isLogin = true;

			setStorage("userData", data);
			this.user = data;
		}
	}
});
