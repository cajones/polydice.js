
polydice = function (require, exports, module) {
    var Parser = require('./Parser')
    return {
        Parser: Parser
    };
}


if (typeof module === 'object' && typeof define !== 'function') {
    var define = function (factory) {
        module.exports = factory(require, exports, module);
    };
}

define(polydice);