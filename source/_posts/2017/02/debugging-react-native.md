---
title: Debugging React Native
thumb: https://ww3.sinaimg.cn/large/006tKfTcgy1fcz16vsqi2j30dw0dw0tm.jpg
date: 2017-02-22 10:11:54
tags:
  - code
    react-native
    debugging
---

使用 React Native 的一点调试经验

<!-- more -->

React Native 无疑给移动端开发带来效率的提升，我们目前的产品中，iOS 和 Android 代码复用率应该在 80~90%。

虽然 React Native 提升了开发效率，但在 debug 时还是有很多不爽的地方。

一些基础的调试方法可以查看官方文档，[Debugging](https://facebook.github.io/react-native/docs/debugging.html)。

[Hot Reloading](https://facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html) 应该是我目前最喜欢 RN 的一个地方了吧，和 web 一致的开发体验。

[Debug JS Remotely](https://facebook.github.io/react-native/docs/debugging.html#chrome-developer-tools) 也是比较基础的调试方式，可以在 Chrome DevTools 打断点调试。

不推荐使用 `react-native log-ios`，调试起来一点都不方便。直接 `console.log` 在 Chrome DevTools 调试会更方便一些。

但是 `console.log` 会使整个程序变卡顿，尤其在 Android 下，界面卡顿无比，所以不建议打印所有信息。

### 使用 window.store

`console.log` 会极大地拖累 JavaScript 线程，所以并不推荐使用 `redux-logger`。

```js
if (isDebuggingInChrome) {
  window.store = store
}
```

通过 `store.getState()` 的方式打印查看 reducer 的状态。

![](https://ww2.sinaimg.cn/large/006tKfTcly1fd7r3rky7dj30oc0hmdho.jpg)


### 在 chrome 中显示网络请求

查看 RN 源码 [Libraries/Core/InitializeCore.js](https://github.com/facebook/react-native/blob/dba133a29194e300e9a2e9e6753f9d4e3a13c194/Libraries/Core/InitializeCore.js#L51)，注释中写着：

> 
  /**
  * Sets an object's property. If a property with the same name exists, this will
  * replace it but maintain its descriptor configuration. By default, the property
  * will replaced with a lazy getter.
  *
  * The original property value will be preserved as `original[PropertyName]` so
  * that, if necessary, it can be restored. For example, if you want to route
  * network requests through DevTools (to trace them):
  *
  *   global.XMLHttpRequest = global.originalXMLHttpRequest;
  *
  * @see https://github.com/facebook/react-native/issues/934
  */

原来的 `XMLHttpRequest` 被改写成了  `originalXMLHttpRequest`，

所以要在 chrome 中显示 `network` 只需要替换 `XMLHttpRequest` 为 `originalXMLHttpRequest`。

```js
if (__DEV__) {
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
}
```

当然，chrome 会限制跨域请求，这时要么后端配合一下去除跨域限制，要么使用 [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) 插件。

![](https://ww3.sinaimg.cn/large/006tKfTcly1fd7rux58ayj31da0myq9y.jpg)

这样就可以愉快的调试网络请求了，而不用打印出来，毕竟打印实在是太卡了。

### react-native-debugger

无意中看到这个 repo [react-native-debugger](https://github.com/jhen0409/react-native-debugger#react-native-debugger)，

使用了 electron，竟然还注入了 React Inspector / Redux DevTools，可以尝试使用。

不知道效果如何，倒是可以看看源码学习下。


### 最后

目前 UI 上的调试，并没有找到什么好的方案，所以只能等 RN 团队的推进了。

希望 RN 早点迎来 1.0.0 release。

有时间还是要阅读下 RN 源码才好。

### 参考

[doc performance](https://facebook.github.io/react-native/docs/performance)
[doc debugging](https://facebook.github.io/react-native/docs/debugging)
[react-native](https://github.com/facebook/react-native)
