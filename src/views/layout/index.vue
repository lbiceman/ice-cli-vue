<template>
	<div class="layout">
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

<script lang="ts" setup>
import Header from "@/components/layout/header/index.vue";
import Menu from "@/components/layout/menu/index.vue";
</script>

<style lang="less" scoped>
.layout {
	height: 100%;
	.layout-content {
		height: calc(@ice-page-height - @ice-header-height);
		display: flex;
	}
}
</style>
