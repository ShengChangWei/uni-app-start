
![](https://user-gold-cdn.xitu.io/2019/10/18/16ddce10698b28ea?w=888&h=500&f=png&s=189396)
## 前言

9月份，开始开发微信小程序，也曾调研过`wepy`/`mpvue`，考虑到后期跨端的需求，最终选择使用了`uni-app`，本文主要介绍如何使用`uni-app`搭建小程序项目，以及自己对框架的补充，包括封装`request`接口，引用`color-ui`,动态设置底部`tab`页等，详情见下文


## uni-app 介绍（官网）
`uni-app `是一个使用` Vue.js` 开发所有前端应用的框架，开发者编写一套代码，可发布到`iOS`、`Android`、`H5`、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉）等多个平台。

即使不跨端，`uni-app`同时也是更好的小程序开发框架。详见[评测](https://ask.dcloud.net.cn/article/35947)

优点：

![uni-app](https://user-gold-cdn.xitu.io/2019/10/17/16dd8a4cd3e6a8ea?w=992&h=565&f=png&s=63021)

我使用`uni-app`框架主要用来开发微信小程序，我使用过程中感觉的优点是：

* `uni-app`框架使用的开发工具 `HBuilderX `，`HBuilderX` 内置相关环境，开箱即用，无需配置` nodejs`， 需要什么插件可直接下载，测试、打包、发布特别方便。
* `uni-app `采用`Vue.js`语法，基本支持`vue`大部分语法（`vue`的动态组件`component`不支持）。
* `PC`端使用`vue`封装的一些`js`方法，以及建构思想，可直接移植到`uni-app`中，比如：本人`pc `项目中`api`接口`js`文件，可直接复制到小程序框架`api`文件夹中（PS：`api`文件夹维护后端请求路径）
* `uni-app` 周边生态丰富，[插件市场](https://ext.dcloud.net.cn)可用的组件特别多，也可使用vue语法自己封装一些组件。


## 开发工具（HBuilderX）

* `HBuilderX`: [官网IDE下载地址](https://www.dcloud.io/hbuilderx.html);
* `HBuilderX`是通用的前端开发工具，但为`uni-app`做了特别强化。
* `HBuilderX`提供了一些插件，可直接下载安装，具体如下图： `工具` > `插件安装` 

![uni-app](https://user-gold-cdn.xitu.io/2019/10/17/16dd8a4ea21f5bb1?w=846&h=716&f=png&s=42499)

## 项目结构

首先我们通过`HBuilderx` > `文件` > `项目`，选择`uni-app`项目，模板我选择的是默认模板，当然你也可选择其他模板，接着确认创建，如果你选择的是默认模板，此时你的文件夹应该如下图：

![uni-app](https://user-gold-cdn.xitu.io/2019/10/17/16dd8a50c235983e?w=607&h=212&f=png&s=5351)

接着我根据自己的项目需求，以及为了与`vue`的`pc`项目结构保持一下，分别添加如下文件夹

具体代码可参考个人GitHub--[微信起步项目](https://github.com/ShengChangWei/weixin-start)

![uni-app](https://user-gold-cdn.xitu.io/2019/10/17/16dd8a53757493fc?w=837&h=354&f=png&s=8864)

```shell
+-- api -- (页面接口路径)
|   +-- login.js
|   +-- tools.js
+-- colorui -- (color-ui 样式)
+-- common -- (通用的js方法)
+-- components -- (通用的组件)
+-- pages -- (主要页面)
+-- services -- (通用的服务)
|   +-- auth.service.js -- (主要封装了一些保存用户的token方法)
|   +-- config.service.js -- (存放全局通用的变量)
|   +-- request.service.js -- (封装了uni.request的方法)
+-- static -- (静态文件)
+-- unpackage -- (在小程序模拟器运行的文件)
+-- App.vue -- (应用配置，用来配置App全局样式以及监听 )
+-- main.js -- ( Vue初始化入口文件)
+-- manifest.json -- (配置应用名称、appid、logo、版本等打包信息)
+-- pages.json -- (配置页面路由、导航条、选项卡等页面类信息)
+-- uni.scss -- (这里是uni-app内置的常用样式变量)
```

主要文件介绍：

* `api` 文件夹中存放的是各个页面的请求路径，引入`request.service.js`暴露出来的`api`， 
* `colorui` 使用了`color-ui`样式，个人认为样式非常好看，非常感谢，详情：[color-ui](https://github.com/weilanwl/ColorUI)
* `common` 存放全局通用的js方法
* `components` 存放全局组件，包括`uni-ui`以及自己封装的组件
* `pages` 主要页面， 其中`pages`文件夹中 `index`文件中可布局底部的`tab`页面，通过`v-if`判断显示不同的tab页
* `services` 通用的服务文件（我不知道这种描述是否准确，原来用的`Angular4`，`Angular`中服务概念对我有一定的影响）
  - `auth.service.js` 通过使用`uni.setStorageSync`简单封装了一些保存用户的`token`方法
  - `config.service.js` 保存全局的变量 例如：`apiUrl`请求接口的`IP`, `storage_key` 是`token` 的键值，全局引用的变量都可定义在这个文件内，后期如果需要改动，只需要修改这个文件中对用的值
  - `request.service.js` 使用`Promise`对`uni.request`进行封装，将`get`、`post`、`delete`请求方式暴露出来，在`api`文件夹中引用这个文件即可使用`get`、`post`、`delete`方法
* `static` 静态文件，我主要用来放图片
* `unpackage` (在小程序模拟器运行的文件)
* `App` 应用配置，用来配置App全局样式以及监听 

## 如何自定义底部tab页

本人项目中需要根据不同的角色显示不同的底图`tab页`，那么原来在`pages.json`设置的`tab`页，不够灵活，也不好扩展，因此自定义`tab`页，具体如下


* 在`pages`文件夹中，新建一个`index`文件夹并创建一个`index.vue`页面，在这个页面可布局底部`tab`, 根据点击不同的`tab`显示对应的tab页， 如图：

![uni-app](https://user-gold-cdn.xitu.io/2019/10/17/16dd8a65343d95e6?w=1535&h=676&f=png&s=52529)
注意：
 
* 如果每个tab点击是切换不同的view，这个就相当于单页应用了，当页面比较复杂时，切换过程可能存在卡。所以使用自定义组件的tabbar就尽量避免太多复杂页面。
* 当然原生tabbar虽然体验好，但自定义性不足。这个需要开发者根据自己的需求来平衡选择。

## 如何使用colorui

### 引入

ColorUI是一个css库！！！在你引入样式后可以根据class来调用组件

* 下载源码解压获得/Colorui-UniApp文件夹，复制目录下的 /colorui 文件夹到你的项目根目录
* `App.vue `引入关键`Css` `main.css` `icon.css`

```shell
<style>
@import "colorui/main.css";
@import "colorui/icon.css";
@import "app.css"; /* 你的项目css */
....
</style>
```
此时你可以使用colorUI提供的css样式了，

因为colorUI的文档说明正在完善中，具体样式对应的类名可能不清楚，那么你可将[color-ui](https://github.com/weilanwl/ColorUI/tree/master/Colorui-UniApp)下载下来，使用`HBuilderX`运行在浏览器中，打开调试工具，找到对应的节点即可获取对应的类名，（当然你也可能会有其他好的方法）。

### 使用colorui自定义导航栏

* `pages.json` 配置取消系统导航栏

```json
"globalStyle": {
	"navigationStyle": "custom"
},
```

* `App.vue` 获得系统信息

```javascript
onLaunch: function() {
    uni.getSystemInfo({
    	success: function(e) {
    		// #ifndef MP
    		Vue.prototype.StatusBar = e.statusBarHeight;
    		if (e.platform == 'android') {
    			Vue.prototype.CustomBar = e.statusBarHeight + 50;
    		} else {
    			Vue.prototype.CustomBar = e.statusBarHeight + 45;
    		};
    		// #endif
    		// #ifdef MP-WEIXIN (微信小程序)
    		Vue.prototype.StatusBar = e.statusBarHeight;
    		let custom = wx.getMenuButtonBoundingClientRect();
    		Vue.prototype.Custom = custom;
    		Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
    		// #endif		
    		// #ifdef MP-ALIPAY
    		Vue.prototype.StatusBar = e.statusBarHeight;
    		Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
    		// #endif
    	}
    })
},
```

* 在`main.js`引入`cu-custom`组件

```javascript
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
```

* 在需要的页面可以直接使用了，如下：

```html
<cu-custom bgColor="bg-gradual-blue" :isBack="true">
	<block slot="backText">返回</block>
	<block slot="content">导航栏</block>
</cu-custom>
```

## 跨端兼容（如何你只是单个平台，就不需要考虑）

根据平台特性，`uni-app` 提供了条件编译手段，在一个工程里优雅的完成了平台个性化实现。

```html
<view class="content">
  <! -- #ifdef APP-PLUS -->
  <view>仅出现在 5+App 平台下的代码</view>
  <! -- #endif -->

  <! -- #ifndef H5 -->
  <view>除了 H5 平台，其它平台均存在的代码</view>
  <! -- #endif -->

   <! -- #ifdef H5 || MP-WEIXIN -->
  <view>仅在 H5 平台或微信小程序平台存在的代码</view>
  <! -- #endif -->
</view>
```



## 发布微信小程序

* 服务器域名必须是`https`合法域名

* 进入开发页面 `开发` > `开发设置`，设置服务器域名, 如图

![uni-app](https://user-gold-cdn.xitu.io/2019/10/17/16dd8b4ebe7e0f52?w=1282&h=374&f=png&s=18455)

* 发布小程序之前需要配置`appid`,应用名称、logo,可登录微信公众平台进入设置页，设置小程序的基本信息

* 使用`HBuilderx`找到`发行` > `小程序-微信`，点击后稍等片刻会启动微信开发工具，点击微信开发工具`上传`，填写上传信息即可，此时上传到微信公共平台是体验版，需要在`版本管理`>`提交审核`，等待后台审核，审核通过后，小程序也就上线成功了,如图：

![uni-app](https://user-gold-cdn.xitu.io/2019/10/17/16dd8a696de9ee19?w=1261&h=166&f=png&s=8921)

## 注意：

* README.md 文件无意义，只是对项目简单介绍
* README_files 文件无意义，临时存放README.md引入文件

## 总结

本文主要介绍了使用uni-app框架开发微信小程序，自己对默认模板的补充，包括封装`request`接口，引用`color-ui`,动态设置底部`tab`页，还有通过`color-ui`提供的导航栏组件，自定义导航栏。本人才疏学浅，表达能力有限，书写过程如有错误欢迎指正，也请点赞评论鼓励（ps: 内心怕怕的）

关于`uni-app`更多信息可参考官方文档 [https://uniapp.dcloud.io](https://uniapp.dcloud.io/README)

来源个人博客: [https://shengchangwei.github.io/js-uni-app/](https://shengchangwei.github.io/js-uni-app/)

