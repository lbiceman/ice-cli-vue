<template>
	<div class="ice-logo" :class="getCollapsed ? 'ice-logo_min-width' : 'ice-logo_max-width'">
		<p>
			{{ getCollapsed ? "IKUN" : "IKUN-CLI(IKUN)" }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { useMenuStore } from "@/store/index";
import { storeToRefs } from "pinia";

const store = useMenuStore();
const { getCollapsed } = storeToRefs(store);
</script>

<style lang="less" scoped>
.ice-logo {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	font-size: 16px;
	color: #555;
	transition: @ice-transition;
	overflow: hidden;
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
