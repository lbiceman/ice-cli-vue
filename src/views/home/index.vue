<script lang="ts" setup>
import { ref } from "vue";

const jumpToGithub = () => {
	window.open("https://github.com/lbiceman/ice-cli");
};
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
	<div class="ice-home">
		<div class="home-user">
			<div class="user-info home-item">
				<div class="info-name">
					<div class="name-avator">
						<img src="@/assets/images/user/user-icon.jpg" alt="" />
					</div>
					<div class="name-role">
						<div>
							<h2>lbiceman</h2>
							<p>李冰</p>
						</div>
					</div>
					<div></div>
				</div>
				<div class="info-desc">
					<a-descriptions :column="1">
						<a-descriptions-item label="author">libing</a-descriptions-item>
						<a-descriptions-item label="git">
							<span class="span_btn" @click="jumpToGithub"> https://github.com/lbiceman/ice-cli </span>
						</a-descriptions-item>
						<a-descriptions-item label="email">lbiceman@126.com</a-descriptions-item>
						<a-descriptions-item label="address">henan,zhengzhou</a-descriptions-item>
					</a-descriptions>
				</div>
			</div>
			<div class="user-todo home-item">
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
		</div>
		<div class="home-sta home-item"></div>
	</div>
</template>

<style lang="less" scoped>
.ice-home {
	.home-item {
		background-color: @ice-bg-color;
		padding: @ice-pm;
		border-radius: @ice-border-radius;
	}
	.home-user {
		display: flex;
		justify-content: space-between;
		.user-info {
			width: 34%;
			margin-right: 1%;
			.info-name {
				display: flex;
				justify-content: space-between;
				.name-avator {
					img {
						width: 100px;
						height: 100px;
						border-radius: 50%;
					}
				}
				.name-role {
					display: flex;
					align-items: center;
					line-height: 40px;
				}
			}
			.info-desc {
				margin-top: @ice-pm;
				border-top: 1px solid #ddd;
				padding-top: @ice-pm;
				.span_btn {
					color: @ice-primary-color;
					cursor: pointer;
					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
		.user-todo {
			width: 65%;
			.todo-title {
				border-bottom: 1px solid #ddd;
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
		}
	}
	.home-sta {
		margin-top: @ice-pm;
	}
}
</style>
