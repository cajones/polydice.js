
polydice = function () {
    var Parser = require('./Parser'),
        resolve = function (component) {
            return component.resolve();
        };

    return {
        Parser: Parser,
        parse : function (expression) {
            var parser = new Parser();
            return parser.parse(expression);
        },
        roll : function (expression) {
            return this.parse(expression).resolve();
        }
    };
}();