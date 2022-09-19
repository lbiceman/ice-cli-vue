<template>
	<div class="ice-header">header</div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
@import "@/assets/style/global.less";
.ice-header {
	display: flex;
	align-items: center;
	height: @ice-header-height;
	padding: 10px 20px;
	background-color: @ice-primary-color;
	color: #fff;
}
</style>
