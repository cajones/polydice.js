;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./Rules":3}],2:[function(require,module,exports){
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
},{"./Lexer":1}],3:[function(require,module,exports){
var ValueComponent = require('./components/ValueComponent'),
    DieComponent = require('./components/DieComponent'),
    MultiDieComponent = require('./components/MultiDieComponent');

module.exports = [
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
            return [
                parseInt(this.match[1], 10) || 0
            ];
        },
        type: DieComponent
    },
    {
        name: 'Value',
        pattern: /\d+/,
        type: ValueComponent
    }
];
},{"./components/DieComponent":4,"./components/MultiDieComponent":5,"./components/ValueComponent":6}],4:[function(require,module,exports){
var DieComponent = function (sides) {
    Object.defineProperty(this, 'sides', {
        value: parseInt(sides, 10),
        enumerable : true
    });
    Object.defineProperty(this, 'hasResolved', {
        value: false,
        enumerable : true,
        configurable: true
    });
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

DieComponent.prototype.resolve = function () {
    if(!this.hasResolved) {
        Object.defineProperty(this, 'value', {
            value: getRandomInt(1, this.sides),
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(this, 'hasResolved', {
            value: true,
            enumerable : true,
            configurable: false
        });    
    }
    return this;
};
DieComponent.prototype.toHtml = function () {
    return '<span class="die component size-' + this.sides + '">' + this.value + '</span>'
};
module.exports = DieComponent;
},{}],5:[function(require,module,exports){
var DieComponent = require('./DieComponent'),
    MultiDieComponent = function (quantity, sides) {
    Object.defineProperty(this, 'quantity', {
        value: parseInt(quantity, 10),
        enumerable : true
    });
    DieComponent.call(this, sides);
};

MultiDieComponent.prototype.resolve = function () {
    if(!this.hasResolved) {
        var value = [];
        
        for(var i = 1; i<= this.quantity; i++) {
            var die = new DieComponent(this.sides);
            value.push(die.resolve());
        }

        Object.defineProperty(this, 'value', {
            value: value,
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(this, 'hasResolved', {
            value: true,
            enumerable : true,
            configurable: false
        });
    }
    return this;
};
MultiDieComponent.prototype.toHtml = function () {
    var children = (this.value || []).reduce(function (accumulator, component) {
        return accumulator += component.toHtml();
    }, '');

    return '<div class="component">' + children + '</div>'; 
};
module.exports = MultiDieComponent;
},{"./DieComponent":4}],6:[function(require,module,exports){
var ValueComponent = function (value) {
    Object.defineProperty(this, 'value', {
        value: parseInt(value, 10),
        enumerable : true
    });
};
ValueComponent.prototype.resolve = function () {
    return this;
};
ValueComponent.prototype.toHtml = function () {
    return '<span class="value component">' + this.value + '</span>'
};
module.exports = ValueComponent;
},{}],7:[function(require,module,exports){

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
            return this.parse(expression).map(resolve);
        }
    };
}();
},{"./Parser":2}]},{},[7])
;