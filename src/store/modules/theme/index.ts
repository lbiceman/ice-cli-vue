/**
 * author: libing
 * git: https://github.com/lbiceman
 * email: lbiceman@126.com
 */
import { defineStore } from "pinia";
import { getStorage, setStorage } from "@/utils/index";

export type ThemeMode = 'light' | 'dark';

export interface ThemeStoreState {
	theme: ThemeMode;
}

export interface ThemeStoreActions {
	setTheme: (theme: ThemeMode) => void;
	toggleTheme: () => void;
}

export interface ThemeStoreGetters {
	isDark: (state: ThemeStoreState) => boolean;
	[key: string]: any;
}

export const useThemeStore = defineStore("theme", {
	state: () => ({
		theme: (getStorage("theme") as ThemeMode) || 'light'
	}),

	getters: {
		isDark: (state: ThemeStoreState) => state.theme === 'dark'
	},

	actions: {
		setTheme(theme: ThemeMode) {
			// 直接设置state的值，不使用computed
			this.$patch({ theme });
			setStorage("theme", theme);
			
			// 更新HTML根元素的class
			const html = document.documentElement;
			if (theme === 'dark') {
				html.classList.add('dark');
			} else {
				html.classList.remove('dark');
			}
		},

		toggleTheme() {
			const newTheme = this.theme === 'light' ? 'dark' : 'light';
			this.setTheme(newTheme);
		}
	}
});