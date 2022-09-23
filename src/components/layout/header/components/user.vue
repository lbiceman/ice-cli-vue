<template>
	<div class="ice-user">
		<div class="user-avator">
			<img src="@/assets/images/user/kunkun-avator.png" alt="" />
		</div>
		<div class="user-name">
			<p>ikun-ckf</p>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

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
