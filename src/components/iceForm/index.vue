<script lang="ts" setup>
import { FormExpose } from "ant-design-vue/es/form/Form";
import { NamePath, ValidateOptions } from "ant-design-vue/es/form/interface";
import { computed, ref } from "vue";
import { IceFormProps } from "./type";

const props = withDefaults(
	defineProps<{
		config: IceFormProps;
	}>(),
	{}
);

defineExpose<Partial<FormExpose>>({
	validate: (nameList?: NamePath[] | string, options?: ValidateOptions) => formRef.value?.validate(nameList, options)
});

// const emits = defineEmits<{
// 	(e: "submit", value: IceFormValue): void;
// 	(e: "reset"): void;
// }>();

const formRef = ref();
// 不需要class的组件
const noClass = ["a-switch"];
const finalConfig = computed(() =>
	Object.assign(
		{
			labelCol: {
				style: {
					minWidth: "80px"
				}
			},
			btnsState: true
		},
		props.config
	)
);
const finalFormList = computed(() => finalConfig.value.list);
const finalFormState = computed(() => finalConfig.value.model || {});

const getVModel = (val: string | undefined) => val || "value";

const submit = () => {
	// formRef.value.validate().then((state: Object) => {
	// 	console.log("validate success", state);
	// }).catch((error: Object) => {
	// 	console.log("validate err", error);
	// })
	finalConfig.value.onFinish && finalConfig.value.onFinish(finalFormState.value);
};

const reset = () => {
	finalConfig.value.onReset && finalConfig.value.onReset();
};
</script>

<template>
	<div class="ice-form">
		<a-form v-bind="finalConfig" ref="formRef" :model="finalFormState">
			<template v-for="(li, i) of finalFormList" :key="i">
				<a-form-item v-bind="li.formItem">
					<component
						:is="li.item.component || 'a-space'"
						v-bind="li.item"
						v-model:[getVModel(li.formItem.vModel)]="finalFormState[li.formItem.name]"
						:class="noClass.includes(li.item.component + '') ? '' : 'ice-form-item'">
					</component>
				</a-form-item>
			</template>
			<a-form-item v-if="finalConfig.btnsState">
				<a-button type="primary" @click="submit">确认</a-button>
				<a-button style="margin-left: 10px" @click="reset">重置</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<style lang="less">
.ice-form-item {
	width: 100%;
	min-width: 200px;
}
</style>

<style lang="less" scoped>
.ice-form {
	background-color: @ice-bg-color;
	overflow: hidden;
	padding: @ice-pm;
	border-radius: @ice-border-radius;
}
</style>
