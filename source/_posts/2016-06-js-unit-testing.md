---
title: 前端单元测试
date: 2016-06-14 22:21:20
tags:
 - 前端工程
 - 单元测试
---

这是我在公司组内的一次 Talk。

<!-- more  -->


{% asset_img ill.png %}

[Key](https://github.com/xwartz/pupa/blob/master/talk/js%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95.key)。

### 测试框架

* Qunit

* Jasmine

* Mocha

* AVA

### Mocha + Chai

* `describe`
* `it`

### 异步测试

关键字 `done`

[chai-as-promised](https://github.com/domenic/chai-as-promised)

[dirty-chai](https://github.com/prodatakey/dirty-chai)


### Mocha + Istanbul

`istanbul cover _mocha`

### Karma

* 在真实的浏览器中测试 `JavaScript` 代码

* 在多种不同的（桌面、移动、平板等）浏览器中测试 `JavaScript` 代码

* 使用 `Istanbul` 自动生产测试覆盖报告

### 持续集成

* Travis-ci

* Git Hook (pre-commit)

* Jenkins

### Todo

* Webpakc + Mocha + Karma

* Mock

* UI组件测试

---

### 参考

[关于前端开发谈谈单元测试](https://zhuanlan.zhihu.com/p/19590189)
[如何进行前端测试](https://www.zhihu.com/question/29922082)
[前端自动化测试探索](http://fex.baidu.com/blog/2015/07/front-end-test/)
[Qunit](http://qunitjs.com/)
[Jasmine](https://github.com/jasmine/jasmine)
[AVA](https://github.com/avajs/ava)
[Mocha](http://mochajs.org/)
[Chai](http://chaijs.com/)
[Istanbul](https://github.com/gotwarlost/istanbul)
[Karma](https://github.com/karma-runner/karma)
[Phantomjs](https://github.com/ariya/phantomjs)
[Travis-ci](https://travis-ci.org)
[Git Hook](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)
[Jenkins](https://jenkins.io/)
[Vue](https://github.com/vuejs/vue)
