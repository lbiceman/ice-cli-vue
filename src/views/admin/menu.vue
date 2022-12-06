<script lang="ts" setup>
import IceTable from "@/components/table/index.vue";
import { computed } from "vue";

const tableConfig = computed(() => ({
	columns: [
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Age",
			dataIndex: "age",
			key: "age"
		}
	],
	dataSource: []
}));

for (let i = 0; i < 50; i++) {
	tableConfig.value.dataSource.push({ name: "老王" + i, age: i });
}
</script>

<template>
	<div class="ice-menu">
		<div class="menu-table">
			<IceTable :table="tableConfig" />
		</div>
	</div>
</template>

<style lang="less" scoped></style>
