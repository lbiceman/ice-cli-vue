/**
 * author: libing
 * git: https://github.com/lbiceman
 * email: lbiceman@126.com
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
	isLogin?: boolean;
	avator?: string;
}

export interface UserStoreState {
	user: User;
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
		user: {
			id: "1",
			name: "lbiceman",
			level: 1,
			sex: 1,
			userId: "980818",
			address: "河南郑州",
			phone: "",
			token: "lbiceman",
			isLogin: false
		}
	}),

	getters: {
		getUser: (state: UserStoreState) => state.user,
		isLogin: (state: UserStoreState) => state.user.isLogin
	},

	actions: {
		setUser(this: UserStoreState, data: User | null) {
			if (!data) return;
			data.isLogin = true;
			this.user = data;
		}
	}
});
