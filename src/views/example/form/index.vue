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
			placeholder: "请选择爱好",
			options: [
				{ value: 0, label: "唱" },
				{ value: 1, label: "跳" },
				{ value: 2, label: "RAP" },
				{ value: 3, label: "篮球" },
				{ value: 4, label: "偶像练习生" }
			]
		},
		formItem: {
			label: "爱好",
			name: "fav"
		}
	},
	{
		item: {
			component: "a-radio-group",
			options: [
				{ label: "男", value: 1 },
				{ label: "女", value: 0 },
				{ label: "不确定", value: 2 }
			]
		},
		formItem: {
			label: "性别",
			name: "sex"
		}
	},
	{
		item: {
			component: "a-input-number",
			placeholder: "请填写年龄"
		},
		formItem: {
			label: "年龄",
			name: "age"
		}
	},
	{
		item: {
			component: "a-checkbox-group",
			options: [
				{ label: "TS", value: "ts" },
				{ label: "JS", value: "js" },
				{ label: "VUE", value: "vue" }
			]
		},
		formItem: {
			label: "技术栈",
			name: "stack"
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
	},
	{
		item: {
			component: "a-switch",
			checkedChildren: "开",
			unCheckedChildren: "关"
		},
		formItem: {
			// swich组件的v-model绑定的是 v-model:checked，这里需要单独配置。默认是value
			vModel: "checked",
			label: "是否公开",
			name: "public"
		}
	}
];

const formState = ref({
	name: "lbiceman",
	sex: 1,
	fav: 4,
	age: 18,
	stack: ["ts", "js"],
	province: [1, 11, 110],
	createTime: "2022-01-14",
	file: [],
	public: true
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
