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
	.layout-content {
		min-height: calc(100vh - @ice-header-height);
		display: flex;
	}
	.layout-content-main {
		width: 100%;
		height: calc(100vh - @ice-header-height);
		background-color: #f8f8f8;
		overflow-y: auto;
		padding: @ice-pm;
	}
}
</style>
