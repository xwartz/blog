---
title: 重来：搭建开发环境
date: '2018-10-24'
spoiler: 从一台新 Mac 开始搭建开发环境的一些经验
tags: ['tools', 'code']
---

最近抹除磁盘，重装了 macOS 系统，重新搞了一遍开发环境，准备只装一些必备软件，优化一些配置，顺便把这些过程记录下来。

### 必装的开发软件

身为一个开发者，都有一些必装的软件

#### XCode
[XCode](https://developer.apple.com/xcode/) 不必多说，从 AppStore 安装即可

#### Android studio
[Android studio](https://developer.android.com/studio) 从官网下载安装，并且下载安装好 [JDK](https://www.oracle.com/technetwork/java/javase/downloads/jdk13-downloads-5672538.html)

#### VSCode
[VSCode](https://code.visualstudio.com/) 如今已经成为前端最流行的编辑器，性能也已经大大的改善，拥有丰富的插件，安装方便，是时候从其 sublime 切换过来了

**常用插件：**
- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)：同步 VSCode settings 到 GitHub Gist，方便以后恢复配置
- [.gitignore Generator](https://marketplace.visualstudio.com/items?itemName=piotrpalarz.vscode-gitignore-generator)：告别手动创建各种 .gitignore 文件
- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)：查看文件提交历史
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)：一眼查看代码提交的作者
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)：自动补全文件名
- [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)：代码提示，提高写代码效率和准确性
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)：英文拼写检测，避免命名错误
- [Highlight](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-highlight)：高亮 TODO
- [Indenticator](https://marketplace.visualstudio.com/items?itemName=SirTori.indenticator)：高亮当前光标
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)：Markdown all in one
- [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)：typescript 自动导入方法
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [colorize](https://marketplace.visualstudio.com/items?itemName=kamikillerto.vscode-colorize)
- [codedox](https://marketplace.visualstudio.com/items?itemName=wiggin77.codedox)：JSDoc-style comments for Haxe
- [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)：TSLint support for Visual Studio Code
- [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

**从命令行启动**

Open the Command Palette (⇧⌘P) and type 'shell command' to find the Shell Command: Install 'code' command in PATH command.

**设置 hack 字体**

为了代码字体看得更舒服一点，将 VSCode 字体设置为 [Hack](https://github.com/source-foundry/Hack)

### git

不敢相信开发者电脑上没有 git

#### V2RayX

翻墙必备软件 [V2RayX](https://github.com/Cenmrev/V2RayX)，可导出备份配置文件

手机版推荐 Quantumult

#### Chrome

不仅仅 debug 需要，更有各种便捷插件，提升效率

#### Postman

为了不给后端背锅，先看接口返回是否正确

#### SourceTree

有时候为了提交某几个文件、某几行代码，使用 SourceTree 会很方便

### 命令行

**漂亮的命令行 iTerm2**

![](./agnoster.png)

要实现如上图的命令行效果，需要安装 [iTerm2 + Oh My Zsh + Solarized color scheme + Source Code Pro Powerline + Font Awesome](https://gist.github.com/kevin-smets/8568070)

**增强命令行**

1. [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
2. [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)
3. [AutoJump](https://github.com/wting/autojump)
4. [Tig: text-mode interface for Git](https://github.com/jonas/tig)

配置好 iTerm2 后，将 [preferences](https://www.iterm2.com/documentation-preferences-general.html#Preferences) 导出并备份到 GitHub，以后可以恢复回来

我的配置：https://github.com/xwartz/iterm2-preferences

### 提高效率的工具

把时间花在刀刃上

1. [Homebrew](https://brew.sh/)
2. [Alfred](https://www.alfredapp.com/)
3. [Archiver](https://archiverapp.com/)
4. [Notion](https://www.notion.so/)
5. [Scapple](https://www.literatureandlatte.com/scapple/overview)
6. [搜狗输入法](https://pinyin.sogou.com/mac/)

### 提升幸福感的软件

一些优秀的软件给人惊喜，不知不觉给人幸福感

1. [1password](https://1password.com/)
2. [pap.er](https://paper.meiyuan.in/)
3. [Karabiner-Elements](https://pqrs.org/osx/karabiner/)
4. [Flux](https://justgetflux.com/)
5. [Fliqlo](https://fliqlo.com/)

