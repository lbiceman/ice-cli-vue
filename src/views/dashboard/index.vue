<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const menuItems = [
	{ key: "1", title: "核心总览大屏", path: "/dashboard/overview" },
	{ key: "2", title: "内容数据大屏", path: "/dashboard/content" },
	{ key: "3", title: "直播数据大屏", path: "/dashboard/live" },
	{ key: "4", title: "粉丝数据大屏", path: "/dashboard/fans" },
	{ key: "5", title: "线索与转化大屏", path: "/dashboard/conversion" },
	{ key: "6", title: "投放数据大屏", path: "/dashboard/advertising" }
];

const activeKey = computed(() => {
	const currentItem = menuItems.find(item => item.path === route.path);
	return currentItem ? [currentItem.key] : [];
});
</script>

<template>
	<div class="dashboard-layout">
		<div class="dashboard-header">
			<div class="header-title">数据大屏</div>
			<a-menu v-model:selectedKeys="activeKey" mode="horizontal" class="header-menu">
				<a-menu-item v-for="item in menuItems" :key="item.key" @click="$router.push(item.path)">
					{{ item.title }}
				</a-menu-item>
			</a-menu>
			<div class="header-actions">
				<a-button type="primary" @click="$router.push('/index')">
					退出
				</a-button>
			</div>
		</div>
		<div class="dashboard-content">
			<router-view />
		</div>
	</div>
</template>

<style lang="less" scoped>
.dashboard-layout {
	width: 100%;
	height: 100vh;
	background: var(--ice-bg-color);
	display: flex;
	flex-direction: column;

	.dashboard-header {
		background: var(--ice-card-bg);
		padding: 0 20px;
		border-bottom: 1px solid var(--ice-border-color);
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

		.header-title {
			font-size: 20px;
			font-weight: bold;
			color: var(--ice-font-color);
			margin-right: 40px;
		}

		.header-menu {
			flex: 1;
			border: none;
			background: transparent;

			:deep(.ant-menu-item) {
				color: var(--ice-font-color);

				&:hover {
					color: var(--ice-primary-color);
				}

				&.ant-menu-item-selected {
					color: var(--ice-primary-color);
					background: var(--ice-primary-opacity-color);
				}
			}
		}

		.header-actions {
			margin-left: 20px;
		}
	}

	.dashboard-content {
		flex: 1;
		overflow: auto;
		padding: 20px;
	}
}

// 深色主题
html.dark .dashboard-layout {
	.dashboard-header {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}
}
</style>

