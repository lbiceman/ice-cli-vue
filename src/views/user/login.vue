<template>
	<div class="ice-login">
		<div class="login-form">
			<a-form :model="form" layout="inline" name="loginForm">
				<a-form-item class="login-form-item" label="username" :rules="[{ required: true, message: '请填写用户名' }]">
					<a-input v-model:value="form.username" class="login-form-item-input" placeholder="username" />
				</a-form-item>
				<a-form-item class="login-form-item" label="password" :rules="[{ required: true, message: '请填写密码' }]">
					<a-input-password v-model:value="form.password" class="login-form-item-input" placeholder="password" />
				</a-form-item>
				<a-form-item class="login-form-item">
					<span class="login-form-item-btn" @click="submit">登录</span>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
	username: "",
	password: ""
});

const submit = () => {
	router.push("/index");
};
</script>

<style lang="less" scoped>
.ice-login {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: linear-gradient(to bottom, rgba(33, 188, 140, 0.1), rgba(51, 170, 250, 0.1));
	.login-form {
		width: 360px;
		height: 460px;
		background-color: rgba(255, 255, 255, 0.6);
		padding: 20px;
		border-radius: @ice-border-radius;
		.login-form-item {
			margin-top: 20px;
			.login-form-item-input {
				width: 200px;
			}
			.login-form-item-btn {
				padding: 8px 50px;
				border-radius: @ice-border-radius;
				background-color: @ice-primary-color;
				color: #fff;
				font-size: 16px;
				transition: @ice-transition;
				cursor: pointer;
				&:hover {
					background-color: rgba(@ice-primary-color, 0.85);
				}
			}
		}
	}
}
</style>
