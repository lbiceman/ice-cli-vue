<script lang="ts" setup>
import { ref, computed } from "vue";
import IceTable from "@/components/iceTable/index.vue";
import IceForm from "@/components/iceForm/index.vue";
import { IceColumn } from "@/components/iceTable/type";
import { IceFormProps, IceFormList } from "@/components/iceForm/type";

interface DataItem {
	id?: number;
	accountType?: string;
	genderDistribution?: string;
	ageDistribution?: string;
	provinceDistribution?: string;
	cityDistribution?: string;
	key?: number;
}

const loading = ref(false);

const tableList = ref<DataItem[]>([
	{
		id: 1,
		accountType: "账号",
		genderDistribution: "男: 52%, 女: 48%",
		ageDistribution: "18-24: 30%, 25-34: 45%, 35-44: 20%, 45+: 5%",
		provinceDistribution: "北京市: 40%, 上海市: 25%, 广东省: 15%, 其他: 20%",
		cityDistribution: "朝阳区: 15%, 浦东新区: 12%, 珠海: 8%, 其他: 65%",
		key: 1
	},
	{
		id: 2,
		accountType: "账号组",
		genderDistribution: "男: 45%, 女: 55%",
		ageDistribution: "18-24: 25%, 25-34: 50%, 35-44: 18%, 45+: 7%",
		provinceDistribution: "浙江省: 35%, 江苏省: 28%, 四川省: 18%, 其他: 19%",
		cityDistribution: "杭州市: 18%, 南京市: 15%, 成都市: 12%, 其他: 55%",
		key: 2
	}
]);

let columns: IceColumn[] = [
	{
		title: "账号类型",
		dataIndex: "accountType",
		render: {
			component: "a-tag",
			props: ({ text }) => ({
				color: text === "账号" ? "#1890ff" : "#722ed1"
			}),
			text: ({ text }) => text
		}
	},
	{
		title: "性别分布",
		dataIndex: "genderDistribution",
		render: ({ text }) => text
	},
	{
		title: "年龄分布",
		dataIndex: "ageDistribution",
		render: ({ text }) => text
	},
	{
		title: "地域分布(省份/市)",
				dataIndex: "provinceDistribution",
				render: ({ text }) => text
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
			placeholder: "请选择账号类型",
			allowClear: true,
			options: [
				{ value: "账号", label: "账号" },
				{ value: "账号组", label: "账号组" }
			]
		},
		formItem: {
			label: "账号类型",
			name: "accountType"
		}
	}
];

const formState = ref({
	accountType: ""
});

const formConfig = computed((): IceFormProps => ({
	layout: "inline",
	model: formState.value,
	list: formList
}));
</script>

<template>
	<div class="ice-menu">
		<div class="menu-form">
			<IceForm :config="formConfig" />
		</div>
		<div class="menu-table">
			<div class="menu-table-operate">
				<div></div>
			</div>
			<IceTable :config="tableConfig" />
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
