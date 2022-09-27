<template>
	<div class="ice-menu" :class="collapsed ? 'ice-menu_min-width' : 'ice-menu_max-width'">
		<a-menu v-model:selectedKeys="state.selectedKeys" :inline-collapsed="collapsed" mode="inline" class="ice-menu-layout" :open-keys="state.openKeys" @open-change="onOpenChange">
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
	rootSubmenuKeys: menus.filter((menu) => menu.children && menu.children.length > 0).map((menu) => menu.id),
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
	store.updateCollapsed(collapsed.value);
};
</script>

<style lang="less">
.ice-menu {
	.ant-menu-inline .ant-menu-item,
	.ant-menu-inline .ant-menu-submenu-title {
		width: auto;
	}
	.ant-menu-submenu-selected,
	.ant-menu-item-selected,
	.ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow,
	.ant-menu-light .ant-menu-submenu-active {
		color: @ice-primary-color;
	}
	.ant-menu-inline .ant-menu-item::after {
		border-right: 3px solid @ice-primary-color;
	}
	.ant-menu-light .ant-menu-item:hover {
		color: @ice-primary-color;
	}
	.ant-menu-light .ant-menu-submenu-title:hover {
		color: @ice-primary-color;
	}
	.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
		background-color: @ice-primary-opacity-color;
	}
	.ant-menu-item:active,
	.ant-menu-submenu-title:active {
		background-color: @ice-primary-opacity-color;
	}
}
</style>

<style lang="less" scoped>
.ice-menu {
	position: relative;
	height: 100%;
	transition: @ice-transition;
	box-sizing: border-box;
	border-top: 1px solid #eee;
	.ice-menu-layout {
		height: 100%;
	}
	.ice-menu-collapsed {
		position: absolute;
		bottom: 20px;
		right: 25px;
		span {
			font-size: 30px;
			cursor: pointer;
			transition: @ice-transition;
			&:hover {
				transform: rotate(180deg);
			}
		}
	}
}
.ice-menu_max-width {
	width: @ice-menu-max-width;
}
.ice-menu_min-width {
	width: @ice-menu-min-width;
}
</style>
