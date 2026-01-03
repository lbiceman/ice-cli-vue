<script lang="ts" setup>
const chartData = ref([
	{ month: "1月", value: 120 },
	{ month: "2月", value: 200 },
	{ month: "3月", value: 150 },
	{ month: "4月", value: 300 },
	{ month: "5月", value: 250 },
	{ month: "6月", value: 400 }
]);
</script>

<template>
	<div class="dashboard-sales">
		<div class="chart-card">
			<div class="chart-title">销售趋势</div>
			<div class="chart-content">
				<div class="chart-placeholder">销售趋势图表区域</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.dashboard-sales {
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
html.dark .dashboard-sales {
	.chart-card {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}
}
</style>
