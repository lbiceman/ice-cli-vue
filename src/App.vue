<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const sum = ref();

sum.value = 10 + 10;
</script>

<template>
	<div class="container">
		<a href="https://vitejs.dev" target="_blank">
			<img src="/vite.svg" class="logo" alt="Vite logo" />
		</a>
		<a href="https://vuejs.org/" target="_blank">
			<img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
		</a>
		<p>有时候生活也是这样，它不能叫每个人都满意</p>
		{{ sum }}
	</div>
	<HelloWorld msg="Vite + Vue" />
</template>

<style scoped lang="less">
.container {
	p {
		font-size: 20px;
		color: #6f9027;
		font-weight: bold;
		cursor: pointer;
		&:hover {
			color: #7ea727;
		}
	}
}
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	&:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
