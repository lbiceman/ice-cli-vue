<script lang="ts">
export default { name: "IceTable" };
</script>

<script lang="ts" setup>
import { computed, ref } from "vue";
import type { PaginationConfig } from "ant-design-vue/es/pagination";
import { isFun, isStr, isObj } from "@/utils/index";

const props = defineProps<{
	table: any;
}>();

const tableRef = ref(null);

const hasPagination = computed(() => {
	const { pageSize, total } = (props.table?.pagination ?? {}) as PaginationConfig;
	return (total || 0) > (pageSize || 20);
});

console.log(hasPagination);

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
		},
		tableLocal: {
			filterConfirm: "确定",
			filterReset: "重置",
			emptyText: "暂无数据",
			...(props.table?.locale ?? {})
		}
	});
});

const isSlot = (slot?: any | string) => isObj(slot) || isFun(slot) || isStr(slot);
</script>

<template>
	<div class="search-table-wrap">
		<div ref="tableRef" class="search-table">
			<a-table v-bind="tableProps">
				<template v-if="table?.slots?.expandIcon"> </template>
				<template #bodyCell="{ text, column }">
					<template v-if="isSlot(column.slot)"> </template>
					<template v-else>
						{{ text }}
					</template>
				</template>
			</a-table>
		</div>
	</div>
</template>

<style lang="less" scoped>
.search-table-wrap {
	flex: 1;
	overflow: hidden;
	padding: 12px;
	background-color: #fff;
	margin-top: 20px;
	border-radius: 6px;
	display: flex;
	flex-direction: column;

	.search-table {
		flex: 1;
		overflow: hidden;
		margin-top: 12px;
		background-color: #fff;

		:deep(.ant-table-wrapper) {
			height: 100%;
			// .ant-spin-nested-loading,
			// .ant-spin-container {
			// 	height: 100%;
			// }
			// .ant-spin-container {
			// 	height: 100%;
			// 	display: flex;
			// 	flex-direction: column;
			// }
			// .ant-table {
			// 	flex: 1;
			// 	overflow: auto;
			// }
		}
	}
}
</style>
