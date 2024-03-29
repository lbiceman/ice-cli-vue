<script lang="ts">
export default { name: "IceTableCol" };
</script>
<script setup lang="ts">
import { computed } from "vue";
import { isFun, isStr, isObj, isArr } from "@/utils/index";
import { IceColumn, IceCellProps, Render } from "./type";

const props = withDefaults(
	defineProps<{
		renderProps: IceCellProps;
	}>(),
	{}
);

const finalText = computed(() => {
	return props.renderProps.text || "";
});

const finalCol = computed((): IceColumn => {
	return props.renderProps.column || {};
});

const finalRender = computed((): Render => {
	return finalCol.value.render as Render;
});

const finalRow = computed(() => {
	return props.renderProps.record || {};
});

const finalIndex = computed(() => {
	return props.renderProps.index;
});

const funcRender = computed(() => {
	return (finalCol.value.render as (obj: IceCellProps) => string)(props.renderProps);
});
</script>

<template>
	<template v-if="finalRender">
		<template v-if="isFun(finalRender)">
			<div v-html="funcRender"></div>
		</template>
		<template v-else-if="isStr(finalRender)">
			{{ finalRender }}
		</template>
		<template v-else-if="isObj(finalRender)">
			<component
				:is="finalRender?.component || 'a-space'"
				v-bind="finalRender?.props && finalRender?.props(renderProps)">
				<template v-if="finalRender?.icon">
					<span :class="finalRender?.icon"></span>
				</template>
				{{ finalRender?.text && finalRender?.text(renderProps) }}
			</component>
		</template>
		<template v-else-if="isArr(finalRender)">
			<template v-for="(v, k) of finalRender" :key="k">
				<IceTableCol
					:render-props="{ column: { render: v }, record: finalRow, index: finalIndex, text: finalText }" />
			</template>
		</template>
		<template v-else-if="finalCol.dataIndex">
			{{ finalText }}
		</template>
	</template>
	<template v-else>
		{{ finalText }}
	</template>
</template>
