---
title: JavaScript 继承
date: 2016-08-04 09:30:20
cover: http://ww4.sinaimg.cn/large/65e4f1e6gw1f7gbs4gkoqj21jk0hsgve.jpg
tags:
- code
---

关于 JavaScript 继承的回顾。

<!-- more -->

> `JavaScript` 是一种基于原型的面向对象语言，而不是基于类的。
  正是由于这一根本的区别，其如何创建对象的层级结构以及对象的属性与属性值是如何继承的并不是那么清晰。


### 对象

对象就是一系列属性的集合，属性就是键值对 `key: value`。

```js
var foo = {
  x: 10,
  y: 20
}
```

`JavaScript` 中的继承其实就是对象与对象之间层级结构关系的讨论。

### 原型链

在 `JavaScript` 中，每个对象都有一个指向它的原型 `prototype` 对象的内部链接。
这个原型对象又有自己的原型，直到某个对象的原型为 `null` 为止。这种一级一级的链结构就称为原型链（prototype chain）。

对象原型指定可以使用 `__proto__` 属性。

<p class='tip'>
根据 ECMAScript 标准，someObject.[[Prototype]] 符号是用于指派 someObject 的原型。
这个等同于 JavaScript 的 `__proto__`  属性（现已弃用）。
从 ECMAScript 6 开始, [[Prototype]] `可以用 Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 访问器来访问。
</p>

也就是说，以下涉及到 `__proto__` 的方式，都可以使用 `Object.getPrototypeOf()` 来获取原型，或者使用 `Object.setPrototypeOf()` 来设置原型。


```js
var a = {
  x: 1,
  y: 2
}

var b = {}

b.__proto__ = a // 将对象的原型指向 a, 等同于 b = Object.setPrototypeOf({}, a)

b.x // 1
b.y // 2
```

其实 `new` 关键字会做类似的操作，在构造函数下会做说明。


### 构造函数

在 `JavaScript` 中构造函数就是一个函数，可以使用 `new` 操作符作用这个函数，实例化一个对象。

```js
// 构造函数
function Foo(y) {
  this.y = y
}

Foo.prototype.x = 1

Foo.prototype.fn = function () {}

// 实例化对象 b
var b = new Foo(2)

b.x // 1
b.y // 2

b.__proto__ === Foo.prototype // true, 等同于 Object.setPrototypeOf(b) === Foo.prototype

// constructor 返回一个指向创建了该对象原型的函数引用
b.constructor === Foo // true

Foo.prototype.constructor === Foo // true

b.fn === b.__proto__.fn // true

b.__proto__.fn === Foo.prototype.fn // true

```

{% asset_img 1.png %}

从以上结果可以推测，当执行 `new` 操作符时

```js
var b = new Foo(2)
```

`JavaScript` 实际上执行了以下操作

```js
var b = new Object()
b.__proto__ = Foo.prototype
Foo.call(b, 2)
```

知道了原理之后，我们就可以使用构造函数的方式来实现继承了。

```js

function Foo(x) {
  this.x = x
}

Foo.prototype.fn = function () {
  console.log(this.x)
}

// Bar 继承 Foo
function Bar(x, y) {
  // 继承构造函数中的属性
  Foo.call(this, x)
  // 增加属性
  this.y = y
}
// 继承原型链上的属性
// 这里有个不优雅的地方是会在 Bar 原型连上产生一个 Foo 自身的属性 x undefined
Bar.prototype = new Foo()

// 如果 Bar.prototype = Foo.prototype, 除了构造函数 Bar 和 Foo 其实是一样的

var foo = new Foo(1)
var bar = new Bar(1,2)

bar.__proto__ === Bar.prototype // true
bar.__proto__.__proto__ === foo.__proto__ // true

```

##### 总得来说，要实现继承分两步走：

1. 继承构造函数里的属性(父类自身的属性)
2. 继承原型链上的属性


### Object.create 实现继承

> `Object.create()` 方法创建一个拥有指定原型和若干个指定属性的对象。

*这是一个 `ES5` 中的方法，IE >= 9。*

使用 `Object.create()` 来解决上面子类原型链上产生父类自身属性的问题。

```js

function Foo(x) {
  this.x = x
}

Foo.prototype.fn = function () {
  console.log(this.x)
}

// Bar 继承 Foo
function Bar(x, y) {
  // 继承构造函数中的属性
  Foo.call(this, x)
  // 增加属性
  this.y = y
}
// 继承原型链上的属性
Bar.prototype = Object.create(Foo.prototype)

var foo = new Foo(1)
var bar = new Bar(1,2)

bar.__proto__ === Bar.prototype // true
bar.__proto__.__proto__ === foo.__proto__ // true

```


### class 关键字

ES6 加入语法糖 `class`，实现继承就更加方便一些了。

```js
class Foo {
  // 构造函数
  constructor(x) {
    this.x = x
  }

  // 原型链上的方法
  fn () {
    console.log(this.x)
  }
}

class Bar extends Foo {
  // 子类构造函数
  constructor(x, y) {
    super(x) // 访问父对象上的构造函数
    this.y = y
  }
}

var foo = new Foo(1)
var bar = new Bar(1,2)

bar.__proto__.__proto__ === foo.__proto__ // true

```


### 多继承

> 某些面向对象语言支持多重继承。也就是说，对象可以从无关的多个父对象中继承属性和属性值。JavaScript 不支持多重继承。

在 `JavaScript` 中，可以在构造器函数中调用多个其它的构造器函数。这一点造成了多重继承的假象。例如，


```js
function Foo(x) {
  this.x = x
}

function Bar(y) {
  this.y = y
}

function Baz(x, y) {
  Foo.call(this, x)
  Bar.call(this, y)
}

Baz.prototype = new Bar()

var baz = new Baz(1,2) // {x: 1, y: 2}

```

以上看起来 baz 的属性 `{x: 1, y: 2}` 中包含了 `Foo` 和 `Bar` 的属性，但是更新 `Foo` 的原型链上的属性，并不会被继承下来。

```js
Foo.prototype.fn = function () {}
```

实例 baz 还是原来的样子，并没有 fn 属性。
当然你可以把 `Foo` 的原型链上的属性复制到 Baz 的 `prototype` 上，但之后 `Foo` 原型链上属性的更新并不会被继承。

造成这个的原因是: `JavaScript` 的继承是在运行时通过检索对象的原型链来实现的。因为对象只有一个原型与之关联，所以 `JavaScript` 无法动态地从多个原型链中继承。


### 结论

总得来说使用 `ES6` 来实现继承更加方便了，但是了解下原型链还是很有必要的。

### 参考

[Object.prototype.__proto__](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

[Object.prototype.constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

[Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)

[Details of the object model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model)

[Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

[Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

[JavaScript. The core. (Dmitry A. Soshnikov ECMA-262 article series)](http://dmitrysoshnikov.com/ecmascript/javascript-the-core/)
