import { DrawerProps } from "ant-design-vue/lib/drawer";

export interface IceDrawerProps extends DrawerProps {
	// 控制drawer右上角按钮是否显示
	btnsState?: boolean;
	onCancel?: () => void;
	onSubmit?: () => void;
}
