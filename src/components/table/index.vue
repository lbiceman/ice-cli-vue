<script lang="ts">
export default { name: "IceTable" };
</script>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { isFun, isStr, isObj } from "@/utils/index";

const props = defineProps<{
	table: any;
}>();

const tableRef = ref(null);

const tableProps = computed(() => {
	return Object.assign({ bordered: true }, props.table ?? {}, {
		pagination: {
			hideOnSinglePage: true,
			defaultPageSize: 20,
			position: ["bottomRight"],
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
	flex: 1;
	overflow: hidden;
	padding: 12px;
	background-color: #fff;
	margin-top: 20px;
	border-radius: 6px;
	display: flex;
	flex-direction: column;

	.ice-table {
		flex: 1;
		overflow: hidden;
		margin-top: 12px;
		background-color: #fff;

		:deep(.ant-table-wrapper) {
			height: 100%;
		}
	}
}
</style>
