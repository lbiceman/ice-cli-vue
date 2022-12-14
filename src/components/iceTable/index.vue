<script lang="ts" setup>
import { computed, ref } from "vue";
import { IceTableProps } from "./type";
// import { CaretRightOutlined, CaretDownOutlined } from "@ant-design/icons-vue";

// import { isFun, isStr, isObj } from "@/utils/index";
const props = withDefaults(
	defineProps<{
		config: IceTableProps;
	}>(),
	{}
);

const tableRef = ref(null);

const finalConfig = computed((): IceTableProps => {
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
			<template #bodyCell="{ record, column }">
				{{ record[column.dataIndex] }}
			</template>
		</a-table>
	</div>
</template>

<style lang="less">
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td,
.ant-table tfoot > tr > th,
.ant-table tfoot > tr > td {
	padding: 10px;
	color: @ice-font-color;
}
.ant-table-thead > tr > th {
	background-color: @ice-bg-color;
	border-bottom: 1px solid #eee;
	font-weight: bold;
	color: #888;
}
</style>

<style lang="less" scoped>
.ice-table {
	overflow: hidden;
	padding: 12px;
	background-color: @ice-bg-color;
	border-radius: @ice-border-radius;
}
</style>
