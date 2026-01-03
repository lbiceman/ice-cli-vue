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
	avatar?: string;
	nickname?: string;
	xiaohongshuId?: string;
	authTitle?: string;
	belongShop?: string;
	province?: string;
	city?: string;
	totalFans?: number;
	monthlyNewFans?: number;
	monthlyNotes?: number;
	monthlyLiveSessions?: number;
	accountScore?: number;
	contentIndex?: number;
	interactionIndex?: number;
	fansGrowthIndex?: number;
	diligence?: number;
	leadPower?: number;
	status?: string;
	type?: string;
	remark?: string;
	key?: number;
}

const auState = ref(false);
const loading = ref(false);

const tableList = ref<DataItem[]>([
	{
		id: 1,
		avatar: "https://via.placeholder.com/40",
		nickname: "美妆达人小美",
		xiaohongshuId: "XHS123456",
		authTitle: "美妆博主",
		belongShop: "北京朝阳店",
		province: "北京市",
		city: "朝阳区",
		totalFans: 125000,
		monthlyNewFans: 3500,
		monthlyNotes: 28,
		monthlyLiveSessions: 12,
		accountScore: 85,
		contentIndex: 88,
		interactionIndex: 82,
		fansGrowthIndex: 79,
		diligence: 90,
		leadPower: 75,
		status: "正常",
		type: "KOB",
		remark: "优质账号",
		key: 1
	},
	{
		id: 2,
		avatar: "https://via.placeholder.com/40",
		nickname: "穿搭小能手",
		xiaohongshuId: "XHS789012",
		authTitle: "时尚博主",
		belongShop: "上海徐汇店",
		province: "上海市",
		city: "徐汇区",
		totalFans: 68000,
		monthlyNewFans: 1200,
		monthlyNotes: 15,
		monthlyLiveSessions: 5,
		accountScore: 72,
		contentIndex: 75,
		interactionIndex: 68,
		fansGrowthIndex: 70,
		diligence: 65,
		leadPower: 80,
		status: "断更",
		type: "KOS",
		remark: "潜力账号",
		key: 2
	}
]);

let type = 1;
const drawerFormState = ref<Partial<DataItem>>({});

let columns: IceColumn[] = [
			{
				title: "头像",
				dataIndex: "avatar",
				render: ({ text }) => {
					return {
						component: "a-avatar",
						props: { src: text, size: 40 }
					};
				}
			},
			{
				title: "昵称",
				dataIndex: "nickname",
				render: ({ text }) => text
			},
			{
				title: "小红书号",
				dataIndex: "xiaohongshuId",
				render: ({ text }) => text
			},
			{
				title: "认证Title",
				dataIndex: "authTitle",
				render: ({ text }) => text
			},
			{
				title: "所属门店",
				dataIndex: "belongShop",
				render: ({ text }) => text
			},
			{
				title: "省份",
				dataIndex: "province",
				render: ({ text }) => text
			},
			{
				title: "城市",
				dataIndex: "city",
				render: ({ text }) => text
			},
			{
				title: "粉丝总数",
				dataIndex: "totalFans",
				render: ({ text }) => text?.toLocaleString() || 0
			},
			{
				title: "近30天涨粉",
				dataIndex: "monthlyNewFans",
				render: ({ text }) => text?.toLocaleString() || 0
			},
			{
				title: "近30天笔记数",
				dataIndex: "monthlyNotes",
				render: ({ text }) => text || 0
			},
			{
				title: "近30天直播场次",
				dataIndex: "monthlyLiveSessions",
				render: ({ text }) => text || 0
			},
			{
				title: "账号得分",
				dataIndex: "accountScore",
				render: ({ text }) => text || 0
			},
			{
				title: "内容指数",
				dataIndex: "contentIndex",
				render: ({ text }) => text || 0
			},
			{
				title: "互动指数",
				dataIndex: "interactionIndex",
				render: ({ text }) => text || 0
			},
			{
				title: "涨粉指数",
				dataIndex: "fansGrowthIndex",
				render: ({ text }) => text || 0
			},
			{
				title: "勤奋度",
				dataIndex: "diligence",
				render: ({ text }) => text || 0
			},
			{
				title: "线索力",
				dataIndex: "leadPower",
				render: ({ text }) => text || 0
	},
	{
		title: "状态",
		dataIndex: "status",
		render: {
			component: "a-tag",
			props: ({ text }) => {
				const colorMap: Record<string, string> = {
					"正常": "#52c41a",
					"违规": "#ff4d4f",
					"断更": "#faad14"
				};
				return { color: colorMap[text] || "default" };
			},
			text: ({ text }) => text
		}
	},
	{
		title: "类型",
		dataIndex: "type",
		render: {
			component: "a-tag",
			props: ({ text }) => {
				const colorMap: Record<string, string> = {
					"KOB": "#1890ff",
					"KOS": "#722ed1",
					"KOC": "#13c2c2"
				};
				return { color: colorMap[text] || "default" };
			},
			text: ({ text }) => text
		}
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
	scroll: { x: "max-content" },
	pagination: {
		total: tableList.value.length
	}
}));

const formList: IceFormList[] = [
	{
		item: {
			component: "a-select",
			placeholder: "请选择状态",
			allowClear: true,
			options: [
				{ value: "正常", label: "正常" },
				{ value: "违规", label: "违规" },
				{ value: "断更", label: "断更" }
			]
		},
		formItem: {
			label: "状态",
			name: "status"
		}
	},
	{
		item: {
			component: "a-select",
			placeholder: "请选择类型",
			allowClear: true,
			options: [
				{ value: "KOB", label: "KOB" },
				{ value: "KOS", label: "KOS" },
				{ value: "KOC", label: "KOC" }
			]
		},
		formItem: {
			label: "类型",
			name: "type"
		}
	}
];

const formState = ref({
	status: "",
	type: ""
});

const formConfig = computed((): IceFormProps => ({
	layout: "inline",
	model: formState.value,
	list: formList
}));

const drawerConfig = computed(() => ({
	title: "账号资产库",
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
				placeholder: "请输入昵称"
			},
			formItem: {
				label: "昵称",
				name: "nickname",
				rules: [{ required: true, message: "请输入昵称" }]
			}
		},
		{
			item: {
				component: "a-input",
				placeholder: "请输入小红书号"
			},
			formItem: {
				label: "小红书号",
				name: "xiaohongshuId",
				rules: [{ required: true, message: "请输入小红书号" }]
			}
		},
		{
			item: {
				component: "a-input",
				placeholder: "请输入认证Title"
			},
			formItem: {
				label: "认证Title",
				name: "authTitle"
			}
		},
		{
			item: {
				component: "a-input",
				placeholder: "请输入所属门店"
			},
			formItem: {
				label: "所属门店",
				name: "belongShop"
			}
		},
		{
			item: {
				component: "a-input",
				placeholder: "请输入省份"
			},
			formItem: {
				label: "省份",
				name: "province"
			}
		},
		{
			item: {
				component: "a-input",
				placeholder: "请输入城市"
			},
			formItem: {
				label: "城市",
				name: "city"
			}
		},
		{
			item: {
				component: "a-input-number",
				placeholder: "请输入粉丝总数",
				style: { width: "100%" }
			},
			formItem: {
				label: "粉丝总数",
				name: "totalFans"
			}
		},
		{
			item: {
				component: "a-input-number",
				placeholder: "请输入近30天涨粉",
				style: { width: "100%" }
			},
			formItem: {
				label: "近30天涨粉",
				name: "monthlyNewFans"
			}
		},
		{
			item: {
				component: "a-input-number",
				placeholder: "请输入近30天笔记数",
				style: { width: "100%" }
			},
			formItem: {
				label: "近30天笔记数",
				name: "monthlyNotes"
			}
		},
		{
			item: {
				component: "a-input-number",
				placeholder: "请输入近30天直播场次",
				style: { width: "100%" }
			},
			formItem: {
				label: "近30天直播场次",
				name: "monthlyLiveSessions"
			}
		},
		{
			item: {
				component: "a-input-number",
				placeholder: "请输入账号得分(0-100)",
				style: { width: "100%" },
				min: 0,
				max: 100
			},
			formItem: {
				label: "账号得分",
				name: "accountScore"
			}
		},
		{
			item: {
				component: "a-input-number",
				placeholder: "请输入内容指数(0-100)",
				style: { width: "100%" },
				min: 0,
				max: 100
			},
			formItem: {
				label: "内容指数",
				name: "contentIndex"
			}
		},
		{
			item: {
				component: "a-input-number",
				placeholder: "请输入互动指数(0-100)",
				style: { width: "100%" },
				min: 0,
				max: 100
			},
			formItem: {
				label: "互动指数",
				name: "interactionIndex"
			}
		},
		{
			item: {
				component: "a-input-number",
				placeholder: "请输入涨粉指数(0-100)",
				style: { width: "100%" },
				min: 0,
				max: 100
			},
			formItem: {
				label: "涨粉指数",
				name: "fansGrowthIndex"
			}
		},
		{
			item: {
				component: "a-input-number",
				placeholder: "请输入勤奋度(0-100)",
				style: { width: "100%" },
				min: 0,
				max: 100
			},
			formItem: {
				label: "勤奋度",
				name: "diligence"
			}
		},
		{
			item: {
				component: "a-input-number",
				placeholder: "请输入线索力(0-100)",
				style: { width: "100%" },
				min: 0,
				max: 100
			},
			formItem: {
				label: "线索力",
				name: "leadPower"
			}
		},
		{
			item: {
				component: "a-select",
				placeholder: "请选择状态",
				allowClear: true,
				options: [
					{ value: "正常", label: "正常" },
					{ value: "违规", label: "违规" },
					{ value: "断更", label: "断更" }
				]
			},
			formItem: {
				label: "状态",
				name: "status"
			}
		},
		{
			item: {
				component: "a-select",
				placeholder: "请选择类型",
				allowClear: true,
				options: [
					{ value: "KOB", label: "KOB" },
					{ value: "KOS", label: "KOS" },
					{ value: "KOC", label: "KOC" }
				]
			},
			formItem: {
				label: "类型",
				name: "type"
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
	drawerFormState.value = { status: "正常", type: "KOB" };
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
