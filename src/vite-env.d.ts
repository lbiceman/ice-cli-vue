/// <reference types="vite/client" />

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const components: DefineComponent<any, any, any>;
	export default components;
}
