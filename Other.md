# 简介

支持IE9+、移动端浏览

技术栈

vue+webpack+scss


# 目录结构

├── build # 构建代码
├── config # 构建配置环境信息
├── dist # 打包文件
│   ├── contract
│   ├── docs
│   ├── download
│   ├── invite-signup
│   ├── main-signup
│   └── static
├── src # 源码
│   ├── assets #静态资源 经过编译
│   ├── components #组件库
│   ├── libs #第三方工具代码
│   ├── mixins #混合代码
│   ├── modules #工具库
│   ├── pages #页面代码
│   ├── projects # 单页代码
│   ├── router #路由
│   ├── styles #样式
│   └── theme #主题色 暂无用
└── static #静态资源 不经过编译
​    ├── active
​    └── charting_library

sync2beta.sh 发布beta环境

sync2prod.sh 发布生产环境

sync2staging.sh 发布staging环境

index.html 多页模式页面模板

template.html 单页模式页面模板

## 构建

默认构建方式

新增：

1. 单页构建方式

   ```javascript
   let plugins = [];
   for (let key in config.projects) {
     plugins.push(
       new HtmlWebpackPlugin({
         filename: key + ".html",
         template: config.projects[key].template,
         theme: config.build.THEME_ENV,
         chunks: [key, 'manifest','vendor'],
         inject: true,
         config: config.projects[key].config
       })
     );
   }
   
   ///
   
   
   ```

2. svg合并

   ```javascript
   {
       test: /\.svg$/,
           include: [resolve('src')],
               loader: 'svg-sprite-loader'
       /* loader: 'svg-sprite?' + JSON.stringify({
             name: '[name]',
             prefixize: true,
           }) */
   }
   /// main.js 
   const request = require.context('./assets/svg', true, /\.svg$/)
   request.keys().forEach(request)
   ```

3. 合约新增模拟盘入口开关

   ```javascript
   /// feature/contract :: ~/config/prod.env.js
   'use strict'
   module.exports = {
     NODE_ENV: '"production"', // 当前环境
     STATIC: JSON.stringify(process.env.STATIC), // 静态路径
     // BASE_API: '"http://i.ix-test.com:8080"',
     BASE_API: '"https://i.ix.com/"', // 接口地址前缀
     ...require("./theme.env"),
     Simulation: true // true未模拟盘 false为正式盘
   }
   
   ```


## 分支

master 生产分支

feature/contract 合约分支 还未合并到主分支

develop 开发分支，还未保持最新

## 入口

main.js 以及projects/[filename]/[filename].js

主要做初始化、组件引入、指令引入等操作



## 第三方库

### element.ui

main.js部分引入

```
Vue.use(Select) // 引入element单个组件
Vue.use(Switch)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Upload)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Loading)
Vue.use(DatePicker)
```



### 国际化

vue-i18n

语言库位于： ~/src/libs/languages/*.json



### TradingView

[官网](https://www.tradingview.com/)

使用方式参见：~/src/components/Trading/TradingView.vue

配置方式： ~/src/libs/tradingview/config.js

样式：~/static/charting_library/static/kline.css



## 移动端

首页、登录页等使用全屏模式，pages需要引入

` import responsive from '@/mixins/responsive' `

`mixins: [responsive],`

其他页面使用缩放模式

`import responsiveScale from '@/mixins/responsiveScale'`

`mixins: [responsiveScale],`

以上通过更改html meta缩放级别实现

