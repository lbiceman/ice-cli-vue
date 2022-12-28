<template>
	<div class="ice-header">
		<Logo />
		<Content />
		<User />
	</div>
</template>

<script lang="ts" setup>
import Logo from "./components/logo.vue";
import Content from "./components/content.vue";
import User from "./components/user.vue";
</script>

<style lang="less" scoped>
.ice-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: @ice-header-height;
}
</style>
