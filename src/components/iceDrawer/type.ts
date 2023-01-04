import { DrawerProps } from "ant-design-vue/lib/drawer";

export interface IceDrawerProps extends DrawerProps {
	extraState?: boolean;
	onCancel?: () => void;
	onSubmit?: () => void;
}
