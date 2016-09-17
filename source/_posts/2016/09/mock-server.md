---
title: 前端如何 Mock 数据
thumb: http://ww3.sinaimg.cn/large/7853084cgw1f7vttm4rr9j20dm0amt9i.jpg
cover: http://ww3.sinaimg.cn/large/7853084cgw1f7vueqesr5j21jk0uh446.jpg
tags:
  - code
date: 2016-09-16 23:02:10
---

前端在开发的阶段，往往依赖后端的接口，应该如何减少甚至摆脱这种依赖呢。

<!-- more -->

首先应该做的是前后端分离，这里说的仅仅是开发分离，至于发布分离就更好了，

但是会有坑，这里不展开说，毕竟只是考虑过，还没有实践过。

前后端分离的明显例子就是单页面应用，后端只需要在首次打开页面的时候返回基本的 `html` 文件，

用来加载 `js`, `css` 等静态资源(如果考虑首屏性能，可以考虑同构直出的方式)。

接下来后端就只提供接口，其他剩下的事由前端来处理，包括模板渲染、路由跳转。

那么，前端相对于后端只有接口的依赖，在开发阶段，只需要模拟接口数据，就可以不依赖后端进行开发了。


### Mock 的方式

前端模拟 API 数据方式有很多。

#### 手动模拟

最不用动脑的方式，在开发的时候，对于接口的调用，直接返回想要的数据，也就是写死数据，比如：

```js
let getData = (cb) => {
  // 在模拟的时候不走接口请求直接返回数据
  return cb && cb({a: 1})
  // 真实的请求
  http.get('/api/test', (res) => {
    cb && cb(res)
  })
}
```

这种方式基本没啥优点，在和后端联调的时候，必须把模拟的数据删除，当然你也可以做个封装加个开关，但是还是很不方便。

#### 重写 `Ajax`

如果你用 `Ajax` 请求服务器接口，可以考虑重写 `Ajax` 方法，代理到 mock server。

```js
let _ajax = $.ajax
$.ajax = option => {
  option['dataType'] = 'jsonp'

  if (option['url']) {
    let reg = /http[^\s]+com/i
    // 带域名的情况处理
    if (reg.test(option['url'])) {
      option['url'] = option['url'].replace(reg, '')
    }
    // 将 url 全都代理到 mock server
    option['url'] = 'http://mock-server/' + option['url']
  }

  option['type'] = 'GET'

  return _ajax(option)
}
```

这样只需要在本地开发的时候，引入这段重写 `Ajax` 方法的脚本，就可以在开发阶段将 `API` 请求全部代理到指定的服务器。

存在几个缺点：

1. 用这个方式的前提是，你应该有一个可以 mock 的服务，即调用 `API` 返回相应的数据。
2. 为了解决跨域，服务得支持 `jsonp`。
3. 所有 `Ajax` 请求都会被代理，也许我们存在部分请求不需要代理。

#### 使用 Webpack 代理

`Webpack` 功能强大，不仅仅可以作为 `bundler` 工具，还可以用来代理请求。

当然原理是启用了 `Node` 服务，作为中间代理。

我们看下如何使用：

```js webpack.dev.config.js
proxy: {
  '/api': {
    target: 'https://mock-server.com',
    secure: false
  }
}
```

以上，在开发模式下，就可以将带 `/api` 的请求代理到指定的服务器。

由于 `Webpack` 代理支持正则表达式，所以可以指定某些 `API` 使用代理，更多参数参考官网文档 [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html#proxy)。

由此，可以看到使用 `Webpack` 的方式，解决了使用 `Ajax` 的后两个缺点。

##### 注意点

当然使用 `Webpack` 还有需要注意的地方，也是我自己在使用的时候遇到的。

本地开发一般情况都是使用 `http://localhost:port`，当代理的服务器使用 `https` 的时候，
也就是 `http -> https` 的代理，这个时候需要设置 `agent` 参数。

可以参考我在 `github` 写的列子 [koa-react-boilerplate](https://github.com/xwartz/koa-react-boilerplate):

```js
proxy: {
  '/api': {
    target: 'https://api.github.com/',
    pathRewrite: { '^/api': '' },
    // http -> https 代理
    // see detail https://github.com/nodejitsu/node-http-proxy/blob/master/examples/http/proxy-http-to-https.js
    agent: https.globalAgent,
    headers: {
      host: 'api.github.com'
    }
  }
}
```

这是一个显示 `github` 用户 star 信息的例子，将 `/api` 请求代理到 `https://api.github.com/`。

关于更多的 `https -> http` 与 `https -> https` 可以参考 [node-http-proxy](https://github.com/nodejitsu/node-http-proxy#using-https)。


#### Nginx 代理

Nginx 的反向代理功能还是在现在的工作中使用了，才有所了解。

```json nginx.conf 
server {
  listen 80;
  # 把所有 uri 以 /api 开头的转发到接口服务器
  location /api {
    proxy_pass http://127.0.0.1:4000;
  }
}
```

Nginx 了解的并不是很多，就不展开讨论了，还望人指点。


### Mock Server

以上，说的都是如何模拟数据，方便本地开发，但是代理接口请求之后，还需要接受该请求的服务器。

所以一个完整的数据模拟，应该包含 Mock Server。

#### 可以使用的 Mock Server

存在很多服务，可以使用，有以下推荐：

1. [apiary](https://apiary.io/): 可以生成文档，但是非个人使用得付费。
2. [RAP](https://github.com/thx/RAP): 功能貌似很强大，阿里妈妈MUX团队出品。
3. [json-server](https://github.com/typicode/json-server): Node 编写，适合前端人员使用，但不能产生文档。

#### 构建 Mock Server

综上，有不少提供 mock 的服务，但还是无法完全满足自己的需求，我认为 Mock Server 应该包含以下几点功能：

1. 友好的交互界面
2. 录入/保存接口数据
3. 分项目存储接口数据，适合不同团队使用
4. 响应请求，返回相应数据
5. 生成接口文档，方便前后端查阅
6. 支持接口自动化测试
....

以上，准备自己撸一个 [Lula](https://github.com/xwartz/lula) 玩玩。

另外也可以关注下，下面列出的链接。

### 参考

[用于生成API的文档的方案总结](https://cnodejs.org/topic/567d612c435249f221f53a89)
[你是如何构建 Web 前端 Mock Server 的](https://www.zhihu.com/question/35436669)
[React 同构实践与思考](https://zhuanlan.zhihu.com/p/20669111?refer=purerender)
[json-server](https://github.com/typicode/json-server)
[apiary](https://apiary.io/)
[RAP](https://github.com/thx/RAP)
[Nginx 是前端工程师的好帮手](http://www.restran.net/2015/08/19/nginx-frontend-helper/)
[node-http-proxy](https://github.com/nodejitsu/node-http-proxy#using-https) 
[koa-react-boilerplate](https://github.com/xwartz/koa-react-boilerplate)
