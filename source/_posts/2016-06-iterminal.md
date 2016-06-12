---
title: 配置 Mac 终端
date: 2016-06-12 23:36:59
tags:
  - iterm
---

{% asset_img iterm.png %}

每天要对着命令行，当然得搞的漂亮点才行。

专为自己折腾下命令行。


<!-- more -->


## iTerm2

用 Mac 的不装一个对不起自己，关于 iTerm2 的 [Features](http://www.iterm2.com/features.html)。

### Solarized

一款 `iTerm2` 的颜色主题，下载安装查看[链接](https://github.com/altercation/solarized/tree/master/iterm2-colors-solarized)。

## Oh my zsh

>Oh My Zsh is a way of life! Once installed, your terminal prompt will become the talk of the town or your money back! Each time you interact with your command prompt, you'll be able to take advantage of the hundreds of bundled plugins and pretty themes. Strangers will come up to you in cafés and ask you, "that is amazing. are you some sort of genius?" Finally, you'll begin to get the sort of attention that you always felt that you deserved. ...or maybe you'll just use the time that you saved to start flossing more often.

详情查看仓库[oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)。

### agnoster

帅气的 `Oh my zsh` 主题，尤其是箭头，人群中多看了一眼，就用了1年多。

** 使用：编辑 `~/.zshrc`, 设置 `ZSH_THEME="agnoster"`。**

更多主题查看 [themes](https://github.com/robbyrussell/oh-my-zsh/wiki/External-themes)。

### Powerline fonts

想达到我上图的效果，还需要装字体才行。

下载安装字体 [Meslo](https://github.com/powerline/fonts/blob/master/Meslo/Meslo%20LG%20M%20DZ%20Regular%20for%20Powerline.otf) 之后，打开 `iTerm2` 的偏好设置字体(iTerm -> preferences -> profiles -> text)。

把下面两个地方都换成 `Menlo` 字体

* Regular Font -> "Change Font"

* Non-ASCII Font -> "Change Font"

## Shorter prompt style

隐藏命令行中的用户名 `user@hostname`，有时候名字很长总是不爽，而且截图会泄露信息。

编辑 `~/.zshrc`, 设置 `DEFAULT_USER` 为 `whoami` 命令的输出结果。


---


参考 [iterm2-solarized.md](https://gist.github.com/kevin-smets/8568070)
