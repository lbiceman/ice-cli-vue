import axios from "axios";
import { AxiosConfig } from "@/services";

axios.interceptors.request.use(
	(config: AxiosConfig) => {
		config.data = JSON.stringify(config.data);
		if (config.method === "get") {
			config.data = true;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// 响应拦截器
axios.interceptors.response.use(
	(response) => {
		if (response.data.message == "token无效,请重新登录") {
			sessionStorage.clear();
			return;
		}
		switch (response.status) {
			case 200:
				return Promise.resolve(response.data);
			default:
				return Promise.reject(response.data);
		}
	},
	(error) => {
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
