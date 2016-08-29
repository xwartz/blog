---
title: 前端单元测试 Jenkins 集成
date: 2016-08-02 11:15:18
tags:
  - code
  - 单元测试
---

学习下 Jenkins，写个配置教程吧。

<!-- more -->


{% asset_img jenkins.png %}

之前写过几篇关于前端[单元测试的文章](http://xwartz.github.io/pupa/tags/%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95/)，现在结合项目简单写一下如何与 Jenkins 搭配集成。

关于如何自己搭建 Jenkins 服务就不说了，直接看[官方教程](https://jenkins.io)。


### 创建项目

{% asset_img 0.png %}

填充一下项目信息

{% asset_img 2.png %}

### 配置 gitlab

### 给 Jenkins 账户添加权限

{% asset_img 1.png %}

权限选择可以参考文档 http://docs.gitlab.com/ee/user/permissions.html#gitlab-ci

### 增加 Web hooks

{% asset_img 7.png %}

根据自身需要选择触发事件。

### 选择 Build 分支以及 Build Triggers

{% asset_img 3.png %}

根据自身需要选择。

### 编写 Build Shell

{% asset_img 4.png %}

一般根据 `package.json` 的 `scripts` 写就好了。

关于测试脚本编写可以参考 https://github.com/xwartz/webpack-karma-mocha

### 增加 Post-build Actions

{% asset_img 5.png %}

我这里用了[HTML的插件](https://wiki.jenkins-ci.org/display/JENKINS/HTML+Publisher+Plugin)，会生成 HTML 报告。

其他一些插件可以查看这里 [Plugins](https://wiki.jenkins-ci.org/display/JENKINS/Plugins)，可以增加点邮件报告等，根据自己需求来吧。

### 生成测试覆盖率

{% asset_img 6.png %}

最后生成的覆盖率类似这样子的。

### Over

这里只是简单介绍下怎么配合 `Gitlab` 仓库使用，其他一些东西还是需要自己去研究研究，`Jenkins` 在公司内部搭建服务使用还是不错的。

如果你的项目是开源的话，推荐使用 [travis-ci](https://travis-ci.org/)，或者花钱支持私有仓库。
测试覆盖率搭配 [CodeCover](https://codecov.io/)，还可以在自己的开源项目上增加几个 logo，给使用的人增加点信心。

