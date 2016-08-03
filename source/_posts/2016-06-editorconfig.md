---
title: EditorConfig 介绍
date: 2016-06-19 23:47:10
tags:
  - 前端工程
  - EditorConfig
---

基础设施真的很重要，尤其是在经历了几个烂项目之后。

<!-- more -->

{% asset_img ill.png %}

### 前言

由于最近比较关注前端工程化方面的事，所以一直在想着怎么把代码写好，怎么把一个项目维护好。

以前一两个人干活的时候，没有觉得有什么问题，一个项目托管在 `git`，各自 `fork` 仓库修改提交 `merge`。

并不需要什么规范化，因为两个人的代码风格都差不多，都遵循一些公认的规范，也就不需要强制要求什么。

然而人多的时候，确实会是麻烦事，到处代码风格不一致，`tab`、空格混合用，强迫症总是会很不爽的想改成一致。

以上，所以想要开始规范起代码，规范流程，像一个工程应该有的样子。


### 什么是 EditorConfig

> 
EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs. 
The EditorConfig project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. 
EditorConfig files are easily readable and they work nicely with version control systems.

简单来说 `EditorConfig` 就是帮助开发者在不同的编辑器里统一代码格式的一套解决方案。


### EditorConfig 的配置文件是怎样的？

以下例子，`.editorconfig` 用来定义 `Python` 和 `JavaScript` 的尾行和缩进风格。

```
# EditorConfig is awesome: http://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,py}]
charset = utf-8

# 4 space indentation
[*.py]
indent_style = space
indent_size = 4

# Tab indentation (no size specified)
[Makefile]
indent_style = tab

# Indentation override for all JS under lib directory
[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```

更多示例 [那些使用 EditorConfig 的项目](https://github.com/editorconfig/editorconfig/wiki/Projects-Using-EditorConfig)

### 在哪存放 EditorConfig 文件

`EditorConfig` 插件会在打开文件的目录向上级目录查找 `.editorconfig` 文件，

直到有一个配置文件 `root=true`，所以配置一般会存放在项目根目录。

`EditorConfig` 配置文件从上往下读取，并且路径最近的文件最后被读取，所以最接近代码文件的属性优先级最高。

当然，一般一个项目也就一个配置文件

### 文件格式

`EditorConfig` 文件使用[INI格式](https://zh.wikipedia.org/wiki/INI%E6%96%87%E4%BB%B6)，为了可以与 [Python ConfigParser Library](https://docs.python.org/2/library/configparser.html) 兼容，
但是允许在 section names 中使用 'and'(不知道 section names 应该怎么翻译 )。
section names 是[全局]()https://en.wikipedia.org/wiki/Glob_(programming)文件路径，
类似于 [gitignore](http://manpages.ubuntu.com/manpages/intrepid/man5/gitignore.5.html#contenttoc2)。

> 
`/`: 路径分隔符
`#` or `;` 注释，注释应该独占一行。

`EditorConfig` 文件使用 UTF-8 格式、CRLF 或 LF 作为换行符。

#### 通配符

|  |  |
| --- | --- |
| `*` | 匹配除(/)之外的任意字符串 |
| `**` | 匹配任意字符串 |
| `?` | 匹配任意单个字符 |
| `[name]` | 匹配 name 字符 |
| `[!name]` | 匹配任意除了 name 外的字符 | 
| `{s1,s2,s3}` | 匹配任意给定的字符串 (version >= 0.11.0) |

特殊字符使用 `\` 转义。

#### 支持的属性

<p class="tip">并不是所有的属性都已经被编辑器插件支持了，具体查看 [wiki](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties) </p>


### 编辑器支持情况

具体查看官网 http://editorconfig.org/#download

### 参考

[EditorConfig](http://editorconfig.org/)
