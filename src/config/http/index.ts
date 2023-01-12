import router from "@/router";
import { getAxiosInstance, AxiosConfig } from "@/services";
import { useUserStore, useEnvStore } from "@/store/index";
import { isProd } from "@/utils";
import { AxiosResponse, AxiosError } from "axios";

export interface AxiosResponseData<T> {
	code: number;
	data: T;
	message: string | null;
	requestId: string;
	success: boolean;
}

export const initAxios = () => {
	const axios = getAxiosInstance();
	const { getUser, setUser } = useUserStore();
	const { currEnvObj } = useEnvStore();

	// 请求拦截
	axios.interceptors.request.use((config: AxiosConfig) => {
		let { headers, module: requestModule, url } = config || {};
		headers = headers || {};
		requestModule = requestModule || "common";
		url = url || "";
		const currModule = currEnvObj?.modules[requestModule];

		if (getUser.isLogin) {
			headers["token"] = getUser.token || "";
		}
		// 如果请求地址是http开头，和axios保持一致
		if (url && url.startsWith("http")) return config;
		// 如果当前环境是prod 则使用配置的环境变量对接口url进行配置
		// 如果当前环境不是prod，则认为是本地开发环境，使用本地代理进行接口请求
		if (isProd && currModule) config.baseURL = currModule.targetUrl || config.baseURL;
		else if (currModule) config.url = `/${currModule.proxyUrl}${url}`;

		return config;
	});

	// 响应拦截器
	axios.interceptors.response.use(
		(response: AxiosResponse<AxiosResponseData<any>>) => {
			const { code } = response.data || {};
			// 这个data是公司后台开人员封装的接口返回对象 AxiosResponseData
			// 这里的判断需要根据后台人员的接口类进行修改
			if (code != 0) {
				if (code == 401) {
					setUser(null);
					router.push("/login");
				}
				return Promise.reject(response);
			}
			return response;
		},
		(error: AxiosError) => {
			if (error && error.response) {
				switch (error.response.status) {
					case 400:
						error.message = "请求错误";
						break;
					case 401:
						error.message = "未授权，请登录";
						break;
					case 403:
						error.message = "拒绝访问";
						break;
					case 404:
						error.message = `请求地址出错: ${error.response.config.url}`;
						break;
					case 408:
						error.message = "请求超时";
						break;
					case 500:
						error.message = "服务器内部错误";
						break;
					case 501:
						error.message = "服务未实现";
						break;
					case 502:
						error.message = "网关错误";
						break;
					case 503:
						error.message = "服务不可用";
						break;
					case 504:
						error.message = "网关超时";
						break;
					case 505:
						error.message = "HTTP版本不受支持";
						break;
					default:
						break;
				}
			}
			return Promise.reject(error);
		}
	);
};
