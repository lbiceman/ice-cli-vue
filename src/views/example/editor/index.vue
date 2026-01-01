<script lang="ts" setup>
import { computed, ref } from "vue";
import IceEditor from "@/components/iceEditor/index.vue";
import { IceEditorProps } from "@/components/iceEditor/type";

const editorValue = ref("");

const config = computed(
	(): IceEditorProps => ({
		// 详细配置可以查看wangEditor官网
		// https://www.wangeditor.com/v5/
		toolbarConfig: {
			// defaultConfig: {
			// 	toolbarKeys: [
			// 		"bold",
			// 		"clearStyle",
			// 		"color",
			// 		"|",
			// 		"divider",
			// 		"emotion",
			// 		"blockquote",
			// 		"headerSelect",
			// 		"redo",
			// 		"undo",
			// 	],
			// }
			mode: "simple"
		},
		editorConfig: {
			// 富文本高度建议填写大于300的。否则会抛警告
			defaultConfig: {
				scroll: true,
				readOnly: false,
				customAlert: () => {
					console.log("customAlert");
				},
				autoFocus: false,
				placeholder: "请输入内容...",
				MENU_CONF: {
					uploadImage: {
						base64LimitSize: 5 * 1024 * 1024 // 5M
					}
				}
			},
			mode: "simple",
			style: {
				height: "310px"
			},
			disabled: false,
			onCreated: () => {
				console.log("editor on created");
			}
		}
	})
);
</script>

<template>
	<div class="ice-editorWrap">
		<IceEditor v-model:value="editorValue" :config="config" />
		<div class="editorWrap-value">
			{{ editorValue }}
		</div>
	</div>
</template>

<style lang="less" scoped>
.ice-editorWrap {
	background-color: var(--ice-bg-color);
	border-radius: @ice-border-radius;
	padding: @ice-pm;
	.editorWrap-value {
		margin-top: @ice-pm;
		max-width: 100%;
		word-wrap: wrap;
		max-height: 300px;
		overflow-y: auto;
		border: 1px solid #ddd;
		padding: @ice-pm;
		border-radius: @ice-border-radius;
	}
}
</style>
