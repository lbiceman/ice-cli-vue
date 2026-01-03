<script lang="ts" setup>
import { ref } from "vue";

const statsData = ref([
	{ title: "用户总数", value: 12345, icon: "ice-icon-user", color: "#66BBFF" },
	{ title: "今日访问", value: 876, icon: "ice-icon-computer", color: "#60D36E" },
	{ title: "订单数量", value: 543, icon: "ice-icon-home", color: "#E7CF48" },
	{ title: "销售总额", value: 98765, icon: "ice-icon-warning", color: "#FE5643" }
]);
</script>

<template>
	<div class="dashboard-overview">
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

		<!-- 数据表格 -->
		<div class="dashboard-table">
			<div class="table-title">最新数据</div>
			<a-table
				:columns="[
					{ title: '序号', dataIndex: 'id', key: 'id' },
					{ title: '名称', dataIndex: 'name', key: 'name' },
					{ title: '状态', dataIndex: 'status', key: 'status' },
					{ title: '时间', dataIndex: 'time', key: 'time' }
				]"
				:data-source="[
					{ id: 1, name: '数据项1', status: '正常', time: '2024-01-01 10:00:00' },
					{ id: 2, name: '数据项2', status: '正常', time: '2024-01-01 11:00:00' },
					{ id: 3, name: '数据项3', status: '异常', time: '2024-01-01 12:00:00' }
				]"
				:pagination="false"
				bordered
			>
				<template #bodyCell="{ column, record }">
					<template v-if="column.key === 'status'">
						<a-tag :color="record.status === '正常' ? 'green' : 'red'">{{ record.status }}</a-tag>
					</template>
				</template>
			</a-table>
		</div>
	</div>
</template>

<style lang="less" scoped>
.dashboard-overview {
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

	.dashboard-table {
		padding: 20px;
		background: var(--ice-card-bg);
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

		.table-title {
			font-size: 18px;
			font-weight: bold;
			color: var(--ice-font-color);
			margin-bottom: 15px;
			padding-bottom: 10px;
			border-bottom: 1px solid var(--ice-border-color);
		}
	}
}

// 深色主题
html.dark .dashboard-overview {
	.stat-card,
	.dashboard-table {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}
}
</style>
