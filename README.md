# ttk-tool

### 安装
```
sudo npm i -g ttk-tool
```
###创建website


```
ttk new myproject 
//或者
ttk n myproject
```

### clone app

```
ttk c ttk-edf-app-login[/*npm 上已经发布过的app项目*/] edf/ttk-edf-app-login [/*clone app 到指定的路径*/]
// 或者
ttk clone ttk-edf-app-login edf/ttk-edf-app-login
```

### 更新已经存在的app 

```
ttk update app[包的名字] path[已经存在的路径]

//或者

ttk up app[包的名字] path[已经存在的路径]
```
### 编译项目

```
ttk compile
//或者
ttk cp
```

### 创建一个初始化的app
```
ttk app path
```