<script lang="ts" setup>
import { computed, toRefs } from "vue";
import { useRouter, Router } from "vue-router";
import type { ButtonProps } from "ant-design-vue";
import notFoundImage from "@/assets/images/special/img_404.png";
import "@/assets/style/global.less";

const props = defineProps<{
	text?: string;
	showButton?: boolean;
	buttonText?: string;
	buttonProps?: ButtonProps;
	customText?: string;
	imageProps?: Partial<Pick<HTMLImageElement, "src" | "alt" | "width" | "height">>;
}>();

const { imageProps, buttonProps } = toRefs(props);

const finalImageProps = computed(() => {
	return {
		src: notFoundImage,
		...(imageProps?.value || {})
	};
});

const finalButtonProps = computed(() => {
	return {
		onClick: onButtonClick,
		...(buttonProps?.value || {})
	};
});

const router: Router = useRouter();

const onButtonClick = () => {
	router.back();
};
</script>

<template>
	<div class="ice-not-found">
		<div class="not-found-img">
			<img v-bind="finalImageProps" />
		</div>
		<div class="not-found-self">
			{{ customText || "有时候生活也是这样，不能叫每个人都满意" }}
		</div>
		<div class="not-found-text">
			{{ text || "页面不见了..." }}
		</div>
		<a-button v-if="showButton" class="not-found-btn" v-bind="finalButtonProps">
			{{ buttonText || "返回" }}
		</a-button>
	</div>
</template>

<style lang="less" scoped>
.ice-not-found {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.not-found-img {
		img {
			width: 400px;
			height: 400px;
			border-radius: 10px;
		}
	}
	.not-found-text,
	.not-found-self {
		margin-top: 50px;
		font-size: 30px;
		line-height: 40px;
		color: @ice-primary-color;
	}
	.not-found-self {
		color: #67cb90;
	}
	.not-found-btn {
		margin-top: 50px;
	}
}
</style>
