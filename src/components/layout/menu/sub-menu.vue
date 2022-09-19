<template>
	<a-sub-menu :key="menu.id">
		<template #icon>
			<OrderedListOutlined />
		</template>
		<template #title>
			{{ menu.name }}
		</template>
		<template v-for="v of menu.children" :key="v.id">
			<SubMenu
				v-if="v.children && v.children.length > 0"
				:id="v.id"
				:key="v.id"
				:level="v.id"
				:menu="v"
			/>
			<a-menu-item v-else-if="v.name" :id="level + v.id" :key="level + v.id">
				{{ v.name }}
			</a-menu-item>
		</template>
	</a-sub-menu>
</template>

<script lang="ts">
export default { name: "SubMenu" };
</script>

<script lang="ts" setup>
import { OrderedListOutlined } from "@ant-design/icons-vue";
defineProps({
	menu: {
		type: Object,
		default: () => {}
	},
	level: {
		type: String,
		default: "1"
	}
});
</script>
