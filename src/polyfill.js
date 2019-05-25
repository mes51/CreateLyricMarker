if (Array.prototype.fill == null) {
    Array.prototype.fill = function(value) {
        const start = arguments.length > 1 ? arguments[1] : 0;
        const end = arguments.length > 2 ? arguments[2] : this.length;

        for (let i = start; i < end; i++) {
            this[i] = value;
        }

        return this;
    };
}

if (Array.prototype.flat == null) {
    Array.prototype.flat = function(depth) {
        if (depth == null) {
            depth = Math.pow(2, 31);
        } else if (depth < 1) {
            return this;
        }

        let result = [];
        let hadArray = false;
        this.forEach(v => {
            if (v instanceof Array) {
                result = result.concat(v);
                hadArray = true;
            } else {
                result.push(v);
            }
        });

        if (hadArray) {
            return result.flat(depth - 1);
        } else {
            return result;
        }
    };
}