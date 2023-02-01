<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { TableProps } from "ant-design-vue/lib/table";
import { message, Modal } from "ant-design-vue";
import {
	TablePaginationConfig,
	SorterResult,
	FilterValue,
	TableCurrentDataSource
} from "ant-design-vue/es/table/interface";
import IceTable from "@/components/iceTable/index.vue";
import IceForm from "@/components/iceForm/index.vue";
import { IceColumn } from "@/components/iceTable/type";
import { IceFormProps, IceFormList } from "@/components/iceForm/type";
import IceDrawer from "@/components/iceDrawer/index.vue";
import { clone } from "@/utils/index";
import { useAxios } from "@/services";

// 1新增  2修改
let type = 1;

const auState = ref(false);
const drawerFormState = ref({});
const tableList = ref();
const page = ref({
	total: 0,
	current: 1,
	pageSize: 10
});

const loading = ref(true);

let columns: IceColumn[] = [
	{
		title: "姓名",
		dataIndex: "name",
		render: ({ text }) => text
	},
	{
		title: "角色名称",
		dataIndex: "roleName",
		render: {
			component: "a-tag",
			props: () => ({
				color: "#66bbff"
			}),
			text: ({ text }) => text
		}
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

const tableConfig = computed(
	(): TableProps => ({
		bordered: true,
		columns,
		onChange: tableOnChange,
		loading: loading.value,
		dataSource: tableList.value,
		pagination: {
			total: page.value.total
		}
	})
);

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
	roleId: null,
	createTime: ""
});

const formConfig = computed(
	(): IceFormProps => ({
		layout: "inline",
		model: formState.value,
		list: formList
	})
);

const drawerConfig = computed(() => ({
	title: "角色管理",
	onCancel: () => {
		auState.value = false;
	},
	onSubmit: () => {
		if (type == 1) {
			message.success("add");
		} else if (type == 2) {
			message.info("update");
		}
		auState.value = false;
	}
}));

const drawerFormConfig = computed(() => ({
	btnsState: false,
	model: drawerFormState.value,
	list: formList
}));

const { run, data } = useAxios({
	url: "/ice-cli/getRoleList",
	method: "get"
});

watchEffect(() => {
	if (data.value) {
		loading.value = false;
		tableList.value = data.value.data.list;
		page.value.total = data.value.data.page.total;
	}
});

run();

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
