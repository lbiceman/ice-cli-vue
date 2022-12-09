<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

interface Form {
	username: string;
	password: string;
}

const router = useRouter();

const form = reactive<Form>({
	username: "lbiceman",
	password: "123456"
});

const onFinish = (val: Form) => {
	console.log(val);
	router.push("/index");
};
</script>

<template>
	<div class="ice-login">
		<div class="login-container">
			<a-form
				class="login-form"
				:model="form"
				name="basic"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 16 }"
				autocomplete="off"
				@finish="onFinish">
				<a-form-item name="username" label="用户名" :rules="[{ required: true, message: '请填写用户名' }]">
					<a-input v-model:value="form.username" />
				</a-form-item>
				<a-form-item name="password" label="密码" :rules="[{ required: true, message: '请填写密码' }]">
					<a-input-password v-model:value="form.password" />
				</a-form-item>
				<div class="login-form-btn">
					<a-button type="primary" html-type="submit">登录</a-button>
				</div>
			</a-form>
		</div>
	</div>
</template>

<style lang="less" scoped>
.ice-login {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: linear-gradient(to bottom, rgba(33, 188, 140, 0.1), rgba(51, 170, 250, 0.1));
	.login-container {
		width: 400px;
		height: 300px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.76);
		border: 1px solid #d5d5d5;
		padding: 50px 20px;
		border-radius: @ice-border-radius;
		.login-form {
			width: 100%;
			.login-form-btn {
				display: flex;
				justify-content: center;
			}
		}
	}
}
</style>
