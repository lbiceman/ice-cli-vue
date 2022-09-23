<template>
	<div class="ice-header">
		<Logo />
	</div>
</template>

<script lang="ts" setup>
import Logo from "./components/logo.vue";
</script>

<style lang="less" scoped>
.ice-header {
	display: flex;
	align-items: center;
	height: @ice-header-height;
	color: #fff;
}
</style>
