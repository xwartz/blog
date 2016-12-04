---
title: 为 React Native 应用写测试 I
thumb: http://ww1.sinaimg.cn/large/006tNc79gw1faf5pk46qvj30w80w8ju7.jpg
cover: http://ww4.sinaimg.cn/large/006tNc79gw1faf5ob4bucj31gs0z7wgr.jpg
date: 2016-11-18 20:58:41
tags:
  - code
  - react-native
  - testing
---

这会是一系列的文章，来介绍如何为 React Native App 写测试(包括 Unit Testing 和 Functional Testing)以及遇到的一些坑。

<!-- more -->

使用 React Native 开发有一些日子了，最近在补一些单元测试，赶产品留下的技术债...

这是 [<为 React Native 应用写测试>](/blog/tags/react-native) 的系列文章的第一篇，希望能保持更新吧。

这篇主要会集中在 `Action` 和 `Reducer` 层的单元测试编写。

注意：*以下涉及到的 React Native 版本为 0.36，官方版本推进很快，最新可能出现偏差。*

### 环境搭建

我们选用了 [`Jest`](https://facebook.github.io/jest/) 来编写，似乎也没有其他什么可选择的了，毕竟都是 FB 家的，而且官方推荐，值得信赖。

基本的配置看[官方文档](https://facebook.github.io/jest/docs/tutorial-react-native)即可。

这里有点需要注意的地方，就是当你在代码中使用了 `@providesModule` 在 `package.json` 文件中需要以下配置:

```json
"jest": {
    "preset": "jest-react-native",
    "haste": {
      "defaultPlatform": "ios",
      "platforms": [
        "android",
        "ios"
      ],
      "providesModuleNodeModules": [
        "react",
        "react-native"
      ]
    }
  },
```

### Mock

在为 React Native 写测试代码中最麻烦的事，就是要不停的 `mock`。

这里的 `mock` 涉及到两方面：普通的数据 mock 和 mock module。

数据 mock 很好理解，比如 A 函数 `const A = (a) =>  a + 1`，写测试时，只需要 mock 一下 a 即可。

`mock module` 是什么呢？

因为写 RN 项目时，会引入一些第三方组件，而那些组件可能涉及到了 `native` 层代码，`Jest` 环境并不能执行该代码，所以只能通过 mock 的方式。

例如，项目中使用了 `jpush-react-native`，可以如下方式 mock:

```js
jest.mock('jpush-react-native', () => ({
  getDeviceLocale: () => 'zh-CN',
  getUniqueID: () => 'deviceToken',
  getReadableVersion: () => '1.0',
  getSystemVersion: () => '10.0.0',
  ...
}))
```

总的来说，mock 其实也还算挺方便的，具体可以参考[文档](https://facebook.github.io/jest/docs/tutorial-react-native#mock-native-modules-using-jestmock)。

此外，涉及到网络请求的也需要 mock 一下，这里推荐 [nock](https://github.com/node-nock/nock)，后面会讲如何使用，以及一些坑。

### Redux

为了方便管理状态，项目中引入了 [`Redux`](https://github.com/reactjs/redux)，需要对此相关做单元测试。

#### Action Creators

同步 `Action` 的测试非常简单，因为就是纯函数测试，直接拿[官方例子](https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md#action-creators)：

```js
export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  }
}
```

测试编写：

```js
import * as actions from '../../actions/TodoActions'
import * as types from '../../constants/ActionTypes'

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: types.ADD_TODO,
      text
    }
    expect(actions.addTodo(text)).toEqual(expectedAction)
  })
})
```

#### Async Action Creators

异步 action 通常会使用 [redux-thunk](https://github.com/gaearon/redux-thunk) 或者其他一些 `middleware`，所以需要 mock 一下 store，推荐 [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store)。

另外，对于网络请求，你需要 mock server 或者使用 [nock](https://github.com/node-nock/nock) 来 mock 。

除此之外，在 RN 中，`fetch` 使用的是 [whatwg-fetch](https://github.com/github/fetch)，并且 `XMLHttpRequest` 是在[底层](https://github.com/facebook/react-native/blob/master/Libraries/Network/XMLHttpRequest.js) 自己封装的。

在 `Jest` 中无法使用，`Jest` 执行环境是 `Nodejs`，所以还需要 `mock` 一下。

`__mocks__/fetch.js`

```js
/**
 * @providesModule __mocks__/fetch
 */

import nodeFetch from 'node-fetch'

// Mocking the global.fetch included in React Native
global.fetch = nodeFetch
```

`__mocks__/xhr.js`

```js
/**
 * @providesModule __mocks__/xhr
 */

import xmlhttprequest from 'xmlhttprequest'
jest.mock('XMLHttpRequest', () => xmlhttprequest.XMLHttpRequest)
```

注意：这里使用 `jest.mock` 是因为在 RN [XMLHttpRequest.js](https://github.com/facebook/react-native/blob/master/Libraries/Network/XMLHttpRequest.js#L9) 中，注册了 `@providesModule XMLHttpRequest`，然后各种 `import XMLHttpRequest from XMLHttpRequest` 引入使用，而 fetch 是当做全局对象使用的。

所以 `store` 可能是这样子的：

`redux-mock-store.js`

```js
/**
 * @providesModule __mocks__/redux-mock-store
 */

require('__mocks__/fetch')
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import reducers from 'store/reducers'

const middlewares = [thunk]

export const initStore = configureMockStore(middlewares)
export default initStore(reducers({}, { type: '__mocks__' }))
```

接下来，我们就可以按照 `Redux` 官方文档来写[异步 action 的测试](https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md#async-action-creators)了。

#### Reducers

将 `Action` 和 `Reducer` 独立出来写单元测试之后，`Reducer` 的测试就变得很简单了，直接按照[官方例子](https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md#reducers)来写就 OK 了。

### 参考

<https://facebook.github.io/jest/docs/tutorial-react-native>
<https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md>
<https://github.com/gaearon/redux-thunk>
<https://github.com/arnaudbenard/redux-mock-store>
<https://github.com/node-nock/nock>
<https://github.com/bitinn/node-fetch>
<https://github.com/driverdan/node-XMLHttpRequest>
