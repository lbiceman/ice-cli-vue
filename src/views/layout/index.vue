<script lang="ts" setup>
import Header from "@/components/layout/header/index.vue";
import Menu from "@/components/layout/menu/index.vue";
</script>

<template>
	<div class="ice-layout">
		<div class="layout-header">
			<Header />
		</div>
		<div class="layout-content">
			<div class="layout-content-menu">
				<Menu />
			</div>
			<div class="layout-content-main">
				<router-view />
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.ice-layout {
	min-height: 100%;
	min-width: 1024px;
	background: var(--ice-bg-color);
	.layout-content {
		min-height: calc(100vh - @ice-header-height);
		display: flex;
		
		.layout-content-menu {
			background: var(--ice-card-bg);
			border-right: 1px solid var(--ice-border-color);
			transition: @ice-transition;
		}
	}
	.layout-content-main {
		width: 100%;
		height: calc(100vh - @ice-header-height);
		background-color: var(--ice-bg-secondary);
		overflow-y: auto;
		padding: @ice-pm;
		transition: @ice-transition;
	}
}
</style>
