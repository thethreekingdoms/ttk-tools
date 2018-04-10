# ttk-tool

### 安装
```
sudo npm i -g ttk-tool
```
### 创建website


```
ttk new myproject 
```

### 克隆app

```
ttk clone ttk-edf-app-login[/*npm 上已经发布过的app项目*/] apps/edf/ttk-edf-app-login [/*clone app 到指定的路径*/]
```

### 更新已经存在的app 

```
ttk update app[包的名字] path[已经存在的路径]
```
### 编译项目

```
ttk compile
```

### 创建一个空的app
```
ttk app path[路径+app名称]
如：ttk app apps/edf/ttk-edf-app-login
```
> 默认取最末级作为app的名称

### 重置app的目录结构
```
ttk reset
```
>慎用功能，此命令会遍历apps/下的文件目录，重新生成相应的`./index.js`、`mock.js`、`assets/style/app.less`的路径。