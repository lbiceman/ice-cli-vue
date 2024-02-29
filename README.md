# ice-cli

本地环境:

-   pnpm: 7.9.3
-   node: 19.0.0

使用到的技术:

-   vite4
-   ts
-   vue3
-   pinia
-   antd
-   eslint
-   prettier
-   husky
-   iconfont

commit 提交备注必须以以下字段开头:

-   feat: 新功能
-   fix: 修复 BUG
-   docs: 更新文档
-   style: 代码格式,样式调整
-   test: 测试
-   chore: 不修改 src
-   revert: 恢复
-   perf: 优化
-   types: TS 类型修改

备注: 可以使用`--no-verify`强制跳过校验(git commit -m "强制跳过" --no-verify)

例如:

    git commit -m "feat: 新增用户登录页面。"
    git commit -m "fix: 修复用户token失效BUG。"

todo:
-   [ ] 大文件分片上传功能
-   [ ] 虚拟表格
-   [ ] echarts组件
