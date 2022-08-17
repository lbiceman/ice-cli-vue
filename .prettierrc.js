module.exports = {
	// 每行最多多少个字符换行
	printWidth: 9808,
	// 指定每个缩进级别的空格数。默认为 4
	tabWidth: 4,
	// 用制表符而不是空格缩进行。
	useTabs: true,
	// 在语句末尾打印分号。
	semi: true,
	// 使用单引号代替双引号。
	singleQuote: false,
	// 当对象中的属性用引号包上的时候改变. [as-needed|consistent|preserve]
	quoteProps: "as-needed",
	// 多行的时候在末尾打印逗号
	trailingComma: "none",
	// 在对象字面量中添加空格
	bracketSpacing: true,
	// 在(HTML,JSX,VUE,Angular)中,另起一行打印闭合标签 ">"
	bracketSameLine: false,
	// 在唯一的箭头函数参数周围包括括号 [always,avoid]
	arrowParens: "always",
	// 默认情况下，Prettier 不会更改折价文本的包装，因为一些服务使用了一个对换行符敏感的渲染器，
	// 例如 GitHub 注释和 BitBucket。若要让 Prettier 将散文换行到打印宽度，请将此选项更改为“ always”。
	// 如果您希望 Prettier 将所有散文块放在一行上，并依赖于编辑器/查看器的软包装，那么可以使用“ never”。
	proseWrap: "never",
	//   htmlWhitespaceSensitivity: 'css',
	// 是否缩进 Vue项目中 script 和 style 标签
	vueIndentScriptAndStyle: false,
	// 使用回车换行作为默认的换行[lf|crlf|cr|auto]
	endOfLine: "crlf"
};
