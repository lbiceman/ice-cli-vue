<script lang="ts" setup>
import { useMenuStore } from "@/store/index";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const store = useMenuStore();
const { getCollapsed } = storeToRefs(store);
const router = useRouter();

const jump = () => {
	router.push("/index");
};
</script>

<template>
	<div class="ice-logo" :class="getCollapsed ? 'ice-logo_min-width' : 'ice-logo_max-width'" @click="jump">
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
	color: @ice-font-color;
	transition: @ice-transition;
	overflow: hidden;
	cursor: pointer;
	p {
		font-size: 16px;
		white-space: nowrap;
		font-weight: bold;
	}
}
.ice-logo_max-width {
	width: @ice-menu-max-width;
}
.ice-logo_min-width {
	width: @ice-menu-min-width;
}
</style>
