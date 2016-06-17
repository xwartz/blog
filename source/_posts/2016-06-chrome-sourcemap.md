---
title: Chrome 浏览器的 source-map 功能
date: 2016-06-16 21:22:49
tags:
  - devtool

---

作为前端开发，chrome 应该是大家最喜欢的浏览器之一，调试代码非常方便。

这编文章只要介绍下，chrome 浏览器自带的 `source-map` 功能。

如果你的项目已经用 `webpack` 了，那就不需要使用这个功能了，`webpack` 还提供 HMR 功能，开发起来更方便，无需刷新页面。

<!-- more  -->

### 添加文件夹到 Workspace

右键选择 `Add Folder to Workspace`

{% asset_img 1.png %}


并允许访问权限

### 建立 Map

右键选择 `Map to Network Resource...`

{% asset_img 2.png %}

如此便已有了 `source-map` 功能

只需要建立某个 `map` 的文件，`chrome` 会为把整个目录下的文件都建立 `map` 关系。

### 修改

选择某个文件，修改代码，`cmd+s` 保存，然后你会发现编辑器里的代码也更新了。

或者，更新编辑器里的代码，`cmd+s` 保存，网页中的代码也相应的更新了。

当然它并没有 `webpack` 这样的 `HMR` 功能，如果想看到代码更新后的效果，还是需要刷新页面的。

### 真正用途

可能在对于 `js` 代码来说以上的 `map` 并没有多大用处。

所以这个功能大多是在修改 `css` 代码的时候使用，

当你直接看着页面，在控制台修改 `css` 代码的时候，都不需要去修改编辑器里的文件了。

*Chrome 的这个功能还支持 `sass`，可以 `map` 到源代码，如果写 `sass` 的话，强力推荐。*
