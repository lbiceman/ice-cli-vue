<script lang="ts">
export default { name: "IceTableCol" };
</script>
<script setup lang="ts">
import { computed } from "vue";
import { isFun, isStr, isObj, isArr, merge } from "@/utils/index";
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

const recordFinal = computed(() => {
	return props.renderProps.record || {};
});

const indexFinal = computed(() => {
	return props.renderProps.index || 0;
});

const funcRender = computed(() => {
	return columnFinal.value?.render(props.renderProps);
});
</script>

<template>
	<template v-if="columnFinal.render">
		<template v-if="isFun(columnFinal.render)">
			<div v-html="funcRender"></div>
		</template>
		<template v-else-if="isStr(columnFinal.render)">
			{{ columnFinal.render }}
		</template>
		<template v-else-if="isObj(columnFinal.render)">
			{{ columnFinal.render }}
			<component
				:is="columnFinal.component || 'a-space'"
				v-bind="columnFinal.render?.props && columnFinal.render?.props(renderProps)">
			</component>
		</template>
		<!-- <template
			v-else-if="isArr(columnFinal.render)">
			<template
				v-for="v of columnFinal.render">
				<IceTableCol 
					:render-props="{column: v, record: recordFinal, index: indexFinal, text: textFinal}" />
			</template>
		</template> -->
		<template v-else-if="columnFinal.dataIndex">
			{{ textFinal }}
		</template>
	</template>
	<template v-else>
		{{ textFinal }}
	</template>
</template>
