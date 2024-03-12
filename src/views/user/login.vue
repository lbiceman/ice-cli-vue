<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
import IceForm from "@/components/iceForm/index.vue";
import { IceFormProps, IceFormList } from "@/components/iceForm/type";

interface Form {
	username: string;
	password: string;
}

const router = useRouter();

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
					console.log(state);
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

const onFinish = (val: Form) => {
	const userStore = useUserStore();
	const userData = {
		id: "1",
		name: "lbiceman",
		level: 1,
		sex: 1,
		userId: "980818",
		address: "河南郑州",
		phone: "186xxxx9932",
		// token: "lbiceman-980818-186xxxx9932"
		token: "Bearer eyJraWQiOiJmZTg5NGY4Yi05NjQ1LTQ1NTMtYjlmNS1jOTVlY2IyMjNhNGQiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1ZCI6IndzcCIsIm5iZiI6MTcxMDIwMjIwNSwiZXhwIjoxNzEwODI4NzI1LCJpYXQiOjE3MTAyMDIyMDV9.iw5vb86aIAqADC8ZvQVAxzZG4BMuk3qB_QyVqngC2y7y8CkKoSBQgWOT6UvU686d3jb_6HGYQw8RZE6hIwRLdSrlaCHmxNMGoA6j9l1HQ0nPUYwEUaN1idPv6ZzH_3_6P9OKD-Xh8acps_fo6EiL4l37bNUUHx2UfQNAWDo2d1dTr_pJQ32zq8_dFA71cHl9at96LT0e90-7kD0kD3svHgJz_nsSIMRNjQUcsMMeA-y8KJ_m5nr9oS7GafUF0V4LsqkDBzVFXzABJGfVmerGhzLPB-mRVfPHtyWayif3dq76u8nNqtY0W_d4S9Qb8lfuoWfMeH3tJKHSn-8_2QVvlA"
	};
	userStore.setUser(userData);
	router.push("/index");
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
