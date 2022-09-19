<template>
	<div class="wrap">
		<NotFound
			:show-button="true"
			:button-props="{
				shape: 'round',
				size: 'large'
			}"
			button-text="找点乐子吧"
		/>
	</div>
</template>

<script lang="ts" setup>
import NotFound from "@/components/special/404.vue";
</script>
