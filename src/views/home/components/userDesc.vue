<script lang="ts" setup>
const jumpToGithub = () => {
	window.open("https://github.com/lbiceman/ice-cli");
};
</script>

<template>
	<div>
		<div class="info-name">
			<div></div>
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
</template>

<style lang="less" scoped>
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
</style>
