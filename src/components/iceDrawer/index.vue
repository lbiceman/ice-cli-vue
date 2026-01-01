<script lang="ts" setup>
import { computed } from "vue";
import { IceDrawerProps } from "./type";

const props = withDefaults(
	defineProps<{
		config: IceDrawerProps;
		visible: boolean;
	}>(),
	{
		visible: false
	}
);

const finalConfig = computed(() => {
	let config = Object.assign(
		{
			title: "",
			width: "45%",
			maskClosable: false,
			bodyStyle: {
				paddingBottom: "0px"
			},
			class: "ice-drawer",
			btnsState: true,
			onCancel: () => { },
			onSubmit: () => { },
			onClose: cancel
		},
		props.config
	);

	return config;
});

const cancel = () => {
	finalConfig.value?.onCancel();
};

const submit = () => {
	finalConfig.value?.onSubmit();
};
</script>

<template>
	<a-drawer v-bind="finalConfig" :visible="visible">
		<template #extra>
			<template v-if="finalConfig.btnsState">
				<a-button type="primary" @click="submit">提交</a-button>
				<a-button style="margin-left: 10px" @click="cancel">取消</a-button>
			</template>
		</template>
		<div class="drawer-wrap">
			<slot></slot>
		</div>
	</a-drawer>
</template>

<style>
/* 抽屉标题样式 */
.ant-drawer-title {
	color: var(--ice-font-color);
}

/* 抽屉关闭按钮 */
.ant-drawer-close {
	color: var(--ice-font-color);
}

.ant-drawer-close:hover {
	color: rgb(102, 187, 255);
}

/* 抽屉主体 */
.ant-drawer-body {
	background-color: var(--ice-bg-color);
	color: var(--ice-font-color);
}

/* 抽屉头部 */
.ant-drawer-header {
	background-color: var(--ice-bg-color);
	border-bottom: 1px solid var(--ice-border-color);
}

/* 抽屉遮罩层 */
.ant-drawer-mask {
	background-color: rgba(0, 0, 0, 0.45);
}

/* 抽屉容器 */
.ant-drawer-content {
	background-color: var(--ice-bg-color);
}

/* 按钮样式 */
.ant-btn {
	background-color: var(--ice-bg-color);
	border-color: var(--ice-border-color);
	color: var(--ice-font-color);
}

.ant-btn-primary {
	background-color: rgb(102, 187, 255);
	border-color: rgb(102, 187, 255);
	color: #fff;
}

.ant-btn:hover {
	border-color: rgb(102, 187, 255);
	color: rgb(102, 187, 255);
}

/* 表单在抽屉中的样式 */
.ant-form-item-label > label {
	color: var(--ice-font-color);
}

/* 输入框在抽屉中的样式 */
.ant-input {
	background-color: var(--ice-bg-secondary);
	border-color: var(--ice-border-color);
	color: var(--ice-font-color);
}

/* 选择器在抽屉中的样式 */
.ant-select-selector {
	background-color: var(--ice-bg-secondary) !important;
	border-color: var(--ice-border-color) !important;
	color: var(--ice-font-color) !important;
}

/* 日期选择器在抽屉中的样式 */
.ant-picker {
	background-color: var(--ice-bg-secondary);
	border-color: var(--ice-border-color);
	color: var(--ice-font-color);
}

/* 滚动条样式 */
.ant-drawer-body::-webkit-scrollbar {
	width: 6px;
}

.ant-drawer-body::-webkit-scrollbar-track {
	background: var(--ice-bg-secondary);
}

.ant-drawer-body::-webkit-scrollbar-thumb {
	background: var(--ice-border-color);
	border-radius: 3px;
}

.ant-drawer-body::-webkit-scrollbar-thumb:hover {
	background: #888;
}
</style>

<style lang="less" scoped>
/* 抽屉内容区域 */
.drawer-wrap {
	background-color: var(--ice-bg-color);
	color: var(--ice-font-color);
	padding: var(--ice-pm);
}
</style>
