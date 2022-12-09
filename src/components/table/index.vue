<script lang="ts" setup>
import { computed, ref } from "vue";
import { IceTableProps } from "./type";

// import { isFun, isStr, isObj } from "@/utils/index";

const props = withDefaults(
	defineProps<{
		config: IceTableProps;
	}>(),
	{}
);

const defaultTableOptions = computed(() => ({
	bordered: false
}));

const tableRef = ref(null);

const finalConfig = computed((): IceTableProps => {
	console.log(props.config);

	let config = Object.assign(defaultTableOptions.value, props.config || {}, {
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
		<a-table ref="tableRef" v-bind="finalConfig"> </a-table>
	</div>
</template>

<style lang="less">
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td,
.ant-table tfoot > tr > th,
.ant-table tfoot > tr > td {
	padding: 10px 16px;
	color: @ice-font-color;
}
</style>

<style lang="less" scoped>
.ice-table {
	overflow: hidden;
	padding: 12px;
	background-color: #fff;
	border-radius: @ice-border-radius;
}
</style>
