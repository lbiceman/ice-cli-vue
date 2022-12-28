import { App, Component } from "vue";
import {
	Input,
	Select,
	Button,
	Menu,
	MenuItem,
	SubMenu,
	ConfigProvider,
	Form,
	FormItem,
	InputPassword,
	Dropdown
} from "ant-design-vue";

import "./css";

const components: Component[] = [
	Input,
	Select,
	Button,
	Menu,
	MenuItem,
	SubMenu,
	ConfigProvider,
	Form,
	FormItem,
	InputPassword,
	Dropdown
];

export const registerComponents = (app: App): App => {
	for (let i = 0; i < components.length; i++) {
		app.component(components[i].name + "", components[i]);
	}
	return app;
};
