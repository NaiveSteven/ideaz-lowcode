# ideaz-lowcode project

## pnpm

因此，如果想给 pkg1 安装一个依赖包，比如 axios，可以进行如下操作：

`pnpm add axios --filter pkg1`

执行 pkg1 下的 scripts 脚本

`pnpm build --filter pkg1`

执行所有 package 下的 build 命令

`pnpm build --filter "./packages/**"`

在 pkg1 中引用 pkg2

`pnpm install pkg2 -r --filter pkg2`