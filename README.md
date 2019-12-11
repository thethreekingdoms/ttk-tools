# 脚手架API说明


命令/简写 | 说明
---|---
new/n | 创建新项目
app/a | 创建空白App
module/mo | 创建空白Module
delmodule/dmo | 删除空白Module
sever/se | 启动Mock服务
service/sc | 启动Web服务
clone/c |       克隆App(不推荐使用)
compile/cp|     编译项目(不推荐使用)
update/up |     更新App(不推荐使用)
apps/as    |    批量克隆App(不推荐使用)
reset/re   |    重置目录(不推荐使用)
rewrite/rw 	|   重置开发项目目录（需要到模块下执行）
demo/de     |   一键生成演示网站(不推荐使用)
serverCreateParent/scp|后端开发工程初始化
serverAddMicroservice/sam|添加一个微服务到后端开发工程

- ### 安装
```
npm i -g ttk-tool
```
- ### 创建website


```
ttk new myproject 
```

- ### 克隆app

```
ttk clone ttk-edf-app-login apps/edf/ttk-edf-app-login
```

- ### 批量克隆app

```
ttk apps apps/edf ttk-edf-app-login ttk-edf-app-portal ...
```

- ### 更新已经存在的app 

```
ttk update app[包的名字] path[已经存在的路径]
```

更新基础模块
```
ttk update ttk-app-core
```
- ### 编译项目

```
ttk compile
```

- ### 创建一个空的app
```
ttk app path[路径+app名称]
如：ttk app edf/ttk-edf-app-login [默认会在apps路径下创建]
```
> 默认取最末级作为app的名称

- ### 创建一个空的module
```
ttk module [name]
如：ttk module test2 [会在appps路径下面创建test2模块]
```
>此命令会在apps文件目录创建[name]模块，自动引入模块依赖到项目

- ### 删除一个空的module
```
ttk delmodule [name]
如：ttk delmodule test2 [会在appps路径下面删除test2模块]
```
>此命令会在apps文件目录删除[name]模块，如果模块内部有app需要手动剪切走

- ### 重置app的目录结构
```
ttk reset
```
>此命令会遍历apps/下的文件目录，重新生成相应的`./index.js`、`mock.js`、`assets/style/app.less`的路径。

```
ttk rewrite
```
>此命令会遍历项目app下的文件目录，重新生成相应的`./index.js`、`index.less`的路径。

- ### 一键生成演示网站
```
ttk demo
```
>此命令会将Npm上所有开源APP生成演示网站。

- ### 后端开发工程初始化
```
ttk  serverCreateParent   [工程名称]
```
>此命令会在指定目录下生成后端开发的的骨架，里面还没有任何微服务，执行此命令后再执行sam命令创建微服务工程。
- ### 添加一个微服务到后端开发工程
```
ttk serverAddMicroservice    [业务线名称]   [模块名称]
```
>此命令将会根据指定的业务线名称和模块名称生成一个微服务工程，放到 src目录下。
一个模块对应一个微服务,一个业务线下可以有多个模块。
连续使用此命令可以在产生多个微服务工程。
业务线名称+模块名称 可以确定唯一的微服务名称。
注意使用此命令之前需要切换到project的顶级目录下。
