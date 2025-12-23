<script lang="ts" setup>
import UserDesc from "./components/userDesc.vue";
import TodoList from "./components/todoList.vue";
import ComponentIntro from "./components/componentIntro.vue";
</script>

<template>
	<div class="ice-home">
		<div class="home-user">
			<div class="user-info home-item">
				<!-- user description -->
				<UserDesc />
			</div>
			<div class="user-todo home-item">
				<!-- user todo list -->
				<TodoList />
			</div>
		</div>
		<div class="home-intro home-item">
			<!-- introduce -->
			<ComponentIntro />
		</div>
	</div>
</template>

<style lang="less" scoped>
.ice-home {
	// 首页组件都用到了这个CSS
	.home-item {
		background-color: var(--ice-card-bg);
		padding: @ice-pm;
		border-radius: @ice-border-radius;
	}
	.home-user {
		display: flex;
		justify-content: space-between;
		.user-info {
			width: 34%;
			margin-right: 1%;
		}
		.user-todo {
			width: 65%;
		}
	}
	.home-intro {
		margin-top: @ice-pm;
	}
}
</style>
