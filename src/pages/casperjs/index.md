---
title: CasperJS
date: '2016-09-20'
spoiler: 这不是一篇介绍使用 CasperJS 进行单元测试的文章
tags: ['CasperJS', 'code']
---

这是一篇使用 CasperJS 的一些经验记录，后续有遇到坑，或者什么使用心得就继续更新到这里了。

----

写过前端单元测试的朋友，应该都知道 PhantomJS，我之前也写过几篇[单元测试](https://github.com/xwartz/blog)相关的文章，也有用到。

> PhantomJS 是一个基于 WebKit 的服务器端 JavaScript API, 无需浏览器的支持即可实现对 Web 的支持，
> 且原生支持各种 Web 标准，如 DOM 处理、JavaScript、CSS 选择器、JSON、Canvas 和可缩放矢量图形 SVG。

PhantomJS 形成的一些不错的开源生态圈内容, 相关项目：

* CasperJS：一个开源的导航脚本处理和高级测试工具
* Poltergeist ：测试工具Capybara的测试驱动
* Guard::Jasmine：能够基于Rails实现自动化测试Jasmine的Specs
* GhostDriver：远程 WebDriver 有线协议的开源实现
* PhantomRobot：PhantomJS机器人测试框架
* Mocha-PhantomJS：JavaScript测试框架Mocha的客户端

一个完整、活跃的生态圈是选择一个框架的重要参考，所以这也是相比 Vuejs 我更看好 Reactjs 的原因，跑偏了...😂

CasperJS 是一个用 JavaScript 编写的, 基于 PhantomJS 的导航脚本和测试工具,

它简化了定义一个完整的导航操作所需的步骤, 还提供了很有用的函数封装、方法和语法糖, 它可以完成下面这些常见任务:

> * 定义 & 排序浏览器导航步骤
> * 填充 & 提交表单
> * 点击 & 跟踪链接
> * 捕获网页截图 (还可以截取某一区域)
> * 在远程DOM上进行断言测试
> * 记录事件
> * 下载资源,包括二进制文件
> * 编写功能测试套件,结果保存为JUnit XML文件
> * 抓取网页内容

### 起因

最初的想法是想做一套前端流程测试，每次手动重复测试总是很烦的，流程是这样子的:

`用户登录 --> 选择商品 --> 下单 --> 跳转到收银台 --> 确认付款`

当然这个流程并没有看起来这么简单，必须要模拟用户的网页操作，比如：
1. 登录这步得解决验证码问题
2. 不同的付款方式：快捷支付得发送短信；使用支付宝二维码、微信二维码；以及跳转到其他的平台支付等

然后使用 PhantomJS 来模拟用户操作，当然各种问题还在解决中。

在试图解决问题的时候，首先调研了下一些前端测试框架，主要是 UI 测试、流程测试方面的，做了一些尝试。

### 起手式

首先我们来看下 [PhantomJS](https://github.com/ariya/phantomjs) 的使用：

```js
var page = require('webpage').create()             //新建一个页面
page.open(url1, function(status) {                  //导航到第一个URL
    if (status == "fail") phantom.exit()           //如果发生错误,退出程序
    page.open(url2, function(status) {              //否则在页面加载完成的回调函数中继续导航到第二个URL,依次类推
        if (status == "fail") phantom.exit()
        page.open(url3, function(status) {
            if (status == "fail") phantom.exit()
            page.open(url4, function(status) {
                if (status == "fail") phantom.exit()
                // 我可以停下来了吗?
            })
        })
    })
})
```

这是一个在 PhantomJS 中使用链式回调来进行导航操作的例子，写起来相当痛苦。

比对一下使用 Casperjs

```js
var casper = require('casper').create()           //新建一个页面
casper.start(url1)                                //添加第一个URL
casper.thenOpen(url2)                             //添加第二个URL,依次类推
casper.thenOpen(url3)
casper.thenOpen(url4)
casper.run()
```

异步操作更方便了，更多的 API 看官方文档 <http://docs.casperjs.org/en/latest/> 。

### 正题

以上简单介绍了下使用方法，现在使用 Casperjs 来做点实际的尝试。

注册 github 账户：

```js
var casper = require('casper')

// 输出信息
var ca = casper.create({
  verbose: true, // 实时输出
  logLevel: 'debug'
})

// 输出 dom 页面执行的 console 信息
ca.on('remote.message', function (msg) {
  this.echo(msg, 'COMMENT')
})

var user = {
  name: 'iamrobot1',
  email: 'iamrobot1@gmail.com', // 假邮箱
  password: 'iamrobot1' // 密码需要包含数字
}

var signupUrl = 'https://github.com/join?source=header-home'
ca.start(signupUrl) // 打开页面
  .thenEvaluate(function (user) {
    // 加载完页面，执行 js 处理表单
    var form = document.forms[1]
    form['user[login]'].value = user.name
    form['user[email]'].value = user.email
    form['user[password]'].value = user.password
    form.submit()
    console.log('First, create a new user')
}, user)

ca.on('exit', function () {
  this.echo('Done!') // 注意这里
})

// 启动
ca.run(function () {
  // 执行完任务，记得退出
  ca.exit()
})
```

以上流程可以注册 github 账户，然后接下来就可以干点其他事了...

当然上面方式只能注册一个账户，当我想注册多个账户时，可以写一个循环，然后随机创建信息。

```js
var count = 0
var start = function() {
  if (count >= num) {
    ca.exit()
    process.exit()
    return
  }

  .... // 注册过程

  ca.run(function () {
    count++
    start()
  })
}

```

因此，写了一个 github 的自动 star 程序 [robot](https://github.com/xwartz/robot)。

#### 在这过程中，遇到几个可以记一下的东西：

1. exit 方法是一个异步的过程。
2. start/open 方法打开新的页面，类似于浏览器打开新的 tab。
3. casper.create 只能创建一次。

关于第三点查看 [Declare two or more casper in a single script](http://stackoverflow.com/questions/25883624/declare-two-or-more-casper-in-a-single-script)。

所以要注册多个账户的时候需要先退出登录。

#### 疑惑：

1. 监听 `exit` 事件，打开多个页面，最后会触发多次
2. `waitFor` 设置 `timeout` 无效，貌似只能在 `create` 的时候设置 `stepTimeout`，或者说是要比 `stepTimeout` 值要小？
3. 操作步骤多的时候，会经常出现这个错误 [Maximum step execution timeout exceeded for step](https://github.com/casperjs/casperjs/issues/1689)

#### 缺点

1. PhantomJS 对 ES6 支持不友好，ES6 语法也没法使用
2. 不能 require Nodejs 的 native 方法，所以 npm 安装的很多模块就不能使用了，[API 文档](http://phantomjs.org/api/)

### 一些经验

1. 使用 npm 安装 phantomjs-prebuilt，替代全局安装 phantomjs
2. 不推荐使用 phantomjs-node
3. 推荐 [faker.js](https://github.com/marak/Faker.js/) 创建模拟数据
4. 推荐[random-js](https://github.com/ckknight/random-js) 创建随机数据
5. 上传图片接口 [upload-file](http://phantomjs.org/api/webpage/method/upload-file)

暂时就这些。

### 结论

使用 CasperJS/PhantomJS 可以做很多自动化的事，值得尝试，不怕被辞...

最后，用 Python 的朋友可以看下这个 [mechanize](http://docs.seattlerb.org/mechanize/)，类似 PhantomJS 的 Python 实现。

### 资源

[CasperJS](http://docs.casperjs.org/en/latest/)
[PhantomJS](http://phantomjs.org/documentation/)
[phantomjs-prebuilt](https://www.npmjs.com/package/phantomjs-prebuilt)
[phantomjs-node](https://github.com/amir20/phantomjs-node)
[[译]CasperJS,基于PhantomJS的工具包](http://www.cnblogs.com/ziyunfei/archive/2012/09/27/2706254.html)
[Nicolas's blog](https://nicolas.perriault.net/code/2012/casperjs-hits-1-0-stable/)
