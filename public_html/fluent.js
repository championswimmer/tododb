/**
 * Created by championswimmer on 22/07/16.
 */


var customClass = {
    addParam: function(key, val) {
        this[key] = val;
        return this;
    },
    clearParam: function(key) {
        delete this[key];
        return this;
    }
};

customClass
    .addParam('a', 10)
    .addParam('b', 20)
    .clearParam('a');