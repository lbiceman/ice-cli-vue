<template>
	<div class="ice-menu">
		<!-- 暂时用不上了 -->
		<!-- 测试动态组件嵌套 -->
		<!-- <component
			is="a-tag"
			color="#C1F064">
			<component
				is="a-button"
				type="link"
				round>
				<template v-slot:[slot]>
					<DeleteOutlined />
				</template>
				textBtn
			</component>
		</component> -->
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
