<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/index";
import defaultAvator from "@/assets/images/user/user-icon.jpg";

const { getUser, setUser } = useUserStore();
const router = useRouter();

const dropdownClick = (item: any) => {
	if (item.item.name == "signout") {
		setUser(null);
		router.push("/login");
	}
};
</script>

<template>
	<div class="ice-user">
		<div class="user-avator">
			<img :src="getUser.avator || defaultAvator" alt="" />
		</div>
		<div class="user-name">
			<a-dropdown>
				<p class="user-name-dropdown-title">{{ getUser.name }}</p>
				<template #overlay>
					<a-menu @click="dropdownClick">
						<a-menu-item name="signout">退出</a-menu-item>
					</a-menu>
				</template>
			</a-dropdown>
		</div>
	</div>
</template>

<style lang="less" scoped>
.ice-user {
	width: 200px;
	padding: 0px 20px;
	display: flex;
	align-items: center;
	justify-content: right;
	gap: 12px;
	.user-avator {
		img {
			width: 36px;
			height: 36px;
			border-radius: @ice-border-radius;
		}
	}
	.user-name {
		margin-left: 10px;
		.user-name-dropdown-title {
			cursor: pointer;
			transition: @ice-transition;
			color: var(--ice-font-color);
			&:hover {
				color: var(--ice-primary-color);
			}
		}
	}
}
</style>
