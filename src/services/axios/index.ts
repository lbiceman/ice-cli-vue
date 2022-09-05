/**
 * author: libing
 * git: https://github.com/lbiceman
 * email: lbiceman@126.com
 */
/** 
import { reactive, ToRefs, toRefs, UnwrapRef } from "vue";
import axios, { AxiosInstance } from "axios";
import { isFun } from "@/utils/index";

export interface AxiosConfig {
	data?: any
	params?: any
	cancel?: () => void
}

export interface AxiosResponse<R, E> {}

export interface AxiosOptionApiResult<R, E> {
	loading: boolean
	data: any | null
	error: any | null
	cancel?: () => void
}

export interface AxiosOptionApiResultAll<R, E> {
	loading: boolean
	data: any | null
	error: any | null
	cancel?: () => void
}

export interface AxiosResponseAll<R, E> {}

let axiosInstance: AxiosInstance;
export function getAxiosInstance(): AxiosInstance {
	if(axiosInstance) return axiosInstance;
	return (axiosInstance = axios.create())
}

function formatQuery(query?: any | (() => any)): any {
	return isFun(query) ? query() : query
}

function getRequestConfig(url: string | AxiosConfig, config?: AxiosConfig) {
	return { cancel: "", params: "", data: "" }
}

export function useAxios<R = any, E = any>(url: string | AxiosConfig, config?: AxiosConfig) {
	let controller: AbortController | undefined;
	const abort = () => controller?.abort();
	const state = reactive<AxiosOptionApiResult<R, E>>({
		loading: false,
		data: null,
		error: null
	});
	const axiosInstance = getAxiosInstance();
	const run = (
		runConfig?: Partial<Pick<AxiosConfig, "params" | "data">>
	): Promise<AxiosResponse<R, E>> => {
		state.loading = true;
		const { cancel, params, data, ...requestConfig } = getRequestConfig(url, config);
		const { params: runParams, data: runData } = runConfig || {};
		controller = cancel ? new AbortController() : undefined;
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
				return res.data
			})
			.catch((e) => {
				state.data = null;
				state.error = e;
				return e
			})
			.finally(() => {
				state.loading = false
			})
	};

	return {
		...(toRefs(state) as ToRefs<AxiosOptionApiResult<R, E>>),
		abort,
		run
	}
}

export function useAxiosAll<R = any[], E = any>(configs: AxiosConfig[]) {
	let controller: AbortController | undefined;
	const cancel = () => controller?.abort();
	const state = reactive<AxiosOptionApiResultAll<R, E>>({
		loading: false,
		data: null,
		error: null
	});
	const axiosInstance = getAxiosInstance();
	const run = (): Promise<AxiosResponseAll<R, E>> => {
		state.loading = true;
		// promise 是否可取消
		const cancel = configs.some((config) => config.cancel);
		controller = cancel ? new AbortController() : undefined;
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
		.catch((err) => {
			state.data = null;
			state.error = err;
			return err
		})
		.finally(() => {
			state.loading = false
		})
	};

	return {
		...(toRefs(state) as ToRefs<AxiosOptionApiResult<R, E>>),
		cancel,
		run
	}
}
if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    return Promise.reject(error)
*/
