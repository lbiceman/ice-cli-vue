<template>
	<div class="ice-index">
		<div class="ice-index-welcome">Welcome to ice-cli</div>
		<div class="ice-index-introduce">
			<a-descriptions :column="4">
				<a-descriptions-item label="author">libing</a-descriptions-item>
				<a-descriptions-item label="git">
					<span class="span_btn" @click="jumpToGithub">https://github.com/lbiceman/ikun-cli</span>
				</a-descriptions-item>
				<a-descriptions-item label="email">lbiceman@126.com</a-descriptions-item>
				<a-descriptions-item label="address">henan,zhengzhou</a-descriptions-item>
			</a-descriptions>
		</div>
	</div>
</template>

<script lang="ts" setup>
const jumpToGithub = () => {
	window.open("https://github.com/lbiceman/ikun-cli");
};
console.log("Welcome");
</script>

<style lang="less" scoped>
.ice-index {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	min-height: 100%;
	background-color: #fff;
	padding: 20px;
	border-radius: 3px;
	.ice-index-welcome {
		line-height: 50px;
		font-size: 36px;
		background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(@ice-primary-color), to(#15e5f0));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.ice-index-introduce {
		display: flex;
		justify-content: center;
		margin-top: 20px;
		.span_btn {
			color: @ice-primary-color;
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
		}
	}
}
</style>
