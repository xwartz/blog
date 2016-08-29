---
title: webpack + karma + mocha + es6 编写单元测试
date: 2016-06-14 23:58:00
tags:
  - 前端工程
  - 单元测试
---

遥想当年在前公司，三个人的时候写单元测试，两个人的时候搞前后端分离，一个人的时候玩桌面应用。

<!-- more -->


{% asset_img ill.png %}

### 为什么写单元测试

你问我支不支持写单元测试，我当然是支持的。尤其是在没有测试人员的时候，我可不想时不时搞出故障。

细想了下单元测试的好处：

> 
* 能强迫你写出好的代码
* 能快速带新人入坑，填坑
* 在重构代码时，不用为发布线上担心
* 能在别人对着屏幕忙着测试时，挺着胸准时下班

编不下去了 ╮(╯_╰)╭ 

### 为什么选择 `webpack`

当然是为了装逼啦，不然以后怎么对人家说 `webpack` 多简单啊，这你都能配置老半天! 看我（ˇ＾ˇ）

> 
* 现在的开发多数项目使用了 `webpack`
* 为了之后的可扩展，哪天想用 `react`，想换成 `vue`，想上 `es6` 啦

由以上两条，因为项目技术栈，可以共用配置，测试的 `webpack` 配置可以共用开发时的配置，
我可不想换个技术栈就得修改测试配置。

### 为什么选择 `karma`

不多说，看官方推荐

> 
You want to test code in real browsers.
You want to test code in multiple browsers (desktop, mobile, tablets, etc.).
You want to execute your tests locally during development.
You want to execute your tests on a continuous integration server.
You want to execute your tests on every save.
You love your terminal.
You don't want your (testing) life to suck.
You want to use Istanbul to automagically generate coverage reports.
You want to use RequireJS for your source files.

### 为什么选 `mocha`

只是因为以前写过，直接上手。

文档清晰，API 简单，扩展多。

至于其他可选的推荐 `jasmine`。

更多搭配 https://www.npmjs.org/browse/keyword/karma-adapter

### 为什么用 `es6`

既然都已经用 `webpack` 了，为什么不用 `es6` 呢？

现在不写写 `es6`，都要看不懂别人的源码咯。

### 如何搭建

说起来是有挺多坑的 (～ o ～)Y

#### webpack.config

```js 
import path from 'path'

export default {
  devtool: 'eval-source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }],
    // instrument only testing sources with Istanbul
    postLoaders: [{
      test: /\.js$/,
      exclude: /test\/|node_modules/,
      loaders: ['istanbul-instrumenter']
    }]
  },
  resolve: {
    alias: {
      utils: path.join(__dirname, 'src/utils')
    }
  }
}
```

这里只有一个地方要注意下 `postLoaders`

在 `webpack` 打包前需要经过 `istanbul-instrumenter-loader` 处理，覆盖率统计的应该是源码。

*开发时也是用的 `webpack`，可以提取共用的部分。*

### karma.config

```js 
import webpackConfig from './webpack.config'

module.exports = function (config) {
  config.set({
    // 使用的测试框架
    frameworks: ['mocha'],

    // 测试文件
    files: [
      'test/**/*.js'
    ],

    // 处理测试文件
    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap']
    },

    // 测试日志格式
    reporters: ['mocha', 'coverage'],

    // 不显示 `webpack` 打包日志信息
    webpackServer: {
      noInfo: true
    },

    // karma 插件
    plugins: [
      'karma-coverage',
      'karma-webpack',
      'karma-mocha',
      // 'karma-chai',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-mocha-reporter'
    ],

    // `webpack` 配置
    webpack: webpackConfig,

    // karma 服务器的监听端口
    port: 9876,
    // 输出日志为彩色
    colors: true,
    // 自动监测测试文件内容
    autoWatch: false,
    // 测试所用平台
    browsers: ['PhantomJS'],
    // 只运行一次
    singleRun: true,

    // 代码覆盖率日志
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: 'coverage', subdir: '.' },
        { type: 'text-summary', dir: 'coverage', subdir: '.' }
      ]
    }
  })
}

```

这里需要注意下 `preprocessors`，需要对编写的测试代码使用 `webpack` 预先处理。

`coverage` 一定要在 `reporters` 产生日志时使用，

在这之前使用，会将 `webpack` 转化的代码也加入进去，影响测试覆盖率。

关于测试覆盖率不准确也可以查看这里的讨论 [code coverage with karma-coverage](https://github.com/webpack/karma-webpack/issues/21)。

### 运行

以上代码都是用 `es6` 编写，包括配置文件，所以必须借助 `babel` 运行。

```json .babelrc
{
  "presets": ["es2015"]
}
```

`babel` 配置，根据你项目技术栈修改。

运行 `karma`，借助 `babel-register`。


```json package.json
"scripts": {
  "test": "node -r babel-register ./node_modules/.bin/karma start karma.config.js"
}
```

以上，命令行执行 `npm run test`。

### 集成测试

开源仓库推荐使用 `travis-ci`

```yml .travis.yml
sudo: false
language: node_js
node_js:
  - 'node'

cache:
  directories:
    - node_modules

install:
  - npm install

script:
  - npm run test

os:
  - osx
```

私有仓库的话，可以使用 Jenkins(https://jenkins.io/) 自己搭建一个。

---

### 技术支持

可参考 [demo](https://github.com/xwartz/webpack-karma-mocha)
