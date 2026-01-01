<script lang="ts" setup>
import { ref } from "vue";

const todoList = ref([
	{ checked: true, label: "今天早上喝胡辣汤" },
	{ checked: false, label: "今天中午吃红烧牛肉面" },
	{ checked: false, label: "今天下午完成EMP项目测试" },
	{ checked: true, label: "写100个BUG" },
	{ checked: false, label: "解决1个BUG" },
	{ checked: true, label: "完成ice-cli的基本功能开发" },
	{ checked: false, label: "晚上吃烩面" },
	{ checked: false, label: "喝一瓶李子园甜牛奶" },
	{ checked: true, label: "一定要早睡" }
]);
</script>

<template>
	<div>
		<div class="todo-title">
			<h3>待办事项</h3>
		</div>
		<div class="todo-list">
			<ul>
				<li v-for="(li, i) of todoList" :key="i">
					<span>
						<a-checkbox v-model:checked="li.checked"></a-checkbox>
					</span>
					<span :class="['list-label', li.checked ? 'list-label_s' : '']">{{ li.label }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="less" scoped>
.todo-title {
	border-bottom: 1px solid var(--ice-border-color);
	padding-bottom: @ice-pm;
}

.todo-list {
	margin-top: @ice-pm;
	max-height: 230px;
	overflow-y: auto;

	ul {
		li {
			transition: @ice-transition;
			border-radius: @ice-border-radius;
			padding: 5px 10px;
			cursor: pointer;

			&:hover {
				background-color: #f2f2f2;
			}

			&:not(:first-child) {
				margin-top: 5px;
			}
		}
	}

	.list-label {
		margin-left: 8px;
	}

	.list-label_s {
		text-decoration: line-through;
	}
}
</style>
