/**
 * author: libing
 * git: https://github.com/lbiceman
 * email: lbiceman@126.com
 */
import { defineStore } from "pinia";
import { EnvConfig, envList } from "@/config/index";

export interface EnvStoreState {
	currEnv: string;
	currEnvObj?: EnvConfig;
}

export interface EnvSotreActions {
	setCurrent: (data: string) => void;
}

export interface EnvStoreGetters<T = EnvStoreState> {
	getCurrEnv: (state: T) => string | undefined;
	getCurrEnvObj: (state: T) => EnvConfig | undefined;
	[key: string]: any;
}

const getCurrModule = (env: string) => {
	return envList.filter((item) => item.env == env)[0];
};

export const useEnvStore = defineStore<string, EnvStoreState, EnvStoreGetters, EnvSotreActions>("env", {
	state: () => ({
		currEnv: "",
		currModule: undefined
	}),

	getters: {
		getCurrEnv: (state: EnvStoreState) => state.currEnv,
		getCurrEnvObj: (state: EnvStoreState) => state.currEnvObj
	},

	actions: {
		setCurrent(this: EnvStoreState, data: string) {
			this.currEnv = data;
			this.currEnvObj = getCurrModule(data);
		}
	}
});
