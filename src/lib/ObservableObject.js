export default class {
    constructor (object, callback) {
        return this.createProxy('', object, callback)
    }

    createProxy (prefix, object, callback) {
        return new Proxy(object, {
            set: function (target, property, value) {
                target[property] = value
                callback(prefix + property, value)
                return true
            }
        })
    }

    isObject (value) {
        if (value === null || value === undefined) return false
        else return value.constructor === Object
    }
}