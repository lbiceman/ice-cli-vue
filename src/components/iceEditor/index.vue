<script lang="ts">
export default { name: "IceEditor" };
</script>
<script lang="ts" setup>
import { ref, watch, shallowRef, onBeforeUnmount, watchEffect } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IToolbarConfig } from "@wangeditor/editor";
import "@wangeditor/editor/dist/css/style.css";

const props = withDefaults(
	defineProps<{
		disabled?: boolean;
		editorHeight?: string;
		value?: string;
	}>(),
	{
		disabled: false,
		editorHeight: "310px",
		value: ""
	}
);

const emits = defineEmits<{
	(e: "update:value", value: string): void;
}>();

const editorRef = shallowRef();
const html = ref("");
const toolbarConfig: Partial<IToolbarConfig> = {};
const editorConfig = {
	placeholder: "请输入内容...",
	MENU_CONF: {
		uploadImage: {
			base64LimitSize: 5 * 1024 * 1024 // 5M
		}
	}
};
const mode = "simple";

const onCreated = (editor: any) => {
	editorRef.value = editor;
};

watchEffect(() => {
	html.value = props.value;
});

watch(
	() => html.value,
	() => {
		emits("update:value", html.value);
	}
);

onBeforeUnmount(() => {
	const editor = editorRef.value;
	if (editor == null) return;
	editor.destroy();
});
</script>

<template>
	<div class="ice-editor">
		<Toolbar class="editor-toolbar" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
		<Editor
			v-model="html"
			class="editor-editor"
			:style="{ height: editorHeight }"
			:disabled="disabled"
			:default-config="editorConfig"
			:mode="mode"
			@onCreated="onCreated" />
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
