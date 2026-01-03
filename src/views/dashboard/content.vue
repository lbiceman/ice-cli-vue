<script lang="ts" setup>
import { ref } from "vue";

const statsData = ref([
	{ title: "内容总数", value: 1234, icon: "ice-icon-user", color: "#66BBFF" },
	{ title: "今日发布", value: 56, icon: "ice-icon-computer", color: "#60D36E" },
	{ title: "阅读总量", value: 98765, icon: "ice-icon-home", color: "#E7CF48" },
	{ title: "互动次数", value: 54321, icon: "ice-icon-warning", color: "#FE5643" }
]);
</script>

<template>
	<div class="dashboard-content">
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
.dashboard-content {
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
