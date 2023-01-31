<script lang="ts" setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { useEnvStore } from "@/store/index";

dayjs.locale("zh-cn");

const envStore = useEnvStore();
// 获取环境变量
const currEnv = import.meta.env.APP_ENV;
envStore.setCurrent(currEnv);
</script>

<template>
	<a-config-provider :locale="zhCN">
		<router-view />
	</a-config-provider>
</template>

<style lang="less" scoped></style>
