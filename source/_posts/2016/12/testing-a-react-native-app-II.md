---
title: 为 React Native 应用写测试 II
thumb: http://ww3.sinaimg.cn/large/006tNc79gw1faf7037q56j30uk0ukq4g.jpg
cover: http://ww4.sinaimg.cn/large/006tNc79gw1faf5ob4bucj31gs0z7wgr.jpg
date: 2016-11-18 20:58:41
tags:
  - code
  - react-native
  - testing
---

这会是一系列的文章，来介绍如何为 React Native App 写测试(包括 Unit Testing 和 Functional Testing)以及遇到的一些坑。

<!-- more -->

这是 [<为 React Native 应用写测试>](/blog/tags/react-native) 的系列文章的第二篇，上一篇请看[为 React Native 应用写测试 I](/blog/2016/11/testing-a-react-native-app)。

这篇主要会集中在 `Component` 层的单元测试编写。

注意：*以下涉及到的 React Native 版本为 0.36，官方版本推进很快，最新可能出现偏差。*


### 参考

<https://facebook.github.io/jest/docs/tutorial-react-native>
<https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md>
[Testing React Native with the *new* Jest — Part I](https://blog.callstack.io/unit-testing-react-native-with-the-new-jest-i-snapshots-come-into-play-68ba19b1b9fe#.xreydjkil)
[Testing React Native with the *new* Jest — Part II](https://blog.callstack.io/unit-testing-react-native-with-the-new-jest-ii-redux-snapshots-for-your-actions-and-reducers-8559f6f8050b#.gk3s28gar)
[Diverse Test-Automation Frameworks For React Native Apps](https://www.smashingmagazine.com/2016/08/test-automation-frameworks-for-react-native-apps/)
<https://github.com/admc/wd>
<https://github.com/appium/appium>
