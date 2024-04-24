import { ColumnType } from "ant-design-vue/lib/table";
import { Component } from "vue";
import type { TransformCellTextProps } from "ant-design-vue/es/table/interface";

export interface Render {
	component?: string | Component;
	props?: (props: IceCellProps) => any;
	text?: (props: IceCellProps) => string;
	icon?: string;
}

export type RenderFunc = (props: IceCellProps) => string;

export interface IceColumn extends ColumnType {
	type?: string;
	children?: IceColumn[];
	// 自定义渲染
	render?: Render | Render[] | RenderFunc | string;
}

export type IceCellProps = TransformCellTextProps & {
	render?: Render | Render[] | RenderFunc | string;
	column?: IceColumn;
};
