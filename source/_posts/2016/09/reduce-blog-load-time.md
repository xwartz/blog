---
title: 又折腾博客了
date: 2016-09-29 21:33:28
thumb: http://ww4.sinaimg.cn/large/801b780agw1f8ausgrtmzj20dw0af3yz.jpg
cover: http://ww1.sinaimg.cn/large/801b780agw1f8auaooidzj21060non4j.jpg
tags:
  - blog
---

我真的是不折腾不会死星人。

<!-- more -->

这次一时兴起又买了个域名，`xwartz.xyz`。每次重新折腾博客，总是换个域名，也好，不用看到以前写的东东。

当然，博客还是托管在 github pages，访问速度也就只能依靠 github 了。

不过也是要做点优化的，顺便记录一下，给其他托管在 github pages 的人一些参考吧。

### 使用图床

首先想到的优化点就是图片了，毕竟我的博客都是图片，不做点优化，等加载完花都谢了。

在做图片优化的时候，顺便打开了下我之前写的个人主页 http://xwartz.github.com，
对，又是放在 github pages 上，唉，真是太穷了。

尼玛，打开真的是巨慢啊，然后看了一下，我去，放了一张 `2048 * 1024` 的背景图，
而且是被 webpack 打包到 react 代码中的，直接整个阻塞掉了。

对于之前那么多老外打开我的主页，只能说是真爱啊。

----

开始着手优化图片加载，嗯，得找个图床，重点是要免费！

嗯，就是微博了，主要也就是这个上传接口 http://picupload.service.weibo.com/interface/。

先别撸起袖子就开始传，这种费力的活肯定有人造好轮子了，so，搜索了下就找到几个 chrome 插件:

[新浪微博图床](https://chrome.google.com/webstore/detail/%E6%96%B0%E6%B5%AA%E5%BE%AE%E5%8D%9A%E5%9B%BE%E5%BA%8A/fdfdnfpdplfbbnemmmoklbfjbhecpnhf?hl=zh-CN)

[围脖是个好图床](https://chrome.google.com/webstore/detail/%E5%9B%B4%E8%84%96%E6%98%AF%E4%B8%AA%E5%A5%BD%E5%9B%BE%E5%BA%8A/pngmcllbdfgmhdgnnpfaciaolgbjplhe?hl=zh-CN)

[WeiboPicBed](https://github.com/Suxiaogang/WeiboPicBed)

试用了下，感觉也不是很方便，所以这里推荐下前同事写的 Mac 版 [iPic](https://github.com/toolinbox/iPic)，非常棒的一个软件。

我就是用 iPic 把博客上的图片全都上传到了新浪微博，速度瞬间提升 N 倍(当然，是我以前没有做优化的原因)。

### github 资源使用 CDN 

其实托管在 github 上的博客，真的没有太多优化的点了，只能再从 js/css 静态资源上入手了。

我自己写了个博客主题 [hexo-theme-nuna](https://github.com/xwartz/hexo-theme-nuna)，然后就想着把 github 上的资源托管到 CDN 上，

当然又准备找免费的 CDN 服务了，嗯，又被我找到了。。。

https://rawgit.com/

https://raw.githack.com/

https://gitcdn.xyz/

以上三个都可以托管 github 资源，区别的话看这里描述 [How is this Different from RawGit.com and githack.com](https://github.com/schme16/gitcdn.xyz#how-is-this-different-from-rawgitcom-and-githackcom)。

gitcdn 是每次会取最新一个 commit 的资源，大概两小时刷新一次资源，其他两个如果是生产环境的话，一年才刷新。。。

### 使用 pjax

做了以上两件事，我的博客访问速度已经算比较快的了，但是作为一个静态博客其实还是可以做些优化的。

为了省去博客的 `reload`，使用了 [pageAccelerator](https://github.com/Easyfood/pageAccelerator) 这个库。

原理也就是 `pjax`，在第一次加载之后，所有本站的链接点击，都会发起一个 `ajax` 请求，
然后将 `head` 做一个 `merge`，`body` 直接替换。

使用 `pushState` 更新浏览器访问记录，监听 `popstate` 事件，做前进/后退的活。

也没有特意做什么兼容，所以博客的浏览器支持 `IE10+` ，还有主题用了 `flex`，
本就没有想要兼容老的浏览器，毕竟也没什么人访问我的博客。

### 结尾

通过以上几点的优化，博客的访问速度还算不错，当第一次打开博客之后，访问其他页面，基本上就是秒开了，体验非常棒。

可能后续还会做点优化，比如把国内的托管到 coding.net，海外的才指向 github 。

最后，放个福利 [AutoMute](https://itunes.apple.com/us/app/automute-preventing-awkward/id1118136179?mt=12)，上班时间喜欢戴耳机的朋友应该会喜欢。
