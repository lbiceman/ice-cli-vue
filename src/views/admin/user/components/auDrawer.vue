<!-- 
    auDrawer: add update drawer
 -->
<script lang="ts" setup>
import { computed } from "vue";
import IceDrawer from "@/components/iceDrawer/index.vue";

const drawerConfig = computed(() => ({}));
</script>

<template>
	<IceDrawer :config="drawerConfig" />
</template>

<style lang="less" scoped></style>
