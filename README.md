# 脚手架API说明


命令 | 说明
---|---
new/n | 创建新项目
app/a | 创建空白App
sever/se | 启动Mock服务
service/sc | 启动Web服务
clone/c |       克隆App
compile/cp|     编译项目
update/up |     更新App
apps/as    |    批量克隆App
reset/re   |    重置目录
demo/de     |   一键生成演示网站

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
- ### 编译项目

```
ttk compile
```

- ### 创建一个空的app
```
ttk app path[路径+app名称]
如：ttk app apps/edf/ttk-edf-app-login
```
> 默认取最末级作为app的名称

- ### 重置app的目录结构
```
ttk reset
```
>此命令会遍历apps/下的文件目录，重新生成相应的`./index.js`、`mock.js`、`assets/style/app.less`的路径。

- ### 一键生成演示网站
```
ttk demo
```
>此命令会将Npm上所有开源APP生成演示网站。