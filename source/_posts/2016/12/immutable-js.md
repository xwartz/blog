---
title: Immutable.js 笔记
thumb: http://ww2.sinaimg.cn/large/006tNbRwgw1fb5sl7evruj305k05k74b.jpg
cover: http://ww4.sinaimg.cn/large/006tNbRwgw1fb5sv7ljvsj30h80ac0ua.jpg
date: 2016-12-27 23:46:37
tags:
  - code
  - Immutable.js
---

Immutable.js 使用笔记。

<!-- more -->

所有涉及到的方法都可以在[官方文档](https://facebook.github.io/immutable-js/docs)查到，只是官方文档晦涩难懂。

查看转化后的 JavaScript 原型，打开 console 使用 `Immutable.toJS()` 或者查看 `_tail` 字段。


## List

Immutable List 类似 JavaScript array。

### 创建 List 

`List()` 与 `List.of()` 的不同：
  * `List.of()` - 作用于 non-iterable 数据(如函数参数、JavaScript 对象、字符串)
  * `List()` - 作用于 iterable 数据(数组、Immutable 对象(List, Map, Set...)、字符串中单个字符)

**注意：JavaScript 中 string 是 [iterable object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#Builtin_iterables)。**

#### 函数参数

```js
const args = Immutable.List.of('a', 'b', 'c')

// Output: 
Array [
  'a',
  'b',
  'c'
]
```

#### 对象

`List.of()` 会把对象转为 List 的一个元素

```js
const obj = { a: 1, b: 2 }
const list = Immutable.List.of(obj)

// Output: 
Array [
  Object {
    a: 1,
    b: 2
  }
]
```


#### 字符串

```js
const str = 'abc'
const list = Immutable.List.of(str)

// Output: 
Array [
  'a,b,c'
]
```

因为 JavaScript 中 string 是 iterable 的，所以想把整个 string 当做一个整体的就使用 `List.of()`，`List()` 转化如下：

```js
const str = 'abc'
const list = Immutable.List(str)

// Output: 
Array [
  'a',
  'b',
  'c'
]
```

### Iterator

ES6 现有的 iterators 类型:

* [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
* [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [TypedArray](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
* [Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)
* [Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)

当然也可以自行构建 [iterable](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols)。

#### 数组

```js
const num = [1,2,3]
const list = Immutable.List(num)

// Output: 
Array [
  1,
  2,
  3
]
```

#### 嵌套数组

```js
const num = [1,[2,3]]
const list = Immutable.List(num)

Immutable.List.isList(list.getIn([1])) // false
```

`Immutable.List` 只转化一层，而 `Immutable.fromJS` 支持嵌套转化，将每一层数据都转为 Immutable。

```js
const num = [1,[2,3]]
const list = Immutable.fromJS(num)

Immutable.List.isList(list.getIn([1])) // true
```

### Immutable.js 类型

Immutable 中 iterable 的类型有：`List`, `Map`, `OrderedMap`, `Set`, `OrderedSet`, `Stack`, `Record`。

#### List

`List()` 一个 `List` 对象和原来相等。

```js
const list = Immutable.List([1, 2, 3])
const newList = Immutable.List(list)

list.equals(newList) // true
```

#### Map

`List()` 会将 `Map` key/value 转为一个数组元组。

```js
const map = Immutable.Map({a: 1, b: 2})
const list = Immutable.List(map)

// Output: 
Array [
  ['a', 1,],
  ['b', 2]
]
```


### get() / set()

```js
const list = Immutable.List([1, 2, 3])
list.get(0) // 1
list.get(-3) // 1 反向
```

`getIn` 访问嵌套数组的数据

```js
const list = Immutable.fromJS([1, [2, 3]])
list.getIn([1, 0]) // 2
```

`set` 与 `setIn`

```js
const list = Immutable.List([1, 2, 3])
list.set(0, 'a') // ['a', 2, 3]
list.set(4, 'a') // [1, 2, 3, undefined, 'a']
list.set(-3, 'b') // ['b', 2, 3]
```

```js
const list = Immutable.fromJS([1, [2, 3]])
list.setIn([1, 0], 'a') // [1, ['a', 3]]
```

### merge

`merge()` 是根据索引值的

```js
const list1 = Immutable.List([1, 2, 3])
const list2 = Immutable.List(['a', 'b'])

list1.merge(list2) // ['a', 'b', 3]
```

`mergeWith()` 提供解决冲突的方法

```js
const list1 = Immutable.List([1, 2, 3])
const list1 = Immutable.fromJS(['a', 'b', 'c'])
list.mergeWith((prev, next, index) => prev === 1 ? prev : next, list1) // [1, 'b', 'c']
```

`mergeDeep()` 作用嵌套数组每层

```js
const list = Immutable.fromJS([1, [2, 3], 4])
const list1 = Immutable.fromJS(['a', ['b', 'c']])
list.mergeDeep(list1) // ['a', ['b', 'c'], 4]
```

`mergeDeepWith()` 作用嵌套数组每层

```js
const list = Immutable.fromJS([1, [2, 3], 4])
const list1 = Immutable.fromJS(['a', ['b', 'c']])
list.mergeDeepWith((prev, next, index) => prev === 1 ? prev : next, list1) // [1, ['b', 'c'], 4]
```


## Map

### 创建 Map

#### `Map.of()` 作用于函数参数

```js
const map = Immutable.Map.of('a', 'b', 'c', 'd') // { a: 'b', c: 'd' }
```

#### `Map()`

```js
const map1 = Immutable.Map([['a', 'b'], ['c', 'd']]) // { a: 'b', c: 'd' }

const map2 = Immutable.Map({ a: 'b', c: 'd' }) // { a: 'b', c: 'd' }

const map3 = Immutable.Map({ a: { b: 'c' } }) // { a: { b: 'c' } }
Immutable.Map.isMap(map3.get('a')) // false

const map4 = Immutable.fromJS({ a: { b: 'c' } }) // { a: { b: 'c' } }
Immutable.Map.isMap(map4.get('a')) // true

const map5 = Immutable.Map(Immutable.List([['a', 'b'], ['c', 'd']])) // { a: 'b', c: 'd' }
```

### get() / set()

`get` / `getIn`

```js
const map2 = Immutable.Map({ a: 'b', c: 'd' }) // { a: 'b', c: 'd' }
map2.get('a') // 'b'

// get 的第二个参数，可以作为备选项，当没有获取到的时候，返回该值
map2.get('e', 1) // 1

const map4 = Immutable.fromJS({ a: { b: 'c' } }) // { a: { b: 'c' } }
map4.getIn(['a', 'b']) // 'c'

```

`set` / `setIn`

```js
const map2 = Immutable.Map({ a: 'b', c: 'd' }) // { a: 'b', c: 'd' }
map2.set('e', 'f') // { a: 'b', c: 'd', e: 'f' }

const map4 = Immutable.fromJS({ a: { b: 'c' } }) // { a: { b: 'c' } }
map4.setIn(['a', 'b'], 'e') // { a: { b: 'e' } }
```

#### merge

`merge()`、`mergeWith()`、 `mergeDeep()`、`mergeDeepWith()` 与 `List` 类似。

## 更多

`Immutable.js` 文档中提供的方法还有很多，可以自己查看。

更复杂的操作，推荐阅读这篇文章 [Advanced Immutable.js Recipes: How to use Immutable.js in the real world](http://untangled.io/advanced-immutable-js-recipes-how-to-use-immutable-js-in-the-real-world/)。


## 参考

[Immutable.js: An Introduction with examples written for humans](http://untangled.io/immutable-js-an-introduction-with-examples-written-for-humans)
[Immutable.js docs](https://facebook.github.io/immutable-js/docs)
