<script lang="ts" setup>
import IceTable from "@/components/iceTable/index.vue";
import { computed, ref } from "vue";
import { TablePaginationConfig } from "ant-design-vue/es/table/interface";

let tableList = [
	{
		id: 1,
		name: "小明",
		key: 1,
		age: 18
	},
	{
		id: 2,
		name: "小花",
		key: 2,
		age: 18,
		children: [
			{
				id: 3,
				name: "小花1",
				key: 3,
				age: 10,
				children: [
					{
						id: 4,
						name: "小花1-1",
						key: 4,
						age: 1
					},
					{
						id: 5,
						name: "小花1-2",
						key: 5,
						age: 1
					}
				]
			},
			{
				id: 6,
				name: "小花2",
				key: 6,
				age: 10,
				children: [
					{
						id: 7,
						name: "小花2-1",
						key: 7,
						age: 1
					}
				]
			}
		]
	},
	{
		id: 8,
		name: "小杨",
		key: 8,
		age: 18,
		children: [
			{
				id: 9,
				name: "小杨1",
				key: 9,
				age: 10,
				children: [
					{
						id: 10,
						name: "小杨1-1",
						key: 10,
						age: 1
					},
					{
						id: 11,
						name: "小杨1-2",
						key: 11,
						age: 1
					}
				]
			},
			{
				id: 12,
				name: "小杨2",
				key: 12,
				age: 10,
				children: [
					{
						id: 13,
						name: "小杨2-1",
						key: 13,
						age: 1
					}
				]
			}
		]
	}
];

const tableChange = (pagination: TablePaginationConfig) => {
	console.log(pagination);
};

const loading = ref(true);

setTimeout(() => {
	loading.value = false;
}, 1000);

const tableConfig = computed(() => ({
	onChange: tableChange,
	loading: loading.value,
	columns: [
		{
			title: "序号",
			dataIndex: "iceSque"
		},
		{
			title: "名字",
			dataIndex: "name"
		},
		{
			title: "年龄",
			dataIndex: "age"
		},
		{
			title: "操作",
			dataInde: "iceOperate"
		}
	],
	dataSource: tableList
}));
</script>

<template>
	<div class="ice-menu">
		<div class="menu-table">
			<IceTable :config="tableConfig" />
		</div>
	</div>
</template>

<style lang="less" scoped></style>
