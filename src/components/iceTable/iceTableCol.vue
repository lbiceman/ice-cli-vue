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

const indexFinal = computed(() => {
	return props.renderProps.index || 0;
});

const columnFinal = computed((): IceColumn => {
	return props.renderProps.column || {};
});

// const recordFinal = computed(() => {
// 	return props.renderProps.record || {}
// });

const funcRender = computed(() => {
	return columnFinal.value.render(props.renderProps);
});
</script>

<template>
	<template v-if="columnFinal.type">
		<template v-if="columnFinal.type == 'iceSque'">
			{{ indexFinal + 1 }}
		</template>
	</template>
	<template v-else>
		<template v-if="isFun(columnFinal.render)">
			<div v-html="funcRender"></div>
		</template>
		<template v-else-if="isStr(columnFinal.render)">
			{{ columnFinal.render }}
		</template>
		<template v-else-if="isObj(columnFinal.render) || isArr(columnFinal.render)">
			<component
				:is="columnFinal?.render?.component || 'a-space'"
				v-bind="columnFinal.render.props && columnFinal.render.props(renderProps)">
				{{ textFinal }}
			</component>
		</template>
		<template v-else-if="columnFinal.dataIndex">
			{{ textFinal }}
		</template>
	</template>
</template>
