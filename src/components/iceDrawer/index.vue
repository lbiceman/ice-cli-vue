<script lang="ts" setup>
import { computed } from "vue";
import { IceDrawerProps } from "./type";

const props = withDefaults(
	defineProps<{
		config: IceDrawerProps;
		visible: boolean;
	}>(),
	{
		visible: false
	}
);

const finalConfig = computed(() => {
	let config = Object.assign(
		{
			title: "",
			width: "45%",
			maskClosable: false,
			bodyStyle: {
				paddingBottom: "0px"
			},
			class: "ice-drawer",
			extraState: true,
			onCancel: () => {},
			onSubmit: () => {},
			onClose: cancel
		},
		props.config
	);

	return config;
});

const cancel = () => {
	finalConfig.value?.onCancel();
};

const submit = () => {
	finalConfig.value?.onSubmit();
};
</script>

<template>
	<a-drawer v-bind="finalConfig" :visible="visible">
		<template #extra>
			<template v-if="finalConfig.extraState">
				<a-button type="primary" @click="submit">提交</a-button>
				<a-button style="margin-left: 10px" @click="cancel">取消</a-button>
			</template>
		</template>
		<div class="drawer-wrap">
			<slot></slot>
		</div>
	</a-drawer>
</template>

<style lang="less" scoped></style>
