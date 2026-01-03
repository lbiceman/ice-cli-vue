<script lang="ts" setup>
const monitorData = ref([
	{ name: "CPU使用率", value: 45, color: "#66BBFF" },
	{ name: "内存使用率", value: 62, color: "#60D36E" },
	{ name: "磁盘使用率", value: 38, color: "#E7CF48" },
	{ name: "网络带宽", value: 72, color: "#FE5643" }
]);
</script>

<template>
	<div class="dashboard-monitor">
		<div class="monitor-cards">
			<div v-for="item in monitorData" :key="item.name" class="monitor-card">
				<div class="monitor-title">{{ item.name }}</div>
				<a-progress :percent="item.value" :stroke-color="item.color" />
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.dashboard-monitor {
	.monitor-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;

		.monitor-card {
			padding: 20px;
			background: var(--ice-card-bg);
			border-radius: 8px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

			.monitor-title {
				font-size: 16px;
				font-weight: bold;
				color: var(--ice-font-color);
				margin-bottom: 15px;
			}
		}
	}
}

// 深色主题
html.dark .dashboard-monitor {
	.monitor-card {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}
}
</style>
