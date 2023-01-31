import { envList } from "../../src/config/env/index";

const rewrite = (proxyUrl: string) => {
	const reg = new RegExp("^/" + proxyUrl);
	return (path) => path.replace(reg, "");
};

export const getProxy = () => {
	const obj = {};
	const list = envList.map((config) => Object.values(config.modules)).flat();
	list.forEach((item) => {
		obj[`/${item.proxyUrl}`] = {
			target: item.targetUrl,
			secure: false, // 是否为https
			ws: false, // 是否为ws
			changeOrigin: true, // 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
			rewrite: rewrite(item.proxyUrl)
		};
	});

	return obj;
};
