import type { FormProps, FormItemProps } from "ant-design-vue";
import { Component, HTMLAttributes } from "vue";
import type {
	TreeProps,
	InputProps,
	SelectProps,
	CascaderProps,
	TextAreaProps,
	TreeSelectProps,
	RadioGroupProps,
	CheckboxGroupProps,
	InputNumberProps,
	UploadProps,
	DatePickerProps
} from "ant-design-vue";

export interface IceFormValue {
	[key: string]: string;
}
export interface IceFormProps extends FormProps {
	btnsState?: boolean;
	list?: IceFormList[];
	onReset?: () => void;
}

export interface FormGroup {
	title: string;
	titleAttributes?: HTMLAttributes;
}

export interface IceFormList {
	[key: string]: any;
	item: SupFormItem;
	formItem: IceFormItem;
}

export interface IceFormItem extends FormItemProps {
	name: string;
}

export type SupFormItem =
	| (TreeSelectProps & { component: "a-tree-select" })
	| (SelectProps & { component: "a-select" })
	| (InputProps & { component: "a-input" })
	| (RadioGroupProps & { component: "a-radio-group" })
	| (CheckboxGroupProps & { component: "a-checkbox-group" })
	| (TreeProps & { component: "a-tree" })
	| (TextAreaProps & { component: "a-textarea" })
	| (CascaderProps & { component: "a-cascader" })
	| (InputNumberProps & { component: "a-input-number" })
	| (UploadProps & { component: "a-upload" })
	| (DatePickerProps & { component: "a-date-picker" })
	| {
			component: string | Component;
			[key: string]: any;
	  };
