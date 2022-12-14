<script lang="ts" setup>
import { useUserStore } from "@/store/index";
import { storeToRefs } from "pinia";
import defaultAvator from "@/assets/images/user/user-icon.jpg";
import { useRouter } from "vue-router";

const store = useUserStore();
const { getUser } = storeToRefs(store);
const router = useRouter();

const dropdownClick = (item: any) => {
	if (item.name == "signout") {
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
	.user-avator {
		img {
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}
	}
	.user-name {
		margin-left: 10px;
		.user-name-dropdown-title {
			cursor: pointer;
			transition: @ice-transition;
			&:hover {
				color: @ice-primary-color;
			}
		}
	}
}
</style>
