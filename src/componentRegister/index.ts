import { App, Component } from "vue";
import { IconComponents } from "./type";
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
	Dropdown,
	Table,
	Descriptions,
	DescriptionsItem,
	Tooltip,
	Spin,
	Checkbox
} from "ant-design-vue";

import { HomeOutlined, WarningOutlined, OrderedListOutlined } from "@ant-design/icons-vue";

import "./css";

// 组件注册
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
	Dropdown,
	Table,
	Descriptions,
	DescriptionsItem,
	Tooltip,
	Spin,
	Checkbox
];

// 图标注册
const iconComponents: IconComponents = {
	HomeOutlined,
	WarningOutlined,
	OrderedListOutlined
};

export const registerComponents = (app: App): App => {
	for (let i = 0; i < components.length; i++) {
		app.component(components[i].name + "", components[i]);
	}
	for (const key in iconComponents) {
		app.component(key + "", iconComponents[key]);
	}
	return app;
};
