<template>
	<div class="ice-menu">
		<div class="menu-title">this is menu page</div>
		<div class="menu-table">
			<IceTable :table="tableConfig" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import IceTable from "@/components/table/index.vue";
import { reactive } from "vue";
const tableConfig = reactive({});
</script>

<style lang="less" scoped></style>
