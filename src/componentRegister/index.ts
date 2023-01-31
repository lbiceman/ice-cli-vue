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
	Cascader,
	Drawer,
	CheckboxGroup,
	InputNumber,
	Switch,
	Upload,
	RadioGroup,
	Space
} from "ant-design-vue";

import IceEditor from "@/components/IceEditor/index.vue";

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
	Cascader,
	Drawer,
	IceEditor,
	CheckboxGroup,
	InputNumber,
	Switch,
	Upload,
	RadioGroup,
	Space
];

export const registerComponents = (app: App): App => {
	for (let i = 0; i < components.length; i++) {
		app.component(components[i].name + "", components[i]);
	}
	return app;
};
