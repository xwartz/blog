---
title: 读《图解HTTP》
date: 2016-07-07 15:32:27
tags:
  - books
---

学习 HTTP。

<!-- more -->

占坑，持续更新中...

`Cache-Control`: `no-cache` 和 `Cache-Control`: `no-store` 的差别

`no-cache` 其实并不是字面意思上的不缓存，事实上 `no-cache` 代表不缓存过期的资源，缓存会向源服务器进行有效期确认后处理资源。

`no-store` 才是真正的不进行缓存。


## HTTP 响应状态码

### 总图
{% asset_img code1.png %}

### 各个状态分析

{% asset_img code2.png %}

{% asset_img code3.png %}

{% asset_img code4.png %}

## 参考 
[选择一个 HTTP 状态码不再是一件难事 – Racksburg](http://www.zcfy.cc/article/choosing-an-http-status-code-stop-making-it-hard-8211-racksburg-904.html)
