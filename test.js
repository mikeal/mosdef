const mosdef = require('./')
const tape = require('tape')

tape('test basics', t => {
  let obj = {}
  mosdef(obj, 'test1', () => 'function value')
  mosdef(obj, 'test2', {get: () => 'get prop function value'})
  mosdef(obj, ['test3', 'test4'], () => 'function value')
  mosdef(obj, ['test5', 'test6'], {get: () => 'get prop function value'})
  let test7 = {}
  mosdef(obj, 'test7', {set: (value, key) => { test7[key] = value }})
  let test8 = {}
  mosdef(obj, ['test8', 'test9'], {set: (value, key) => { test8[key] = value }})


  t.equals(obj.test1, 'function value')
  t.equals(obj.test2, 'get prop function value')
  t.equals(obj.test3, 'function value')
  t.equals(obj.test4, 'function value')
  t.equals(obj.test5, 'get prop function value')
  t.equals(obj.test6, 'get prop function value')
  obj.test7 = 'test7 ok'
  t.equals(test7.test7, 'test7 ok')
  obj.test8 = 'test8 ok'
  obj.test9 = 'test9 ok'
  t.equals(test8.test8, 'test8 ok')
  t.equals(test8.test9, 'test9 ok')
  t.end()
})

