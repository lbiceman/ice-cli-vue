import { IToolbarConfig, IEditorConfig } from "@wangeditor/editor";

export interface IceEditorConfig {
	defaultConfig?: IEditorConfig;
	onCreated?: (editor: any) => void;
	mode?: string;
	style?: any;
	disabled?: boolean;
}

export interface IceToolBarConfig {
	defaultConfig?: IToolbarConfig;
	mode?: string;
	style?: any;
}

export interface IceEditorProps {
	toolbarConfig?: IceToolBarConfig;
	editorConfig?: IceEditorConfig;
}
