<script lang="ts" setup>
import { computed, ref } from "vue";
import { TableProps } from "ant-design-vue/lib/table";
import { message } from "ant-design-vue";
import {
	TablePaginationConfig,
	SorterResult,
	TableRowSelection,
	FilterValue,
	TableCurrentDataSource
} from "ant-design-vue/es/table/interface";
import IceTable from "@/components/iceTable/index.vue";
import { IceColumn, IceCellProps } from "@/components/iceTable/type";

interface DataItem {
	id?: number;
	name?: string;
	key?: number;
	age?: number;
}

let tableList = ref([
	{
		id: 1,
		name: "小明",
		key: 1,
		age: 18,
		score: 10,
		fav: "爱好"
	},
	{
		id: 2,
		name: "小花",
		key: 2,
		age: 18,
		score: 20,
		fav: "爱好",
		children: [
			{
				id: 21,
				name: "小花1",
				key: 20,
				age: 10,
				score: 30,
				fav: "爱好",
				children: [
					{
						id: 201,
						name: "小花1-1",
						key: 4,
						age: 1,
						score: 40,
						fav: "爱好"
					},
					{
						id: 202,
						name: "小花1-2",
						key: 5,
						age: 1,
						score: 50,
						fav: "爱好"
					}
				]
			},
			{
				id: 6,
				name: "小花2",
				key: 21,
				age: 10,
				score: 60,
				fav: "爱好",
				children: [
					{
						id: 7,
						name: "小花2-1",
						key: 210,
						age: 21,
						score: 70,
						fav: "爱好"
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
		score: 70,
		fav: "爱好",
		children: [
			{
				id: 9,
				name: "小杨1",
				key: 30,
				age: 10,
				score: 80,
				fav: "爱好",
				children: [
					{
						id: 301,
						name: "小杨1-1",
						key: 10,
						age: 1,
						score: 90,
						fav: "爱好"
					},
					{
						id: 302,
						name: "小杨1-2",
						key: 11,
						age: 1,
						score: 100,
						fav: "爱好"
					}
				]
			},
			{
				id: 12,
				name: "小杨2",
				key: 31,
				age: 10,
				score: 90,
				fav: "爱好",
				children: [
					{
						id: 13,
						name: "小杨2-1",
						key: 310,
						age: 1,
						score: 80,
						fav: "爱好"
					}
				]
			}
		]
	}
]);

let columns: IceColumn[] = [
	{
		title: "序号",
		width: "100px",
		type: "iceSque"
	},
	{
		title: "个人信息",
		children: [
			{
				title: "名字",
				dataIndex: "name",
				render: {
					component: "a-tag",
					props: () => ({
						color: "#66bbff"
					})
				}
			},
			{
				title: "年龄",
				sorter: true,
				dataIndex: "age",
				render: {
					component: "a-tag",
					props: ({ text }) => {
						return {
							color: parseInt(text) >= 20 ? "#87d068" : parseInt(text) >= 15 ? "#2db7f5" : "#E8D82C"
						};
					}
				}
			},
			{
				title: "爱好",
				dataIndex: "fav",
				render: ({ text }) => text
			},
			{
				title: "分数",
				dataIndex: "score",
				render: {
					component: "a-progress",
					props: ({ text }) => {
						return {
							format: () => text,
							strokeColor: {
								"0%": "#87d068",
								"100%": "#66bbff"
							},
							percent: parseFloat(text)
						};
					}
				}
			}
		]
	},
	{
		title: "操作",
		dataIndex: "iceOperate",
		render: [
			{
				component: "a-button",
				render: ["编辑"],
				props: ({ record }) => ({
					type: "link",
					onClick: () => {
						message.success("编辑");
						console.log("update", record);
					}
				})
			},
			{
				component: "a-button",
				props: ({ record }) => ({
					type: "link",
					danger: true,
					onClick: () => {
						message.error("删除");
						console.log("delete", record);
					}
				})
			}
		]
	}
];

const loading = ref(true);

const tableOnChange = (
	pagination: TablePaginationConfig,
	filters: Record<string, FilterValue | null>,
	sorter: SorterResult | SorterResult[],
	extra: TableCurrentDataSource
) => {
	console.log(pagination, filters, sorter, extra);
};

const rowSelection = ref<TableRowSelection>({
	checkStrictly: false,
	onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
	},
	onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
		console.log(record, selected, selectedRows);
	},
	onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
		console.log(selected, selectedRows, changeRows);
	}
});

setTimeout(() => {
	loading.value = false;
}, 500);

const tableConfig = computed(
	(): TableProps => ({
		bordered: true,
		columns,
		onChange: tableOnChange,
		rowSelection: rowSelection.value,
		loading: loading.value,
		dataSource: tableList.value,
		pagination: false
	})
);
</script>

<template>
	<div class="ice-menu">
		<div class="menu-table">
			<IceTable :config="tableConfig" />
		</div>
	</div>
</template>

<style lang="less" scoped></style>
