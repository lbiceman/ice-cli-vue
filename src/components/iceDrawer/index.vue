<script lang="ts" setup>
import { ref, computed } from "vue";
import { IceDrawerProps } from "./type";

const props = withDefaults(
	defineProps<{
		config: IceDrawerProps;
	}>(),
	{}
);

const auState = ref(true);

const onClose = () => {
	auState.value = false;
};

const finalConfig = computed(() => {
	let config = Object.assign(
		{
			title: "",
			width: "45%",
			maskClosable: false,
			bodyStyle: {
				paddingBottom: "0px"
			}
		},
		props.config
	);

	return config;
});
</script>

<template>
	<a-drawer v-bind="finalConfig" :visible="auState">
		<template #extra>
			<a-button @click="onClose">取消</a-button>
			<a-button style="margin-left: 20px" type="primary" @click="onClose">提交</a-button>
		</template>
		<div class="drawer-wrap">this is wrap</div>
	</a-drawer>
</template>

<style lang="less" scoped></style>
