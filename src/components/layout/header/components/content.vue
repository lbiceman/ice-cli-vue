<template>
	<div class="ice-content">
		<!-- 主题切换按钮 -->
		<button 
			@click="toggleTheme" 
			class="simple-theme-toggle"
			:style="{ background: isDark ? '#2d2d2d' : '#f0f0f0' }"
		>
			<span v-if="!isDark">☀️</span>
			<span v-else>🌙</span>
		</button>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useThemeStore } from '@/store/index';

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

const toggleTheme = () => {
	themeStore.toggleTheme();
};
</script>

<style lang="less" scoped>
.ice-content {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}

.simple-theme-toggle {
	padding: 8px 16px;
	border-radius: 20px;
	border: 2px solid var(--ice-border-color);
	cursor: pointer;
	font-size: 18px;
	transition: @ice-transition;
	
	&:hover {
		transform: scale(1.05);
		border-color: var(--ice-primary-color);
	}
}
</style>
