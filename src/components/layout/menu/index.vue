<script lang="ts" setup>
import { ref, toRaw, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useMenuStore, Menu } from "@/store/index";
import SubMenu from "./sub-menu.vue";
import { findTree } from "@/utils/index";
import { MenuItem } from "./type";

const store = useMenuStore();
const menus = toRaw(store.getMenus);
const collapsed = ref(false);
const router = useRouter();
const openKeys = ref();
const selectedKeys = ref();
// 获取有children的菜单项
const allSubmenuKeys = menus.filter((menu) => menu.children && menu.children.length > 0).map((menu) => menu.id);

const getCurrRoute = () => {
	const path = router.currentRoute.value.path;
	let openMenus: Menu[] = [];
	let selectedMenu: Menu | undefined = {};
	let keys = [];

	const findParentChain = (list: Menu[]): Menu | undefined => {
		for (let i = 0; i < list.length; i++) {
			openMenus.push(list[i]);
			const { url, children } = list[i];
			if (children && children.length > 0) {
				let r = findParentChain(children);
				if (r) return r;
			} else if (url == path) return list[i];
			openMenus.pop();
		}
	};
	selectedMenu = findParentChain(menus);
	keys = openMenus.map((item: Menu) => item.id);

	return {
		// 第一次进入页面需要给一个默认值。这里1是首页的ID
		openKeys: keys.length == 0 ? ["1"] : keys,
		selectedKeys: selectedMenu ? [selectedMenu.id] : ["1"]
	};
};

// 当url变化时候重新选中左侧菜单
watchEffect(() => {
	const { openKeys: oKeys, selectedKeys: sKeys } = getCurrRoute();
	openKeys.value = oKeys;
	selectedKeys.value = sKeys;
});

const onOpenChange = (keys: string[]) => {
	const latestOpenKey = keys.find((key) => openKeys.value.indexOf(key) === -1);

	if (allSubmenuKeys.indexOf(latestOpenKey + "") === -1) {
		openKeys.value = keys;
	} else {
		openKeys.value = latestOpenKey ? [latestOpenKey] : [];
	}
};

const switchCollapsed = () => {
	collapsed.value = !collapsed.value;
	store.updateCollapsed(collapsed.value);
};

const menuItemClick = (menuItem: MenuItem) => {
	const id = menuItem.item.id;
	const currMenu: Menu = findTree(menus, "children", (item: Menu) => item.id == id) || {};
	router.push(currMenu.url || "/");
};
</script>

<template>
	<div class="ice-menu" :class="collapsed ? 'ice-menu_min-width' : 'ice-menu_max-width'">
		<a-menu v-model:selectedKeys="selectedKeys" :inline-collapsed="collapsed" mode="inline" class="ice-menu-layout"
			:open-keys="openKeys" @click="menuItemClick" @open-change="onOpenChange">
			<template v-for="item of menus">
				<template v-if="item.children && item.children.length > 0">
					<SubMenu :id="item.id" :key="item.id" :menu="item" />
				</template>
				<template v-else-if="item.name">
					<a-menu-item :id="item.id" :key="item.id">
						<template #icon>
							<span :class="[item.icon || 'ice-icon-home', 'iconfont', 'ice-menu-icon']"></span>
						</template>
						{{ item.name }}
					</a-menu-item>
				</template>
			</template>
		</a-menu>
		<div class="ice-menu-collapsed">
			<span class="iconfont ice-icon-retweet" @click="switchCollapsed"></span>
		</div>
	</div>
</template>

<style lang="less">
.ice-menu {
	.ant-menu.ant-menu-inline-collapsed {
		width: @ice-menu-min-width;
	}

	.ant-menu-inline .ant-menu-item,
	.ant-menu-inline .ant-menu-submenu-title {
		width: auto;
	}

	.ant-menu-submenu-selected,
	.ant-menu-item-selected,
	.ant-menu-submenu:hover>.ant-menu-submenu-title>.ant-menu-submenu-arrow,
	.ant-menu-light .ant-menu-submenu-active {
		color: var(--ice-primary-color);
	}

	.ant-menu-submenu-expand-icon,
	.ant-menu-submenu-arrow {
		color: var(--ice-font-color);
	}

	.ant-menu-inline .ant-menu-item::after {
		border-right: 6px solid var(--ice-primary-color);
		border-bottom-left-radius: @ice-border-radius;
		border-top-left-radius: @ice-border-radius;
	}

	.ant-menu-light .ant-menu-item:hover {
		color: var(--ice-primary-color);
	}

	.ant-menu-light .ant-menu-submenu-title:hover {
		color: var(--ice-primary-color);
	}

	.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
		background-color: var(--ice-primary-opacity-color);
	}

	.ant-menu-item:active,
	.ant-menu-submenu-title:active {
		background-color: var(--ice-primary-opacity-color);
	}

	.ant-menu-submenu-title .ant-menu-item-icon {
		font-size: 16px;
	}
}

// 夜间模式菜单样式
html.dark .ice-menu {
	.ant-menu {
		background: var(--ice-card-bg) !important;
		color: var(--ice-font-color);

		.ant-menu-item {
			color: var(--ice-font-color);
			background: transparent;

			&:hover {
				color: var(--ice-primary-color);
				background: var(--ice-primary-opacity-color) !important;
			}

			&.ant-menu-item-selected {
				background: var(--ice-primary-opacity-color) !important;
				color: var(--ice-primary-color);
			}
		}

		.ant-menu-submenu {
			>.ant-menu-submenu-title {
				color: var(--ice-font-color);

				&:hover {
					color: var(--ice-primary-color);
					background: var(--ice-primary-opacity-color) !important;
				}
			}

			.ant-menu-sub {
				background: var(--ice-card-bg);

				.ant-menu-item {
					color: var(--ice-font-color);
				}
			}
		}
	}
}
</style>

<style lang="less" scoped>
.ice-menu {
	position: relative;
	height: 100%;
	transition: @ice-transition;
	box-sizing: border-box;
	border-top: 1px solid var(--ice-border-color);
	background: var(--ice-card-bg);

	// 确保ant-menu组件背景色正确
	:deep(.ant-menu) {
		background: var(--ice-card-bg);
		color: var(--ice-font-color);
		border-right: none;
	}
}

.ice-menu-layout {
	height: 100%;

	.ice-menu-icon {
		margin-right: 5px;
	}
}

.ice-menu-collapsed {
	position: absolute;
	bottom: 20px;
	right: 16px;

	span {
		display: inline-block;
		font-size: 30px;
		color: var(--ice-font-color);
		cursor: pointer;
		transition: @ice-transition;

		&:hover {
			transform: rotate(180deg);
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
