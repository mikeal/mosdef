# mosdef -- Functional conveniences for property definitions.

[![Greenkeeper badge](https://badges.greenkeeper.io/mikeal/mosdef.svg)](https://greenkeeper.io/)

Add property getters.

```javascript
let o = {}
mosdef(o, 'key', () => 'my value')
```

Set a single getter for many keys.

```javascript
let p = {} // private object
let o = {}
mosdef(o, ['key1', 'key2'], key => p[key])
```

Can do setters as well.

```javascript
let p = {} // private object
let o = {}
mosdef(o, ['key1', 'key2'], {
  get: key => p[key],
  set: (value, key) => { p[key] = value }
})
```

Can use a table for mapping instead. Can also run through multiple objects.

```javascript
let p = {} // private object
let o = {}
let o2 = {}

let getPrivate = key => p[key]
let setPrivate = (value, key) => { p[key] = value }
let trySelf = (key, obj) => obj['_' + key] || p[key]

mosdef([o, o2], {
  key1: {get: getPrivate, set: setPrivate},
  key2: getPrivate,
  key3: trySelf
})
```