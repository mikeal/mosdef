const values = obj => Object.keys(obj).map(key => obj[key])
const each = (obj, cb) => Object.keys(obj).forEach(key => cb(key, obj[key]))

const mosdef = (obj, key, value) => {
  let table = {}
  if (!value) {
    if (typeof key === 'object') {
      table = key
    }
  } else {
    if (Array.isArray(key)) {
      key.forEach(k => { table[k] = value })
    } else if (typeof key === 'string') {
      table[key] = value
    } else {
      throw new TypeError('key does not match known type')
    }
  }

  let objects
  if (Array.isArray(obj)) {
    objects = obj
  } else {
    objects = [obj]
  }

  objects.forEach(obj => {
    each(table, (key, value) => {
      if (typeof value === 'function') {
        Object.defineProperty(obj, key, {get: () => value(key, obj)})
      } else if (typeof value === 'object') {
        let _value = {}
        if (value.get) _value.get = () => value.get(key, obj)
        if (value.set) _value.set = v => value.set(v, key, obj)
        Object.defineProperty(obj, key, _value)
      } else {
        throw new TypeError('value does not match known type')
      }
    })
  })
  return obj
}

module.exports = mosdef
