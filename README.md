# vue项目 会员管理系统
• 项目描述：本项目基于前后端分离思想开发会员管理系统，采用数据化管理会员、管理商品进销、供应商信息维护、员工管理等方式加快对店铺运营效率，该
项目是前后端分离架构中的“前端部分” ；
• 项目技术：vue-cli脚手架工具搭建项目 前端MVVM框架Vue.JS 路由Vue-Router 数据交互通过axios以及RESTful架构来实现 Element-UI 作为前端UI框
架 Eslint代码风格检测 通过Easy-Mock模拟数据接口 Vuex状态管理
• 项目问题：前后端分离时，前端和后端API服务器不在同一台主机上，端口不一致导致前端发起请求时，无法得到响应，就存在跨域问题，浏览器限制了跨域
访问；
• 解决方案：通过代理请求的方式解决，将 API 请求通过代理服务器请求到 API 服务器。开发环境中，在 vue.config.js 文件中使用 devServer.proxy 选项进
行代理配置。

# mxg-msm

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
