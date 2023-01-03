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
import dayjs from "dayjs";
import IceTable from "@/components/iceTable/index.vue";
import IceForm from "@/components/iceForm/index.vue";
import { IceColumn } from "@/components/iceTable/type";
import { IceFormProps } from "@/components/iceForm/type";

interface DataItem {
	id?: number;
	name?: string;
	key?: number;
	age?: number;
	score?: number;
	fav?: string;
	createTime?: string;
}

let tableList = ref([
	{
		id: 1,
		name: "小明",
		createTime: "2022-12-31",
		key: 1,
		age: 18,
		score: 10,
		fav: "爱好"
	},
	{
		id: 2,
		name: "小花",
		createTime: "2022-12-30",
		key: 2,
		age: 18,
		score: 20,
		fav: "爱好",
		children: [
			{
				id: 21,
				name: "小花1",
				createTime: "2022-12-29",
				key: 20,
				age: 10,
				score: 30,
				fav: "爱好",
				children: [
					{
						id: 201,
						name: "小花1-1",
						createTime: "2022-12-28",
						key: 4,
						age: 1,
						score: 40,
						fav: "爱好"
					},
					{
						id: 202,
						name: "小花1-2",
						createTime: "2022-12-27",
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
				createTime: "2022-12-26",
				key: 21,
				age: 10,
				score: 60,
				fav: "爱好",
				children: [
					{
						id: 7,
						name: "小花2-1",
						createTime: "2022-12-25",
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
		createTime: "2022-12-24",
		key: 3,
		age: 18,
		score: 70,
		fav: "爱好",
		children: [
			{
				id: 9,
				name: "小杨1",
				createTime: "2022-12-23",
				key: 30,
				age: 10,
				score: 80,
				fav: "爱好",
				children: [
					{
						id: 301,
						name: "小杨1-1",
						createTime: "2022-12-22",
						key: 10,
						age: 1,
						score: 90,
						fav: "爱好"
					},
					{
						id: 302,
						name: "小杨1-2",
						createTime: "2022-12-21",
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
				createTime: "2022-12-20",
				key: 31,
				age: 10,
				score: 90,
				fav: "爱好",
				children: [
					{
						id: 13,
						name: "小杨2-1",
						createTime: "2022-12-19",
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
		title: "个人信息",
		children: [
			{
				title: "名字",
				dataIndex: "name",
				render: {
					component: "a-tag",
					props: () => ({
						color: "#66bbff"
					}),
					text: ({ text }) => text
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
					},
					text: ({ text }) => text
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
		title: "创建时间",
		dataIndex: "createTime",
		render: ({ text }) => text
	},
	{
		title: "操作",
		render: [
			{
				component: "a-button",
				props: () => ({
					type: "link",
					onClick: () => {
						message.info("update");
					}
				}),
				icon: "iconfont ice-icon-edit",
				text: () => " 修改"
			},
			{
				component: "a-button",
				props: () => ({
					type: "link",
					danger: true,
					onClick: () => {
						message.error("删除");
					}
				}),
				icon: "iconfont ice-icon-delete",
				text: () => "删除"
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

const formList = [
	{
		component: "a-input",
		label: "名字",
		name: "name"
	},
	{
		component: "a-select",
		label: "性別",
		name: "sex",
		allowClear: true,
		options: [
			{ value: 1, label: "男" },
			{ value: 0, label: "女" }
		]
	},
	{
		component: "a-date-picker",
		label: "日期",
		name: "date",
		format: "YYYY-MM-DD",
		allowClear: true
	}
];

const formState = ref({
	name: "",
	sex: 1,
	date: dayjs("2022-12-31", "YYYY-MM-DD")
});

setTimeout(() => {
	loading.value = false;
}, 500);

setTimeout(() => {
	tableList.value.push({
		id: 10,
		name: "小1",
		createTime: "2022-12-31",
		key: 10,
		age: 10,
		score: 10,
		fav: "爱好"
	});
}, 3000);

const tableConfig = computed(
	(): TableProps => ({
		bordered: true,
		columns,
		onChange: tableOnChange,
		rowSelection: rowSelection.value,
		loading: loading.value,
		dataSource: tableList.value,
		pagination: {
			total: 20
		}
	})
);

const formConfig = computed(
	(): IceFormProps => ({
		layout: "inline",
		value: formState.value,
		list: formList
	})
);
</script>

<template>
	<div class="ice-menu">
		<div class="menu-form">
			<IceForm :config="formConfig" />
		</div>
		<div class="menu-table">
			<IceTable :config="tableConfig" />
		</div>
	</div>
</template>

<style lang="less" scoped>
.menu-table {
	margin-top: 10px;
}
</style>
