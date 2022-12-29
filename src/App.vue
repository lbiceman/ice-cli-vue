<script lang="ts" setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

// 获取环境变量
const env = import.meta.env.MODE;
console.log(env);
</script>

<template>
	<a-config-provider :locale="zhCN">
		<router-view />
	</a-config-provider>
</template>

<style lang="less" scoped></style>
