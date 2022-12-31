<script lang="ts" setup>
import { computed, ref } from "vue";
import { TableProps } from "ant-design-vue/lib/table";
import dayjs from "dayjs";
import IceTable from "@/components/iceTable/index.vue";
import IceForm from "@/components/iceForm/index.vue";
import { IceColumn } from "@/components/iceTable/type";
import { IceFormProps } from "@/components/iceForm/type";

let tableList = ref([]);

let columns: IceColumn[] = [];

const loading = ref(true);

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

const tableConfig = computed(
	(): TableProps => ({
		bordered: true,
		columns,
		loading: loading.value,
		dataSource: tableList.value,
		pagination: false
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
	margin-top: 20px;
}
</style>
