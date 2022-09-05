<template>
	<a-config-provider :locale="zhCN">
		<router-view />
		<div v-loading="true" class="test-loading"></div>
	</a-config-provider>
</template>

<script lang="ts" setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");
</script>

<style lang="less" scoped>
.test-loading {
	width: 400px;
	height: 400px;
	background-color: #ccc;
	margin: 50px;
}
</style>
