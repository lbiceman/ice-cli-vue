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
		user: {
			isLogin: true,
			token: "Bearer eyJraWQiOiJmZTg5NGY4Yi05NjQ1LTQ1NTMtYjlmNS1jOTVlY2IyMjNhNGQiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1ZCI6IndzcCIsIm5iZiI6MTcxMDIwMjIwNSwiZXhwIjoxNzEwODI4NzI1LCJpYXQiOjE3MTAyMDIyMDV9.iw5vb86aIAqADC8ZvQVAxzZG4BMuk3qB_QyVqngC2y7y8CkKoSBQgWOT6UvU686d3jb_6HGYQw8RZE6hIwRLdSrlaCHmxNMGoA6j9l1HQ0nPUYwEUaN1idPv6ZzH_3_6P9OKD-Xh8acps_fo6EiL4l37bNUUHx2UfQNAWDo2d1dTr_pJQ32zq8_dFA71cHl9at96LT0e90-7kD0kD3svHgJz_nsSIMRNjQUcsMMeA-y8KJ_m5nr9oS7GafUF0V4LsqkDBzVFXzABJGfVmerGhzLPB-mRVfPHtyWayif3dq76u8nNqtY0W_d4S9Qb8lfuoWfMeH3tJKHSn-8_2QVvlA"
		}
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
