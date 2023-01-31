<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const jump = (url: string) => {
	router.push(url);
};

const open = (url: string) => {
	window.open(url);
};
</script>

<template>
	<div>
		<div class="intro-title">
			<h3>ice-cli介绍</h3>
		</div>
		<div class="intro-list">
			<p>脚手架使用vite4 + vue3 + pinia2 + antd3 + ts</p>
			<p>脚手架封装了axios，store，route，utils等</p>
			<p>脚手架对proxy进行了封装，在开发环境可以直接通过配置进行代理</p>
			<p>
				使用脚手架可以通过JSON化的配置对
				<span class="span_btn" @click="jump('/example/form')">form</span>，
				<span class="span_btn" @click="jump('/example/table')">table</span>，
				<span class="span_btn" @click="jump('/example/drawer')">drawer</span>，
				<span class="span_btn" @click="jump('/example/echarts')">echarts</span>，
				<span class="span_btn" @click="jump('/example/editor')">editor</span>
				等组件进行快速的创建
			</p>
			<p>
				在
				<span class="span_btn" @click="jump('/admin/user')">系统管理</span>
				可以找到封装的工具库以及各个组件的具体使用方式
			</p>
			<p>
				封装的组件兼容antd所有的api，具体的使用文档可以参考
				<span class="span_btn" @click="open('https://www.antdv.com/components/overview-cn')">antd官网</span>
			</p>
		</div>
	</div>
</template>

<style lang="less" scoped>
.intro-list {
	margin-top: @ice-pm;
	text-indent: 20px;
	.span_btn {
		color: @ice-primary-color;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
}
</style>
