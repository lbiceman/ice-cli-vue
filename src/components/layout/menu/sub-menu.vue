<script lang="ts">
export default { name: "SubMenu" };
</script>

<script lang="ts" setup>
import { Menu } from "@/store/index";

withDefaults(
	defineProps<{
		menu: Menu;
	}>(),
	{}
);
</script>

<template>
	<a-sub-menu :key="menu.id">
		<template #icon>
			<component :is="menu.icon || 'HomeOutlined'"> </component>
		</template>
		<template #title>
			{{ menu.name }}
		</template>
		<template v-for="v of menu.children">
			<SubMenu v-if="v.children && v.children.length > 0" :id="v.id" :key="v.id" :menu="v" />
			<a-menu-item v-else-if="v.name" :id="v.id" :key="v.id + ''">
				<a-tooltip placement="top">
					<template #title>
						<span>{{ v.name }}</span>
					</template>
					<span>
						{{ v.name }}
					</span>
				</a-tooltip>
			</a-menu-item>
		</template>
	</a-sub-menu>
</template>
