var store = function () {
    this.storage = 'session';
    var temp = null;

    var switchType = function (param) {
        switch (param) {
            case 'local':
                this.storage = 'local';
                break;
            case 'session':
                this.storage = 'session';
                break;
            default:
                throw new Error('not suport this type.The param must be in "local" or "session"');
                break;
        }
    };

    var set = function (key, val) {
        validateKey(key);
        switch (this.storage) {
            case 'local':
                localStorage.setItem(key, transformToStringValue(val));
                break;
            default:
                sessionStorage.setItem(key, transformToStringValue(val));
                break;
        }
    };

    var get = function (key) {
        validateKey(key);
        switch (this.storage) {
            case 'local':
                return transformToOriginalValue(localStorage.getItem(key));
            default:
                return transformToOriginalValue(sessionStorage.getItem(key));
        }
    };

    var remove = function (key) {
        if (get(key) === temp) {
            return {
                result: false,
                message: key + ' not exist'
            };
        }
        switch (this.storage) {
            case 'local':
                localStorage.removeItem(key);
                break;
            default:
                sessionStorage.removeItem(key);
                break;
        }
        return {
            result: true,
            message: 'remove' + key + 'success'
        };
    };

    var clear = function () {
        switch (this.storage) {
            case 'local':
                localStorage.clear();
                break;
            default:
                sessionStorage.clear();
                break;
        }
    };

    var validateKey = function (key) {
        if (typeof key !== 'string') {
            throw new TypeError("key's type error.key is string value.");
        }
    };

    var transformToStringValue = function (val) {
        var res = null;
        switch (typeof val) {
            case 'string':
            case 'boolean':
            case 'array':
                res = JSON.stringify(val);
                break;
            case 'number':
                if (isNaN(val)) {
                    throw new TypeError('not support NaN.');
                }
                res = JSON.stringify(val);
                break;
            case 'object':
                if (val === temp) {
                    throw new TypeError('not support null.');
                }
                res = JSON.stringify(val);
                break;
        }
        return res;
    };

    var transformToOriginalValue = function (val) {
        return JSON.parse(val);
    };

    return {
        switchType: switchType,
        set: set,
        get: get,
        remove: remove,
        clear: clear
    };
}();


