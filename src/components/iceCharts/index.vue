<script lang="ts" setup>
import { ref, computed } from "vue";

const props = withDefaults(
	defineProps<{
		config?: object;
	}>(),
	{
		config: undefined
	}
);

const finalConfig = computed(() => ({}));
</script>

<template>
	<div class="ice-charts"></div>
</template>

<style lang="less" scoped></style>
