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

interface TreeNode {
	title: string;
	key: string;
	children?: TreeNode[];
}

// 1新增  2修改
let type = 1;

const auState = ref(false);
const configAuthState = ref(false);

// 权限树数据
const treeData = ref<TreeNode[]>([
	{
		title: "系统管理",
		key: "system",
		children: [
			{
				title: "角色管理",
				key: "role",
				children: [
					{ title: "查看", key: "role:view" },
					{ title: "新增", key: "role:add" },
					{ title: "修改", key: "role:edit" },
					{ title: "删除", key: "role:delete" }
				]
			},
			{
				title: "用户管理",
				key: "user",
				children: [
					{ title: "查看", key: "user:view" },
					{ title: "新增", key: "user:add" },
					{ title: "修改", key: "user:edit" },
					{ title: "删除", key: "user:delete" }
				]
			},
			{
				title: "菜单管理",
				key: "menu",
				children: [
					{ title: "查看", key: "menu:view" },
					{ title: "新增", key: "menu:add" },
					{ title: "修改", key: "menu:edit" },
					{ title: "删除", key: "menu:delete" }
				]
			},
			{
				title: "权限管理",
				key: "auth",
				children: [
					{ title: "查看", key: "auth:view" },
					{ title: "新增", key: "auth:add" },
					{ title: "修改", key: "auth:edit" },
					{ title: "删除", key: "auth:delete" }
				]
			}
		]
	}
]);

// 选中的权限
const checkedKeys = ref<string[]>([]);

const tableList = ref([
	{
		id: 1,
		name: "角色管理",
		permission: "role:view",
		createTime: "2022-12-31",
		key: 1
	},
	{
		id: 2,
		name: "用户管理",
		permission: "user:view",
		createTime: "2022-12-30",
		key: 2
	},
	{
		id: 3,
		name: "菜单管理",
		permission: "menu:view",
		createTime: "2022-12-24",
		key: 3
	},
	{
		id: 4,
		name: "权限管理",
		permission: "auth:view",
		createTime: "2022-12-23",
		key: 4
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
		title: "权限标识",
		dataIndex: "permission",
		render: {
			component: "a-tag",
			props: () => ({
				color: "#87d068"
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
					onClick: () => {
						checkedKeys.value = [];
						configAuthState.value = true;
					}
				}),
				icon: "iconfont ice-icon-setting",
				text: () => " 配置权限"
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
			total: 4
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
			placeholder: "请填写权限名称"
		},
		formItem: {
			label: "权限名称",
			name: "name"
		}
	},
	{
		item: {
			component: "a-input",
			placeholder: "请填写权限标识"
		},
		formItem: {
			label: "权限标识",
			name: "permission"
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
	permission: "",
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
	title: "权限管理",
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

// 配置权限
const configAuthDrawer = computed(() => ({
	title: "配置权限",
	onCancel: () => {
		configAuthState.value = false;
	},
	onSubmit: () => {
		console.log("选中的权限:", checkedKeys.value);
		message.success("配置成功");
		configAuthState.value = false;
	}
}));
</script>

<template>
	<div class="ice-auth">
		<div class="auth-form">
			<IceForm :config="formConfig" />
		</div>
		<div class="auth-table">
			<div class="auth-table-operate">
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
		<div class="auth-drawer">
			<IceDrawer :config="drawerConfig" :visible="auState">
				<IceForm :config="drawerFormConfig" />
			</IceDrawer>
			<IceDrawer :config="configAuthDrawer" :visible="configAuthState">
				<a-tree
					v-model:checkedKeys="checkedKeys"
					checkable
					:tree-data="treeData"
					:field-names="{ children: 'children', title: 'title', key: 'key' }"
					default-expand-all
				/>
			</IceDrawer>
		</div>
	</div>
</template>

<style lang="less" scoped>
.auth-table {
	background-color: var(--ice-card-bg);
	padding: @ice-pm;
	margin-top: 10px;
	border-radius: @ice-border-radius;
	.auth-table-operate {
		display: flex;
		justify-content: space-between;
	}
}
</style>
