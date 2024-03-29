// 这个配置在项目里边可能会用到，放在src目录里边可以构建到项目里边。

export type EnvType = "development" | "test" | "production" | "mock";

export declare interface ModuleItem {
	targetUrl: string;
	proxyUrl: string;
}

export interface EnvConfig {
	// 请求环境,与 process.env.APP_ENV 对应
	env: EnvType;
	// 环境名称
	name: string;
	// 模块
	modules: {
		common: ModuleItem;
		[key: string]: ModuleItem;
	};
	[key: string]: any;
}

export const envList: EnvConfig[] = [
	{
		env: "development",
		name: "dev环境",
		modules: {
			common: {
				proxyUrl: "dev-common",
				targetUrl: "https://dev.dev.com"
			},
			login: {
				proxyUrl: "dev-login",
				targetUrl: "https://dev.dev.com"
			}
		}
	},
	{
		env: "test",
		name: "test环境",
		modules: {
			common: {
				proxyUrl: "test-common",
				targetUrl: "https://qa.test.com"
			},
			login: {
				proxyUrl: "test-login",
				targetUrl: "https://qa.test.com"
			}
		}
	},
	{
		env: "production",
		name: "prod环境",
		modules: {
			common: {
				proxyUrl: "prod-common",
				targetUrl: "https://prod.prod.com"
			},
			login: {
				proxyUrl: "prod-login",
				targetUrl: "https://prod.prod.com"
			}
		}
	},
	{
		env: "mock",
		name: "mock环境",
		modules: {
			common: {
				proxyUrl: "mock",
				targetUrl: ""
			}
		}
	}
];
