import { IToolbarConfig, IEditorConfig } from "@wangeditor/editor";

export interface IceEditorConfig {
	defaultConfig?: IEditorConfig;
	onCreated?: (editor: any) => void;
	style?: CSSStyleDeclaration;
	disabled?: boolean;
}

export interface IceToolBarConfig {
	defaultConfig?: IToolbarConfig;
	style?: CSSStyleDeclaration;
}

export interface IceEditorProps {
	toolbarConfig?: IceToolBarConfig;
	editorConfig?: IceEditorConfig;
}
