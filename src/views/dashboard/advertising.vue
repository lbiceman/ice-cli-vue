<script lang="ts" setup>
import { ref } from "vue";

const statsData = ref([
	{ title: "投放预算", value: 500000, icon: "ice-icon-user", color: "#66BBFF" },
	{ title: "已消费", value: 123456, icon: "ice-icon-computer", color: "#60D36E" },
	{ title: "曝光量", value: 8765432, icon: "ice-icon-home", color: "#E7CF48" },
	{ title: "点击量", value: 234567, icon: "ice-icon-warning", color: "#FE5643" }
]);
</script>

<template>
	<div class="dashboard-advertising">
		<!-- 统计卡片 -->
		<div class="dashboard-stats">
			<div v-for="item in statsData" :key="item.title" class="stat-card" :style="{ borderColor: item.color }">
				<div class="stat-icon" :style="{ backgroundColor: item.color + '20', color: item.color }">
					<span :class="['iconfont', item.icon]"></span>
				</div>
				<div class="stat-content">
					<div class="stat-value">{{ item.value.toLocaleString() }}</div>
					<div class="stat-title">{{ item.title }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.dashboard-advertising {
	.dashboard-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 20px;
		margin-bottom: 20px;

		.stat-card {
			display: flex;
			align-items: center;
			padding: 20px;
			background: var(--ice-card-bg);
			border-radius: 8px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
			border-left: 4px solid;
			transition: all 0.3s ease;

			&:hover {
				transform: translateY(-2px);
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
			}

			.stat-icon {
				width: 60px;
				height: 60px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				font-size: 24px;
				margin-right: 15px;
			}

			.stat-content {
				flex: 1;

				.stat-value {
					font-size: 28px;
					font-weight: bold;
					color: var(--ice-font-color);
					margin-bottom: 5px;
				}

				.stat-title {
					font-size: 14px;
					color: var(--ice-font-color);
					opacity: 0.8;
				}
			}
		}
	}
}
</style>
