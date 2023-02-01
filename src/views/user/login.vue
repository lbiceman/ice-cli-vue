<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
import IceForm from "@/components/iceForm/index.vue";
import { IceFormProps, IceFormList } from "@/components/iceForm/type";
import { useAxios } from "@/services";

interface Form {
	username: string;
	password: string;
}

const router = useRouter();
const userStore = useUserStore();

const iceFormRef = ref();
const formState = ref<Form>({
	username: "lbiceman",
	password: "123456"
});

const formList: IceFormList[] = [
	{
		item: {
			component: "a-input",
			allowClear: true,
			placeholder: "用户名"
		},
		formItem: {
			label: "用户名",
			required: true,
			name: "username"
		}
	},
	{
		item: {
			component: "a-input-password",
			placeholder: "密码"
		},
		formItem: {
			label: "密码",
			required: true,
			name: "password"
		}
	}
];

const formConfig = computed(
	(): IceFormProps => ({
		model: formState.value,
		list: formList,
		onFinish: () => {
			iceFormRef.value
				.validate()
				.then((state: any) => {
					onFinish(state);
				})
				.catch((error: any) => {
					console.log("validate err", error);
				});
		},
		onReset: () => {
			formState.value = {
				username: "",
				password: ""
			};
		}
	})
);

const { run: loginRun, data: loginData } = useAxios({
	url: "/ice-cli/login",
	method: "post"
});

watchEffect(() => {
	if (loginData.value) {
		if (loginData.value.code != 200) return;
		// const userData = {
		// 	id: "1",
		// 	name: "lbiceman",
		// 	level: 1,
		// 	sex: 1,
		// 	userId: "980818",
		// 	address: "河南郑州",
		// 	phone: "186xxxx9932",
		// 	token: "lbiceman-980818-186xxxx9932"
		// };
		// console.log(val);
		const userData = loginData.value.data.user || {};
		userStore.setUser(userData);
		router.push("/index");
	}
});

const onFinish = (val: Form) => {
	loginRun({
		data: val
	});
};
</script>

<template>
	<div class="ice-login">
		<div class="login-container">
			<IceForm ref="iceFormRef" :config="formConfig" />
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
		border: 1px solid #eee;
		padding: 50px 20px;
		border-radius: #eee;
	}
}
</style>
