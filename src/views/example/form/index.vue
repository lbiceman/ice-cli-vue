<script lang="ts" setup>
import { computed, ref } from "vue";
import IceForm from "@/components/iceForm/index.vue";
import { IceFormProps, IceFormList } from "@/components/iceForm/type";

const iceFormRef = ref();

const formList: IceFormList[] = [
	{
		item: {
			component: "a-input",
			allowClear: true,
			placeholder: "请填写姓名"
		},
		formItem: {
			label: "姓名",
			required: true,
			name: "name"
		}
	},
	{
		item: {
			component: "a-select",
			allowClear: true,
			placeholder: "请选择性别",
			options: [
				{ value: 1, label: "男" },
				{ value: 0, label: "女" }
			]
		},
		formItem: {
			label: "性別",
			name: "sex"
		}
	},
	{
		item: {
			component: "a-cascader",
			allowClear: true,
			placeholder: "请选择省市",
			options: [
				{
					value: 1,
					label: "河南省",
					children: [
						{ value: 10, label: "郑州市" },
						{
							value: 11,
							label: "许昌市",
							children: [
								{ value: 110, label: "禹州市" },
								{ value: 111, label: "长葛市" }
							]
						}
					]
				},
				{
					value: 2,
					label: "北京市",
					children: [
						{ value: 20, label: "丰台区" },
						{ value: 21, label: "朝阳区" },
						{ value: 22, label: "海淀区" },
						{ value: 23, label: "房山区" }
					]
				}
			]
		},
		formItem: {
			label: "省市",
			name: "province"
		}
	},
	{
		item: {
			component: "a-date-picker",
			valueFormat: "YYYY-MM-DD",
			allowClear: true
		},
		formItem: {
			label: "创建时间",
			name: "createTime"
		}
	}
];

const formState = ref({
	name: "lbiceman",
	sex: 1,
	province: "",
	createTime: "2022-01-14"
});

const formConfig = computed(
	(): IceFormProps => ({
		// layout: "inline",
		model: formState.value,
		list: formList,
		onFinish: () => {
			iceFormRef.value
				.validate()
				.then((state: any) => {
					console.log("validate success", state);
				})
				.catch((error: any) => {
					console.log("validate err", error);
				});
		},
		onReset: () => {
			console.log("reset");
		}
	})
);
</script>

<template>
	<div class="ice-form">
		<h2>form组件</h2>
		<IceForm ref="iceFormRef" :config="formConfig" />
	</div>
</template>

<style lang="less" scoped>
.ice-form {
	background-color: #fff;
	padding: @ice-pm;
	border-radius: @ice-border-radius;
}
</style>
