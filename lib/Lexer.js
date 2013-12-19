var ValueComponent = require('./components/ValueComponent'),
    DieComponent = require('./components/DieComponent'),
    MultiDieComponent = require('./components/MultiDieComponent'),

    rules = [
        {
            name: 'MultiDie',
            pattern: /(\d+)d(\d+)/,
            args: function () {
                return [
                    parseInt(this.match[1], 10) || 0,
                    parseInt(this.match[2], 10) || 0
                ];
            },
            type: MultiDieComponent
        },
        {
            name: 'Die',
            pattern: /d(\d+)/,
            args: function () {
                return [parseInt(this.match[1], 10) || 0];
            },
            type: DieComponent
        },
        
        {
            name: 'Value',
            pattern: /\d+/,
            type: ValueComponent
        }
    ];

var Lexer = function() {
};
Lexer.prototype.tokenise = function (part) {
    var candidates = rules.map(function (rule) {
        return {
            name: rule.name,
            match: rule.pattern.exec(part),
            args: rule.args,
            type: rule.type
        };
    })
    .filter(function (rule) {
        return rule.match;
    });

    if(!candidates.length) return;
    
    var candidate = candidates[0],
        TokenType = candidate.type,
        args = candidate.args ? candidate.args() : [part];

    return new TokenType(args[0], args[1]);
};
module.exports = Lexer;