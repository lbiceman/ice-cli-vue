import { FormProps, FormItemProps } from "ant-design-vue/lib/form";

export interface IceFormValue {
	[key: string]: any;
}

export interface IceFormItem extends FormItemProps {
	component: string;
	name: string;
}

export interface IceFormProps extends FormProps {
	btnsState?: boolean;
	value: IceFormValue;
	list: IceFormItem[];
}
