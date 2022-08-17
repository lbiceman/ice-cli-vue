import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import viteCompression from "vite-plugin-compression";
// import federation from "@originjs/vite-plugin-federation"

// https://vitejs.dev/config/
export default defineConfig({
	base: "./", //打包路径
	plugins: [
		vue(),
		// gzip压缩 生产环境生成 .gz 文件
		viteCompression({
			verbose: true,
			disable: false,
			threshold: 10240,
			algorithm: "gzip",
			ext: ".gz"
		})
		// federation({
		// 	name: "app1",
		// 	filename: "remoteEntry.js",
		// 	remotes: {
		// 		app2: "https://127.0.0.1:8080/assets/remoteEntry.js"
		// 	},
		// 	shared: ["vue"],
		// 	exposes: {
		// 		"./App": "./src/App.vue"
		// 	}
		// }),
	],
	// 配置别名
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src")
		}
	},
	css: {
		preprocessorOptions: {
			less: {
				additionalData: "@import '@/assets/style/common.less';"
			}
		}
	},
	//启动服务配置
	server: {
		host: "127.0.0.1",
		port: 9808,
		open: true,
		proxy: {
			"/api": {
				target: "http://XXX.XXX.com",
				changeOrigin: true,
				rewrite: (path: string) => path.replace(/^\/api/, "")
			}
		}
	},
	// 生产环境打包配置
	//去除 console debugger
	build: {
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		}
	}
});
