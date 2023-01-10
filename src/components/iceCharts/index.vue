<script lang="ts" setup>
const props = withDefaults(
	defineProps<{
		config?: object;
	}>(),
	{}
);
</script>

<template>
	<div class="ice-charts"></div>
</template>

<style lang="less" scoped></style>
