---
title: Trunk Based Development
date: 2016-06-21 22:38:18
tags: 
  - git
  - TBD
  - gitflow
---

除了 gitflow 之外的 git 分支管理方式推荐。

<!-- more -->

今天在逛 [ruby](https://ruby-china.org/) 论坛，看到个帖子 [GIT 之我见 - 反驳 TW 洞见《GITFLOW 有害论》](https://ruby-china.org/topics/29263)。
然后又点开了 [GITFLOW有害论](http://insights.thoughtworkers.org/gitflow-consider-harmful)，挺有意思的讨论。

具体的讨论可以看看那个帖子和文章的评论，我从文章和讨论中了解到除 [gitflow](http://nvie.com/posts/a-successful-git-branching-model/) 之外的分支管理方式，也就是 [Trunk Based Development](http://paulhammant.com/2013/04/05/what-is-trunk-based-development/)。

`gitflow` 方式大家接触应该比较多，介绍的文章也非常多，可以自行了解。

这篇文章主要介绍下 [Trunk Based Development](http://paulhammant.com/2013/04/05/what-is-trunk-based-development/)，提供一个不同的分支管理理念。


### 什么是 Trunk Based Development

`Trunk Based Development` 和 `gitflow` 不同之处在于，它的所有开发工作都在 `master` 分支进行，通过 [Continuous Integration](http://www.martinfowler.com/articles/continuousIntegration.html) 确保 `master` 上的代码随时都是可发布状态的。

{% asset_img what_is_trunk.jpg %}

据说 `google` 和 `facebook` 一直实践的就是这种方式。


### 多个分支

是的，`Trunk Based Development` 也存在多个分支。但是 `release`(只有专门的开发者才拥有`release`权限) 分支只会短暂存在，每次都会从 `master` 分支拉出 `release` 分支进行 `release` 追踪。

`Hotfix` 也是从 `master` 分支 `fixed` 然后合并到 `release` 分支，而不是从 `release` 分支 `fixed`，然后合并到 `master`，从而保证 `release` 分支，不被随意 `commit`。


### 对开发者的要求

在 `master` 分支上开发，必然对开发者有更严格的要求。必须确保每一个 `commit` 不会破坏 `master` 的构建。

所以很多公司会使用 `pre-commit` 的方式，在 `commit` 时做一个检测。

开发人员必须培养一个习惯：保证每个 `commit` 是 ok 的，同步最新的 `trunk` 分支，以跟分支开始构建，仔细检测更改，然后提交。


### 持续集成

什么是持续集成，比如 `Jenkins`，`Travis`，每当有 `commit` 的时候，就跑一遍指令，用来测试、部署。

持续集成的好处是，可以检测每次提交的影响，可以确保回滚到正确的位置(有历史记录)。

### 解决 long lived branch

`gitflow` 会将新功能以 `feature` 分支独立出来开发，如果周期过长，很多时候会造成与其他 `feature` 分支 `merge` 冲突。

如果冲突的地方很多，不得不花更多的时间去解决冲突(这个在本人开发过程中也遇到过)。

而 `TBD` 的方式都是在一个分支下干活，所以不会造成过多冲突的情况。

越早合并解决冲突就越容易。

`TBD` 提倡使用 `feature toggle` 的方式来开发新功能。也就是给 `feature` 设置开关，在正式发布之前，关闭改功能。当需要发布该新功能的时候，去掉开关即可。

### TBD 的好处

以上，`TBD` 的好处可以总结为一下几点：

1. 降低 `test` 成本，只需要在 `master` 分支执行测试
2. 可以随意根据需求，开放关闭新功能，也就是 `release` 的功能更加可控
3. 减少 `merge` 的冲突

### 总结

`gitflow` 和 `TBD` 哪个更好，还是需要看团队的情况来使用。
目前我使用 `gitflow` 的方式，也遇到了大面积 `merge` 冲突的情况，解决方法如下：

1. 在开发新功能的时候，尽量细分功能，频繁的和 `master` 合并
2. 开发大的新功能，和其他团队成员说明，尽量减少大面积的原有代码更改
3. 某些时候还会拉出一个新分支用于合并其他 `feature` 分支，查看冲突情况...

`gitflow` 方式对于多人合作时，重构代码、`feature` 周期过长的情况确实不利。
但是 `TBD` 的方式，对于开发人员、集成测试的要求会更高些，所以自己斟酌。

---


### 参考

[GITFLOW有害论](http://insights.thoughtworkers.org/gitflow-consider-harmful) 
[GIT 之我见 - 反驳 TW 洞见GITFLOW 有害论](https://ruby-china.org/topics/29263) 
[A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model) 
[What is Trunk Based Development](http://paulhammant.com/2013/04/05/what-is-trunk-based-development) 
[Legacy App Rejuvenation](http://paulhammant.com/2013/03/11/legacy-app-rejuvenation)
[Feature Toggle](http://martinfowler.com/bliki/FeatureToggle.html) 
[Continuous Integration](http://www.martinfowler.com/articles/continuousIntegration.html) 
