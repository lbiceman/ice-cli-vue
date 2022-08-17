import { reactive, ToRefs, toRefs, UnwrapRef } from "vue";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { isString, isPlainObject, upperFirst, isFunction } from "lodash-es";

export declare interface AxiosExtraConfig {
	// 是否可取消
	cancelable?: boolean;
	// 请求模块
	module?: string;
	[key: string]: any;
}

export declare type AxiosAbort = () => void;

export declare interface AxiosOptionApiResult<R, E> {
	// 是否正在加载
	loading: boolean;
	// 请求成功返回的数据,如果请求失败则为 null
	data: R | null;
	// 请求失败返回的数据,如果请求成功则为 null
	error: E | null;
}

export declare interface AxiosOptionApiResultAll<R, E> {
	loading: boolean;
	data: R[] | null;
	error: E | E[] | null;
}

export declare interface AxiosResponse<R, E> extends ToRefs<AxiosOptionApiResult<R, E>> {
	abort: AxiosAbort;
	run: (runConfig?: Partial<Pick<AxiosConfig, "params" | "data">>) => Promise<AxiosResponse<R, E>>;
}

export declare interface AxiosResponseAll<R, E> extends ToRefs<AxiosOptionApiResultAll<R, E>> {
	abort: AxiosAbort;
	run: () => Promise<AxiosResponse<R, E>>;
}

export declare interface AxiosConfig extends AxiosRequestConfig, AxiosExtraConfig {
	params?: (() => any) | any;
	data?: (() => any) | any;
}

declare function OptionApiAxios<R = any, E = any>(url: string | AxiosConfig, config?: AxiosConfig): AxiosResponse<R, E>;

export declare interface OptionApiMethods {
	usePostAxios: typeof OptionApiAxios;
	usePutAxios: typeof OptionApiAxios;
	useDeleteAxios: typeof OptionApiAxios;
	usePatchAxios: typeof OptionApiAxios;
	[key: string]: typeof OptionApiAxios;
}

let _axiosInstance: AxiosInstance;
export function getAxiosInstance(): AxiosInstance {
	if (_axiosInstance) return _axiosInstance;
	return (_axiosInstance = axios.create());
}

function getRequestConfig(url: string | AxiosConfig, config?: AxiosConfig): AxiosConfig {
	let requestConfig: AxiosConfig = {};
	if (isString(url)) {
		requestConfig["url"] = url;
		if (isPlainObject(config)) {
			requestConfig = {
				...requestConfig,
				...config
			};
		}
		return requestConfig;
	}
	return url;
}

function formatQuery(query?: () => any | any): any {
	return isFunction(query) ? query() : query;
}

export function useAxios<R = any, E = any>(url: string, config?: AxiosConfig): AxiosResponse<R, E>;
export function useAxios<R = any, E = any>(config: AxiosConfig): AxiosResponse<R, E>;
export function useAxios<R = any, E = any>(url: string | AxiosConfig, config?: AxiosConfig): AxiosResponse<R, E> {
	let controller: AbortController | undefined;
	const abort = () => controller?.abort();
	const state = reactive<AxiosOptionApiResult<R, E>>({
		loading: false,
		data: null,
		error: null
	});
	const axiosInstance = getAxiosInstance();
	const run = (runConfig?: Partial<Pick<AxiosConfig, "params" | "data">>): Promise<AxiosResponse<R, E>> => {
		state.loading = true;
		const { cancelable, params, data, ...requestConfig } = getRequestConfig(url, config);
		const { params: runParams, data: runData } = runConfig || {};
		controller = cancelable ? new AbortController() : undefined;
		return axiosInstance
			.request<R>({
				...requestConfig,
				signal: controller?.signal,
				data: runData || formatQuery(data),
				params: runParams || formatQuery(params)
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
		abort,
		run
	};
}

export const { usePostAxios, usePutAxios, useDeleteAxios, usePatchAxios } = ["POST", "PUT", "DELETE", "PATCH"].reduce<OptionApiMethods>((acc: OptionApiMethods, method) => {
	acc[`use${upperFirst(method.toLowerCase())}Axios`] = function <R = any, E = any>(url: string | AxiosConfig, config?: AxiosConfig): AxiosResponse<R, E> {
		return useAxios<R, E>({
			...(typeof url === "string" ? { url } : url),
			...(config || {}),
			method
		});
	};
	return acc;
}, {} as OptionApiMethods);

export function useAxiosAll<R = any[], E = any>(configs: AxiosConfig[]) {
	let controller: AbortController | undefined;
	const abort = () => controller?.abort();
	const state = reactive<AxiosOptionApiResultAll<R, E>>({
		loading: false,
		data: null,
		error: null
	});
	const axiosInstance = getAxiosInstance();
	const run = (): Promise<AxiosResponseAll<R, E>> => {
		state.loading = true;
		// promise 是否可取消
		const cancelable = configs.some((config) => config.cancelable);
		controller = cancelable ? new AbortController() : undefined;
		return Promise.all(
			configs.map((config) =>
				axiosInstance.request({
					...config,
					params: formatQuery(config?.params),
					data: formatQuery(config?.data),
					signal: controller?.signal
				})
			)
		)
			.then((responses) => {
				state.error = null;
				const responseList = responses.map((response) => response.data);
				state.data = responseList;
				return responseList;
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
		abort,
		run
	};
}
