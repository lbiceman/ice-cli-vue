<template>
	<div class="ice-menu" :style="collapsed ? 'width: 80px' : 'width: 200px'">
		<a-menu
			v-model:selectedKeys="state.selectedKeys"
			:inline-collapsed="collapsed"
			mode="inline"
			class="ice-menu-layout"
			:open-keys="state.openKeys"
			@open-change="onOpenChange"
		>
			<template v-for="item of menus">
				<template v-if="item.children && item.children.length > 0">
					<SubMenu :id="item.id" :key="item.id" :menu="item" />
				</template>
				<template v-else-if="item.name">
					<a-menu-item :id="item.id" :key="item.id">
						<template #icon>
							<HomeOutlined />
						</template>
						{{ item.name }}
					</a-menu-item>
				</template>
			</template>
		</a-menu>
		<div class="ice-menu-collapsed">
			<span @click="switchCollapsed">
				<RetweetOutlined />
			</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRaw } from "vue";
import { useMenuStore } from "@/store/index";
import SubMenu from "./sub-menu.vue";
import { HomeOutlined, RetweetOutlined } from "@ant-design/icons-vue";

const store = useMenuStore();
const menus = toRaw(store.getMenus);
const collapsed = ref(false);
const state = reactive({
	// 获取当前菜单所有key
	rootSubmenuKeys: menus
		.filter((menu) => menu.children && menu.children.length > 0)
		.map((menu) => menu.id),
	openKeys: menus.map((item) => item.id),
	selectedKeys: []
});

const onOpenChange = (openKeys: string[]) => {
	const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1);
	if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
		state.openKeys = openKeys;
	} else {
		state.openKeys = latestOpenKey ? [latestOpenKey] : [];
	}
};

const switchCollapsed = function () {
	collapsed.value = !collapsed.value;
};
</script>

<style lang="less">
.ice-menu .ice-menu-layout {
	height: 100%;
}
</style>

<style lang="less" scoped>
.ice-menu {
	position: relative;
	height: 100%;
	transition: all 0.3s ease-out;
	.ice-menu-collapsed {
		position: absolute;
		bottom: 20px;
		right: 25px;
		span {
			font-size: 30px;
			cursor: pointer;
			transition: all 0.3s ease-out;
			&:hover {
				transform: rotate(180deg);
			}
		}
	}
}
</style>
