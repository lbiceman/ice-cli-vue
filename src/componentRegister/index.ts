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
	Dropdown,
	Table,
	Descriptions,
	DescriptionsItem,
	Tooltip,
	Spin,
	Tag,
	Progress,
	Checkbox,
	Popover,
	DatePicker,
	Space
} from "ant-design-vue";

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
	Tag,
	Progress,
	Popover,
	Checkbox,
	DatePicker,
	Space
];

export const registerComponents = (app: App): App => {
	for (let i = 0; i < components.length; i++) {
		app.component(components[i].name + "", components[i]);
	}
	return app;
};
