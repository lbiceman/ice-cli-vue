/**
 * author: libing
 * git: https://github.com/lbiceman
 * email: lbiceman@126.com
 */

import { reactive, ToRefs, toRefs, UnwrapRef } from "vue";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { isFun, isStr, isObj } from "@/utils/index";

export declare interface AxiosExtraConfig {
	// 是否可取消
	cancelable?: boolean;
}

export declare type AxiosCancel = () => void;

export declare interface AxiosOptionApiResult<R, E> {
	loading: boolean;
	data: R | null;
	error: E | null;
}

export declare interface AxiosResponse<R, E> extends ToRefs<AxiosOptionApiResult<R, E>> {
	cancel: AxiosCancel;
	run: (
		runConfig?: Partial<Pick<AxiosConfig, "params" | "data">>
	) => Promise<AxiosResponse<R, E>>;
}

export declare interface AxiosConfig extends AxiosRequestConfig, AxiosExtraConfig {
	params?: (() => any) | any;
	data?: (() => any) | any;
}

let axios_instance: AxiosInstance;
export function getAxiosInstance(): AxiosInstance {
	if (axios_instance) return axios_instance;
	return (axios_instance = axios.create());
}

function getConfig(url: string | AxiosConfig, config?: AxiosConfig): AxiosConfig {
	let requestConfig: AxiosConfig = {};
	if (isStr(url)) {
		requestConfig.url = url;
		if (isObj(config)) {
			requestConfig = {
				...requestConfig,
				...config
			};
		}
		return requestConfig;
	}
	return url;
}

function fmtParams(query?: (() => any) | any): any {
	return isFun(query) ? query() : query;
}

export function useAxios<R = any, E = any>(
	url: string | AxiosConfig,
	config?: AxiosConfig
): AxiosResponse<R, E> {
	let ctrl: AbortController | undefined;
	const cancel = () => ctrl?.abort();
	const state = reactive<AxiosOptionApiResult<R, E>>({
		loading: false,
		data: null,
		error: null
	});
	const instance = getAxiosInstance();
	const run = (
		runConfig?: Partial<Pick<AxiosConfig, "params" | "data">>
	): Promise<AxiosResponse<R, E>> => {
		state.loading = true;
		const { cancelable, params, data, ...requestConfig } = getConfig(url, config);
		const { params: runParams, data: runData } = runConfig || {};
		ctrl = cancelable ? new AbortController() : undefined;
		return instance
			.request<R>({
				...requestConfig,
				signal: ctrl?.signal,
				data: runData || fmtParams(data),
				params: runParams || fmtParams(params)
			})
			.then((res) => {
				state.error = null;
				state.data = res.data as UnwrapRef<R>;
				return res.data;
			})
			.catch((e) => {
				state.data = null;
				state.error = e;
				return e;
			})
			.finally(() => {
				state.loading = false;
			});
	};

	return {
		...(toRefs(state) as ToRefs<AxiosOptionApiResult<R, E>>),
		cancel,
		run
	};
}
