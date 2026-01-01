<script lang="ts" setup>
import Logo from "./components/logo.vue";
import Content from "./components/content.vue";
import User from "./components/user.vue";
</script>

<template>
	<div class="ice-header">
		<Logo />
		<Content />
		<User />
	</div>
</template>

<style lang="less" scoped>
.ice-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: @ice-header-height;
	background: var(--ice-card-bg);
	border-bottom: 1px solid var(--ice-border-color);
	transition: @ice-transition;
}
</style>
