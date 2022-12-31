<script lang="ts">
export default { name: "IceTableCol" };
</script>
<script setup lang="ts">
import { computed } from "vue";
import { isFun, isStr, isObj, isArr } from "@/utils/index";
import { IceColumn, IceCellProps } from "./type";

const props = withDefaults(
	defineProps<{
		renderProps: IceCellProps;
	}>(),
	{}
);

const textFinal = computed(() => {
	return props.renderProps.text || "";
});

const columnFinal = computed((): IceColumn => {
	return props.renderProps.column || {};
});

const renderFinal = computed(() => {
	return columnFinal.value.render || {};
});

const recordFinal = computed(() => {
	return props.renderProps.record || {};
});

const funcRender = computed(() => {
	return columnFinal.value?.render(props.renderProps);
});
</script>

<template>
	<template v-if="renderFinal">
		<template v-if="isFun(renderFinal)">
			<div v-html="funcRender"></div>
		</template>
		<template v-else-if="isStr(renderFinal)">
			{{ renderFinal }}
		</template>
		<template v-else-if="isObj(renderFinal)">
			<component
				:is="renderFinal?.component || 'a-space'"
				v-bind="renderFinal?.props && renderFinal?.props(renderProps)">
				<template v-if="renderFinal?.icon">
					<span :class="renderFinal?.icon"></span>
				</template>
				{{ renderFinal?.text && renderFinal?.text(renderProps) }}
			</component>
		</template>
		<template v-else-if="isArr(renderFinal)">
			<template v-for="(v, k) of renderFinal" :key="k">
				<IceTableCol :render-props="{ column: { render: v }, record: recordFinal, text: textFinal }" />
			</template>
		</template>
		<template v-else-if="columnFinal.dataIndex">
			{{ textFinal }}
		</template>
	</template>
	<template v-else>
		{{ textFinal }}
	</template>
</template>
