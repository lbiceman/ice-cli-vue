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
		value: ""
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
		<Editor v-bind="finalEditorConfig" v-model="html" @onCreated="onCreated" />
	</div>
</template>

<style lang="less" scoped>
.ice-editor {
	.editor-toolbar,
	.editor-editor {
		border: 1px solid #d9d9d9;
	}
	.editor-toolbar {
		border-top-left-radius: 2px;
		border-top-right-radius: 2px;
	}
	.editor-editor {
		border-bottom-left-radius: 2px;
		border-bottom-right-radius: 2px;
		overflow-y: hidden;
	}
}
</style>
