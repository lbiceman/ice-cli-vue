<script lang="ts" setup>
import { computed, ref } from "vue";
import { TableProps } from "ant-design-vue/lib/table";
import IceTableCol from "./iceTableCol.vue";

const props = withDefaults(
	defineProps<{
		config: TableProps;
	}>(),
	{}
);

const tableRef = ref(null);

const finalConfig = computed(() => {
	let config = Object.assign(props.config || {}, {
		brdered: false,
		pagination: {
			hideOnSinglePage: false,
			defaultPageSize: 10,
			position: ["bottomLeft"],
			showQuickJumper: true,
			showLessItems: true,
			showSizeChanger: true,
			showTotal: (total: number) => `共 ${total} 条记录`,
			...(props.config?.pagination || {})
		}
	});

	return config;
});
</script>

<template>
	<div class="ice-table">
		<a-table ref="tableRef" v-bind="finalConfig">
			<!-- <template #expandIcon="s">
			</template> -->
			<template #bodyCell="p">
				<IceTableCol :render-props="p" />
			</template>
		</a-table>
	</div>
</template>

<style lang="less">
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td,
.ant-table tfoot > tr > th,
.ant-table tfoot > tr > td {
	padding: @ice-pm;
	color: var(--ice-font-color);
}
.ant-table-thead > tr > th {
	background-color: var(--ice-bg-color);
	border-bottom: 1px solid var(--ice-border-color);
	font-weight: bold;
	color: var(--ice-font-color);
	background-color: var(--ice-bg-secondary);
}

/* 表格行背景色 */
.ant-table-tbody > tr > td {
	background-color: var(--ice-bg-color) !important;
}

/* 表格行悬停效果 */
.ant-table-tbody > tr:hover > td {
	background-color: var(--ice-bg-secondary) !important;
}

/* 表格边框 */
.ant-table {
	border: 1px solid var(--ice-border-color);
}

/* 表格容器背景 */
.ant-table-container {
	background-color: var(--ice-bg-color);
}

/* 表格内容区域背景 */
.ant-table-content {
	background-color: var(--ice-bg-color);
}

/* 表格body背景 */
.ant-table-body {
	background-color: var(--ice-bg-color);
}

.ant-table-container {
	border: 1px solid var(--ice-border-color);
}

/* 表格分页样式 */
.ant-pagination {
	color: var(--ice-font-color);
}

/* 分页选项器样式 */
.ant-pagination-options {
	color: var(--ice-font-color);
}

.ant-pagination-options-size-changer {
	color: var(--ice-font-color);
}

.ant-pagination-options-quick-jumper {
	color: var(--ice-font-color);
}

.ant-pagination-options-quick-jumper input {
	background-color: var(--ice-bg-secondary);
	border-color: var(--ice-border-color);
	color: var(--ice-font-color);
}

/* 分页项样式 */
.ant-pagination-item {
	background-color: var(--ice-bg-color) !important;
	border-color: var(--ice-border-color) !important;
}

.ant-pagination-item a {
	color: var(--ice-font-color) !important;
}

.ant-pagination-item:hover {
	border-color: rgb(102, 187, 255) !important;
}

.ant-pagination-item:hover a {
	color: rgb(102, 187, 255) !important;
}

.ant-pagination-item-active {
	background-color: rgb(102, 187, 255) !important;
	border-color: rgb(102, 187, 255) !important;
}

.ant-pagination-item-active a {
	color: #fff !important;
}

/* 上一页/下一页按钮 */
.ant-pagination-prev,
.ant-pagination-next {
	background-color: var(--ice-bg-color) !important;
	border-color: var(--ice-border-color) !important;
}

.ant-pagination-prev .ant-pagination-item-link,
.ant-pagination-next .ant-pagination-item-link {
	color: var(--ice-font-color) !important;
	background-color: transparent !important;
	border-color: var(--ice-border-color) !important;
}

.ant-pagination-prev:hover .ant-pagination-item-link,
.ant-pagination-next:hover .ant-pagination-item-link {
	color: rgb(102, 187, 255) !important;
	border-color: rgb(102, 187, 255) !important;
}

/* 跳转按钮 */
.ant-pagination-jump-prev,
.ant-pagination-jump-next {
	color: var(--ice-font-color) !important;
}

.ant-pagination-jump-prev:hover,
.ant-pagination-jump-next:hover {
	color: rgb(102, 187, 255) !important;
}

/* 分页总数显示 */
.ant-pagination-total-text {
	color: var(--ice-font-color) !important;
}

/* 禁用状态 */
.ant-pagination-disabled .ant-pagination-item-link,
.ant-pagination-disabled:hover .ant-pagination-item-link {
	color: var(--ice-font-color) !important;
	border-color: var(--ice-border-color) !important;
}

/* 下拉选择器 */
.ant-select-selector {
	background-color: var(--ice-bg-secondary) !important;
	border-color: var(--ice-border-color) !important;
	color: var(--ice-font-color) !important;
}

.ant-select-arrow {
	color: var(--ice-font-color) !important;
}

/* 简洁模式分页 */
.ant-pagination-simple {
	color: var(--ice-font-color);
}

.ant-pagination-simple .ant-pagination-simple-pager input {
	background-color: var(--ice-bg-secondary);
	border-color: var(--ice-border-color);
	color: var(--ice-font-color);
}

/* 空状态样式 */
.ant-empty-description {
	color: var(--ice-font-color);
}

/* 表格loading样式 */
.ant-spin-dot-item {
	background-color: var(--ice-font-color);
}

/* 确保表格行背景色正确应用 */
.ant-table-tbody > tr {
	background-color: var(--ice-bg-color) !important;
}

.ant-table-tbody > tr > td {
	background-color: transparent !important;
}

/* 奇偶行颜色 */
.ant-table-tbody > tr:nth-child(even) {
	background-color: var(--ice-bg-color) !important;
}

.ant-table-tbody > tr:nth-child(odd) {
	background-color: var(--ice-bg-color) !important;
}

/* 修复Ant Design表格默认的白色背景 */
.ant-table-wrapper,
.ant-table,
.ant-table-container,
.ant-table-content,
.ant-table-body {
	background-color: var(--ice-bg-color) !important;
}

/* 表格单元格边框 */
.ant-table-tbody > tr > td {
	border-bottom: 1px solid var(--ice-border-color);
}
</style>

<style lang="less" scoped>
.ice-table {
	overflow: hidden;
	margin-top: @ice-pm;
	background-color: var(--ice-bg-color);
	border-radius: @ice-border-radius;
}
</style>
