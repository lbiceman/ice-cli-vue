import { ColumnType } from "ant-design-vue/lib/table";
import { Component } from "vue";
import type { TransformCellTextProps } from "ant-design-vue/es/table/interface";

export interface Render {
	component?: string | Component;
	props?: (props: IceCellProps) => void;
	render?: Render | Render[] | string[];
}

export interface IceColumn extends ColumnType {
	// iceSque 展示序号
	type?: string;
	children?: IceColumn[];
	// 自定义渲染
	render?: Render | Render[] | ((props: IceCellProps) => string) | string;
}

export type IceCellProps = TransformCellTextProps;
