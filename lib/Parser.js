var Lexer = require('./Lexer');

var Parser = function (options) {
    options = options || {};
    this.lexer = new Lexer(options.rules);
};

Parser.prototype.parse = function (expression) {
    if(typeof expression !== 'string') throw new Error('Expression is not a string.');
    
    var statement = expression,
        parts = statement.split(/,|\s/) || [];

    var lexer = this.lexer,
        tokens = parts.map(function (part) {
            return lexer.tokenise(part);
        })
        .filter(function (part) {
            return part;
        });

    return tokens;
}
module.exports = Parser;