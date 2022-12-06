<script lang="ts">
export default { name: "IceTable" };
</script>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { IceTableProps } from "./type";
// import { isFun, isStr, isObj } from "@/utils/index";

const props = withDefaults(
	defineProps<{
		table: IceTableProps;
	}>(),
	{}
);

const tableRef = ref(null);

const tableProps = computed((): IceTableProps => {
	return Object.assign({ bordered: true }, props.table || {}, {
		pagination: {
			hideOnSinglePage: true,
			defaultPageSize: 10,
			position: ["bottomLeft"],
			showQuickJumper: true,
			showLessItems: true,
			showSizeChanger: true,
			showTotal: (total: number) => `共 ${total} 条记录`,
			...(props.table?.pagination ?? {})
		}
	});
});
</script>

<template>
	<div class="ice-table-wrap">
		<div ref="tableRef" class="ice-table">
			<a-table v-bind="tableProps"></a-table>
		</div>
	</div>
</template>

<style lang="less" scoped>
.ice-table-wrap {
	overflow: hidden;
	padding: 12px;
	background-color: #fff;
	border-radius: @ice-border-radius;
	.ice-table {
		flex: 1;
		overflow: hidden;
	}
}
</style>
