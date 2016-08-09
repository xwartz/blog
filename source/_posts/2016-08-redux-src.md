---
title: Redux 解析
date: 2016-08-09 15:29:18
tags:
  - code
---

Redux 为 JavaScript 应用提供可预测化的状态管理。

<!-- more -->

### 原理

使用 `Redux` 之后，数据的流向可以使用下图来表示：

![flow](./flow.gif)


从上图我们可以看到清晰的数据流向: `View` 触发数据更新 ---> `Actions` 将数据传递到 `Store` ---> `Store` 更新 `state`。

`Redux` 中整个应用的状态存储在一颗 `object tree` 中，对应一个唯一的 `Store`，并且 `state` 是只读的，使用纯函数 `reducer` 来更新 `state` 会生成一个新的 `state` 而不是直接修改原来的。`Redux` 通过以上约束试图让 `state` 的变化变得可预测。


### 源码分析

`Redux` 的源码非常少，但是却能实现这样的功能，非常值得阅读学习，就像 `TJ` 写的 `co` 一样。

但是 `Redux` 的源码并不是非常容易理解的，包含很多闭包和高阶函数的使用导致理解起来有点绕。

了解了原理之后，对 `Redux` 源码的分析，就简单许多。

源码结构：

```
.
├── applyMiddleware.js
├── bindActionCreators.js
├── combineReducers.js
├── compose.js
├── createStore.js
├── index.js
└── utils
    └── warning.js

```

#### index.js

从入口文件 `index.js` 开始，删除了部分 `warning` 代码

```js

import createStore from './createStore'
import combineReducers from './combineReducers'
import bindActionCreators from './bindActionCreators'
import applyMiddleware from './applyMiddleware'
import compose from './compose'

export {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose
}

```

从上面可以看出，`Redux` 暴露的顶层 `API` 就只有 4 个。接下来分析每个 `API` 。

#### createStore.js

用来创建 `store`，其中暴露 `dispatch`, `subscribe`, `getState`, `replaceReducer` 方法。

```js
/**
 * 初始化时，默认传递的 action，默认也应该返回初始化的 state
 */
export var ActionTypes = {
  INIT: '@@redux/INIT'
}

/**
 * 创建 store, 参数根 reducer, state 以及中间件
 */
export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    return enhancer(createStore)(reducer, preloadedState)
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  var currentReducer = reducer
  var currentState = preloadedState
  var currentListeners = []
  var nextListeners = currentListeners
  var isDispatching = false

  // 去除引用
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  /**
   * Reads the state tree managed by the store.
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState
  }

  // 订阅事件，返回移除订阅函数，巧妙的利用了闭包
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    var isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      var index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  // 执行 reducer，并触发订阅事件
  function dispatch(action) {
    // https://lodash.com/docs#isPlainObject
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      )
    }

    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      )
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      // 产生新的 state
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    // 触发订阅的事件
    var listeners = currentListeners = nextListeners
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]()
    }

    return action
  }

  /**
   * 动态替换 reducer
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer
    dispatch({ type: ActionTypes.INIT })
  }

  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer
  }
}
```

### combineReducers.js

`combineReducers` 用于拆分 `reducer`，拆分后的每一块独立负责管理 `state` 的一部分，方便管理复杂的应用。

`combineReducers` 返回一个函数可以将传入的 `reducers` 都调用一遍合成一个大的 `state`。

比如有 `reducer`: r1, r2, r3; 
将 `{ r1, r2, r3 }` 传入 `combineReducers` 将返回一个可以产生这样的 `state`: `{ r1: {}, r2: {}, r3: {} }`  的函数。

其中很长一段代码都是对 `reducers` 健壮性的检测，这里只需要分析下 `combineReducers` 函数的实现，一些代码已经删除掉了。

```js

export default function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers)
  // 将 reducers 存储在一个对象中
  var finalReducers = {}
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i]
    
    ... 省略 `reducer` 的合理性检测

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }

  var finalReducerKeys = Object.keys(finalReducers)

  ...省略 `reducer` 的不合理的处理
  
  return function combination(state = {}, action) {
  
    var hasChanged = false
    var nextState = {}
    // 遍历调用 reducers，产生一个大的 state，key 和 reducer 名对应 
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i]
      var reducer = finalReducers[key]
      var previousStateForKey = state[key]
      var nextStateForKey = reducer(previousStateForKey, action)
      
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}

```

#### bindActionCreators.js

类似 `combineReducers`, `bindActionCreators` 函数把 `action creators` 转成拥有同名 `keys` 的对象，
并使用 `dispatch` 把每个 `action creator` 包装起来，这样在调用 `action` 时可以直接调用 `dispatch`。

也就是说不需要将 `dispatch` 手动传入到子组件中了。

```js
// 在 action 外部包装一层 dispatch
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args))
}

export default function bindActionCreators(actionCreators, dispatch) {
  // 如果是函数，这种情况一般就只有一个 action
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  ...

  // 遍历 actions ，包装一层 dispatch
  var keys = Object.keys(actionCreators)
  var boundActionCreators = {}
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}

```

#### compose.js

`compose` 的作用是从右到左来组合多个函数，不使用深度右括号的情况下来写深度嵌套的函数，内部实现其实就是一个 `reduceRight`。

比如 `a(b(c()))` 可以这样写 `compose(a,b,c)`。

```js

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  // 关于 reduceRight, 查看 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
}

```

#### applyMiddleware.js

`applyMiddleware` 函数返回一个应用了 `middleware` 后的 `store enhancer`。
这个 `store enhancer` 就是一个函数，并且需要应用到 `createStore`。
它会返回一个应用了 `middleware` 的新的 `createStore`。


```js
import compose from './compose'

export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer)
    var dispatch = store.dispatch
    var chain = []

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```


### Over

`Redux` 的作用是来管理 `state`，是状态的改变可控，也就是 `state` 在什么时候，由于什么原因如何变化，都可以方便的查找到。
