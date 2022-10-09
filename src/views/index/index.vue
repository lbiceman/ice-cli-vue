<template>
	<div class="ice-index">
		<h2>Welcome!</h2>
		<h3>author: libing</h3>
		<h3 @click="jumpToGithub">git: https://github.com/lbiceman/ikun-cli</h3>
		<h3>email: lbiceman@126.com</h3>
	</div>
</template>

<script lang="ts" setup>
const jumpToGithub = () => {
	window.open("https://github.com/lbiceman/ikun-cli");
};
console.log("Welcome");
// 测试代码合并
</script>

<style lang="less" scoped>
.ice-index {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100%;
	h2 {
		font-size: 18px;
		font-weight: bold;
	}
	h3 {
		cursor: pointer;
		font-size: 16px;
		line-height: 40px;
		color: @ice-primary-color;
		&:hover {
			text-decoration: underline;
		}
	}
}
</style>
