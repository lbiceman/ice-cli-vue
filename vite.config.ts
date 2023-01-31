import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import viteCompression from "vite-plugin-compression";
// 手动按需加载
import { viteCommonjs, esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import { getProxy } from "./config/proxy/index";

// https://vitejs.dev/config/
export default defineConfig({
	base: "./", //打包路径
	// 环境变量匹配规则
	// 例如：SELF-TYPE  在这里就需要填写SELF，否则项目获取不到SELF开头的环境变量
	envPrefix: ["VITE", "VUE", "APP", "SELF"],
	plugins: [
		vue(),
		// 静态资源压缩
		viteCompression({
			verbose: true,
			disable: false, // 不禁用压缩
			deleteOriginFile: false, // 压缩后是否删除原文件
			threshold: 10240, // 压缩前最小文件大小
			algorithm: "gzip", // 压缩算法
			ext: ".gz" // 文件类型
		}),
		viteCommonjs()
	],
	// 手动按需引入antd
	optimizeDeps: {
		esbuildOptions: {
			plugins: [esbuildCommonjs(["ant-design-vue"])]
		}
	},
	// 配置别名
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src")
		}
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				additionalData: "@import '@/assets/style/common.less';"
			}
		}
	},
	//启动服务配置
	server: {
		host: "127.0.0.1",
		port: 9808,
		open: true,
		proxy: getProxy()
	},
	// 生产环境打包配置
	build: {
		sourcemap: false,
		terserOptions: {
			//去除 console debugger
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		}
	}
});
