<script lang="ts" setup>
import { ref, computed } from "vue";
import { message, Modal } from "ant-design-vue";
import IceTable from "@/components/iceTable/index.vue";
import IceForm from "@/components/iceForm/index.vue";
import { IceColumn } from "@/components/iceTable/type";
import { IceFormProps, IceFormList } from "@/components/iceForm/type";
import IceDrawer from "@/components/iceDrawer/index.vue";

interface DataItem {
	id?: number;
	shopName?: string;
	distributorCode?: string;
	region?: string;
	address?: string;
	accountList?: string[];
	authStatus?: number;
	totalFans?: number;
	monthlyPosts?: number;
	remark?: string;
	key?: number;
}

const auState = ref(false);
const loading = ref(false);

const tableList = ref<DataItem[]>([
	{
		id: 1,
		shopName: "北京朝阳店",
		distributorCode: "BJ001",
		region: "华北区",
		address: "北京市朝阳区",
		accountList: ["抖音-官方账号", "小红书-品牌账号"],
		authStatus: 1,
		totalFans: 150000,
		monthlyPosts: 25,
		remark: "核心经销商",
		key: 1
	},
	{
		id: 2,
		shopName: "上海徐汇店",
		distributorCode: "SH001",
		region: "华东区",
		address: "上海市徐汇区",
		accountList: ["抖音-企业号"],
		authStatus: 1,
		totalFans: 80000,
		monthlyPosts: 15,
		remark: "新增经销商",
		key: 2
	}
]);

let type = 1;
const drawerFormState = ref<Partial<DataItem>>({});

let columns: IceColumn[] = [
	{
		title: "基础信息",
		children: [
			{
				title: "门店名称",
				dataIndex: "shopName",
				render: ({ text }) => text
			},
			{
				title: "经销商代码",
				dataIndex: "distributorCode",
				render: ({ text }) => text
			},
			{
				title: "所属区域",
				dataIndex: "region",
				render: ({ text }) => text
			},
			{
				title: "地址",
				dataIndex: "address",
				render: ({ text }) => text
			}
		]
	},
	{
		title: "资产概况",
		children: [
			{
				title: "旗下账号列表",
				dataIndex: "accountList",
				render: ({ text }) => {
					if (!text || !text.length) return "-";
					return {
						component: "a-tag",
						props: { color: "blue" },
						text: text.join(", ")
					};
				}
			},
			{
				title: "授权状态",
				dataIndex: "authStatus",
				render: {
					component: "a-tag",
					props: ({ text }) => ({
						color: text === 1 ? "#52c41a" : "#ff4d4f"
					}),
					text: ({ text }) => text === 1 ? "已授权" : "未授权"
				}
			},
			{
				title: "总粉丝数",
				dataIndex: "totalFans",
				render: ({ text }) => {
					return text?.toLocaleString() || 0;
				}
			},
			{
				title: "本月发文数",
				dataIndex: "monthlyPosts",
				render: ({ text }) => text || 0
			}
		]
	},
	{
		title: "操作",
		render: [
			{
				component: "a-button",
				props: ({ record }) => ({
					type: "link",
					onClick: () => {
						drawerFormState.value = { ...record };
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

const tableConfig = computed(() => ({
	bordered: true,
	columns,
	loading: loading.value,
	dataSource: tableList.value,
	pagination: {
		total: tableList.value.length
	}
}));

const formList: IceFormList[] = [
	{
		item: {
			component: "a-tree-select",
			placeholder: "请按照架构树筛选",
			allowClear: true,
			treeData: [
				{
					title: "全国",
					value: "0",
					children: [
						{
							title: "华北区",
							value: "1",
							children: [
								{ title: "北京市", value: "1-1" },
								{ title: "天津市", value: "1-2" },
								{ title: "河北省", value: "1-3" }
							]
						},
						{
							title: "华东区",
							value: "2",
							children: [
								{ title: "上海市", value: "2-1" },
								{ title: "江苏省", value: "2-2" },
								{ title: "浙江省", value: "2-3" }
							]
						},
						{
							title: "华南区",
							value: "3",
							children: [
								{ title: "广东省", value: "3-1" },
								{ title: "福建省", value: "3-2" }
							]
						}
					]
				}
			]
		},
		formItem: {
			label: "架构树",
			name: "region"
		}
	}
];

const formState = ref({
	region: ""
});

const formConfig = computed((): IceFormProps => ({
	layout: "inline",
	model: formState.value,
	list: formList
}));

const drawerConfig = computed(() => ({
	title: "经销商档案",
	onCancel: () => {
		auState.value = false;
	},
	onSubmit: () => {
		if (type === 1) {
			message.success("添加成功");
		} else {
			message.success("修改成功");
		}
		auState.value = false;
	}
}));

const drawerFormConfig = computed(() => ({
	btnsState: false,
	model: drawerFormState.value,
	list: [
		{
			item: {
				component: "a-input",
				placeholder: "请输入门店名称"
			},
			formItem: {
				label: "门店名称",
				name: "shopName",
				rules: [{ required: true, message: "请输入门店名称" }]
			}
		},
		{
			item: {
				component: "a-input",
				placeholder: "请输入经销商代码"
			},
			formItem: {
				label: "经销商代码",
				name: "distributorCode",
				rules: [{ required: true, message: "请输入经销商代码" }]
			}
		},
		{
			item: {
				component: "a-tree-select",
				placeholder: "请选择所属区域",
				allowClear: true,
				treeData: [
					{
						title: "全国",
						value: "0",
						children: [
							{
								title: "华北区",
								value: "1",
								children: [
									{ title: "北京市", value: "1-1" },
									{ title: "天津市", value: "1-2" },
									{ title: "河北省", value: "1-3" }
								]
							},
							{
								title: "华东区",
								value: "2",
								children: [
									{ title: "上海市", value: "2-1" },
									{ title: "江苏省", value: "2-2" },
									{ title: "浙江省", value: "2-3" }
								]
							},
							{
								title: "华南区",
								value: "3",
								children: [
									{ title: "广东省", value: "3-1" },
									{ title: "福建省", value: "3-2" }
								]
							}
						]
					}
				]
			},
			formItem: {
				label: "所属区域",
				name: "region",
				rules: [{ required: true, message: "请选择所属区域" }]
			}
		},
		{
			item: {
				component: "a-input",
				placeholder: "请输入地址"
			},
			formItem: {
				label: "地址",
				name: "address"
			}
		},
		{
			item: {
				component: "a-select",
				mode: "tags",
				placeholder: "请输入旗下账号，回车添加",
				options: [
					{ value: "抖音-官方账号", label: "抖音-官方账号" },
					{ value: "抖音-企业号", label: "抖音-企业号" },
					{ value: "小红书-品牌账号", label: "小红书-品牌账号" },
					{ value: "快手-直播账号", label: "快手-直播账号" }
				]
			},
			formItem: {
				label: "旗下账号",
				name: "accountList"
			}
		},
		{
			item: {
				component: "a-switch",
				checkedChildren: "已授权",
				unCheckedChildren: "未授权"
			},
			formItem: {
				label: "授权状态",
				name: "authStatus"
			}
		},
		{
			item: {
				component: "a-input-number",
				placeholder: "请输入总粉丝数",
				style: { width: "100%" }
			},
			formItem: {
				label: "总粉丝数",
				name: "totalFans"
			}
		},
		{
			item: {
				component: "a-input-number",
				placeholder: "请输入本月发文数",
				style: { width: "100%" }
			},
			formItem: {
				label: "本月发文数",
				name: "monthlyPosts"
			}
		},
		{
			item: {
				component: "a-textarea",
				placeholder: "请输入备注",
				rows: 4
			},
			formItem: {
				label: "备注",
				name: "remark"
			}
		}
	]
}));

const add = () => {
	drawerFormState.value = { authStatus: 1, accountList: [] };
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
	background-color: var(--ice-card-bg);
	padding: @ice-pm;
	margin-top: 10px;
	border-radius: @ice-border-radius;
	.menu-table-operate {
		display: flex;
		justify-content: space-between;
	}
}
</style>
