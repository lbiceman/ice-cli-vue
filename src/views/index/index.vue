<template>
	<div class="ice-index">
		<div class="ice-index-welcome">Welcome to ice-cli</div>
		<p>vite + ts + vue + antd</p>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.ice-index {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	min-height: 100%;
	background-color: #fff;
	padding: @ice-pm;
	border-radius: @ice-border-radius;
	.ice-index-welcome {
		line-height: 50px;
		font-size: 36px;
		background-image: -webkit-gradient(linear, 100 200, 0 bottom, from(@ice-primary-color), to(#1ceac6));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
}
</style>
