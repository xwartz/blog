---
title: 使用 Chrome 调试 Node.js
date: 2016-06-25 12:02:11
tags:
  - devTools
  - nodejs
---

看到 `Paul Irish` 更新的 `medium` 文章 [Debugging Node.js Nightlies with Chrome DevTools](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27#.f7ybt5s2m)，试了一发，顺便翻译下教程。

{% asset_img debug.png %}

Node.js Nightlies 版本已经支持使用 `Chrome` 浏览器来调试了，查看 [pull](https://github.com/nodejs/node/pull/6792)。


### 如何使用

下面是关于如何使用 `Chrome` 来调试 `Node.js` 的教程

#### 1. 下载 Node.js Nightly 版本

使用 `Paul Irish` 写好的脚本 <https://gist.github.com/paulirish/a02f4aa2b5ce69f5c269d18e74f57ab3>

```bash
curl -O "https://gist.githubusercontent.com/paulirish/a02f4aa2b5ce69f5c269d18e74f57ab3/raw/36003214efb09259f86061656ac04ac846ff9c2f/download-node-nightly.sh"
bash download-node-nightly.sh
```

或者你可以从这里下载想要的版本 <https://nodejs.org/download/nightly/>

#### 2. 设置别名

将下载的 Node.js 放到任意目录，在 `.zshrc` 中设置别名 `node-nightly`，避免与正常使用的 `Node.js` 冲突。

```bash
alias node-nightly='~/bin/node-v7.0.0-nightly20160621ecc48a154d-darwin-x64/bin/node'
```

#### 启动

```bash
node-nightly --inspect index.js
```

或者使用 `--debug-brk` 参数，在启动后第一行开始断点

```bash
node-nightly --inspect --debug-brk index.js
```

#### 在 Chrome 浏览器里打开 URL

执行上一步操作，会在终端输出 `URL`，在 `Chrome` 中打开这个地址。

以上，你就可以像调试网页一样调试 `Node.js` 代码了。


Enjoy.


### 其他调试方法

至于其他的调试方法，知道的大概有下面这些：

1. [Debugger](https://nodejs.org/api/debugger.html)

2. [node-inspector](https://github.com/node-inspector/node-inspector)

3. [devtool](https://github.com/Jam3/devtool)：基于 `Electron`

4. 还有各种编辑器自带的

关于比较可以看这个评论 [issuecomment-219756916](https://github.com/nodejs/node/pull/6792#issuecomment-219756916)

### 参考

[Debugging Node.js Nightlies with Chrome DevTools](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27#.f7ybt5s2m)

[Add v8_inspector support](https://github.com/nodejs/node/pull/6792)

<!-- more -->
