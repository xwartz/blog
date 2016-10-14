---
title: 在 Mac 中安装 CocoaPods
date: 2016-10-14 23:45:00
thumb: http://ww4.sinaimg.cn/large/65e4f1e6gw1f8s8sp6ydrj20b40b43yp.jpg
cover: http://ww3.sinaimg.cn/large/65e4f1e6gw1f8s8okwbjzj20m80cigq0.jpg
tags:
  - code
---

CocoaPods 为 iOS 程序提供依赖管理的工具，类似 Node.js 的 npm 。

<!-- more -->

最近要开始搞 [react-native](https://github.com/facebook/react-native)，安装 [CocoaPods](https://github.com/CocoaPods/CocoaPods) 时，遇到点麻烦，所以记录一下。

执行 `sudo gem install cocoapods` 命令时，报了如下错误：

```
ERROR: Error installing cocoapods: 
activesupport requires Ruby version >= 2.2.2.
```

ruby 版本太低了，查看当前 `ruby -v` 版本： `ruby 2.0.0p648 (2015-12-16 revision 53162) [universal.x86_64-darwin15] `。

### 升级 ruby 版本

安装 rvm:

```
curl -L get.rvm.io | bash -s stable
source ~/.rvm/scripts/rvm
```

安装 ruby 版本:

```
rvm list known
rvm install ruby-2.3.0
```

继续报错

```
Error running ‘requirements_osx_brew_update_system ruby-2.2.2’, 
showing last 15 lines of /Users/jolie/.rvm/log/1471244386_ruby-2.2.2/update_system.log 
https://github.com/Homebrew/homebrew/wiki/Common-Issues 
and make sure brew update works before continuing.’
```

ok，`homebrew` 需要升级，我先卸载了，反正会再次被安装的。

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
```

使用 ruby 2.3.0

```
# 查看已安装版本
rvm list
# 删除已安装版本
rvm remove 2.0.0
# 设置默认版本
rvm install ruby-2.3.0
rvm use 2.3.0 --default
```

### 安装 CocoaPods

为了加速安装速度，更换 gem 源。

```
# 查看源
gem sources
# 删除已有的源
gem sources -r http://rubygems.org/
# 更换为 ruby-china 的源
gem sources -a https://gems.ruby-china.org/
```

安装 

```
sudo gem install cocoapods
```

### 参考

[用CocoaPods做iOS程序的依赖管理](http://blog.devtang.com/2014/05/25/use-cocoapod-to-manage-ios-lib-dependency/)
[关于安装cocoapods遇到的一些坑（ERROR: Error installing cocoapods: activesupport requires Ruby version >= 2.2）](http://blog.csdn.net/fairytale_1/article/details/51850734)
[iOS CocoaPods 安装笔记](http://www.jianshu.com/p/32d9cfb91471)
