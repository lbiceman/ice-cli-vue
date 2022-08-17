module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true
	},
	parser: "vue-eslint-parser",
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:vue/vue3-recommended",
		"plugin:prettier/recommended",
		// eslint-config-prettier 的缩写
		"prettier"
	],
	parserOptions: {
		ecmaVersion: 12,
		parser: "@typescript-eslint/parser",
		sourceType: "module",
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: ["vue", "@typescript-eslint", "prettier"],
	rules: {
		"@typescript-eslint/no-explicit-any": "off",
		"vue/multi-word-component-names": 0,
		"vue/no-v-html": 0,
		"prettier/prettier": "error",
		// 禁止出现console
		"no-console": "warn",
		// 禁用debugger
		"no-debugger": "warn",
		// 禁止出现空语句块
		// "no-empty": "warn",
		// // 禁止不必要的括号
		// "no-extra-parens": "off",
		// // 禁止对 function 声明重新赋值
		// "no-func-assign": "warn",
		// // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
		// "no-unreachable": "warn",
		// // 强制所有控制语句使用一致的括号风格
		// curly: "warn",
		// // 要求 switch 语句中有 default 分支
		// "default-case": "warn",
		// // 强制尽可能地使用点号
		// "dot-notation": "warn",
		// // 禁止 if 语句中 return 语句之后有 else 块
		// "no-else-return": "warn",
		// // 禁止出现空函数
		// "no-empty-function": "warn",
		// // 禁用不必要的嵌套块
		// "no-lone-blocks": "warn",
		// // 禁止使用多个空格
		// "no-multi-spaces": "warn",
		// // 禁止多次声明同一变量
		// "no-redeclare": "warn",
		// // 禁止在 return 语句中使用赋值语句
		// "no-return-assign": "warn",
		// // 禁止不必要的 catch 子句
		// "no-useless-catch": "warn",
		// // 禁止变量声明与外层作用域的变量同名
		// "no-shadow": "off",
		// // 强制数组方括号中使用一致的空格
		// "array-bracket-spacing": "warn",
		// // 强制在代码块中使用一致的大括号风格
		// "brace-style": "warn",
		// // 强制使用骆驼拼写法命名约定
		// camelcase: "warn",
		// // 强制使用一致的缩进
		// indent: "off",
		// // 强制在 JSX 属性中一致地使用双引号或单引号
		// // 'jsx-quotes': 'warn',
		// // 强制可嵌套的块的最大深度4
		// "max-depth": "warn",
		// // 强制函数块最多允许的的语句数量20
		// "max-statements": ["warn", 100],
		// // 强制回调函数最大嵌套深度
		// "max-nested-callbacks": ["warn", 3],
		// // 强制函数定义中最多允许的参数数量
		// "max-params": ["warn", 3],
		// // 强制每一行中所允许的最大语句数量
		// "max-statements-per-line": ["warn", { max: 1 }],
		// // 禁止 if 作为唯一的语句出现在 else 语句中
		// "no-lonely-if": "warn",
		// // 禁止空格和 tab 的混合缩进
		// "no-mixed-spaces-and-tabs": "warn",
		// // 禁止出现多行空行
		// "no-multiple-empty-lines": "warn",
		// // 强制在块之前使用一致的空格
		// "space-before-blocks": "warn",
		// // 强制在 function的左括号之前使用一致的空格
		// // 'space-before-function-paren': ['warn', 'never'],
		// // 强制在圆括号内使用一致的空格
		// "space-in-parens": "warn",
		// // 要求操作符周围有空格
		// "space-infix-ops": "warn",
		// // 强制在一元操作符前后使用一致的空格
		// "space-unary-ops": "warn",
		// "switch-colon-spacing": "warn",
		// "prefer-const": "warn",
		// "prefer-rest-params": "warn",
		// "no-useless-escape": "warn",
		// "no-irregular-whitespace": "warn",
		// "no-prototype-builtins": "warn",
		// "no-fallthrough": "warn",
		// "no-extra-boolean-cast": "warn",
		// "no-case-declarations": "warn",
		// "no-async-promise-executor": "warn"
	}
};
