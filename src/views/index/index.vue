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
	background-color: var(--ice-bg-color);
	padding: @ice-pm;
	border-radius: @ice-border-radius;
	.ice-index-welcome {
		background: linear-gradient(
			30deg,
			#edbc5d 19%,
			transparent 19%,
			transparent 20%,
			#98e039 20%,
			#98e039 39%,
			transparent 39%,
			transparent 40%,
			#46e5b7 40%,
			#46e5b7 59%,
			transparent 59%,
			transparent 60%,
			#55bcff 60%,
			#55bcff 79%,
			transparent 79%,
			transparent 80%,
			#e858bf 80%
		);
		color: #fff;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		line-height: 60px;
		font-weight: bold;
		font-size: 36px;
	}
}
</style>
