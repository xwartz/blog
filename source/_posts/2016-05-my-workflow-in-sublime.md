---
title: 前端工程化之IDE搭建
date: 2016-05-01 18:06:39
tags: 前端工程
---


起了这么个题，其实主要是记录下自己最近常用的一些插件、工具。

最近在做代码重构，看到很多以前写的代码乱七八糟的，尤其是代码格式不统一规范，看起来特别累。

在做重构的时候，难免要更改很大一块代码，可能涉及到很多逻辑修改，这个时候没有好的IDE来支持，很容易出错而不知。

而且重构时，总想着把代码格式也统一一下，比较好看。所以决定好好搞搞开发环境，提高生产效率，减少低级错误。

这篇文章主要记录下，自己的正在使用的开发环境搭建。

<!--more-->

## 关于前端工程

关于软件工程的解释可以看维基百科的说明：[软件工程](https://zh.wikipedia.org/wiki/软件工程)。

**软件工程包括两种构面：软件开发技术和软件项目管理：**

> 软件开发技术：软件开发方法学、软件工具和软件工程环境
> 软件项目管理：软件度量、项目估算、进度控制、人员组织、配置管理、项目项目等。

上面是引用维基百科上的一段话，我主要讲下软件工具吧，工程环境应该算是项目的搭建了吧，比如：工程结构。

那么前端工程呢，前端其实提起工程化，应该是最近几年才流行的，以前大多都是被当成切图的了，或者设计师兼职？ 前端最近几年的社区活跃，牛人们搞出了各种框架、工具，使得前端可以做更多复杂的事。

由于我之前一直在开发单页面应用，其实早已感受到前端构建的复杂 web 应用，工程量不亚于一般的传统软件。因此，前端应该开始规范起来，思考怎么工程化。

好了，不再扯这些了，待更牛逼的时候，再扯扯...


## IDE搭建

### 编辑器选择

其实前端可用的编辑器还挺多的，我用过的就有这些，也算比较主流了，[Nodepad++](https://notepad-plus-plus.org/), [Atom](https://atom.io/), [VSCode](http://code.visualstudio.com/), [WebStorm](https://www.jetbrains.com/webstorm/), [Sublime](https://www.sublimetext.com/)。

`Nodepad++` 以前上 J2EE 课程的时候用过，后来几年一直没有用过了，
`Atom` 刚出来的时候就用上了，
`VSCode` 也是刚出来就马上用了下，和 `Atom` 一个毛病，就是用 `Electron` 编写的，性能上不行，打开大文件的时候会卡一会，曾经经常挂掉，
`WebStorm` 试用过一段时间，还是非常不错的，就是丑了些，还有费用需要年费... 所以到现在一直使用的就是 `Sublime` 了。

![WebStorm Features](./webstorm.png)

但是要说的上是IDE的话，感觉只有 [WebStorm](https://www.jetbrains.com/webstorm/) 算得上了，[VSCode](http://code.visualstudio.com/) 也还不错了，但是功能并没有那么强大。

关于 `WebStorm` 更多信息可以看下官方的 [features](https://www.jetbrains.com/webstorm/features/) 页面。如果你刚好喜欢 `Webstore` 的话，那就选择它吧，也就不需要后面那么多的折腾了。


### Sublime

关于怎么装插件的就不说了，插件都可以到这个页面搜索 <https://packagecontrol.io/>。
一些常用的插件，为了自己方便都在 [github](https://github.com/xwartz/Sublime-Backup) 上做了备份。

常用的有这些：`Emmet`, `DocBlockr`, `Git`, `GitGutter`, `Bracket Highlighter`, `Tag`, `Autocomplete`, `Color Highlighter`, `Reactjs` ...

### Editorconfig

为了让代码风格在不同IDE下保持一致，应该在项目目录下配置 [.editorconfig](http://editorconfig.org/)

这是一般常用的配置

```
# editorconfig.org

root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

```

### Lint

对于代码重构的话，肯定少不了 `lint`。目前比较流行的主要有 [JSLint](http://jshint.com/docs/) 和 [ESLint](http://eslint.org/)，我选择 `ESLint`，因为它更灵活，可配置性高，并且有社区活跃用户在维持。 

使用 `ESLint` 需要安装 [Node.js](http://nodejs.org/)，嗷，`Node.js` 6.0 已经支持93%(记得是)的特性了，
真棒！以后写 `Node.js` 可以少用 `Babel` 了。 
然后全局安装 `ESLint`, `npm i -g eslint`。那么已经可以在命令行里使用了。

要在 `Sublime` 中配置的话，需要安装插件 [SublimeLinter](https://packagecontrol.io/packages/SublimeLinter) 和 [SublimeLinter-contrib-eslint](https://github.com/roadhump/SublimeLinter-eslint), 
然后在对应的项目下创建 `eslintrc` Configuring 文件，配置自己的 `rules`, 具体可以看官方文档[user-guide](http://eslint.org/docs/user-guide/configuring)，然后代码就会得到 `lint` 提示了。


如果用的 `ES2015` 可以将 `syntax_map` 配置改为

```json
"javascript (babel)": "javascript",
```

总之还是应该多看官方文档，根据自己的项目情况去配置环境。

### Code Style

目前 `JavaScript` 的代码规范也有很多份，比较流行的有 [Google](https://google.github.io/styleguide/javascriptguide.xml), [AirBnb](https://github.com/airbnb/javascript), [Standard](https://github.com/feross/standard)。推荐选择 `Standard`，不喜欢写分号，以下是它的规则

#### [Rules](https://github.com/feross/standard#rules):

>- **2 spaces** – for indentation
>- **Single quotes for strings** – except to avoid escaping
>- **No unused variables** – this one catches *tons* of bugs!
>- **No semicolons** – [It's][1] [fine.][2] [Really!][3]
>- **Never start a line with `(` or `[`**
>  - This is the **only** gotcha with omitting semicolons – *automatically checked for you!*
>  - [More details][4]
>- **Space after keywords** `if (condition) { ... }`
>- **Space after function name** `function name (arg) { ... }`
>- Always use `===` instead of `==` – but `obj == null` is allowed to check `null || undefined`.
>- Always handle the node.js `err` function parameter
>- Always prefix browser globals with `window` – except `document` and `navigator` are okay
>  - Prevents accidental use of poorly-named browser globals like `open`, `length`,
    `event`, and `name`.
>- **And [more goodness][5]** – *give `standard` a try today!*


[1]: http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding
[2]: http://inimino.org/~inimino/blog/javascript_semicolons
[3]: https://www.youtube.com/watch?v=gsfbh17Ax9I
[4]: https://github.com/feross/standard/blob/master/RULES.md#semicolons
[5]: https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style

每次开始一个项目的时候，需要 `eslint --init`，然后选择 `Standard`，再安装一些依赖模块就 OK 了。

![sublime lint](./sublime.png)

还可以在 `github` 项目中很方便的加上它的 Logo 

![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg) 


### Over

好了，基本上的配置也就这些了，虽然还不够强大，毕竟对于js这种弱类型的语言静态分析没那么容易，希望有更好的IDE出现，希望 `VSCode` 的性能问题能搞定。

前端是个很杂的玩意，总是需要时间去积累，碰到了问题多看官方文档，多多使用谷歌，好在前端的社区足够活跃。

