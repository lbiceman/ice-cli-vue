import { message, Tree } from "ant-design-vue";

message.config({
	top: "80px",
	duration: 3,
	maxCount: 3
});

// Tree组件配置
Tree.props.blockNode.default = true;
