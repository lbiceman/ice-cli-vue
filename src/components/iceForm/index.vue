<script lang="ts" setup>
import { computed, ref, toRefs } from "vue";
import { IceFormProps, IceFormValue } from "./type";

const props = withDefaults(
	defineProps<{
		config: IceFormProps;
	}>(),
	{}
);

const emits = defineEmits<{
	(e: "submit", value: IceFormValue): void;
	(e: "reset"): void;
}>();

const formRef = ref();
const { config } = toRefs(props);
const finalFormList = computed(() => props.config.list);
const finalFormState = computed(() => props.config.value);

const submit = () => {
	console.log(finalFormState.value);

	emits("submit", finalFormState.value);
};

const reset = () => {
	emits("reset");
};
</script>

<template>
	<div class="ice-form">
		<a-form v-bind="config" ref="formRef" :model="finalFormState">
			<template v-for="(item, i) of finalFormList" :key="i">
				<a-form-item v-bind="item">
					<component
						:is="item.component || 'a-space'"
						v-bind="item"
						v-model:value="finalFormState[item.name]"
						class="ice-form-item">
					</component>
				</a-form-item>
			</template>
			<a-form-item>
				<a-button type="primary" @click="submit">确认</a-button>
				<a-button style="margin-left: 10px" @click="reset">重置</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<style lang="less">
.ice-form-item {
	min-width: 100px;
}
</style>

<style lang="less" scoped>
.ice-form {
	background-color: @ice-bg-color;
	overflow: hidden;
	padding: 12px;
	border-radius: @ice-border-radius;
}
</style>
