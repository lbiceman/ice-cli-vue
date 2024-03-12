<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { TableProps } from "ant-design-vue/lib/table";
import { message, Modal } from "ant-design-vue";
import {
	TablePaginationConfig,
	SorterResult,
	TableRowSelection,
	FilterValue,
	TableCurrentDataSource
} from "ant-design-vue/es/table/interface";
import IceTable from "@/components/iceTable/index.vue";
import IceForm from "@/components/iceForm/index.vue";
import { IceColumn } from "@/components/iceTable/type";
import { IceFormProps, IceFormList } from "@/components/iceForm/type";
import IceDrawer from "@/components/iceDrawer/index.vue";
import { clone } from "@/utils/index";
import { useAxios } from "@/services/index";

interface DataItem {
	id?: number;
	name?: string;
	roleName?: string;
	roleId?: number;
	createTime?: string;
	remark?: string;
	key?: number;
	sex?: number;
	age?: number;
	score?: number;
	fav?: string;
}

const { data, run } = useAxios({
	method: "post",
	url: "/common/offline/admin/list",
	data: {},
	module: "login"
});

run();

watchEffect(() => {
	console.log(data);
});

// 1新增  2修改
let type = 1;

const auState = ref(false);

const tableList = ref([
	{
		id: 1,
		name: "小明",
		createTime: "2022-12-31",
		roleName: "管理员",
		roleId: 1,
		remark: '<h3><span style="color: rgb(115, 209, 61); background-color: rgb(246, 226, 234);">remark1</span></h3>',
		key: 1,
		sex: 1,
		age: 18,
		score: 10,
		fav: "爱好"
	},
	{
		id: 2,
		name: "小花",
		createTime: "2022-12-30",
		roleName: "管理员",
		roleId: 1,
		remark: "remark2",
		key: 2,
		sex: 0,
		age: 18,
		score: 20,
		fav: "爱好",
		children: [
			{
				id: 21,
				name: "小花1",
				createTime: "2022-12-29",
				roleName: "管理员",
				roleId: 1,
				remark: "remark3",
				key: 20,
				sex: 0,
				age: 10,
				score: 30,
				fav: "爱好",
				children: [
					{
						id: 201,
						name: "小花1-1",
						createTime: "2022-12-28",
						roleName: "管理员",
						roleId: 1,
						remark: "remark4",
						key: 4,
						sex: 0,
						age: 1,
						score: 40,
						fav: "爱好"
					},
					{
						id: 202,
						name: "小花1-2",
						createTime: "2022-12-27",
						roleName: "管理员",
						roleId: 1,
						remark: "remark5",
						key: 5,
						sex: 0,
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
				roleName: "管理员",
				roleId: 1,
				remark: "remark6",
				key: 21,
				sex: 0,
				age: 10,
				score: 60,
				fav: "爱好",
				children: [
					{
						id: 7,
						name: "小花2-1",
						createTime: "2022-12-25",
						roleName: "管理员",
						roleId: 1,
						remark: "remark7",
						key: 210,
						sex: 0,
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
		roleName: "管理员",
		roleId: 1,
		remark: "remark8",
		key: 3,
		sex: 1,
		age: 18,
		score: 70,
		fav: "爱好",
		children: [
			{
				id: 9,
				name: "小杨1",
				createTime: "2022-12-23",
				roleName: "管理员",
				roleId: 1,
				remark: "remark9",
				key: 30,
				sex: 1,
				age: 10,
				score: 80,
				fav: "爱好",
				children: [
					{
						id: 301,
						name: "小杨1-1",
						createTime: "2022-12-22",
						roleName: "管理员",
						roleId: 1,
						remark: "remark10",
						key: 10,
						sex: 1,
						age: 1,
						score: 90,
						fav: "爱好"
					},
					{
						id: 302,
						name: "小杨1-2",
						createTime: "2022-12-21",
						roleName: "管理员",
						roleId: 1,
						remark: "remark11",
						key: 11,
						sex: 1,
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
				roleName: "管理员",
				roleId: 1,
				remark: "remark12",
				key: 31,
				sex: 1,
				age: 10,
				score: 90,
				fav: "爱好",
				children: [
					{
						id: 13,
						name: "小杨2-1",
						createTime: "2022-12-19",
						roleName: "管理员",
						roleId: 1,
						remark: "remark13",
						key: 310,
						sex: 1,
						age: 1,
						score: 80,
						fav: "爱好"
					}
				]
			}
		]
	}
]);

const loading = ref(true);

let columns: IceColumn[] = [
	{
		title: "个人信息",
		children: [
			{
				title: "姓名",
				dataIndex: "name",
				render: ({ text }) => text
			},
			{
				title: "角色",
				dataIndex: "roleName",
				render: ({ text }) => text
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
		title: "备注",
		dataIndex: "remark",
		render: ({ text }) => text
	},
	{
		title: "操作",
		render: [
			{
				component: "a-button",
				props: ({ record }) => ({
					type: "link",
					onClick: () => {
						let data = clone(record, {});
						drawerFormState.value = data;
						type = 2;
						auState.value = true;
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
						Modal.confirm({
							title: "提示",
							content: "确认要删除吗?",
							onOk() {
								message.success("删除成功");
							},
							onCancel() {}
						});
					}
				}),
				icon: "iconfont ice-icon-delete",
				text: () => "删除"
			}
		]
	}
];

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

setTimeout(() => {
	loading.value = false;
}, 500);

const formList: IceFormList[] = [
	{
		item: {
			component: "a-input",
			placeholder: "请填写姓名"
		},
		formItem: {
			label: "姓名",
			name: "name"
		}
	},
	{
		item: {
			component: "a-select",
			placeholder: "请选择角色名称",
			allowClear: true,
			options: [
				{ value: 1, label: "管理员" },
				{ value: 2, label: "超级管理员" },
				{ value: 3, label: "用户" }
			]
		},
		formItem: {
			label: "角色名称",
			name: "roleId"
		}
	},
	{
		item: {
			component: "a-date-picker",
			placeholder: "请选择时间",
			valueFormat: "YYYY-MM-DD",
			allowClear: true
		},
		formItem: {
			label: "创建时间",
			name: "createTime"
		}
	}
];

const formState = ref({
	name: "",
	roleName: "",
	createTime: "2023-01-04"
});

const formConfig = computed(
	(): IceFormProps => ({
		layout: "inline",
		model: formState.value,
		list: formList
	})
);

const drawerConfig = computed(() => ({
	title: "用户管理",
	onCancel: () => {
		auState.value = false;
	},
	onSubmit: () => {
		if (type == 1) {
			message.success("add");
		} else if (type == 2) {
			message.info("update");
		}
		console.log(drawerFormState);
		auState.value = false;
	}
}));

const drawerFormState = ref({});

const drawerFormConfig = computed(() => ({
	btnsState: false,
	model: drawerFormState.value,
	list: Array.prototype.concat(formList, [
		{
			item: {
				component: "ice-editor",
				config: {
					editorConfig: {
						// 富文本高度建议填写大于300的。否则会抛警告
						style: {
							height: "310px"
						}
					}
				}
			},
			formItem: {
				label: "备注",
				name: "remark"
			}
		}
	])
}));

const add = () => {
	drawerFormState.value = {};
	type = 1;
	auState.value = true;
};
</script>

<template>
	<div class="ice-menu">
		<div class="menu-form">
			<IceForm :config="formConfig" />
		</div>
		<div class="menu-table">
			<div class="menu-table-operate">
				<div></div>
				<div class="operate-btns">
					<a-button type="primary" @click="add">
						<span class="iconfont ice-icon-add"></span>
						新增
					</a-button>
				</div>
			</div>
			<IceTable :config="tableConfig" />
		</div>
		<div class="menu-drawer">
			<IceDrawer :config="drawerConfig" :visible="auState">
				<IceForm :config="drawerFormConfig" />
			</IceDrawer>
		</div>
	</div>
</template>

<style lang="less" scoped>
.menu-table {
	background-color: #fff;
	padding: @ice-pm;
	margin-top: 10px;
	border-radius: @ice-border-radius;
	.menu-table-operate {
		display: flex;
		justify-content: space-between;
	}
}
</style>
