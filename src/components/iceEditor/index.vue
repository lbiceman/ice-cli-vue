<script lang="ts">
export default { name: "IceEditor" };
</script>
<script lang="ts" setup>
import { ref, watch, shallowRef, computed, onBeforeUnmount, watchEffect } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
import { IceEditorProps, IceEditorConfig, IceToolBarConfig } from "./type";

const props = withDefaults(
	defineProps<{
		config?: IceEditorProps;
		disabled?: boolean;
		value?: string;
	}>(),
	{
		disabled: false,
		value: "",
		config: undefined
	}
);

const emits = defineEmits<{
	(e: "update:value", value: string): void;
}>();

const mode = "simple";
const editorRef = shallowRef();
const html = ref("");

const finalToolbarConfig = computed(() => {
	let config: IceToolBarConfig = Object.assign(
		{
			mode,
			class: "editor-toolbar",
			defaultConfig: {}
		},
		props.config?.toolbarConfig
	);

	return config;
});

const finalEditorConfig = computed(() => {
	let config: IceEditorConfig = Object.assign(
		{
			defaultConfig: {
				placeholder: "请输入内容...",
				MENU_CONF: {
					uploadImage: {
						base64LimitSize: 5 * 1024 * 1024 // 5M
					}
				}
			},
			mode,
			style: {
				height: "310px"
			},
			class: "editor-editor",
			disabled: props.disabled || false,
			onCreated: () => {}
		},
		props.config?.editorConfig
	);

	return config;
});

watchEffect(() => {
	html.value = props.value;
});

watch(
	() => html.value,
	() => {
		emits("update:value", html.value);
	}
);

const onCreated = (editor: any) => {
	editorRef.value = editor;
	let onCreated = finalEditorConfig.value.onCreated;
	onCreated ? onCreated(editor) : "";
	if (finalEditorConfig.value.disabled) editorRef.value.disable();
	else editorRef.value.enable();
};

onBeforeUnmount(() => {
	const editor = editorRef.value;
	if (editor == null) return;
	editor.destroy();
});
</script>

<template>
	<div class="ice-editor">
		<Toolbar v-bind="finalToolbarConfig" :editor="editorRef" />
		<Editor v-bind="finalEditorConfig" v-model="html" @on-created="onCreated" />
	</div>
</template>

<style lang="less" scoped>
.ice-editor {
	.editor-toolbar,
	.editor-editor {
		border: 1px solid var(--ice-border-color);
	}
	.editor-toolbar {
		border-top-left-radius: 2px;
		border-top-right-radius: 2px;
		background-color: var(--ice-bg-color);
	}
	.editor-editor {
		border-bottom-left-radius: 2px;
		border-bottom-right-radius: 2px;
		overflow-y: hidden;
		background-color: var(--ice-bg-color);
	}
}
</style>

<style lang="less">
/* 富文本编辑器夜间模式样式 */
.w-e-toolbar {
	background-color: var(--ice-bg-color) !important;
	border-color: var(--ice-border-color) !important;
}

.w-e-text-container {
	background-color: var(--ice-bg-color) !important;
	border-color: var(--ice-border-color) !important;
}

.w-e-text {
	color: var(--ice-font-color) !important;
	background-color: var(--ice-bg-color) !important;
}

.w-e-text-container [data-slate-editor] p {
	color: var(--ice-font-color) !important;
}

.w-e-text-container [data-slate-editor] h1,
.w-e-text-container [data-slate-editor] h2,
.w-e-text-container [data-slate-editor] h3,
.w-e-text-container [data-slate-editor] h4,
.w-e-text-container [data-slate-editor] h5,
.w-e-text-container [data-slate-editor] h6 {
	color: var(--ice-font-color) !important;
}

/* 工具栏按钮 */
.w-e-toolbar .w-e-menu {
	color: var(--ice-font-color) !important;
}

.w-e-toolbar .w-e-menu:hover {
	background-color: var(--ice-bg-secondary) !important;
	color: rgb(102, 187, 255) !important;
}

.w-e-toolbar .w-e-active {
	background-color: var(--ice-bg-secondary) !important;
	color: rgb(102, 187, 255) !important;
}

/* 下拉菜单 */
.w-e-panel {
	background-color: var(--ice-bg-color) !important;
	border-color: var(--ice-border-color) !important;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
}

.w-e-panel .w-e-panel-tab-content {
	background-color: var(--ice-bg-color) !important;
}

.w-e-panel .w-e-menu-item {
	color: var(--ice-font-color) !important;
}

.w-e-panel .w-e-menu-item:hover {
	background-color: var(--ice-bg-secondary) !important;
	color: rgb(102, 187, 255) !important;
}

.w-e-panel .w-e-active {
	background-color: var(--ice-bg-secondary) !important;
	color: rgb(102, 187, 255) !important;
}

/* 颜色选择器 */
.w-e-color-picker {
	background-color: var(--ice-bg-color) !important;
	border-color: var(--ice-border-color) !important;
}

/* 表情选择器 */
.w-e-emoticon-container {
	background-color: var(--ice-bg-color) !important;
	border-color: var(--ice-border-color) !important;
}

.w-e-emoticon-tab-title {
	color: var(--ice-font-color) !important;
}

/* 链接输入框 */
.w-e-input-container {
	background-color: var(--ice-bg-color) !important;
}

.w-e-input-container input {
	background-color: var(--ice-bg-secondary) !important;
	border-color: var(--ice-border-color) !important;
	color: var(--ice-font-color) !important;
}

.w-e-input-container input::placeholder {
	color: rgba(255, 255, 255, 0.3) !important;
}

/* 代码块 */
.w-e-text pre {
	background-color: var(--ice-bg-secondary) !important;
	color: var(--ice-font-color) !important;
	border-color: var(--ice-border-color) !important;
}

.w-e-text code {
	background-color: var(--ice-bg-secondary) !important;
	color: var(--ice-font-color) !important;
	padding: 2px 4px !important;
	border-radius: 3px !important;
}

/* 引用块 */
.w-e-text blockquote {
	border-left-color: var(--ice-border-color) !important;
	color: var(--ice-font-color) !important;
	background-color: var(--ice-bg-secondary) !important;
}

/* 表格 */
.w-e-text table {
	border-color: var(--ice-border-color) !important;
}

.w-e-text table td,
.w-e-text table th {
	border-color: var(--ice-border-color) !important;
	color: var(--ice-font-color) !important;
}

.w-e-text table th {
	background-color: var(--ice-bg-secondary) !important;
}

/* 分割线 */
.w-e-text hr {
	border-color: var(--ice-border-color) !important;
}

/* 选中状态 */
.w-e-text ::selection {
	background-color: rgba(102, 187, 255, 0.3) !important;
}

/* 占位符 */
.w-e-text-placeholder {
	color: rgba(255, 255, 255, 0.3) !important;
}

/* 菜单分隔线 */
.w-e-toolbar .w-e-menu-divider {
	border-right-color: var(--ice-border-color) !important;
}

/* 上传图片区域 */
.w-e-upload-img-area {
	background-color: var(--ice-bg-secondary) !important;
	border-color: var(--ice-border-color) !important;
	color: var(--ice-font-color) !important;
}

/* Tooltip */
.w-e-tooltip {
	background-color: rgba(0, 0, 0, 0.8) !important;
	color: #fff !important;
}

/* 滚动条 */
.w-e-text::-webkit-scrollbar {
	width: 6px;
}

.w-e-text::-webkit-scrollbar-track {
	background: var(--ice-bg-secondary);
}

.w-e-text::-webkit-scrollbar-thumb {
	background: var(--ice-border-color);
	border-radius: 3px;
}

.w-e-text::-webkit-scrollbar-thumb:hover {
	background: #888;
}
</style>
