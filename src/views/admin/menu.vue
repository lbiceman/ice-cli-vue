<script lang="ts" setup>
import IceTable from "@/components/iceTable/index.vue";
import { computed, ref } from "vue";
import {
	TablePaginationConfig,
	SorterResult,
	TableRowSelection,
	ColumnFilterItem
} from "ant-design-vue/es/table/interface";

let tableList = ref([
	{
		id: 1,
		name: "小明",
		key: 1,
		age: 18
	},
	{
		id: 2,
		name: "小花",
		key: 2,
		age: 18,
		children: [
			{
				id: 21,
				name: "小花1",
				key: 20,
				age: 10,
				children: [
					{
						id: 201,
						name: "小花1-1",
						key: 4,
						age: 1
					},
					{
						id: 202,
						name: "小花1-2",
						key: 5,
						age: 1
					}
				]
			},
			{
				id: 6,
				name: "小花2",
				key: 21,
				age: 10,
				children: [
					{
						id: 7,
						name: "小花2-1",
						key: 210,
						age: 21
					}
				]
			}
		]
	},
	{
		id: 8,
		name: "小杨",
		key: 3,
		age: 18,
		children: [
			{
				id: 9,
				name: "小杨1",
				key: 30,
				age: 10,
				children: [
					{
						id: 301,
						name: "小杨1-1",
						key: 10,
						age: 1
					},
					{
						id: 302,
						name: "小杨1-2",
						key: 11,
						age: 1
					}
				]
			},
			{
				id: 12,
				name: "小杨2",
				key: 31,
				age: 10,
				children: [
					{
						id: 13,
						name: "小杨2-1",
						key: 310,
						age: 1
					}
				]
			}
		]
	}
]);

let columns = [
	{
		title: "序号",
		dataIndex: "iceSque"
	},
	{
		title: "名字",
		dataIndex: "name"
	},
	{
		title: "年龄",
		sorter: true,
		dataIndex: "age"
	},
	{
		title: "操作",
		dataIndex: "iceOperate"
	}
];

const loading = ref(true);

const tableChange = (pagination: TablePaginationConfig, filters: ColumnFilterItem, sorter: SorterResult) => {
	console.log(pagination, filters, sorter.order);
};

const rowSelection = ref<TableRowSelection>({
	checkStrictly: false,
	onChange: (selectedRowKeys: (string | number)[], selectedRows: any[]) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
	},
	onSelect: (record: any, selected: boolean, selectedRows: any[]) => {
		console.log(record, selected, selectedRows);
	},
	onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
		console.log(selected, selectedRows, changeRows);
	}
});

setTimeout(() => {
	loading.value = false;
}, 2000);

const tableConfig = computed(() => ({
	onChange: tableChange,
	columns,
	rowSelection: rowSelection.value,
	loading: loading.value,
	dataSource: tableList.value
}));
</script>

<template>
	<div class="ice-menu">
		<div class="menu-table">
			<IceTable :config="tableConfig" />
		</div>
	</div>
</template>

<style lang="less" scoped></style>
