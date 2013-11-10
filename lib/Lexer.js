var ValueComponent = require('./components/ValueComponent'),
    DieComponent = require('./components/DieComponent'),

    rules = [
        {
            pattern: /d(\d+)/,
            argument: function () {
                return parseInt(this.match[1], 10) || 0;
            },
            type: DieComponent
        },
        {
            pattern: /\d+/,
            type: ValueComponent
        }
    ];

var Lexer = function() {
};
Lexer.prototype.tokenise = function (part) {
    var cadidates = rules.map(function (rule) {
        return {
            match: rule.pattern.exec(part),
            argument: rule.argument,
            type: rule.type
        };
    })
    .filter(function (rule) {
        return rule.match;
    });

    if(!cadidates.length) return;

    var candidate = cadidates[0],
        TokenType = candidate.type,
        argument = candidate.argument ? candidate.argument() : part;

    return new TokenType(argument);
};
module.exports = Lexer;