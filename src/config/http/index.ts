import router from "@/router";
import { getAxiosInstance, AxiosConfig } from "@/services";
import { useUserStore, useEnvStore } from "@/store/index";
import { isProd } from "@/utils";
import { AxiosResponse, AxiosError } from "axios";

// 这个data是response里边的。由后台开发人员包装好的，需要和首台开发人员讨论具体的字段类型
export interface AxiosResponseData<D> {
	code: number;
	data: D;
	message: string | null;
	requestId: string;
	success: boolean;
}

export interface ErrorMsgMap {
	[key: string]: string;
}

const errorMsgMap: ErrorMsgMap = {
	"400": "请求错误",
	"401": "未授权，请登录",
	"403": "拒绝访问",
	"404": "请求地址不存在",
	"408": "请求超时",
	"500": "服务器内部错误",
	"501": "服务未实现",
	"502": "网关错误",
	"503": "服务不可用",
	"504": "网关超时",
	"505": "HTTP版本不受支持"
};

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
			headers["Authorization"] = getUser.token || "";
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
			return Promise.resolve(response);
		},
		(error: AxiosError) => {
			if (error && error.response) {
				error.message = errorMsgMap[error.response.status];
			}
			return Promise.reject(error);
		}
	);
};
