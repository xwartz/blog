---
title: package.json 文档翻译
date: 2016-05-13 13:32:58
tags: 翻译
---

`npm` 文档翻译之 `package.json`, 原文链接 <https://docs.npmjs.com/files/package.json>

package.json(5)
===========================================================

## 说明

本文档包含所有的 `package.json` 文件配置说明。`package.json` 文件必须是真正的 `json` 对象，而不是 js 对象。

本文档中描述的很多行为受到 `npm-config(7)` 配置文件的影响。

## name

在 `package.json` 文件中最重要的配置就是 `name` 和 `version` 字段了。
如果没有这两个字段，讲无法被安装。
`name` 和 `version` 组成唯一的标识，所以每次更新都应更新 `version` 字段。

`name` 就是你这个包(项目)的名字。

遵循以下规则：

* 名字长度必须小于等于214个字符，包括括号。
* 名字不能以 `.` 和 `_` 开始。
* 新的包名不应该含有大写字母。
* 名字将会成为一段 `URL`， 命令行的参数 或者 一个文件名字，所以名字不应该包含任何 `non-URL-safe`的字符。

一些注意点:

* 不要使用 `Node` 的模块名
* 不要在名字中使用 `js` 和 `node` 字段, 包含 `package.json` 文件的包，自动被认为是 `js` 文件。你可以在 `engines` 字段里，指定引擎(比如：`Node`), 参加下文说明。
* 名字将会被用于 `require()` 参数, 因此名字应该短小易懂。
* 在使用名字之前，应该先去 <https://www.npmjs.com/> 检查下是否已经被注册了

可以在名字前加上 `scope` 前缀, 如：`@myorg/mypackage`. 具体查 `npm-scope(7)` 。

<!-- more -->

## version

版本号必须能被 [node-semver](https://github.com/isaacs/node-semver) 解析， 它是 `npm` 的一个依赖包。(`npm install semver` to use it yourself.)

更多关于版本号的说明查看 semver(7).

## description

写一段关于这个包的描述，有助于帮助人们在搜索 `npm search` 结果中发现它。

## keywords

关键字是一组字符串数组，有助于帮助人们在搜索 `npm search` 结果中发现它。

## homepage

项目的首页地址

## bugs

项目 bug 的反馈地址，或者邮件地址。
它应该是这个样子的：

```
{ "url" : "https://github.com/owner/project/issues"
  , "email" : "project@hostname.com"
}
```

可以提供地址或者邮件，或者只简单的提供字符串，而不需要如上的对象。

如果提供了url，使用 `npm bugs` 命令可以打开。


## license

你应该为你的项目指定 `license`，这样子，别人就知道使用这个项目的权限了。

如果使用的是一些通用的 `license` ，如：`BSD-2-Clause`,`MIT`。
只需要如下添加：

    `{ "license" : "BSD-3-Clause" }`

查看所有的 `SPDX license` [the full list of SPDX license IDs](https://spdx.org/licenses/).

推荐从这里获取一个(开源项目)
[OSI](https://opensource.org/licenses/alphabetical).

如果你的项目使用多种 `license` ，使用 [SPDX license
expression syntax version 2.0 string](https://npmjs.com/package/spdx), 如下方式：

    `{ "license" : "(ISC OR GPL-3.0)" }`

如果你使用的 `license` 并不在 `SPDX` 中，或者你自定义了，可以如下使用：

    `{ "license" : "SEE LICENSE IN <filename>" }`

`<filename>` 文件应在项目的根目录。


一些老的项目，使用如下的格式：

    // Not valid metadata
    { "license" :
      { "type" : "ISC"
      , "url" : "http://opensource.org/licenses/ISC"
      }
    }

    // Not valid metadata
    { "licenses" :
      [
        { "type": "MIT"
        , "url": "http://www.opensource.org/licenses/mit-license.php"
        }
      , { "type": "Apache-2.0"
        , "url": "http://opensource.org/licenses/apache2.0.php"
        }
      ]
    }

以上这些格式是被弃用的，应该使用 `SPDX` 格式， 如下：

    { "license": "ISC" }

    { "license": "(MIT OR Apache-2.0)" }

最终，如果你不希望授予别人使用的权力，使用如下：

    { "license": "UNLICENSED"}

应该考虑设置字段 `"private": true` 来阻止被意外 `publish`.

## people fields: author, contributors

"author" 是一个 `person` 对象，
"contributors" 是一个 `person` 对象数组。
"person" 是一个包含 "name", "url", "email" 的对象：

    { "name" : "Barney Rubble"
    , "email" : "b@rubble.com"
    , "url" : "http://barnyrubble.tumblr.com/"
    }

或者你可以使用如下简单字符串：

    "Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)"

"email" 和 "url" 是可选的。


`npm` 同样有 "maintainers" 字段来设置你的用户信息。


## files

"files" 字段是一个包含你项目文件的数组。
如果使用了文件夹，那么该文件夹下的文件将被包含(除非被其他规则忽略)。

你也可以在根目录创建 `.npmignore` 文件，来忽略某些文件。就像 `.gitignore`.

以下文件总是被包含在内：

* `package.json`
* `README`
* `CHANGES` / `CHANGELOG` / `HISTORY`
* `LICENSE` / `LICENCE`
* "main" 字段指定的文件

`README`, `CHANGES` & `LICENSE` 可以是任何文件.

相反, 下文件应该被忽略:

* `.git`
* `CVS`
* `.svn`
* `.hg`
* `.lock-wscript`
* `.wafpickle-N`
* `.*.swp`
* `.DS_Store`
* `._*`
* `npm-debug.log`
* `.npmrc`
* `node_modules`

## main

`main` 字段指定你程序的入口模块。
也就是说，如果你的包名是 `foo`, 一个用户安装了它, 并且
`require("foo")`, 然后你的 `main` 指定的文件，应该 `exports` 相应的模块。

这应该是一个相对于项目根目录的文件地址。

## bin

很多包都有一个或多个可执行文件被安装到 `PATH`。`npm` 可以很容易的实现这点(实际上，npm 就是使用的这个功能)。

使用该功能，需要在 `package.json` 中配置 `bin` 字段。安装时，`npm` 会自动建立起链接，全局安装被链接到 `prefix/bin` 目录, 局部安装的会被链接到 `./node_modules/.bin/` 目录。

举个例子:

    { "bin" : { "myapp" : "./cli.js" } }

当你安装时，将会创建一个链接，将 `cli.js` 链接到 `/usr/local/bin/myapp`。

如果你只有一个可执行命令，那么它的名字应该是包名，这样子你只需要使用字符串来调用。
如：

    { "name": "my-program"
    , "version": "1.2.5"
    , "bin": "./path/to/program" }

等同于:

    { "name": "my-program"
    , "version": "1.2.5"
    , "bin" : { "my-program" : "./path/to/program" } }

## man

指定一个文件或者文件数组供 `man` 程序使用。

如果只提供了一个单一文件，那么安装之后，只需要 `man <pkgname>`.  

例如:

    { "name" : "foo"
    , "version" : "1.2.3"
    , "description" : "A packaged foo fooer for fooing foos"
    , "main" : "foo.js"
    , "man" : "./man/doc.1"
    }

以上 `man foo` 将会链接到 `./man/doc.1`。

如果文件名不是以包名开头，将会被自动加上前缀。
像这样:

    { "name" : "foo"
    , "version" : "1.2.3"
    , "description" : "A packaged foo fooer for fooing foos"
    , "main" : "foo.js"
    , "man" : [ "./man/foo.1", "./man/bar.1" ]
    }

将会为 `man foo` 和 `man foo-bar` 创建文件。

`Man` 文件必须以数字结束，如果是压缩文件可以是 `.gz` 为后缀。

数字决定 `man` 哪个文件

    { "name" : "foo"
    , "version" : "1.2.3"
    , "description" : "A packaged foo fooer for fooing foos"
    , "main" : "foo.js"
    , "man" : [ "./man/foo.1", "./man/foo.2" ]
    }

以上将会创建 `man foo` 和 `man 2 foo`

## directories

CommonJS [Packages](http://wiki.commonjs.org/wiki/Packages/1.0)
说明了几种方式使用 `directories` 对象指明你的项目结构。

你可以在 [npm's package.json](https://registry.npmjs.org/npm/latest),
看到 `directories` 字段指定了 doc, lib, man.

在未来，这些信息将会有其他创造性的方式。

### directories.lib

Tell people where the bulk of your library is.  Nothing special is done
with the lib folder in any way, but it's useful meta info.

### directories.bin

If you specify a `bin` directory in `directories.bin`, all the files in
that folder will be added.

Because of the way the `bin` directive works, specifying both a
`bin` path and setting `directories.bin` is an error. If you want to
specify individual files, use `bin`, and for all the files in an
existing `bin` directory, use `directories.bin`.

### directories.man

A folder that is full of man pages.  Sugar to generate a "man" array by
walking the folder.

### directories.doc

Put markdown files in here.  Eventually, these will be displayed nicely,
maybe, someday.

### directories.example

Put example scripts in here.  Someday, it might be exposed in some clever way.

### directories.test

Put your tests in here. It is currently not exposed, but it might be in the
future.

## repository

指定你源代码的地址，这有助于别人提供贡献。如果提供的仓库地址是在 `GitHub` 上，`npm docs` 命令将会打开你的项目地址。

像这样:

    "repository" :
      { "type" : "git"
      , "url" : "https://github.com/npm/npm.git"
      }

    "repository" :
      { "type" : "svn"
      , "url" : "https://v8.googlecode.com/svn/trunk/"
      }

地址应该是公开的，能直接被 `VCS program` 读取。

For GitHub, GitHub gist, Bitbucket, or GitLab repositories you can use the same
shortcut syntax you use for `npm install`:

    "repository": "npm/npm"

    "repository": "gist:11081aaa281"

    "repository": "bitbucket:example/repo"

    "repository": "gitlab:another/repo"

## scripts

"scripts" 字段包含项目的生命周期命令，是个 hash 对象。
`key` 是生命周期事件，`value` 是执行的命令。

详情查看 `npm-scripts(7)`.

## config

A "config" object can be used to set configuration parameters used in package
scripts that persist across upgrades.  For instance, if a package had the
following:

    { "name" : "foo"
    , "config" : { "port" : "8080" } }

and then had a "start" command that then referenced the
`npm_package_config_port` environment variable, then the user could
override that by doing `npm config set foo:port 8001`.

See `npm-config(7)` and `npm-scripts(7)` for more on package
configs.

## dependencies

"Dependencies" 表示这个项目的依赖，包括依赖的项目的名称，版本号。

**Please do not put test harnesses or transpilers in your
`dependencies` object.**  See `devDependencies`, below.

See semver(7) for more details about specifying version ranges.

* `version` Must match `version` exactly
* `>version` Must be greater than `version`
* `>=version` etc
* `<version`
* `<=version`
* `~version` "Approximately equivalent to version"  See semver(7)
* `^version` "Compatible with version"  See semver(7)
* `1.2.x` 1.2.0, 1.2.1, etc., but not 1.3.0
* `http://...` See 'URLs as Dependencies' below
* `*` Matches any version
* `""` (just an empty string) Same as `*`
* `version1 - version2` Same as `>=version1 <=version2`.
* `range1 || range2` Passes if either range1 or range2 are satisfied.
* `git...` See 'Git URLs as Dependencies' below
* `user/repo` See 'GitHub URLs' below
* `tag` A specific version tagged and published as `tag`  See `npm-tag(1)`
* `path/path/path` See [Local Paths](#local-paths) below

For example, these are all valid:

    { "dependencies" :
      { "foo" : "1.0.0 - 2.9999.9999"
      , "bar" : ">=1.0.2 <2.1.2"
      , "baz" : ">1.0.2 <=2.3.4"
      , "boo" : "2.0.1"
      , "qux" : "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0"
      , "asd" : "http://asdf.com/asdf.tar.gz"
      , "til" : "~1.2"
      , "elf" : "~1.2.3"
      , "two" : "2.x"
      , "thr" : "3.3.x"
      , "lat" : "latest"
      , "dyl" : "file:../dyl"
      }
    }

### URLs as Dependencies

You may specify a tarball URL in place of a version range.

This tarball will be downloaded and installed locally to your package at
install time.

### Git URLs as Dependencies

Git urls can be of the form:

    git://github.com/user/project.git#commit-ish
    git+ssh://user@hostname:project.git#commit-ish
    git+ssh://user@hostname/project.git#commit-ish
    git+http://user@hostname/project/blah.git#commit-ish
    git+https://user@hostname/project/blah.git#commit-ish

The `commit-ish` can be any tag, sha, or branch which can be supplied as
an argument to `git checkout`.  The default is `master`.

## GitHub URLs

As of version 1.1.65, you can refer to GitHub urls as just "foo":
"user/foo-project".  Just as with git URLs, a `commit-ish` suffix can be
included.  For example:

    {
      "name": "foo",
      "version": "0.0.0",
      "dependencies": {
        "express": "visionmedia/express",
        "mocha": "visionmedia/mocha#4727d357ea"
      }
    }

## Local Paths

As of version 2.0.0 you can provide a path to a local directory that contains a
package. Local paths can be saved using `npm install -S` or
`npm install --save`, using any of these forms:

    ../foo/bar
    ~/foo/bar
    ./foo/bar
    /foo/bar

in which case they will be normalized to a relative path and added to your
`package.json`. For example:

    {
      "name": "baz",
      "dependencies": {
        "bar": "file:../foo/bar"
      }
    }

This feature is helpful for local offline development and creating
tests that require npm installing where you don't want to hit an
external server, but should not be used when publishing packages
to the public registry.

## devDependencies

"devDependencies" 开发环境的依赖。
别人使用你的模块，并不需要下载你的测试或者文档依赖。所以最好将你的开发依赖放在这个下面。

这些依赖将会被安装，当执行 `npm link` 或者 `npm install`.
详情看 `npm-config(7)` .

对于非特定平台的构建，例如使用 coffeescript 或者其他需要编译到 js 的语言，使用
 `prepublish` 脚本去做，并把依赖的包配置到 "devDependency".

例如:

    { "name": "ethopia-waza",
      "description": "a delightfully fruity coffee varietal",
      "version": "1.2.3",
      "devDependencies": {
        "coffee-script": "~1.6.3"
      },
      "scripts": {
        "prepublish": "coffee -o lib/ -c src/waza.coffee"
      },
      "main": "lib/waza.js"
    }


`prepublish` 脚本会在 `publishing` 之前执行。
这样子用户就不需要去编译他们了。在本地你可以使用 `npm install` 安装这些依赖，可以轻松的得到测试。

## peerDependencies

In some cases, you want to express the compatibility of your package with a
host tool or library, while not necessarily doing a `require` of this host.
This is usually referred to as a *plugin*. Notably, your module may be exposing
a specific interface, expected and specified by the host documentation.

For example:

    {
      "name": "tea-latte",
      "version": "1.3.5",
      "peerDependencies": {
        "tea": "2.x"
      }
    }

This ensures your package `tea-latte` can be installed *along* with the second
major version of the host package `tea` only. `npm install tea-latte` could
possibly yield the following dependency graph:

    ├── tea-latte@1.3.5
    └── tea@2.2.0

**NOTE: npm versions 1 and 2 will automatically install `peerDependencies` if
they are not explicitly depended upon higher in the dependency tree. In the
next major version of npm (npm@3), this will no longer be the case. You will
receive a warning that the peerDependency is not installed instead.** The
behavior in npms 1 & 2 was frequently confusing and could easily put you into
dependency hell, a situation that npm is designed to avoid as much as possible.

Trying to install another plugin with a conflicting requirement will cause an
error. For this reason, make sure your plugin requirement is as broad as
possible, and not to lock it down to specific patch versions.

Assuming the host complies with [semver](http://semver.org/), only changes in
the host package's major version will break your plugin. Thus, if you've worked
with every 1.x version of the host package, use `"^1.0"` or `"1.x"` to express
this. If you depend on features introduced in 1.5.2, use `">= 1.5.2 < 2"`.

## bundledDependencies

This defines an array of package names that will be bundled when publishing
the package.

In cases where you need to preserve npm packages locally or have them
available through a single file download, you can bundle the packages in a
tarball file by specifying the package names in the `bundledDependencies`
array and executing `npm pack`.

For example:

If we define a package.json like this:

```
{
  "name": "awesome-web-framework",
  "version": "1.0.0",
  "bundledDependencies": [
    'renderized', 'super-streams'
  ]
}
```
we can obtain `awesome-web-framework-1.0.0.tgz` file by running `npm pack`.
This file contains the dependencies `renderized` and `super-streams` which
can be installed in a new project by executing `npm install
awesome-web-framework-1.0.0.tgz`.

If this is spelled `"bundleDependencies"`, then that is also honored.

## optionalDependencies

If a dependency can be used, but you would like npm to proceed if it cannot be
found or fails to install, then you may put it in the `optionalDependencies`
object.  This is a map of package name to version or url, just like the
`dependencies` object.  The difference is that build failures do not cause
installation to fail.

It is still your program's responsibility to handle the lack of the
dependency.  For example, something like this:

    try {
      var foo = require('foo')
      var fooVersion = require('foo/package.json').version
    } catch (er) {
      foo = null
    }
    if ( notGoodFooVersion(fooVersion) ) {
      foo = null
    }

    // .. then later in your program ..

    if (foo) {
      foo.doFooThings()
    }

Entries in `optionalDependencies` will override entries of the same name in
`dependencies`, so it's usually best to only put in one place.

## engines

可以指定特殊的 `Node` 版本:

    { "engines" : { "node" : ">=0.10.3 <0.12" } }

And, like with dependencies, if you don't specify the version (or if you
specify "\*" as the version), then any version of node will do.

If you specify an "engines" field, then npm will require that "node" be
somewhere on that list. If "engines" is omitted, then npm will just assume
that it works on node.

You can also use the "engines" field to specify which versions of npm
are capable of properly installing your program.  For example:

    { "engines" : { "npm" : "~1.0.20" } }

Unless the user has set the `engine-strict` config flag, this
field is advisory only will produce warnings when your package is installed as a dependency.

## engineStrict

**This feature was removed in npm 3.0.0**

Prior to npm 3.0.0, this feature was used to treat this package as if the
user had set `engine-strict`. It is no longer used.

## os

你可以指定模块运行的系统:

    "os" : [ "darwin", "linux" ]

你也可以使用黑名单来替代，只需要加 '!' 来排除:

    "os" : [ "!win32" ]

The host operating system is determined by `process.platform`

It is allowed to both blacklist, and whitelist, although there isn't any
good reason to do this.

## cpu

If your code only runs on certain cpu architectures,
you can specify which ones.

    "cpu" : [ "x64", "ia32" ]

Like the `os` option, you can also blacklist architectures:

    "cpu" : [ "!arm", "!mips" ]

The host architecture is determined by `process.arch`

## preferGlobal

如果你的包是主要是一个命令行应用，那应该被全局安装。你可以设置 `preferGlobal` 为 `true`, 来发出提醒，当被局部安装的时候。

当然它不会强制组织用户局部安装，但是它可以帮助消除误会。

## private

如果你在 `package.json` 中设置 `"private": true`, `npm` 会阻止它被 `publish`.

这是一个有效防止意外发布私有仓库的方式。

如果你的包是要发布到指定的 `registry`(例如，公司内部搭建的 github), 你应该使用
`publishConfig`。

## publishConfig

This is a set of config values that will be used at publish-time. It's
especially handy if you want to set the tag, registry or access, so that
you can ensure that a given package is not tagged with "latest", published
to the global public registry or that a scoped module is private by default.

Any config values can be overridden, but of course only "tag", "registry" and
"access" probably matter for the purposes of publishing.

See `npm-config(7)` to see the list of config options that can be
overridden.

## DEFAULT VALUES

`npm` 默认的一些值.

* `"scripts": {"start": "node server.js"}`

  If there is a `server.js` file in the root of your package, then npm
  will default the `start` command to `node server.js`.

* `"scripts":{"install": "node-gyp rebuild"}`

  If there is a `binding.gyp` file in the root of your package and you have not defined an `install` or `preinstall` script, npm will
  default the `install` command to compile using node-gyp.

* `"contributors": [...]`

  If there is an `AUTHORS` file in the root of your package, npm will
  treat each line as a `Name <email> (url)` format, where email and url
  are optional.  Lines which start with a `#` or are blank, will be
  ignored.

## SEE ALSO

* [semver(7)](https://docs.npmjs.com/misc/semver)
* [npm-init(1)](https://docs.npmjs.com/cli/init)
* [npm-version(1)](https://docs.npmjs.com/cli/version)
* [npm-config(1)](https://docs.npmjs.com/cli/config)
* [npm-config(7)](https://docs.npmjs.com/misc/config)
* [npm-help(1)](https://docs.npmjs.com/cli/help)
* [npm-install(1)](https://docs.npmjs.com/cli/install)
* [npm-publish(1)](https://docs.npmjs.com/cli/publish)
* [npm-uninstall(1)](https://docs.npmjs.com/cli/uninstall)
