<script lang="ts" setup>
import { useMenuStore } from "@/store/index";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const store = useMenuStore();
const { getCollapsed } = storeToRefs(store);
const router = useRouter();

const goHome = () => {
	router.push("/index");
};
</script>

<template>
	<div class="ice-logo" :class="getCollapsed ? 'ice-logo_min-width' : 'ice-logo_max-width'" @click="goHome">
		<p>
			{{ getCollapsed ? "ICE" : "ICE-CLI(ICE)" }}
		</p>
	</div>
</template>

<style lang="less" scoped>
.ice-logo {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	font-size: 16px;
	color: @ice-font-color;
	transition: @ice-transition;
	overflow: hidden;
	cursor: pointer;
	p {
		white-space: nowrap;
	}
}
.ice-logo_max-width {
	width: @ice-menu-max-width;
}
.ice-logo_min-width {
	width: @ice-menu-min-width;
}
</style>
