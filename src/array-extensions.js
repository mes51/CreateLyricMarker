if (Array.prototype.skipWhile == null) {
    Array.prototype.skipWhile = function(predicator) {
        let i = 0;
        for (; i < this.length && predicator(this[i], i, this); i++) { }

        return this.slice(i);
    };
}

if (Array.prototype.append == null) {
    Array.prototype.append = function(value) {
        const result = this.slice(0);
        result.push(value);
        return result;
    };
}

if (Array.prototype.mapReferencePrev == null) {
    Array.prototype.mapReferencePrev = function(selector) {
        let firstSelector = (value, i) => selector(value, null, i);
        if (arguments.length > 1) {
            firstSelector = arguments[0];
            selector = arguments[1];
        }

        let result = new Array(this.length);
        for (let i = 0; i < 1 && i < this.length; i++) {
            result[i] = firstSelector(this[i], i, this);
        }

        for (let i = 1; i < this.length; i++) {
            result[i] = selector(this[i], result[i - 1], i, this);
        }

        return result;
    };
}

if (Array.prototype.findLast == null) {
    Array.prototype.findLast = function(predicator) {
        if (arguments.length > 1) {
            predicator = predicator.bind(arguments[1]);
        }

        for (let i = this.length - 1; i > -1; i--) {
            if (predicator(this[i], i, this)) {
                return this[i];
            }
        }

        return null;
    };
}