<script lang="ts" setup>
withDefaults(
	defineProps<{
		config?: object;
	}>(),
	{
		config: undefined
	}
);
</script>

<template>
	<div class="ice-charts"></div>
</template>

<style lang="less" scoped></style>
