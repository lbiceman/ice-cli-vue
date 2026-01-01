<script lang="ts" setup>
import { onMounted } from 'vue';
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { useEnvStore, useThemeStore } from "@/store/index";

dayjs.locale("zh-cn");

const envStore = useEnvStore();
const themeStore = useThemeStore();

// 获取环境变量
const currEnv = import.meta.env.APP_ENV;
envStore.setCurrent(currEnv);

// 初始化主题
onMounted(() => {
	// 设置初始主题 - theme会在store初始化时自动从存储中读取
	const savedTheme = sessionStorage.getItem('theme') || 'light';
	themeStore.setTheme(savedTheme as 'light' | 'dark');
});
</script>

<template>
	<a-config-provider 
		:locale="zhCN"
		:theme="{
			token: {
				colorBgContainer: 'transparent',
				colorBgElevated: 'var(--ice-card-bg)',
				colorBgSpotlight: 'var(--ice-bg-secondary)',
				colorText: 'var(--ice-font-color)',
				colorTextLightSolid: 'var(--ice-primary-color)',
			}
		}">
		<div class="app-container">
			<router-view />
		</div>
	</a-config-provider>
</template>

<style lang="less" scoped>
.app-container {
	min-height: 100vh;
	background: var(--ice-bg-color);
	color: var(--ice-font-color);
	transition: @ice-transition;
}
</style>
