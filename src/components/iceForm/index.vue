<script lang="ts" setup>
import { computed, ref } from "vue";
import { FormExpose } from "ant-design-vue/es/form/Form";
import { NamePath, ValidateOptions } from "ant-design-vue/es/form/interface";
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
const noClass = ["a-switch", "a-chexkbox-group", "a-radio-group"];
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
	background-color: var(--ice-bg-color);
	color: var(--ice-font-color);
}
</style>

<style lang="less" scoped>
.ice-form {
	background-color: var(--ice-bg-color);
	overflow: hidden;
	padding: @ice-pm;
	border-radius: @ice-border-radius;
}

/* 表单标签样式 */
:deep(.ant-form-item-label > label) {
	color: var(--ice-font-color);
}

/* 输入框样式 */
:deep(.ant-input) {
	background-color: var(--ice-bg-color);
	border-color: var(--ice-border-color);
	color: var(--ice-font-color);
}

:deep(.ant-input:focus) {
	border-color: rgb(102, 187, 255);
	box-shadow: 0 0 0 2px rgba(102, 187, 255, 0.2);
}

/* 选择器样式 */
:deep(.ant-select-selector) {
	background-color: var(--ice-bg-color) !important;
	border-color: var(--ice-border-color) !important;
	color: var(--ice-font-color) !important;
}

:deep(.ant-select-arrow) {
	color: var(--ice-font-color);
}

/* 日期选择器样式 */
:deep(.ant-picker) {
	background-color: var(--ice-bg-color);
	border-color: var(--ice-border-color);
	color: var(--ice-font-color);
}

:deep(.ant-picker:hover) {
	border-color: rgb(102, 187, 255);
}

/* 按钮样式 */
:deep(.ant-btn) {
	background-color: var(--ice-bg-color);
	border-color: var(--ice-border-color);
	color: var(--ice-font-color);
}

:deep(.ant-btn-primary) {
	background-color: rgb(102, 187, 255);
	border-color: rgb(102, 187, 255);
	color: #fff;
}

:deep(.ant-btn:hover) {
	border-color: rgb(102, 187, 255);
	color: rgb(102, 187, 255);
}

/* 错误信息样式 */
:deep(.ant-form-item-explain-error) {
	color: #ff4d4f;
}

/* 必填星号样式 */
:deep(.ant-form-item-required::before) {
	color: #ff4d4f;
}
</style>
