var Lexer = function(rules) {
    this.rules = rules || require('./Rules');
};
Lexer.prototype.tokenise = function (part) {
    var candidates = this.rules.map(function (rule) {
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