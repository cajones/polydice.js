var Component = require('./Component');

var Set = function (members) {
        members = Array.isArray(members) ? members : [];
        Object.defineProperty(this, 'members', {
            get: function () {
                return members || [];
            }
        });
        Object.defineProperty(this, 'length', {
            get: function () {
                return members.length;
            }
        });
        Component.set('hasResolved', false, this);
    };

Set.prototype.init - function (members) {

};

Set.prototype.resolve = function () {
    if(!this.hasResolved) {
        this.members.forEach(function (member) {
            if(member && typeof member.resolve === 'function') {
                member.resolve();    
            }
        });
        Component.set('hasResolved', true, this);
    }
    return this;
};

Set.prototype.reduce = function(aggregator, initial, context) {
    aggregator = aggregator || sum;
    initial = initial || 0;
    context = context || this;

    return this.resolve().members.reduce(aggregator, initial, context);
};

function sum(accumulator, component) {
    return accumulator += component.reduce ? component.reduce(sum, 0) : component.value;
}

module.exports = Set;