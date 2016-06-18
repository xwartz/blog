---
title: 在 Electron 中使用模块热替换
date: 2016-06-06 11:45:22
tags: 
  - electron
  - hmr
---

{% asset_img erb.png %}


`Electron` + `React` + `Webpack` 这个组合开发桌面应用还是挺爽的。

如果再搭上 `Webpack` 的 [Hot Module Replacement](http://webpack.github.io/docs/hot-module-replacement.html) 那简直完美，不用刷新就搞定。

关于 `HMR` 的演示可以看 Dan Abramov 的演讲视频 [Hot Reloading with Time Travel](https://www.youtube.com/watch?v=xsSnOQynTHs)。

在 `Electron` 中使用 `HMR` 碰到的问题是打开的文件是本地的，`host` 就变成了 `file://`，

所以监听到变化之后，`Webpack` 尝试更新模块时，就查找不到 `hot-update.json` ，然后 `Webpack` 无法更新模块...

<!-- more -->

{% asset_img hmr-error.png %}

当时这个问题搞疯了我，花了很长时间，所以这篇就是为了记录下当时的坑。

上图出现的情况，当时用的配置就是使用的比较官方的方式, 使用 `webpack-dev-server` 和 `react-hot-loader`。

```js 
import path from 'path'
import webpack from 'webpack'

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }]
  }
}
```

然后换成 [React Hot Loader 3](https://github.com/gaearon/react-hot-loader/pull/240) 试了一下，果然不出所料，还是没能成功。

原本以为问题就是出在 `webpack-dev-server` 上，所以就把精力集中在替换 `webpack-dev-server` 上了。

然后用 `express` + `webpack-dev-middleware` + `webpack-hot-middleware` 自己搭建服务。

```js 
'use strict'

import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from './webpack.config.dev'

const app = express()
const compiler = webpack(config)
const PORT = 3000

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: false,
  reload: true,
  stats: {
    colors: true
  }
}))

// hot
app.use(webpackHotMiddleware(compiler))

app.listen(PORT, 'localhost', (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`Listening at http://localhost:${PORT}`)
})

```

然而还是不行, 最后研究了这个仓库的[配置](https://github.com/chentsulin/electron-react-boilerplate/blob/master/webpack.config.development.js)，
发现还有这样的一个配置 `target: 'electron-renderer'`，然而官方文档上却没有说明。

Note: `target: 'electron-renderer'` 属性是在 `Webpack` `v1.12.15` 版本中加入的 [make `electron-main` and `electron-renderer` targets works in 1.x](https://github.com/webpack/webpack/pull/2181)。

为了避免更多人步我后尘，就去给 `Webpack` 文档增加了说明 [Compare: configuration](https://github.com/webpack/docs/wiki/configuration/_compare/135c3a8e13bc72ee5e9aede3571e1e5060188390)。

这时候热替换的问题也就解决了，这个过程还能从提交历史中看到 [PupaFM](https://github.com/xwartz/PupaFM/commits/master/dev-server.js)。

But...

当后来有时间再回顾这个问题的时候，一直在想第一种方式应该能解决才对啊，
所以在第一种方式的配置上加了 `target: 'electron-renderer'`，然而并没有什么软用...

最后再一次查看了一遍 `Webpack` 的文档，仔细的看了 `output.publicPath` 这个配置。

#### output.publicPath

> 
 The `publicPath` specifies the public URL address of the output files when referenced in a browser. 
 For loaders that embed `<script>` or `<link>` tags or reference assets like images, 
 `publicPath` is used as the href or url() to the file when it’s different then their location on disk (as specified by path). 
 This can be helpful when you want to host some or all output files on a different domain or on a CDN. 
 The Webpack Dev Server also takes a hint from `publicPath` using it to determine where to serve the output files from. 
 As with path you can use the [hash] substitution for a better caching profile.

那我是不是只要把相对路径改成绝对地址，就可以监听到文件的更新了。

只要这样就好了嘛 `publicPath: 'http://localhost:3000/static/'`...

然后写了个 demo ，具体代码可参考 [Electron React Hot Boilerplate](https://github.com/xwartz/electron-hot-boilerplate)。

果然...

还是需要好好阅读完文档啊，虽然 `Webpack` 的文档也略坑。
