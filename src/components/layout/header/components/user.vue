<template>
	<div class="ice-user">
		<div class="user-avator">
			<img :src="getUser.avator || defaultAvator" alt="" />
		</div>
		<div class="user-name">
			<p>{{ getUser.name }}</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/index";
import { storeToRefs } from "pinia";
import defaultAvator from "@/assets/images/user/kunkun-avator.png";

const store = useUserStore();
const { getUser } = storeToRefs(store);
</script>

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
	}
}
</style>
