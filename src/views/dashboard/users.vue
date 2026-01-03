<script lang="ts" setup>
const pieData = ref([
	{ name: "产品A", value: 400 },
	{ name: "产品B", value: 300 },
	{ name: "产品C", value: 200 },
	{ name: "产品D", value: 100 }
]);
</script>

<template>
	<div class="dashboard-users">
		<div class="chart-card">
			<div class="chart-title">用户分布</div>
			<div class="chart-content">
				<div class="chart-placeholder">用户分布饼图区域</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.dashboard-users {
	.chart-card {
		padding: 20px;
		background: var(--ice-card-bg);
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

		.chart-title {
			font-size: 18px;
			font-weight: bold;
			color: var(--ice-font-color);
			margin-bottom: 15px;
			padding-bottom: 10px;
			border-bottom: 1px solid var(--ice-border-color);
		}

		.chart-content {
			min-height: 400px;

			.chart-placeholder {
				height: 400px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: var(--ice-bg-secondary);
				border-radius: 4px;
				color: var(--ice-font-color);
				opacity: 0.5;
			}
		}
	}
}

// 深色主题
html.dark .dashboard-users {
	.chart-card {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}
}
</style>
