<script lang="ts" setup>
import { computed, ref } from "vue";
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
import { IceFormList, IceFormProps } from "@/components/iceForm/type";
import IceDrawer from "@/components/iceDrawer/index.vue";
import { clone } from "@/utils/index";

// 1新增  2修改
let type = 1;

const auState = ref(false);

const tableList = ref([
	{
		id: 1,
		name: "角色管理",
		createTime: "2022-12-31",
		key: 1
	},
	{
		id: 2,
		name: "用户管理",
		createTime: "2022-12-30",
		key: 2
	},
	{
		id: 8,
		name: "菜单管理",
		createTime: "2022-12-24",
		key: 3
	}
]);

const loading = ref(true);

let columns: IceColumn[] = [
	{
		title: "名称",
		dataIndex: "name",
		render: ({ text }) => text
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
			total: 3
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
			placeholder: "请填写菜单名称"
		},
		formItem: {
			label: "菜单名称",
			name: "name"
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
	title: "菜单管理",
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

const drawerFormState = ref({});

const drawerFormConfig = computed(() => ({
	btnsState: false,
	model: drawerFormState.value,
	list: formList
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
