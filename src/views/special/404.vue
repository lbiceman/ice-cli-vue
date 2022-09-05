<template>
	<div class="not-found_404">
		<div class="banner"></div>
		<div class="code">404 NOT FOUND</div>
		<div class="text">您访问的资源可能走丢了</div>
		<div class="text" style="color: #9bbcaf">生活也是这样，不能叫人处处都满意</div>
		<div class="back">
			<a-button shape="round" size="large" @click="back"> 一起找点乐子吧 </a-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useRouter, Router } from "vue-router";

const router: Router = useRouter();

const back = () => {
	router.back();
};
</script>

<style lang="less" scoped>
.not-found_404 {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.banner {
		min-width: 200px;
		min-height: 200px;
		background-image: url("@/assets/images/special/img_404.png");
		background-repeat: no-repeat;
		background-size: 200px 200px;
		border-radius: 30px;
	}
	.code,
	.text,
	.back {
		margin-top: 50px;
	}
	.code {
		font-size: 36px;
		color: #ff6767;
	}
	.text {
		font-size: 30px;
		color: #666666;
	}
}
</style>
