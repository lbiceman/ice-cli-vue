<script lang="ts" setup>
import { ref, computed } from "vue";
import { message } from "ant-design-vue";
import IceDrawer from "@/components/iceDrawer/index.vue";

const auState = ref(false);

const drawerConfig = computed(() => ({
	title: "drawer组件",
	btnsState: false,
	onCancel: () => {
		message.info("取消");
		auState.value = false;
	},
	onSubmit: () => {
		message.info("提交");
		auState.value = false;
	}
}));

const open = () => {
	auState.value = true;
};
</script>

<template>
	<div class="ice-drawerWrap">
		<div class="drawerWrap-btns">
			<a-button type="primary" @click="open">打开drawer组件</a-button>
		</div>
		<IceDrawer :config="drawerConfig" :visible="auState">
			<div class="drawerWrap-content">这里边可以嵌套表格，表单之类的内容</div>
		</IceDrawer>
	</div>
</template>

<style lang="less" scoped>
.ice-drawerWrap {
	background-color: #fff;
	border-radius: @ice-border-radius;
	padding: @ice-pm;
}
</style>
