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
import Header from "./components/header/index.vue";
import Menu from "./components/menu/index.vue";
</script>

<style lang="less" scoped></style>
